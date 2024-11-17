'use client'; // Mark as client-side component

import { useEffect, useState } from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
  image: string;
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);  // State to hold books
  const [title, setTitle] = useState('');   // State for the book title input
  const [author, setAuthor] = useState(''); // State for the book author input
  const [image, setImage] = useState('');   // State for the book image URL input

  useEffect(() => {
    // Fetch the list of books from the API when the page loads
    fetch('/api/books')
      .then((res) => res.json())  // Parse the response as JSON
      .then((data) => setBooks(data));  // Update the state with the list of books
  }, []);

  // Function to add a new book
  const addBook = async () => {
    const newBook: Book = { id: books.length + 1, title, author, image };
    const res = await fetch('/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBook), // Send the book data to the backend
    });
    const addedBook = await res.json();
    setBooks([...books, addedBook]);  // Update the books list with the newly added book
    setTitle('');  // Clear the title input
    setAuthor(''); // Clear the author input
    setImage('');  // Clear the image input
  };

  // Function to delete a book
  const deleteBook = async (id: number) => {
    await fetch(`/api/books?id=${id}`, { method: 'DELETE' });  // Send the DELETE request
    setBooks(books.filter((book) => book.id !== id));  // Update the list by removing the deleted book
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Books</h1>

      <div className="mb-4 space-y-2">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}  // Update the title state when input changes
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}  // Update the author state when input changes
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}  // Update the image state when input changes
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={addBook}
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Book
        </button>
      </div>

      <ul className="space-y-4">
        {/* Display each book in the list */}
        {books.map((book) => (
          <li key={book.id} className="flex items-center space-x-4 p-4 border border-gray-300 rounded-md">
            <img src={book.image} alt={book.title} width="50" height="75" className="rounded-md" />
            <div>
              <p className="font-semibold">{book.title}</p>
              <p className="text-sm text-gray-600">by {book.author}</p>
            </div>
            <button
              onClick={() => deleteBook(book.id)}
              className="ml-auto bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
