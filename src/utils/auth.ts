// src/utils/auth.ts

// User type definition
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

// Simple password hashing (for demo - in production use bcrypt)
const hashPassword = (password: string): string => {
  // This is a simple hash for demo purposes
  // In production, NEVER do this - use proper hashing like bcrypt
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(16);
};

// Sign up a new user
export const signUp = (email: string, password: string, name: string): { success: boolean; error?: string; user?: User } => {
  try {
    // Get existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if email already exists
    const emailExists = existingUsers.some((user: any) => user.email === email);
    if (emailExists) {
      return { success: false, error: 'Email already exists' };
    }
    
    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      createdAt: new Date().toISOString()
    };
    
    // Store user with hashed password
    const userWithPassword = {
      ...newUser,
      passwordHash: hashPassword(password)
    };
    
    existingUsers.push(userWithPassword);
    localStorage.setItem('users', JSON.stringify(existingUsers));
    
    // Set current user (log them in automatically)
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    return { success: true, user: newUser };
  } catch (error) {
    return { success: false, error: 'Failed to create account' };
  }
};

// Log in existing user
export const login = (email: string, password: string): { success: boolean; error?: string; user?: User } => {
  try {
    // Get all users
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Find user by email and password
    const hashedPassword = hashPassword(password);
    const user = users.find((u: any) => 
      u.email === email && u.passwordHash === hashedPassword
    );
    
    if (!user) {
      return { success: false, error: 'Invalid email or password' };
    }
    
    // Remove password hash from user object
    const { passwordHash, ...userWithoutPassword } = user;
    
    // Set current user
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    
    return { success: true, user: userWithoutPassword };
  } catch (error) {
    return { success: false, error: 'Failed to log in' };
  }
};

// Get current logged-in user
export const getCurrentUser = (): User | null => {
  try {
    const userStr = localStorage.getItem('currentUser');
    if (!userStr) return null;
    return JSON.parse(userStr);
  } catch (error) {
    return null;
  }
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};

// Log out user
export const logout = (): void => {
  localStorage.removeItem('currentUser');
};

// Validate email format
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate password strength
export const validatePassword = (password: string): { valid: boolean; error?: string } => {
  if (password.length < 6) {
    return { valid: false, error: 'Password must be at least 6 characters' };
  }
  if (password.length > 50) {
    return { valid: false, error: 'Password must be less than 50 characters' };
  }
  return { valid: true };
};