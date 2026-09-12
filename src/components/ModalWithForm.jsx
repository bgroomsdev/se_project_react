import "../blocks/modal.css";

function ModalWithForm({
  title,
  name,
  buttonText,
  onClose,
  isOpen,
  children,
  onSubmit,
  isFormValid,
}) {
  const closeButton = `${import.meta.env.BASE_URL}greyclose.svg`;
  return (
    <div
      className={`modal modal_type_${name} ${isOpen ? "modal_is-opened" : ""}`}
      onClick={onClose}
    >
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal__title">{title}</h2>
        <button type="button" className="modal__close-form" onClick={onClose}>
          <img src={closeButton} alt="Close" />
        </button>
        <form name={name} onSubmit={onSubmit}>
          {children}
          <button
            className="modal__button"
            type="submit"
            disabled={!isFormValid}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
