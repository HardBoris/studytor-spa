import { ReactNode } from "react";
import "./modal.style.css";
import ReactModal from "react-modal";

interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  setIsOpen: () => void;
}

const Modal = ({ children, isOpen, setIsOpen }: ModalType) => {
  return (
    <ReactModal
      shouldCloseOnOverlayClick={true}
      onRequestClose={setIsOpen}
      isOpen={isOpen}
      ariaHideApp={false}
      className="modal-box"
      overlayClassName="modal-overlay"
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
