"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { Home, Send, Loader2, X, PanelLeft, PanelLeftClose } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useAI } from '@/lib/providers/ai-provider';
import { storeHtmlContent } from '@/lib/utils/chat-api';
import ReactMarkdown from 'react-markdown';

// Types for project data
interface ProjectData {
  projectId: string;
  projectName: string;
}

export default function ProjectPage() {
  const { id } = useParams<{ id: string }>() || {};
  const searchParams = useSearchParams();
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [chatExpanded, setChatExpanded] = useState(true);
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [prompt, setPrompt] = useState('');
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isInitialized = useRef(false);
  
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
  
  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Submit on Ctrl+Enter or Command+Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleSubmit(e);
    }
  };
  return (
    <div className="flex flex-col h-full w-full bg-gray-950">
      {/* Header with simplified layout */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-900 border-b border-gray-800 z-10">
        <div className="flex items-center space-x-3">
          {/* Home button */}
          <Button variant="ghost" size="icon" asChild className="flex-shrink-0 text-white/70 hover:text-white hover:bg-gray-800">
            <a href="/">
              <Home size={18} />
            </a>
          </Button>
          
          {/* Project title - truncated for smaller screens */}
          <h1 className="font-semibold text-white truncate max-w-[160px] sm:max-w-xs md:max-w-md">
            {projectData?.projectName || 'SketchDojo Webtoon'}
          </h1>
        </div>
        
        {/* Toggle Chat button */}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setChatExpanded(!chatExpanded)}
          className="flex-shrink-0 ml-2 text-white/70 hover:text-white hover:bg-gray-800"
        >
          {chatExpanded ? <PanelLeftClose size={18} /> : <PanelLeft size={18} />}
        </Button>
      </div>
      
      {/* Content Area - Adjusted for mobile */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel: Chat - Wider on mobile when expanded */}
        <div 
          className={cn(
            "flex flex-col h-full border-r border-gray-800 transition-all duration-300",
            chatExpanded ? "w-full sm:w-1/2 md:w-2/5 lg:w-1/3" : "w-0"
          )}
        >
          {chatExpanded && (
            <>
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <p className="text-center mb-2">Start by describing what you want to create</p>
                    <p className="text-sm text-center text-gray-500 max-w-xs">
                      Try "Create a cyberpunk manga about a detective in a neon-lit city"
                    </p>
                  </div>
                ) : (
                  messages.map((message, index) => (
                    <div key={index} className={cn(
                      "p-4 rounded-lg break-words",
                      message.role === 'user' 
                        ? "bg-sketchdojo-primary/20 border border-sketchdojo-primary/30 ml-auto max-w-[85%]" 
                        : message.role === 'function'
                          ? "bg-gray-800/70 border border-gray-700 mr-auto max-w-[85%]"
                          : "bg-gray-800/70 border border-gray-700 mr-auto max-w-[85%]"
                    )}>
                      {message.role === 'function' ? (
                        <div>
                          <p className="text-gray-400 text-xs mb-2">Tool Result: {message.name}</p>
                          <pre className="text-gray-300 text-xs overflow-auto max-h-40 whitespace-pre-wrap bg-gray-950/50 p-2 rounded">{message.content}</pre>
                        </div>
                      ) : (
                        <div className="prose prose-invert prose-sm max-w-none prose-headings:text-white prose-p:text-gray-200 prose-a:text-sketchdojo-primary prose-code:bg-gray-950 prose-code:text-gray-300">
                          <ReactMarkdown>{message.content}</ReactMarkdown>
                        </div>
                      )}
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
                
                {/* Loading Indicator */}
                {(isLoading || processingTools) && (
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800/50 border border-gray-700 max-w-[85%]">
                    <Loader2 className="w-4 h-4 animate-spin text-sketchdojo-primary" />
                    <p className="text-sm text-gray-300">
                      {processingTools ? "Processing your request..." : "Thinking..."}
                    </p>
                  </div>
                )}
              </div>
              
              {/* Message Input */}
              <div className="p-3 border-t border-gray-800 bg-gray-900">
                <form onSubmit={handleSubmit} className="relative">
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Describe your webtoon idea..."
                    className="resize-none bg-gray-800 text-white border-gray-700 focus:border-sketchdojo-primary focus:ring-sketchdojo-primary/20 rounded-lg pl-4 pr-12 py-3 min-h-[80px]"
                    disabled={isLoading || processingTools || isCancelled}
                  />
                  
                  <div className="absolute right-2 bottom-2">
                    {(isLoading || processingTools) ? (
                      <Button
                        type="button"
                        size="icon"
                        variant="destructive"
                        className="rounded-full w-8 h-8 bg-red-500/90 hover:bg-red-600"
                        onClick={() => stopChat()}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button 
                        type="submit" 
                        size="icon"
                        className="rounded-full w-8 h-8 bg-gradient-to-r from-sketchdojo-primary to-sketchdojo-accent hover:brightness-110 text-white shadow-md"
                        disabled={!prompt.trim() || isCancelled}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </form>
                
                <div className="mt-2 text-xs text-gray-500 flex justify-between">
                  {isCancelled ? (
                    <span className="text-red-400">Generation stopped. Send a new message to continue.</span>
                  ) : (
                    <span className="hidden sm:inline">Press <kbd className="px-1 py-0.5 rounded bg-gray-800 text-gray-300">Ctrl</kbd>+<kbd className="px-1 py-0.5 rounded bg-gray-800 text-gray-300">Enter</kbd> to send</span>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
        
        {/* Right Panel: Webtoon Viewer - Adjusted for mobile */}
        <div className={cn(
          "h-full transition-all duration-300",
          chatExpanded ? "hidden sm:block sm:w-1/2 md:w-3/5 lg:w-2/3" : "w-full"
        )}>
          <div className="h-full overflow-auto bg-white">
            {htmlContent ? (
              <div className="h-full overflow-y-auto">
                {/* Iframe to isolate HTML content styles */}
                <iframe
                  srcDoc={`
                    <!DOCTYPE html>
                    <html>
                      <head>
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <style>
                          body { margin: 0; padding: 0; font-family: system-ui, sans-serif; }
                          img { max-width: 100%; height: auto; }
                        </style>
                      </head>
                      <body>
                        ${htmlContent}
                      </body>
                    </html>
                  `}
                  className="w-full h-full border-none"
                  title="Webtoon Preview"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full bg-gray-950 text-gray-400">
                <div className="w-16 h-16 mb-4 rounded-full bg-gray-800/50 flex items-center justify-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sketchdojo-primary">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
                <p className="text-center mb-2">Your webtoon will appear here</p>
                <p className="text-sm text-center text-gray-500 max-w-xs mb-6">
                  Describe what you want to create in the chat panel
                </p>
              </div>
            )}
            
            {/* Loading overlay */}
            {(isLoading || processingTools) && !htmlContent && (
              <div className="absolute inset-0 bg-gray-900/80 flex flex-col items-center justify-center z-10">
                <div className="w-14 h-14 rounded-full border-4 border-sketchdojo-primary/20 border-t-sketchdojo-primary animate-spin mb-4"></div>
                <p className="text-white font-medium">Generating your webtoon...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}