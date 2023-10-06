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
    border: '1px solid #444',
    borderRadius: '4px',
    backgroundColor: '#333',
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
      overlayClassName="Overlay"
    >
      <div className="w-full max-w-2xl bg-gray-800 text-white rounded-lg p-6">
        <div className="flex justify-between items-start">
          <h2 className="text-3xl font-semibold mb-4">{post.title}</h2>
          <button onClick={onRequestClose} className="focus:outline-none text-gray-400 hover:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-amber-600 mb-2 font-semibold text-sm uppercase tracking-widest">{post.category}</p>
        <p className="text-sm text-gray-500 mb-2">
          By {post.author} on {formatDate(post.published)}
        </p>
        
        <div className="text-gray-400 mb-4" dangerouslySetInnerHTML={{ __html: post.content }} />
        <button onClick={onRequestClose} className="text-amber-400 bg-amber-700 px-4 py-2 rounded hover:bg-amber-600 text-amber-300">
          Close
        </button>
      </div>
    </Modal>
  );
}

export default BlogPostModal;
