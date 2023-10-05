import { useState } from 'react';
import BlogPostList from './components/Blog/BlogPostList';
import AppHeader from './components/Nav/AppHeader';

function App() {
  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <AppHeader isEditMode={isEditMode} toggleEditMode={toggleEditMode} />
      <main className="container mx-auto p-4 mt-4 mb-4 bg-white shadow-lg rounded-lg flex-grow">
        <BlogPostList isEditMode={isEditMode} />
      </main>
      <footer className="bg-blue-600 p-4 text-white text-center">
        <p className="text-sm">&copy; 2023 Hygraph News Feed</p>
      </footer>
    </div>
  );
}

export default App;
