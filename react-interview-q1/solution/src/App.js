import React, { useState, useEffect } from 'react';
import { isNameValid, getLocations } from './mock-api/apis'; // Adjust the path as per your project structure

import './App.css'; // Import CSS file

// Form component
const FormComponent = ({ onAdd, onClear }) => {
  const [name, setName] = useState('');
  const [nameList, setNameList] = useState('');
  const [isValidName, setIsValidName] = useState(true);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');

  useEffect(() => {
    getLocations().then(locations => setLocations(locations));
  }, []);

  const handleNameChange = async (e) => {
    const newName = e.target.value;
    setName(newName);
    if(!nameList.includes(newName)) {
      setNameList([...nameList, newName]);
      setIsValidName(true);
    }
    //setIsValidName(await isNameValid(newName));
    else setIsValidName(false);
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidName && selectedLocation) {
      onAdd({ name, location: selectedLocation });
      setName('');
      setSelectedLocation('');
    }
  };

  const handleClear = () => {
    onClear();
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={handleNameChange}
        className={!isValidName ? 'invalid' : ''}
      />
      {!isValidName && <span className="error-message">Name is invalid</span>}
      <select value={selectedLocation} onChange={handleLocationChange} className="select-box">
        <option value="">Select Location</option>
        {locations.map(location => (
          <option key={location} value={location}>{location}</option>
        ))}
      </select>
      <div className="button-group">
        <button type="submit" className="submit-button">Add</button>
        <button type="button" onClick={handleClear} className="clear-button">Clear</button>
      </div>
    </form>
  );
};

// List component
const ListComponent = ({ data }) => {
  return (
    <div className="list-container">
      <table className="list-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.name}>
              <td>{item.name}</td>
              <td>{item.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Main App component
const App = () => {
  const [listData, setListData] = useState([]);

  const handleAdd = (item) => {
    setListData([...listData, item]);
  };

  const handleClear = () => {
    setListData([]);
  };

  return (
    <div className="app-container">
      <h1>Form</h1>
      <FormComponent onAdd={handleAdd} onClear={handleClear} />
      <h1>List</h1>
      <ListComponent data={listData} />
    </div>
  );
};

export default App;
