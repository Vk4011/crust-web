// src/api/api.jsx
// const API_BASE_URL = 'http://localhost:8080/';
const API_BASE_URL = 'https://form-p7pk.onrender.com/';

export const fetchData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}api/getdata`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
