import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_BLOG, PUBLISH_BLOG, GET_POSTS } from '../../queries';

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
            published,
          },
        },
        update: (cache, { data: { createBlog } }) => {
          const existingBlogs = cache.readQuery({
            query: GET_POSTS,
          });
  
          if (existingBlogs && existingBlogs.blogs) {
            cache.writeQuery({
              query: GET_POSTS,
              data: {
                blogs: [...existingBlogs.blogs, createBlog],
              },
            });
          }
        },
        refetchQueries: [{ query: GET_POSTS }],
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
      <div style={{ zIndex: 9999 }} className="text-white fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
        <div className="bg-gray-900 p-8 rounded-lg w-96">
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mb-4 p-2 bg-gray-800 text-gray-100 border border-gray-700 rounded"
            />
            <input
              type="text"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full mb-4 p-2 bg-gray-800 text-gray-100 border border-gray-700 rounded"
            />
            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full mb-4 p-2 bg-gray-800 text-gray-100 border border-gray-700 rounded"
            />
            <input
              type="date"
              value={published}
              onChange={(e) => setPublished(e.target.value)}
              className="w-full mb-4 p-2 bg-gray-800 text-gray-100 border border-gray-700 rounded"
            />
            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full mb-4 p-2 h-32 bg-gray-800 text-gray-100 border border-gray-700 rounded"
            />
             <button type="submit" className="bg-green-800 text-green-500 px-4 py-2 rounded hover:bg-green-900">
            Create Post
          </button>
          <button type="button" onClick={onRequestClose} className="text-blue-500 bg-gray-800 px-4 py-2 rounded ml-4">
            Close
          </button>
          </form>
        </div>
      </div>
    )
  );
};

export default NewPostModal;