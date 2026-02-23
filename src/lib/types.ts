export interface Policy {
  allowedFolders: string[];
  restrictedFiles: string[];
  allowedFileTypes: string[];
  maxFileChanges: number;
  restrictedCommands: string[];
}

export interface Intent {
  action: 'create' | 'modify' | 'delete' | 'refactor' | 'unknown';
  targetPath: string;
  content?: string;
  reasoning: string;
}

export interface ExecutionResult {
  status: 'allowed' | 'blocked' | 'error';
  reason?: string;
  intent: Intent;
  logs: string[];
  modifiedZip?: Blob;
  executionTime: number;
  steps: { name: string; status: 'pending' | 'processing' | 'completed' | 'failed' }[];
}

export interface LogEntry {
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'success';
  message: string;
}
