import ModalWithForm from "../ModalWithForm";
import useForm from "../../hooks/useForm";

const AddItemModal = ({ isOpen, onAddItem, onCloseModal }) => {
  const { values, handleChange } = useForm({
    name: "",
    link: "",
    weather: "",
  });

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const isFormValid = values.name && isValidUrl(values.link) && values.weather;

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(values);
  };

  return (
    <ModalWithForm
      title="New garment"
      name="add-clothing"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
      <label className="modal__label">
        Name*
        <input
          required
          className="modal__input"
          type="text"
          placeholder="Name"
          name="name"
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label
        className={`modal__label ${values.link && !isValidUrl(values.link) ? "modal__label-error" : ""}`}
      >
        {`${values.link && !isValidUrl(values.link) ? "Image* (This is not a valid image link) " : "Image*"}`}
        <input
          required
          className={`modal__input ${values.link && !isValidUrl(values.link) ? "modal__input-error" : ""}`}
          type="url"
          placeholder="Image URL"
          name="link"
          value={values.link}
          onChange={handleChange}
        />
      </label>
      <fieldset className="modal__fieldset">
        <legend className="modal__legend">Select the weather type:</legend>
        <label className={"modal__label-radio"}>
          <input
            type="radio"
            name="weather"
            value="hot"
            checked={values.weather === "hot"}
            onChange={handleChange}
          />{" "}
          Hot
        </label>
        <label className={"modal__label-radio"}>
          <input
            type="radio"
            name="weather"
            value="warm"
            checked={values.weather === "warm"}
            onChange={handleChange}
          />{" "}
          Warm
        </label>
        <label className={"modal__label-radio"}>
          <input
            type="radio"
            name="weather"
            value="cold"
            checked={values.weather === "cold"}
            onChange={handleChange}
          />{" "}
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
