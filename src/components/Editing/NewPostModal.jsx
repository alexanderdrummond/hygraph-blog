import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_BLOG, PUBLISH_BLOG } from '../../queries';

const NewPostModal = ({ isOpen, onRequestClose, onCreatePost }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [published, setPublished] = useState(new Date().toISOString().split('T')[0]);

  const [createBlog] = useMutation(CREATE_BLOG);
  const [publishBlog] = useMutation(PUBLISH_BLOG);

  const handlePublishBlog = async (blogId) => {
    try {
      await publishBlog({
        variables: {
          where: { id: blogId },
        },
      });
    } catch (error) {
      setErrorMessage('Error publishing blog post: ' + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await createBlog({
        variables: {
          data: {
            title,
            author,
            category,
            content,
            published
          },
        },
      });
      const blogId = data.createBlog.id;
      await handlePublishBlog(blogId);
      if (!errorMessage) {
        onCreatePost(data.createBlog);
        onRequestClose();
      }
    } catch (error) {
      setErrorMessage('Error creating blog: ' + error.message);
    }
  };

  return (
    isOpen && (
      <div style={{ zIndex: 9999 }} className="text-black fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-9999">
        <div className="bg-white p-8 rounded-lg w-96">
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mb-4 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full mb-4 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full mb-4 p-2 border rounded"
            />
            <input
              type="date"
              value={published}
              onChange={(e) => setPublished(e.target.value)}
              className="w-full mb-4 p-2 border rounded"
            />
            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full mb-4 p-2 h-32 border rounded"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Create Post
            </button>
            <button type="button" onClick={onRequestClose} className="bg-red-500 text-white px-4 py-2 rounded ml-4">
              Close
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default NewPostModal;
