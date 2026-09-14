import "../blocks/modal.css";

function ItemModal({ selectedCard, isOpen, onClose, name, onDeleteClick }) {
  const closeButton = `${import.meta.env.BASE_URL}close.svg`;
  return (
    <div
      className={`modal modal_type_${name} ${isOpen ? "modal_is-opened" : ""}`}
      onClick={onClose}
    >
      <div
        className="modal__content modal__content_type_image"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="modal__close" onClick={onClose}>
          <img src={closeButton} alt="Close" />
        </button>
        {selectedCard.link ||
          (selectedCard.imageUrl && (
            <>
              <img
                src={selectedCard.imageUrl || selectedCard.link}
                alt={selectedCard.name}
                className="modal__image"
              />
              <div className="modal__item-info">
                <div className="modal__item-info-header">
                  <p className="modal__item-name">{selectedCard.name}</p>
                  <button
                    type="button"
                    className="modal__delete-button"
                    onClick={onDeleteClick}
                  >
                    Delete item
                  </button>
                </div>
                <p className="modal__item-weather">
                  Weather: {selectedCard.weather}
                </p>
              </div>
            </>
          ))}
      </div>
    </div>
  );
}

export default ItemModal;
