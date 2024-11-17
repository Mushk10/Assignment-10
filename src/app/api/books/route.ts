// pages/api/books/route.ts
import { NextApiRequest, NextApiResponse } from 'next';

interface Book {
  id: number;
  title: string;
  author: string;
  image: string;
}

// In-memory array to store books (this will be reset when the server restarts)
let books: Book[] = [
  { id: 1, title: 'Book One', author: 'Author One', image: '/book1.jpg' },
  { id: 2, title: 'Book Two', author: 'Author Two', image: '/book2.jpg' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Return the list of books
    return res.status(200).json(books);
  }

  if (req.method === 'POST') {
    // Add a new book
    const { title, author, image }: Book = req.body;
    const newBook: Book = { id: books.length + 1, title, author, image };
    books.push(newBook);  // Add the new book to the array
    return res.status(201).json(newBook);  // Return the added book
  }

  if (req.method === 'DELETE') {
    // Delete a book by ID
    const { id } = req.query;
    books = books.filter((book) => book.id !== parseInt(id as string));  // Remove the book
    return res.status(204).end();  // Return no content after successful deletion
  }

  res.status(405).end();  // If the method is not GET, POST, or DELETE, return Method Not Allowed
}
