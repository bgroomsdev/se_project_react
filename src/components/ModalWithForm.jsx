import "../blocks/modal.css";
import useModalClose from "../hooks/useModalClose";

function ModalWithForm({
  title,
  name,
  buttonText,
  onClose,
  isOpen,
  children,
  onSubmit,
  isFormValid,
  extraAction,
}) {
  useModalClose(isOpen, onClose);
  const closeButton = `${import.meta.env.BASE_URL}greyclose.svg`;
  return (
    <div
      className={`modal modal_type_${name} ${isOpen ? "modal_is-opened" : ""}`}
    >
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button type="button" className="modal__close-form" onClick={onClose}>
          <img src={closeButton} alt="Close" />
        </button>
        <form name={name} onSubmit={onSubmit}>
          {children}
          <div className="modal__actions">
            <button
              className="modal__button"
              type="submit"
              disabled={!isFormValid}
            >
              {buttonText}
            </button>
            {extraAction}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
