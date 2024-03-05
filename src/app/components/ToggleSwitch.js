import React from "react";
import "../styles/ToggleSwitch.css";

const ToggleSwitch = ({ label, toggleAI }) => {
  return (
    <div className="container">
      {label}
      <div className="toggle-switch">
        <input type="checkbox" className="checkbox"
          name={label} id={label} onChange={toggleAI} />
        <label className="label" htmlFor={label}>
          <span className="inner" />
          <span className="switch" />
        </label>
      </div>
    </div>
  );
};

export default ToggleSwitch;