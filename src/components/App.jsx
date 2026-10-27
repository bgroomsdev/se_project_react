import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "../blocks/app.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Profile from "./Profile";
import ItemModal from "./ItemModal";
import AddItemModal from "./AddItemModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { getWeatherData, filterWeatherData } from "../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";
import {
  getItems,
  addItem,
  deleteItem,
  addCardLike,
  removeCardLike,
  updateProfile,
} from "../utils/api";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import ProtectedRoute from "./ProtectedRoute";
import { signup, signin, checkToken } from "../utils/auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfileModal from "./EditProfileModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    temp: { F: 0, C: -18 },
    condition: "",
    city: "",
  });
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (values, resetForm) => {
    signup(values)
      .then(() =>
        handleLogin(
          { email: values.email, password: values.password },
          resetForm,
        ),
      )
      .catch(console.error);
  };

  const handleLogin = ({ email, password }, resetForm) => {
    return signin({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        return checkToken(res.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        handleCloseModal();
        if (resetForm) resetForm();
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
  };

  const handleEditProfile = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    updateProfile({ name, avatar }, token)
      .then((user) => {
        setCurrentUser(user);
        handleCloseModal();
      })
      .catch(console.error);
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({});
    navigate("/");
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    const request = !isLiked ? addCardLike : removeCardLike;
    request(id, token)
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === id ? updatedCard : item)),
        );
      })
      .catch(console.error);
  };

  function handleAddClick() {
    setActiveModal("add-clothing");
  }
  function handleDeleteClick() {
    setActiveModal("delete-clothing");
  }
  function handleCardClick(card) {
    setActiveModal("preview");
    setSelectedCard(card);
  }
  function handleCloseModal() {
    setActiveModal("");
  }
  function handleEscClose(e) {
    if (e.key === "Escape") {
      handleCloseModal();
    }
  }
  function handleDeleteItem(card) {
    const token = localStorage.getItem("jwt");
    deleteItem(card._id, token)
      .then(() => {
        setClothingItems((prev) =>
          prev.filter((item) => item._id !== card._id),
        );
        handleCloseModal();
      })
      .catch(console.error);
  }
  function handleAddItemSubmit(values) {
    const token = localStorage.getItem("jwt");
    addItem(
      {
        name: values.name,
        imageUrl: values.link,
        weather: values.weather,
      },
      token,
    )
      .then((newItem) => {
        setClothingItems((prev) => [newItem, ...prev]);
        handleCloseModal();
      })
      .catch(console.error);
  }
  function handleToggleSwitchChange() {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  }

  useEffect(() => {
    getWeatherData()
      .then((data) => {
        setWeatherData(filterWeatherData(data));
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!activeModal) return;
    window.addEventListener("keydown", handleEscClose);
    return () => {
      window.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      setIsAuthChecked(true);
      return;
    }
    checkToken(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch(() => localStorage.removeItem("jwt"))
      .finally(() => setIsAuthChecked(true));
  }, []);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              city={weatherData.city}
              onAddClick={handleAddClick}
              onRegisterClick={() => setActiveModal("register")}
              onLoginClick={() => setActiveModal("login")}
              isLoggedIn={isLoggedIn}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    clothingItems={clothingItems}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    isLoggedIn={isLoggedIn}
                    isAuthChecked={isAuthChecked}
                  >
                    <Profile
                      clothingItems={clothingItems}
                      onCardClick={handleCardClick}
                      onAddClick={handleAddClick}
                      onEditProfile={() => setActiveModal("edit-profile")}
                      onSignOut={handleSignOut}
                      onCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>
          <AddItemModal
            isOpen={activeModal === "add-clothing"}
            onAddItem={handleAddItemSubmit}
            onCloseModal={handleCloseModal}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            onRegister={handleRegister}
            onCloseModal={handleCloseModal}
            onLoginClick={() => setActiveModal("login")}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            onLogin={handleLogin}
            onCloseModal={handleCloseModal}
          />
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onEditProfile={handleEditProfile}
            onCloseModal={handleCloseModal}
          />
          <ItemModal
            name="preview"
            selectedCard={selectedCard}
            isOpen={activeModal === "preview"}
            onClose={handleCloseModal}
            onDeleteClick={handleDeleteClick}
          />
          <DeleteConfirmationModal
            isOpen={activeModal === "delete-clothing"}
            onClose={handleCloseModal}
            onDeleteItem={() => handleDeleteItem(selectedCard)}
          />
        </CurrentTemperatureUnitContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
