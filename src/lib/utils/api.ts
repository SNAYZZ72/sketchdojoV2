/**
 * API utilities for communicating with the SketchDojo backend
 */
import type {
  ProjectRequest,
  ProjectResponse,
  WebtoonRequest,
  TaskResponse,
  TaskStatus
} from '../types/api';

// The server mounts all API routes under the /api prefix
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const API_BASE_URL = `${BASE_URL}/api`;

/**
 * Handles API request errors
 */
const handleError = (error: any): never => {
  console.error('API Error:', error);
  throw error;
};

/**
 * Creates a new project with an initial prompt
 */
export const createProject = async (prompt: string): Promise<ProjectResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt } as ProjectRequest)
    });

    if (!response.ok) {
      throw new Error(`Failed to create project: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    return handleError(error);
  }
};

/**
 * Starts a webtoon generation task
 */
export const generateWebtoon = async (request: WebtoonRequest): Promise<TaskResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    });

    if (!response.ok) {
      throw new Error(`Failed to start generation: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    return handleError(error);
  }
};

/**
 * Gets the status of a task
 */
export const getTaskStatus = async (taskId: string): Promise<TaskStatus> => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`);

    if (!response.ok) {
      throw new Error(`Failed to get task status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    return handleError(error);
  }
};

/**
 * Gets the HTML result of a completed webtoon generation task
 */
export const getWebtoonResult = async (taskId: string): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE_URL}/result/${taskId}`);

    if (!response.ok) {
      throw new Error(`Failed to get webtoon result: ${response.status}`);
    }

    return await response.text();
  } catch (error) {
    return handleError(error);
  }
};
