export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'moderator' | 'user';
  permissions: Permission[];
  lastLogin: string;
  isActive: boolean;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
}

export interface FileUpload {
  id: string;
  name: string;
  size: number;
  uploadedBy: string;
  uploadedAt: string;
  status: 'processing' | 'completed' | 'failed';
  error?: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  details: string;
  timestamp: string;
}