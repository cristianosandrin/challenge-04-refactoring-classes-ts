import { Component } from 'react';
import Modal from 'react-modal';

interface NewDishModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewDishModal({isOpen, onRequestClose}: NewDishModalProps) {
  
  render() {
    const { children, setIsOpen } = this.props;
    const { modalStatus } = this.state;

    return (
      <Modal
        isOpen={isOpen} 
        onRequestClose={onRequestClose}>
        
        shouldCloseOnOverlayClick={!false}
        onRequestClose={setIsOpen}
        isOpen={modalStatus}
        ariaHideApp={false}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            background: '#F0F0F5',
            color: '#000000',
            borderRadius: '8px',
            width: '736px',
            border: 'none',
          },
          overlay: {
            backgroundColor: '#121214e6',
          },
        }}
      >
        {children}
      </Modal>
    );
  }
};

