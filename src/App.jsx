import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PhotoCard from './components/PhotoCard'; 
import SearchBar from './components/SearchBar';
import discordLogo from './data/discord.png';

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [category, setCategory] = useState('face'); // State to store the selected category

  const ACCESS_KEY = 'YOUR_ACCESS_KEY'; // Replace with your Pexels API Key

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(`https://api.pexels.com/v1/search?query=${category}`, {
          headers: {
            Authorization: ACCESS_KEY,
          },
        });

        // Ensure the response has valid photos data
        if (response.data && response.data.photos) {
          setPhotos(response.data.photos);
        }
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    fetchPhotos();
  }, [category]);

  // Filter photos based on searchTerm (using photographer's name)
  const filteredPhotos = photos.filter((photo) => {
    const photographerName = photo.photographer || ''; // Use photographer's name
    return photographerName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div
  className={`relative w-full min-h-screen overflow-auto p-6 sm:p-8 ${
    darkMode ? 'bg-black text-white' : 'bg-gray-100 text-black'
  }`}
>

      {/* Full-Screen Black Overlay */}
      {darkMode && (
        <div className="absolute inset-0 w-full h-full bg-black z-10"></div>
      )}

      {/* Top Section: Search Bar, Filter, Discord Logo, Text, and Toggle */}
      <div
        className={`relative z-20 flex flex-col lg:mx-60 gap-6 sm:flex-row sm:items-center sm:justify-between text-center mb-6`}
      >
        {/* Search Bar */}
        <div className="w-full  sm:w-auto order-2 sm:order-1">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        {/* Filter, Discord Logo, Text, NSFW, and Dark Mode Toggle */}
        <div className="flex items-center justify-center gap-4 order-1 sm:order-2">
          {/* Category Filter */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`px-2 py-1 sm:px-2 sm:py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-black border-gray-300'
            }`}
          >
            <option value="face">Face</option>
            <option value="cats">Cats</option>
            <option value="dogs">Dogs</option>
            <option value="people">People</option>
            <option value="architecture">Architecture</option>
          </select>

          {/* Discord Logo */}
          <img
            src={discordLogo}
            alt="Discord Logo"
            className="w-8 h-8 rounded-full cursor-pointer"
            onClick={() => window.open('https://discord.com', '_blank')}
          />

          {/* Divider and NSFW Text */}
          <div className="flex items-center gap-2">
            <p className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-black'}`}>|</p>
            <p className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-black'}`}>NSFW</p>
          </div>

          {/* Dark Mode Toggle */}
          <label
            htmlFor="dark-mode-toggle"
            className="inline-flex items-center cursor-pointer relative ml-2"
          >
            <input
              id="dark-mode-toggle"
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              className="w-12 h-6 bg-[#4635B1] rounded-full appearance-none cursor-pointer peer"
            />
            <span className="absolute left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ease-in-out peer-checked:translate-x-6"></span>
          </label>
        </div>
      </div>

      {/* Photo Cards */}
      <div className="relative z-20 grid grid-cols-2 lg:mx-50 sm:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {filteredPhotos.length > 0 ? (
          filteredPhotos.map((photo) => (
            <PhotoCard key={photo.id} photo={photo} />
          ))
        ) : (
          <p className="col-span-full text-center">No photos found for your search term.</p>
        )}
      </div>
    </div>
  );
};

export default App;
