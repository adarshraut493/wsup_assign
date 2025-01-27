import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';

const PhotoCard = ({ photo }) => {
  const [isModalOpen, setModalOpen] = useState(false); // State to handle the popup visibility

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <div>
      {/* Photo Card */}
      <div
        className="w-40 p-2 rounded-4xl hover:scale-105 transform transition-all duration-300 hover:shadow-xl hover:shadow-[0_4px_15px_0_rgba(70,53,177,0.5)] cursor-pointer"
        onClick={toggleModal} // Open modal on click
      >
        <div className="relative">
          {/* Image */}
          <img
            src={photo.src.medium}
            alt={photo.alt || 'Photo'}
            className="w-full h-50 object-cover rounded-3xl mb-4"
          />
          {/* Chat Icon */}
          <div className="absolute left-1/2 top-45 transform -translate-x-1/2 bg-[#4635B1] w-20 h-10 rounded-2xl flex items-center justify-center shadow-lg transition-all hover:scale-110">
            <FontAwesomeIcon icon={faComment} className="text-white text-xl mr-1" />
            <span className="text-white text-sm font-medium">Chat</span>
          </div>

          {/* Photo Details */}
          <h3 className="font-bold text-lg mt-8">{photo.photographer}</h3>
          <p className="text-xs">
            {photo.alt
              ? photo.alt.split(' ').slice(0, 14).join(' ') +
              (photo.alt.split(' ').length > 14 ? '...' : '')
            : 'No description available.'}
          </p>
        </div>
      </div>

      {/* Popup Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-lg relative">
            {/* Close Button */}
            <button
              onClick={toggleModal}
              className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-full p-2"
            >
              ✕
            </button>
            {/* Modal Content */}
            <img
              src={photo.src.large}
              alt={photo.alt || 'Photo'}
              className="w-full h-auto rounded-lg mb-4"
            />
            <h3 className="font-bold text-lg mb-2">{photo.photographer}</h3>
            <p className="text-sm text-gray-700 mb-4">
              {photo.alt || 'No additional description available.'}
            </p>
            <a
              href={photo.photographer_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline text-sm"
            >
              More from this photographer
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoCard;
