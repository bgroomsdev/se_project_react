import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "../blocks/app.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ItemModal from "./ItemModal";
import AddItemModal from "./AddItemModal/AddItemModal";
import ModalWithForm from "./ModalWithForm";
import { defaultClothingItems } from "../utils/clothingItems";
import { getWeatherData, filterWeatherData } from "../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";

function App() {
  const [weatherData, setWeatherData] = useState({
    temp: 0,
    condition: "",
    city: "",
  });
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [newItemName, setNewItemName] = useState("");
  const [newItemLink, setNewItemLink] = useState("");
  const [newItemWeather, setNewItemWeather] = useState("");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const isFormValid = newItemName && isValidUrl(newItemLink) && newItemWeather;

  function handleAddClick() {
    setActiveModal("add-clothing");
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
  function handleAddItemSubmit(e) {
    e.preventDefault();
    const newItem = {
      _id: clothingItems.length + 1,
      name: newItemName,
      weather: newItemWeather,
      link: newItemLink,
    };
    setClothingItems([newItem, ...clothingItems]);
    handleCloseModal();
    setNewItemName("");
    setNewItemLink("");
    setNewItemWeather("");
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

            {/* <Route path="/profile" element={<Profile />} /> */}
          </Routes>
          <Footer />
        </div>
        <ModalWithForm
          title="New garment"
          name="add-clothing"
          buttonText="Add garment"
          isOpen={activeModal === "add-clothing"}
          onClose={handleCloseModal}
          onSubmit={handleAddItemSubmit}
          isFormValid={isFormValid}
        >
          <label className="modal__label">
            Name*
            <input
              required
              className="modal__input"
              type="text"
              placeholder="Name"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
            />
          </label>
          <label
            className={`modal__label ${newItemLink && !isValidUrl(newItemLink) ? "modal__label-error" : ""}`}
          >
            {`${newItemLink && !isValidUrl(newItemLink) ? "Image* (This is not a valid image link) " : "Image*"}`}
            <input
              required
              className={`modal__input ${newItemLink && !isValidUrl(newItemLink) ? "modal__input-error" : ""}`}
              type="url"
              placeholder="Image URL"
              value={newItemLink}
              onChange={(e) => setNewItemLink(e.target.value)}
            />
          </label>
          <fieldset className="modal__fieldset">
            <legend className="modal__legend">Select the weather type:</legend>
            <label
              className={`modal__label-radio ${newItemWeather === "hot" ? "modal__label-radio_checked" : ""}`}
            >
              <input
                required
                type="radio"
                name="weather"
                value="hot"
                checked={newItemWeather === "hot"}
                onChange={(e) => setNewItemWeather(e.target.value)}
              />{" "}
              Hot
            </label>
            <label
              className={`modal__label-radio ${newItemWeather === "warm" ? "modal__label-radio_checked" : ""}`}
            >
              <input
                type="radio"
                name="weather"
                value="warm"
                checked={newItemWeather === "warm"}
                onChange={(e) => setNewItemWeather(e.target.value)}
              />{" "}
              Warm
            </label>
            <label
              className={`modal__label-radio ${newItemWeather === "cold" ? "modal__label-radio_checked" : ""}`}
            >
              <input
                type="radio"
                name="weather"
                value="cold"
                checked={newItemWeather === "cold"}
                onChange={(e) => setNewItemWeather(e.target.value)}
              />{" "}
              Cold
            </label>
          </fieldset>
        </ModalWithForm>
        <ItemModal
          name="preview"
          selectedCard={selectedCard}
          isOpen={activeModal === "preview"}
          onClose={handleCloseModal}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
