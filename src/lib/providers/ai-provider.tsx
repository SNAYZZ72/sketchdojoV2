"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { ChatMessage, ToolCall, ToolCallResponse, ChatResponse } from '../types/chat';
import { 
  sendChatMessage, 
  executeToolCall, 
  getChatHistory, 
  ProjectHistoryResponse,
  API_BASE_URL,
  STATIC_BASE_URL
} from '../utils/chat-api';

interface AIContextType {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (content: string, projectId: string) => Promise<void>;
  resetChat: () => void;
  loadChatHistory: (projectId: string) => Promise<void>;
  processingTools: boolean;
  lastToolResult: Record<string, any> | null;
  pollTaskStatus: (taskId: string) => Promise<void>;
  htmlContent: string;
  stopChat: () => void;
  isCancelled: boolean;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export function AIProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [processingTools, setProcessingTools] = useState(false);
  const [lastToolResult, setLastToolResult] = useState<Record<string, any> | null>(null);
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [isCancelled, setIsCancelled] = useState(false);
  const [toolCallCount, setToolCallCount] = useState(0);
  const MAX_TOOL_CALLS = 5; // Maximum number of consecutive tool calls

  // Reset the chat state
  const resetChat = useCallback(() => {
    setMessages([]);
    setIsLoading(false);
    setError(null);
    setProcessingTools(false);
    setLastToolResult(null);
    setToolCallCount(0);
    setIsCancelled(false);
  }, []);

