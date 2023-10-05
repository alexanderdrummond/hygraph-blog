import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 99,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#fff',
  },
};

function BlogPostModal({ post, isOpen, onRequestClose }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return !isNaN(date) ? date.toLocaleDateString() : '';
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
    >
      <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
      <p className="text-gray-700 mb-2">
        By {post.author} on {formatDate(post.published)}
      </p>
      <p className="text-gray-700 mb-2">{post.category}</p>
      <div
        className="text-gray-800 mb-4"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <button onClick={onRequestClose} className="text-blue-500">
        Close
      </button>
    </Modal>
  );
}

export default BlogPostModal;
