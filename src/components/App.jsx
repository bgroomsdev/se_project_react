import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "../blocks/app.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Profile from "./Profile/Profile";
import ItemModal from "./ItemModal";
import AddItemModal from "./AddItemModal/AddItemModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { getWeatherData, filterWeatherData } from "../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";
import { getItems, addItem, deleteItem } from "../utils/api";

function App() {
  const [weatherData, setWeatherData] = useState({
    temp: 0,
    condition: "",
    city: "",
  });
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

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
    deleteItem(card._id)
      .then(() => {
        setClothingItems(clothingItems.filter((item) => item._id !== card._id));
        handleCloseModal();
      })
      .catch(console.error);
  }
  function handleAddItemSubmit(values) {
    addItem({
      name: values.name,
      imageUrl: values.link,
      weather: values.weather,
    })
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
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
    window.addEventListener("keydown", handleEscClose);
    return () => {
      window.removeEventListener("keydown", handleEscClose);
    };
  }, []);

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header city={weatherData.city} onAddClick={handleAddClick} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                  onCardClick={handleCardClick}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  onCardClick={handleCardClick}
                  onAddClick={handleAddClick}
                />
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
    </div>
  );
}

export default App;
