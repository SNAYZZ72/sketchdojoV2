/**
 * Type definitions for the SketchDojo AI chat system
 */

// Message roles in the chat
export type MessageRole = 'system' | 'user' | 'assistant' | 'function';

// Base chat message interface
export interface ChatMessage {
  role: MessageRole;
  content: string;
  timestamp?: Date;
  name?: string;
  tool_call_id?: string;
  function_call?: Record<string, any>;
}

// Tool call interface
export interface ToolCall {
  id: string;
  name: string;
  arguments: Record<string, any>;
}

// Chat request to the server
export interface ChatRequest {
  messages: ChatMessage[];
  project_id: string;
}

// Chat response from the server
export interface ChatResponse {
  message: ChatMessage;
  tool_calls?: ToolCall[];
}

// Tool call request to the server
export interface ToolCallRequest {
  tool_name: string;
  arguments: Record<string, any>;
  project_id: string;
  message_id?: string;
}

// Tool call response from the server
export interface ToolCallResponse {
  result: Record<string, any>;
  message: string;
}

// Story structure returned by the AI
export interface Story {
  setting: Record<string, string>;
  main_characters: Array<Record<string, string>>;
  plot_summary: string;
  key_scenes: Array<string | Record<string, string>>;
  theme: string;
  mood: string;
  title?: string;
}

// Panel description returned by the AI
export interface PanelDescription {
  visual_description: string;
  characters: string[];
  dialogue: Array<Record<string, string>>;
  special_effects?: string[];
  panel_size: string;
  id?: string;
}
