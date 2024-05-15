/**
 * DropdownItem.js
 *
 * This file contains the DropdownItem component,
 * aka the individual options that get rendered for
 * the Dropdown
 *
 * DropdownItem takes the following props:
 * name (string): name of dropdown option
 * isSelected (boolean): determines if current option is selected
 * optionSelect (function): callback function used when user clicks the current option
 * isMulti (boolean, optional): boolean to determine whether or not this dropdown has multi selection
 *
 */

import "./DropdownItem.css";
import PropTypes from "prop-types";
import { useState } from "react";

function DropdownItem({ name, isSelected, optionSelect, isMulti = false }) {
  // hover states used to highlight option if user is hovering
  const [isHover, setIsHover] = useState(false);

  // we have 2 different dropdown item types:
  // if single select item, we will not show the checkbox
  // if multi select item, we show the checkbox
  const multiItem = (
    <div className="Dropdown-item">
      <input
        type="checkbox"
        checked={isSelected}
        onClick={() => optionSelect(name)}
      />
      <span className="Dropdown-text">{name}</span>
    </div>
  );

  const singleItem = (
    <div className="Dropdown-item" onClick={() => optionSelect(name)}>
      <span className="Dropdown-text">{name}</span>
    </div>
  );

  return (
    <div
      style={{
        backgroundColor: isHover ? "#b2c3d6" : isSelected ? "#cfe6ff" : "white",
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <label>{isMulti ? multiItem : singleItem}</label>
    </div>
  );
}

DropdownItem.propTypes = {
  name: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  optionSelect: PropTypes.func.isRequired,
  isMulti: PropTypes.bool,
};

export default DropdownItem;
