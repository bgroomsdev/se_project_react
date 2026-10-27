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
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const loginRequest = ({ email, password }) =>
    signin({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        return checkToken(res.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        navigate("/");
      });

  const handleLogin = (values) => {
    setIsLoading(true);
    return loginRequest(values)
      .then(handleCloseModal)
      .catch((err) => {
        console.error(err);
        throw err;
      })
      .finally(() => setIsLoading(false));
  };

  const handleRegister = (values) => {
    const makeRequest = () => signup(values).then(() => loginRequest(values));
    handleSubmit(makeRequest);
  };

  const handleEditProfile = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    const makeRequest = () =>
      updateProfile({ name, avatar }, token).then(setCurrentUser);
    handleSubmit(makeRequest);
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
  function handleSubmit(request) {
    setIsLoading(true);
    return request()
      .then(handleCloseModal)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }
  function handleDeleteItem(card) {
    const token = localStorage.getItem("jwt");
    const makeRequest = () =>
      deleteItem(card._id, token).then(() =>
        setClothingItems((prev) =>
          prev.filter((item) => item._id !== card._id),
        ),
      );
    handleSubmit(makeRequest);
  }
  function handleAddItemSubmit(values) {
    if (isLoading) return;
    const token = localStorage.getItem("jwt");
    const makeRequest = () =>
      addItem(
        {
          name: values.name,
          imageUrl: values.link,
          weather: values.weather,
        },
        token,
      ).then((newItem) => setClothingItems((prev) => [newItem, ...prev]));
    handleSubmit(makeRequest);
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
            onClose={handleCloseModal}
            isLoading={isLoading}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            onRegister={handleRegister}
            onClose={handleCloseModal}
            onLoginClick={() => setActiveModal("login")}
            isLoading={isLoading}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            onLogin={handleLogin}
            onClose={handleCloseModal}
            onRegisterClick={() => setActiveModal("register")}
            isLoading={isLoading}
          />
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onEditProfile={handleEditProfile}
            onClose={handleCloseModal}
            isLoading={isLoading}
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
            isLoading={isLoading}
          />
        </CurrentTemperatureUnitContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
