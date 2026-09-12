import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "../blocks/app.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ItemModal from "./ItemModal";
import AddItemModal from "./AddItemModal/AddItemModal";
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
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

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
  function handleAddItemSubmit(values) {
    const newItem = {
      _id: clothingItems.length + 1,
      name: values.name,
      weather: values.weather,
      link: values.link,
    };
    setClothingItems([newItem, ...clothingItems]);
    handleCloseModal();
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
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
