"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight, Home, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useAI } from '@/lib/providers/ai-provider';
import { ChatMessage as AIChatMessage } from '@/lib/types/chat';
import { storeHtmlContent } from '@/lib/utils/chat-api';
import { TaskStatus } from '@/lib/types/api';

// Types for project data
interface ProjectData {
  projectId: string;
  projectName: string;
}

export default function ProjectPage() {
  const { id } = useParams<{ id: string }>() || {};
  const searchParams = useSearchParams();
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [taskId, setTaskId] = useState<string | null>(null);
  const [taskStatus, setTaskStatus] = useState<TaskStatus | null>(null);
  // No longer need tabs since we're only keeping Preview Mode
  const [chatExpanded, setChatExpanded] = useState(true);
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [historyLoaded, setHistoryLoaded] = useState(false); // Track if chat history has been loaded
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isInitialized = useRef(false); // Track if we've already initialized generation
  
  // AI Chat functionality
  const { messages, isLoading, sendMessage, loadChatHistory, lastToolResult, processingTools, htmlContent: aiHtmlContent, stopChat, isCancelled } = useAI();
  
  // Using the centralized API utilities for server communication
  
  // Scroll to bottom of messages when they update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // First effect: Set up the project and load chat history
  useEffect(() => {
    if (id && !isInitialized.current) {
      isInitialized.current = true; // Mark as initialized
      
      // Get the initial prompt from URL if it exists
      const initialPrompt = searchParams.get('initialPrompt');
      
      // Set project data
      setProjectData({
        projectId: id as string,
        projectName: initialPrompt ? `Webtoon: ${initialPrompt.slice(0, 20)}...` : 'Untitled Webtoon'
      });
      
      // Load chat history for this project
      loadChatHistory(id as string).then(() => {
        setHistoryLoaded(true);
      });
    }
  }, [id, searchParams, loadChatHistory]);
  
  // Second effect: Handle initial prompt only after history is loaded
  useEffect(() => {
    if (historyLoaded && id) {
      // Get the initial prompt from URL if it exists
      const initialPrompt = searchParams.get('initialPrompt');
      
      // Only send the initial prompt if there are no existing messages
      if (initialPrompt && messages.length === 0) {
        console.log('Starting chat with initial prompt:', initialPrompt);
        sendMessage(initialPrompt, id as string);
      }
    }
  }, [historyLoaded, messages.length, id, searchParams, sendMessage]);

  // Update HTML content when we get new content from the AI
  useEffect(() => {
    if (lastToolResult) {
      // Check if the tool result has HTML content
      if (lastToolResult.html_content) {
        const newHtmlContent = lastToolResult.html_content;
        setHtmlContent(newHtmlContent);
        
        // Store the HTML content if we have a project ID
        if (id) {
          storeHtmlContent(id, newHtmlContent).catch(error => {
            console.error('Failed to store HTML content:', error);
          });
        }
      }
      
      // If there's a project title in the result, update it
      if (lastToolResult.story_title) {
        setProjectData(prev => prev ? {
          ...prev,
          projectName: lastToolResult.story_title || prev.projectName
        } : null);
      }
    }
  }, [lastToolResult, id]);
  
  // Update HTML content when we get it directly from the AI provider
  useEffect(() => {
    if (aiHtmlContent) {
      setHtmlContent(aiHtmlContent);
      
      // Store the HTML content if we have a project ID
      if (id && aiHtmlContent.trim() !== '') {
        storeHtmlContent(id, aiHtmlContent).catch(error => {
          console.error('Failed to store HTML content:', error);
        });
      }
    }
  }, [aiHtmlContent, id]);


  
  // Handle form submission for sending a new message
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading || processingTools) return;
    
    if (id) {
      sendMessage(prompt, id as string);
      setPrompt('');
    }
  };
  
  // Render loading indicator
  const renderLoading = () => {
    if (!isLoading && !processingTools) return null;
    
    return (
      <div className="w-full bg-sketchdojo-background-light rounded-full h-2.5 mb-4">
        <div 
          className="bg-sketchdojo-primary h-2.5 rounded-full transition-all duration-500 animate-pulse" 
          style={{ width: '100%' }}
        />
      </div>
    );
  };
  
  return (
    <div className="flex h-full w-full bg-sketchdojo-background">
      {/* Left Panel: Chat */}
      <div 
        className={cn(
          "flex flex-col h-full bg-sketchdojo-background-light transition-all duration-300",
          chatExpanded ? "w-1/3" : "w-0"
        )}
      >
        {chatExpanded && (
          <>
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-sketchdojo-background">
              <div className="flex items-center space-x-2">
                <h1 className="font-semibold text-lg text-white">{projectData?.projectName || 'SketchDojo'}</h1>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" asChild>
                  <a href="/" className="text-white hover:text-sketchdojo-primary">
                    <Home size={20} />
                  </a>
                </Button>
              </div>
            </div>
            
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-white/60">
                  <p>Start by describing what you want to create.</p>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div key={index} className={cn(
                    "p-3 rounded-lg max-w-[85%]",
                    message.role === 'user' 
                      ? "bg-sketchdojo-primary/20 ml-auto" 
                      : message.role === 'function'
                        ? "bg-sketchdojo-accent/20 mr-auto"
                        : "bg-sketchdojo-background mr-auto"
                  )}>
                    {message.role === 'function' ? (
                      <div>
                        <p className="text-white/70 text-xs mb-1">Tool Result: {message.name}</p>
                        <pre className="text-white text-xs overflow-auto max-h-40">{message.content}</pre>
                      </div>
                    ) : (
                      <p className="text-white">{message.content}</p>
                    )}
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
              
              {/* Loading Indicator */}
              {renderLoading()}
            </div>
            
            {/* Message Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-sketchdojo-background">
              <div className="flex space-x-2">
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your webtoon idea..."
                  className="resize-none bg-sketchdojo-background text-white"
                  disabled={loading}
                />
                {(isLoading || processingTools) ? (
                  <Button
                    type="button"
                    size="icon"
                    variant="destructive"
                    className="rounded-full bg-red-500 hover:bg-red-600"
                    onClick={() => stopChat()}
                  >
                    <span className="h-4 w-4">✕</span>
                  </Button>
                ) : (
                  <Button 
                    type="submit" 
                    size="icon" 
                    className="rounded-full bg-sketchdojo-primary hover:bg-sketchdojo-primary-hover"
                    disabled={!prompt || isCancelled}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </form>
          </>
        )}
      </div>
      
      {/* Toggle Button */}
      <button
        onClick={() => setChatExpanded(!chatExpanded)}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-sketchdojo-primary hover:bg-sketchdojo-primary-light text-white rounded-r-md p-1"
      >
        {chatExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>
      
      {/* Right Panel: Webtoon Viewer */}
      <div className={cn(
        "h-full transition-all duration-300",
        chatExpanded ? "w-2/3" : "w-full"
      )}>
        <div className="h-full flex flex-col">
          {/* Viewer Header */}
          <div className="flex items-center p-4 border-b border-sketchdojo-background-light">
            <h2 className="text-white font-semibold">Webtoon Preview</h2>
          </div>
          
          {/* Viewer Content */}
          <div className="flex-1 overflow-auto bg-sketchdojo-background-light">
            <div className="h-full">
              {htmlContent ? (
                <div 
                  className="h-full overflow-y-auto bg-white text-black"
                  dangerouslySetInnerHTML={{ __html: htmlContent }} 
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-white/60">
                  <p>Ask the AI to create a webtoon for you!</p>
                  <p className="mt-2 text-sm">Try saying: <span className="text-sketchdojo-primary">"Create a cyberpunk detective manga"</span></p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}