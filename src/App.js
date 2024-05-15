/**
 * App.js
 *
 * File is for testing the Dropdown component that we are building for this assignment.
 *
 * The Dropdown component is located in Dropdown.js
 * We will demo both the single select and multi select versions of the dropdown here.
 *
 */

import "./App.css";
import Dropdown from "./Dropdown";

function App() {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let fruits = [
    "Apples",
    "Bananas",
    "Oranges",
    "Grapes",
    "Kiwis",
    "Watermelons",
    "Strawberries",
  ];

  return (
    <div className="App">
      <Dropdown dropdownItems={months} dropdownTitle={"Single Select"} />
      <Dropdown
        dropdownItems={fruits}
        dropdownTitle={"Multi Select"}
        isMultiSelect={true}
      />
    </div>
  );
}

export default App;
