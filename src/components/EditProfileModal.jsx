import { useState, useEffect, useContext } from "react";
import ModalWithForm from "./ModalWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { isValidUrl } from "../utils/validation";

function EditProfileModal({ isOpen, onEditProfile, onClose, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const avatarError = avatar && !isValidUrl(avatar);
  const isFormValid = name.trim() !== "" && isValidUrl(avatar) && !isLoading;

  useEffect(() => {
    if (isOpen) {
      setName(currentUser?.name || "");
      setAvatar(currentUser?.avatar || "");
    }
  }, [isOpen, currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditProfile({ name, avatar });
  };

  return (
    <ModalWithForm
      title="Change profile data"
      name="edit-profile"
      buttonText={isLoading ? "Saving..." : "Save changes"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
      <label className="modal__label">
        Name*
        <input
          required
          type="text"
          className="modal__input"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label
        className={`modal__label ${avatarError ? "modal__label-error" : ""}`}
      >
        {avatarError ? "Avatar* (This is not a valid link)" : "Avatar*"}
        <input
          required
          type="url"
          className={`modal__input ${avatarError ? "modal__input-error" : ""}`}
          placeholder="Avatar URL"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
