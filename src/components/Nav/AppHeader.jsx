import React, { useState } from 'react';
import NewPostModal from '../Editing/NewPostModal';
import { useMutation } from '@apollo/client';
import { CREATE_BLOG, PUBLISH_BLOG } from '../../queries';

function AppHeader({ toggleEditMode, isEditMode }) {
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
  const [createBlog] = useMutation(CREATE_BLOG);
  const [publishBlog] = useMutation(PUBLISH_BLOG);

  const handleCreatePost = async (postData) => {
    try {
      const { data } = await createBlog({ variables: { data: postData } });
      const blogId = data.createBlog.id;
      await publishBlog({
        variables: {
          where: { id: blogId },
        },
      });
    } catch (error) {
      console.error('Error creating and/or publishing blog post:', error.message);
    }
  };

  const openNewPostModal = () => {
    setIsNewPostModalOpen(true);
  };

  const closeNewPostModal = () => {
    setIsNewPostModalOpen(false);
  };

  return (
    <header className="flex items-center justify-between bg-blue-600 p-4 text-white">
      <h1 className="text-2xl font-bold">Hygraph News Feed</h1>
      <div className="flex items-center">
        {isEditMode && (
          <button
            onClick={openNewPostModal}
            className="mr-4 px-4 py-2 bg-green-500 text-white rounded transition-colors hover:bg-green-600"
          >
            Add New Post
          </button>
        )}
        <button
          onClick={toggleEditMode}
          className="px-4 py-2 bg-gray-200 text-black rounded transition-colors hover:bg-gray-300"
        >
          {isEditMode ? 'Exit Edit Mode' : 'Enter Edit Mode'}
        </button>
      </div>
      {isNewPostModalOpen && <NewPostModal isOpen={isNewPostModalOpen} onRequestClose={closeNewPostModal} onCreatePost={handleCreatePost} />}
    </header>
  );
}

export default AppHeader;
