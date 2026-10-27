import "../blocks/modal.css";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function ItemModal({ selectedCard, isOpen, onClose, name, onDeleteClick }) {
  const closeButton = `${import.meta.env.BASE_URL}close.svg`;
  const currentUser = useContext(CurrentUserContext);
  const ownerId =
    typeof selectedCard.owner === "string"
      ? selectedCard.owner
      : selectedCard.owner?._id;
  const isOwn = Boolean(currentUser._id) && ownerId === currentUser._id;
  const imageSrc = selectedCard.imageUrl || selectedCard.link;
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
        {imageSrc && (
          <>
            <img
              src={imageSrc}
              alt={selectedCard.name}
              className="modal__image"
            />
            <div className="modal__item-info">
              <div className="modal__item-info-header">
                <p className="modal__item-name">{selectedCard.name}</p>
                {isOwn && (
                  <button
                    type="button"
                    className="modal__delete-button"
                    onClick={onDeleteClick}
                  >
                    Delete item
                  </button>
                )}
              </div>
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
