import { useContext } from "react";
import "../blocks/item-card.css";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLoggedIn = Boolean(currentUser?._id);
  const isLiked = item.likes?.some((id) => id === currentUser?._id);

  const handleLike = (e) => {
    e.stopPropagation();
    onCardLike({ id: item._id, isLiked });
  };

  return (
    <li className="item-card" onClick={() => onCardClick(item)}>
      <div className="item-card__header">
        <p className="item-card__name">{item.name}</p>
        {isLoggedIn && (
          <button
            type="button"
            className={`item-card__like-button ${
              isLiked ? "item-card__like-button_active" : ""
            }`}
            onClick={handleLike}
          />
        )}
      </div>
      <img
        src={item.imageUrl || item.link}
        alt={item.name}
        className="item-card__image"
      />
    </li>
  );
}

export default ItemCard;
