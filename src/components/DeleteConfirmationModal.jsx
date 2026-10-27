import "../blocks/modal.css";
import useModalClose from "../hooks/useModalClose";

function DeleteConfirmationModal({ isOpen, onClose, onDeleteItem, isLoading }) {
  useModalClose(isOpen, onClose);
  const closeButton = `${import.meta.env.BASE_URL}close.svg`;
  return (
    <div
      className={`modal modal_type_delete ${isOpen ? "modal_is-opened" : ""}`}
    >
      <div className="modal__content modal__content_type_delete">
        <button type="button" className="modal__close-form" onClick={onClose}>
          <img src={closeButton} alt="Close" />
        </button>
        <p className="modal__delete-title">
          Are you sure you want to delete this item?
        </p>
        <p className="modal__delete-subtitle">This action is irreversible.</p>
        <div className="modal__delete-buttons">
          <button
            type="button"
            className="modal__delete-confirm"
            onClick={onDeleteItem}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Yes, delete item"}
          </button>
          <button
            type="button"
            className="modal__delete-cancel"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
