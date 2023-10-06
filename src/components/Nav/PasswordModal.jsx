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
    backgroundColor: '#1f2937',
  },
};

function PasswordModal({ isOpen, onRequestClose, onAuthenticate }) {
  const [password, setPassword] = React.useState('');

  const handleAuthenticate = () => {
    onAuthenticate(password);
    setPassword('');
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <h2 className="text-2xl font-bold text-white mb-4">Enter Password</h2>
      <input
        type="password"
        className="bg-gray-700 text-white p-2 rounded mb-4 w-full"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleAuthenticate} className="text-green-500 bg-green-800 px-4 py-2 rounded hover:bg-green-900">
        Authenticate
      </button>
    </Modal>
  );
}

export default PasswordModal;
