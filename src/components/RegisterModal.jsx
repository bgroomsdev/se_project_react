import { useEffect } from "react";
import ModalWithForm from "./ModalWithForm";
import useForm from "../hooks/useForm";
import { isValidEmail, isValidUrl } from "../utils/validation";

const RegisterModal = ({ isOpen, onRegister, onClose, onLoginClick }) => {
  const { values, handleChange, resetForm } = useForm({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });

  const emailError = values.email && !isValidEmail(values.email);
  const avatarError = values.avatar && !isValidUrl(values.avatar);

  const isFormValid =
    values.name &&
    isValidUrl(values.avatar) &&
    isValidEmail(values.email) &&
    values.password;

  useEffect(() => {
    if (isOpen) resetForm();
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(values, resetForm);
  };

  return (
    <ModalWithForm
      title="Sign up"
      name="register"
      buttonText="Sign up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
      extraAction={
        <button
          type="button"
          className="modal__alt-button"
          onClick={onLoginClick}
        >
          or Log In
        </button>
      }
    >
      <label
        className={`modal__label ${emailError ? "modal__label-error" : ""}`}
      >
        {emailError ? "Email* (This is not a valid email)" : "Email*"}
        <input
          required
          className={`modal__input ${emailError ? "modal__input-error" : ""}`}
          type="email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
        />
      </label>
      <label className="modal__label">
        Password*
        <input
          required
          className="modal__input"
          type="password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
        />
      </label>
      <label className="modal__label">
        Name*
        <input
          required
          className="modal__input"
          type="text"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label
        className={`modal__label ${avatarError ? "modal__label-error" : ""}`}
      >
        {avatarError ? "Avatar URL* (This is not a valid link)" : "Avatar URL*"}
        <input
          required
          className={`modal__input ${avatarError ? "modal__input-error" : ""}`}
          type="url"
          name="avatar"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