  // Stop the chat and cancel any ongoing processes
  const stopChat = useCallback(() => {
    setIsCancelled(true);
    setIsLoading(false);
    setProcessingTools(false);
    setToolCallCount(0);
    
    // Add a system message indicating the chat was stopped
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: '🛑 Chat stopped. The AI assistant will no longer respond until you send a new message.',
      timestamp: new Date()
    } as ChatMessage]);
  }, []);

  // Load chat history for a project
  const loadChatHistory = useCallback(async (projectId: string) => {
    try {
      setIsLoading(true);
      const historyResponse = await getChatHistory(projectId);
      
      // Set messages from history
      setMessages(historyResponse.messages);
      
      // Set HTML content if available
      if (historyResponse.html_content) {
        setHtmlContent(historyResponse.html_content);
      }
      
    } catch (err) {
      console.error('Failed to load chat history:', err);
      setError('Failed to load chat history. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Poll for task status when a webtoon generation task is started
  const pollTaskStatus = useCallback(async (taskId: string) => {
    try {
      // Import the getTaskStatus function from the api utility
      const { getTaskStatus, getWebtoonResult } = await import('../utils/api');
      
      // Poll every 2 seconds
      const interval = setInterval(async () => {
        try {
          const statusData = await getTaskStatus(taskId);
          
          // If the task is completed, fetch the HTML result
          if (statusData.status === 'completed') {
            clearInterval(interval);
            
            try {
              const html = await getWebtoonResult(taskId);
              setHtmlContent(html);
              
              // Add a message to the chat
              setMessages(prev => [
                ...prev,
                {
                  role: 'assistant' as const,
                  content: 'Your webtoon has been generated! You can view it in the Preview tab.',
                  timestamp: new Date()
                } as ChatMessage
              ]);
              
              // Update last tool result with HTML content
              setLastToolResult(prev => ({
                ...prev,
                html_content: html
              }));
            } catch (error) {
              console.error('Error fetching HTML result:', error);
              setMessages(prev => [
                ...prev,
                {
                  role: 'assistant' as const,
                  content: 'Error fetching the generated webtoon. Please try again.',
                  timestamp: new Date()
                } as ChatMessage
              ]);
            }
          } 
          // If the task failed, show an error
          else if (statusData.status === 'failed') {
            clearInterval(interval);
            setMessages(prev => [
              ...prev,
              {
                role: 'assistant' as const,
                content: `Error generating webtoon: ${statusData.result?.error || 'Unknown error'}`,
                timestamp: new Date()
              } as ChatMessage
            ]);
          }
        } catch (error) {
          console.error('Error polling task status:', error);
        }
      }, 2000);
      
      // Clear interval after 5 minutes as a safety measure
      setTimeout(() => clearInterval(interval), 5 * 60 * 1000);
    } catch (error) {
      console.error('Error setting up task polling:', error);
    }
  }, []);
  
  // Process any tool calls from the AI
  const processToolCalls = useCallback(async (toolCalls: ToolCall[], projectId: string) => {
    // Check if we've exceeded the maximum number of tool calls or if the chat has been cancelled
    if (toolCallCount >= MAX_TOOL_CALLS) {
      setProcessingTools(false);
      setIsLoading(false);
      setToolCallCount(0);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'I apologize, but I\'ve made too many consecutive tool calls. This might indicate a processing loop. Please try rewording your request or contact support if the issue persists.',
        timestamp: new Date()
      } as ChatMessage]);
      return;
    }
    
    // If the user cancelled the chat, don't process any more tool calls
    if (isCancelled) {
      setProcessingTools(false);
      setIsLoading(false);
      return;
    }
    
    setProcessingTools(true);
    setToolCallCount(prev => prev + 1);
    
    // Track errors for each tool call
    let consecutiveErrors = 0;
    const MAX_ERROR_RETRIES = 2; // Maximum consecutive errors allowed per tool
    
    try {
      for (const toolCall of toolCalls) {
        // Add a message indicating the tool is being executed
        setMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            content: `I'm executing the ${toolCall.name} tool...`,
            timestamp: new Date()
          }
        ]);
        
        try {
          // Execute the tool call
          const result = await executeToolCall(toolCall, projectId);
          
          // Reset consecutive error counter on success
          consecutiveErrors = 0;
          
          // Check if the result contains an error
          if (result.result?.error) {
            // Format the error message in a more user-friendly way
            const errorMessage = {
              role: 'assistant' as const,
              content: `I encountered an error while processing your request: ${result.result.error.split('\n')[0]}\n\nPlease try again with a different prompt or wording.`,
              timestamp: new Date()
            };
            
            setMessages(prev => [...prev, errorMessage]);
            
            // Don't continue processing if we got an error
            setProcessingTools(false);
            setIsLoading(false);
            return;
          }
          
          // Add a function message for the result
          const functionMessage = {
            role: 'function' as const,
            name: toolCall.name,
            content: JSON.stringify(result.result, null, 2),
            timestamp: new Date()
          };
          
          // Add message to the chat
          setMessages(prev => [...prev, functionMessage]);
          
          // Store the last tool result
          setLastToolResult(result.result);
          
          // If there's a fallback HTML content due to error, we should still display it
          if (result.result?.fallback && result.result?.html_path) {
            // Add a message explaining the fallback
            setMessages(prev => [...prev, {
              role: 'assistant' as const,
              content: 'I had some trouble generating exactly what you asked for, but I created a simple version instead. Please try again with a different prompt if this isn\'t what you wanted.',
              timestamp: new Date()
            }]);
            
            // Get the HTML content from the fallback path
            try {
              // Use STATIC_BASE_URL since this is a static file, not an API endpoint
              const response = await fetch(`${STATIC_BASE_URL}/${result.result.html_path}`);
              if (response.ok) {
                const html = await response.text();
                setHtmlContent(html);
              }
            } catch (error) {
              console.error('Error fetching fallback HTML:', error);
            }
            
            setProcessingTools(false);
            setIsLoading(false);
            return;
          }
          
          // If this is a webtoon generation task, start polling for status
          if (toolCall.name === 'generate_webtoon' && result.result?.task_id) {
            pollTaskStatus(result.result.task_id);
          }
          
          // Now send another message to the AI with the tool result
          const updatedMessages = [
            ...messages,
            {
              role: 'function' as const, // Use const assertion to ensure literal type
              content: JSON.stringify(result.result, null, 2),
              name: toolCall.name,
              tool_call_id: toolCall.id
            } as ChatMessage // Cast to ChatMessage to ensure type safety
          ];
          
          // Get AI's response to the tool result
          const toolResponse = await sendChatMessage(updatedMessages, projectId);
          
          // Add the AI's response to our messages
          setMessages(prev => [
            ...prev,
            toolResponse.message
          ]);
          
          // Process any new tool calls that might be in the response
          if (toolResponse.tool_calls && toolResponse.tool_calls.length > 0) {
            await processToolCalls(toolResponse.tool_calls, projectId);
          }
        } catch (error) {
          console.error(`Error executing tool ${toolCall.name}:`, error);
          
          // Increment consecutive errors counter
          consecutiveErrors++;
          
          // If we've had too many errors with this tool, stop processing
          if (consecutiveErrors >= MAX_ERROR_RETRIES) {
            // Add a more descriptive error message to the chat
            setMessages(prev => [...prev, {
              role: 'assistant',
              content: `I'm having trouble with the ${toolCall.name} tool. This might be due to an issue with your request format. Please try rephrasing your request or using different wording.\n\nError details: ${error}`,
              timestamp: new Date()
            } as ChatMessage]);
            
            setProcessingTools(false);
            setIsLoading(false);
            return;
          }
          
          // If we haven't exceeded max retries, add a simple error message
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: `I encountered an error while executing ${toolCall.name}. I'll try a different approach.`,
            timestamp: new Date()
          } as ChatMessage]);
          
          // Continue to the next tool since we're still under the retry limit
          continue;
        }
      }
    } catch (err) {
      console.error('Error processing tool calls:', err);
      setError('Failed to execute AI tools. Please try again.');
      
      // Add error message to chat
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant' as const,
          content: 'I encountered an error while trying to process your request. Please try again.',
          timestamp: new Date()
        } as ChatMessage
      ]);
    } finally {
      setProcessingTools(false);
    }
  }, [messages]);

  // Send a message to the AI
  const sendMessage = useCallback(async (content: string, projectId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Add user message to the chat
      const userMessage: ChatMessage = {
        role: 'user' as const,
        content,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);
      
      // Send the message to the AI
      const updatedMessages = [...messages, userMessage];
      const response = await sendChatMessage(updatedMessages, projectId);
      
      // Add AI response to the chat
      setMessages(prev => [...prev, {
        ...response.message,
        timestamp: new Date()
      }]);
      
      // Process any tool calls if not cancelled
      if (response.tool_calls && response.tool_calls.length > 0 && !isCancelled) {
        await processToolCalls(response.tool_calls, projectId);
      } else {
        // Reset tool call count when we get a regular message without tool calls
        setToolCallCount(0);
      }
      
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message. Please try again.');
      
      // Add error message to chat
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant' as const,
          content: 'I encountered an error while trying to process your message. Please try again.',
          timestamp: new Date()
        } as ChatMessage
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, processToolCalls]);

  const value = {
    messages,
    isLoading,
    error,
    sendMessage,
    resetChat,
    loadChatHistory,
    processingTools,
    lastToolResult,
    pollTaskStatus,
    htmlContent,
    stopChat,
    isCancelled
  };

  return (
    <AIContext.Provider value={value}>
      {children}
    </AIContext.Provider>
  );
}

export const useAI = () => {
  const context = useContext(AIContext);
  if (context === undefined) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
};
