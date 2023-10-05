import React from 'react';
import BlogPostList from './components/Blog/BlogPostList';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 p-4 text-white text-center">
        <h1 className="text-2xl font-bold">Hygraph News Feed</h1>
      </header>
      <main className="container mx-auto p-4 mt-4 bg-white shadow-lg rounded-lg">
        <BlogPostList />
      </main>
      <footer className="bg-blue-600 p-4 text-white text-center mt-4">
        <p className="text-sm">&copy; 2023 Hygraph News Feed</p>
      </footer>
    </div>
  );
}

export default App;
