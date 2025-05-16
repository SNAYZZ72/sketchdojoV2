/**
 * API type definitions for the SketchDojo webtoon generation platform
 */

// Project related types
export interface ProjectRequest {
  prompt: string;
}

export interface ProjectResponse {
  projectId: string;
  projectName: string;
}

// Webtoon generation task related types
export interface WebtoonRequest {
  prompt: string;
  style?: string;
  num_panels?: number;
  characters?: string[];
  additional_context?: string;
}

export interface TaskResponse {
  task_id: string;
}

export interface TaskStatus {
  task_id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  result?: {
    html_path?: string;
    panel_count?: number;
    story_title?: string;
    error?: string;
  };
}

// Panel related types
export interface PanelUpdate {
  description?: string;
  characters?: string[];
  dialogue?: Array<{ [character: string]: string }>;
  size?: 'full' | 'half' | 'third';
  caption?: string;
  style?: string;
}

// Image generation related types
export interface ImageGenerationRequest {
  prompt: string;
  style?: string;
  width?: number;
  height?: number;
}

export interface ImageGenerationResponse {
  image_path: string;
}

// Chat related types
export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
