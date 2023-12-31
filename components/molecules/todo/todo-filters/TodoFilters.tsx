'use client';
import Button, {
  ButtonSize,
  ButtonType,
} from '@/components/atoms/button/Button';
import Modal from '@/components/atoms/modal/Modal';
import React, { useState } from 'react';

const TodoFilters = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <Button
        onClick={() => setShowModal(true)}
        text="TodoFilters"
        type={ButtonType.Secondary}
        size={ButtonSize.Small}
      />
      <Modal title="" onClose={() => setShowModal(false)} show={showModal}>
        Soon...
      </Modal>
    </div>
  );
};

export default TodoFilters;
