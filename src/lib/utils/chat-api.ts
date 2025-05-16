/**
 * API utilities for the SketchDojo AI chat system
 */
import {
  ChatMessage,
  ChatRequest,
  ChatResponse,
  ToolCallRequest,
  ToolCallResponse
} from '../types/chat';

// The server base URL with API prefix
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
export const API_BASE_URL = `${BASE_URL}/api`;
export const STATIC_BASE_URL = BASE_URL;

/**
 * Handle errors from API calls
 */
const handleError = (error: any): never => {
  console.error('Chat API Error:', error);
  throw error;
};

/**
 * Send a message to the AI chat system
 */
export const sendChatMessage = async (
  messages: ChatMessage[],
  projectId: string
): Promise<ChatResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages,
        project_id: projectId
      } as ChatRequest)
    });

    if (!response.ok) {
      throw new Error(`Failed to send chat message: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    return handleError(error);
  }
};

/**
 * Execute a tool call from the AI
 */
export const executeToolCall = async (
  toolCall: {
    id: string;
    name: string;
    arguments: Record<string, any>;
  },
  projectId: string
): Promise<ToolCallResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/chat/tool-call`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tool_name: toolCall.name,
        arguments: toolCall.arguments,
        project_id: projectId,
        message_id: toolCall.id
      } as ToolCallRequest)
    });

    if (!response.ok) {
      throw new Error(`Failed to execute tool call: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    return handleError(error);
  }
};

/**
 * Interface for project history response including chat messages and HTML content
 */
export interface ProjectHistoryResponse {
  messages: ChatMessage[];
  html_content: string;
}

/**
 * Get chat history for a project
 * @param projectId - ID of the project
 * @returns ProjectHistoryResponse containing messages and HTML content
 */
export const getChatHistory = async (projectId: string): Promise<ProjectHistoryResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/chat/${projectId}/history`);
    if (!response.ok) {
      throw new Error(`Error fetching chat history: ${response.statusText}`);
    }
    const data = await response.json();
    return data as ProjectHistoryResponse;
  } catch (error) {
    console.error('Error fetching chat history:', error);
    return { messages: [], html_content: '' };
  }
};

/**
 * Store HTML content for a project
 * @param projectId - ID of the project
 * @param htmlContent - HTML content to store
 * @returns Success message
 */
export const storeHtmlContent = async (projectId: string, htmlContent: string): Promise<{ message: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/chat/store-html`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        project_id: projectId,
        html_content: htmlContent,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Error storing HTML content: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error storing HTML content:', error);
    return { message: 'Failed to store HTML content' };
  }
};
