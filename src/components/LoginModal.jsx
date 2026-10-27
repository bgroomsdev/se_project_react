import { useState, useEffect } from "react";
import ModalWithForm from "./ModalWithForm";
import useForm from "../hooks/useForm";
import { isValidEmail } from "../utils/validation";

const LoginModal = ({ isOpen, onLogin, onClose }) => {
  const { values, handleChange, resetForm } = useForm({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState(false);

  const emailError = values.email && !isValidEmail(values.email);
  const isFormValid = isValidEmail(values.email) && values.password;

  useEffect(() => {
    if (isOpen) {
      resetForm();
      setLoginError(false);
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    setLoginError(false);
    handleChange(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values, resetForm).catch(() => setLoginError(true));
  };

  return (
    <ModalWithForm
      title="Log in"
      name="login"
      buttonText="Log in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
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
          onChange={handleInputChange}
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
          onChange={handleInputChange}
        />
        {loginError && (
          <span className="modal__error">Incorrect email or password</span>
        )}
      </label>
    </ModalWithForm>
  );
};

export default LoginModal;
