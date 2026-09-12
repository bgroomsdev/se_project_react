import "../blocks/modal.css";
import closeButton from "../assets/close.svg";

function ItemModal({ selectedCard, isOpen, onClose, name }) {
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
        {selectedCard.link && (
          <>
            <img
              src={selectedCard.link}
              alt={selectedCard.name}
              className="modal__image"
            />
            <div className="modal__item-info">
              <p className="modal__item-name">{selectedCard.name}</p>
              <p className="modal__item-weather">
                Weather: {selectedCard.weather}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ItemModal;
