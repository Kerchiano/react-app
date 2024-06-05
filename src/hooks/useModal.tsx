import { useState } from "react";

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const openModal = () => {
    setIsOpen(true);
    setIsClosing(false);
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => setIsOpen(false), 300);
  };

  return {
    isOpen,
    isClosing,
    openModal,
    closeModal,
  };
};

export default useModal;
