/**
 * API Service
 * Handles all HTTP requests to the JSON Server backend
 */

import type { Book, BookFormData } from '../types/book';

const API_BASE_URL = 'http://localhost:3001';

/**
 * Fetch all books from the API
 */
export const fetchBooks = async (): Promise<Book[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/books`);
    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

/**
 * Fetch a single book by ID
 */
export const fetchBookById = async (id: number): Promise<Book> => {
  try {
    const response = await fetch(`${API_BASE_URL}/books/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch book');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching book:', error);
    throw error;
  }
};

/**
 * Create a new book
 */
export const createBook = async (bookData: BookFormData): Promise<Book> => {
  try {
    const response = await fetch(`${API_BASE_URL}/books`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookData),
    });
    if (!response.ok) {
      throw new Error('Failed to create book');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating book:', error);
    throw error;
  }
};

/**
 * Update an existing book
 */
export const updateBook = async (id: number, bookData: BookFormData): Promise<Book> => {
  try {
    const response = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookData),
    });
    if (!response.ok) {
      throw new Error('Failed to update book');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating book:', error);
    throw error;
  }
};

/**
 * Delete a book by ID
 */
export const deleteBook = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete book');
    }
  } catch (error) {
    console.error('Error deleting book:', error);
    throw error;
  }
};
