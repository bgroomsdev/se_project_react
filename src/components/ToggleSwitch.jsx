import * as React from "react";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";
import "../blocks/toggle-switch.css";

function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = React.useContext(
    CurrentTemperatureUnitContext,
  );

  return (
    <>
      <input
        className="toggle-switch"
        type="checkbox"
        checked={currentTemperatureUnit === "C"}
        onChange={handleToggleSwitchChange}
        id="react-switch-new"
      />
      <label className="toggle-switch__label" htmlFor={`react-switch-new`}>
        <span className="toggle-switch__button-f">F</span>
        <span className="toggle-switch__button" />
        <span className="toggle-switch__button-c">C</span>
      </label>
    </>
  );
}

export default ToggleSwitch;
