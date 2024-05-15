/**
 * Dropdown.js
 *
 * This file contains the Dropdown component
 *
 * Dropdown takes the following props:
 * dropdownTitle (string): title/name of dropdown
 * dropdownItems (array of strings): array with options' names
 * isMultiSelect (boolean, optional): boolean to determine whether or not this dropdown has multi selection
 *
 */

import "./Dropdown.css";
import { useCallback, useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import DropdownItem from "./DropdownItem";

function Dropdown({ dropdownTitle, dropdownItems, isMultiSelect = false }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const openDropdown = useCallback(() => {
    setDropdownOpen(!dropdownOpen);
  }, [dropdownOpen]);

  const changeSelectedSingle = useCallback(
    (name) => {
      if (name === "None") {
        setSelectedOptions([]);
      } else {
        setSelectedOptions([name]);
      }
    },
    [setSelectedOptions]
  );

  const changeSelectedMulti = useCallback(
    (name) => {
      setSelectedOptions((prevSelected) => {
        const newArray = [...prevSelected];
        if (newArray.includes(name)) {
          return newArray.filter((item) => item !== name);
        } else {
          newArray.push(name);
          return newArray;
        }
      });
    },
    [setSelectedOptions]
  );

  const onSelectAllItems = useCallback(() => {
    if (selectedOptions.length === dropdownItems.length) {
      setSelectedOptions([]);
    } else {
      setSelectedOptions(dropdownItems);
    }
  }, [dropdownItems, selectedOptions, setSelectedOptions]);

  // this option is only displayed for multi selection
  // will allow toggling on and off of selecting all options
  const selectAllOption = (
    <DropdownItem
      key="All"
      name="Select All"
      isSelected={selectedOptions.length === dropdownItems.length}
      optionSelect={onSelectAllItems}
      isMulti={isMultiSelect}
    />
  );

  // this option is only displayed for single
  // will allow user to deselect their choice
  const noneOption = (
    <DropdownItem
      key="None"
      name="None"
      isSelected={selectedOptions.length === 0}
      optionSelect={changeSelectedSingle}
    />
  );

  const firstOption = isMultiSelect ? selectAllOption : noneOption;

  // displays the selected values, comma separated
  // if nothing selected, display "Select" as placeholder text
  const selectedValuesText =
    selectedOptions.length === 0 ? "Select" : selectedOptions.join(", ");

  // handles when user clicks outside of dropdown menu area
  const useOutsideClick = (callback) => {
    const ref = useRef();

    useEffect(() => {
      const handleClick = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          callback();
        }
      };

      document.addEventListener("click", handleClick, true);

      return () => {
        document.removeEventListener("click", handleClick, true);
      };
    }, [callback, ref]);

    return ref;
  };

  // when user clicks outside of dropdown, we want to close it
  const handleClickOutside = () => {
    setDropdownOpen(false);
  };

  const ref = useOutsideClick(handleClickOutside);

  // render dropdown menu options
  const options = dropdownItems.map((name, index) => {
    const optionSelected = selectedOptions.includes(name);
    return (
      <DropdownItem
        key={index}
        name={name}
        isSelected={optionSelected}
        optionSelect={
          isMultiSelect ? changeSelectedMulti : changeSelectedSingle
        }
        isMulti={isMultiSelect}
      />
    );
  });

  // dropdown menu holds the first option + rendered options
  const dropdownMenu = (
    <div className="Dropdown-menu">
      <div className="Dropdown-list">
        {firstOption}
        {options}
      </div>
    </div>
  );

  return (
    <div className="Dropdown-container">
      <p className="Dropdown-title">{dropdownTitle}</p>
      <div className="Dropdown-body" ref={ref}>
        <div className="Dropdown-box" onClick={openDropdown}>
          <div className="Dropdown-textbox">{selectedValuesText}</div>
          <button className="Dropdown-button">
            {dropdownOpen ? "▲" : "▼"}
          </button>
        </div>
        {dropdownOpen ? dropdownMenu : null}
      </div>
    </div>
  );
}

Dropdown.propTypes = {
  dropdownTitle: PropTypes.string.isRequired,
  dropdownItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  isMultiSelect: PropTypes.bool,
};

export default Dropdown;
