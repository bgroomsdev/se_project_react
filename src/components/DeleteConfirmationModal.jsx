import "../blocks/modal.css";

function DeleteConfirmationModal({ isOpen, onClose, onDeleteItem }) {
  const closeButton = `${import.meta.env.BASE_URL}close.svg`;
  return (
    <div
      className={`modal modal_type_delete ${isOpen ? "modal_is-opened" : ""}`}
      onClick={onClose}
    >
      <div
        className="modal__content modal__content_type_delete"
        onClick={(e) => e.stopPropagation()}
      >
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
          >
            Yes, delete item
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
