import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import './messenger.css';

const MessengerIcon = ({ messengerLink }) => {
  return (
    <div className="messenger-icon">
      <a href={`https://${messengerLink}`} target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faFacebookMessenger} className="fa-icon" size="2x" />
        <div className="message-pulse"></div> {/* Add a pulsating effect */}
      </a>
    </div>
  );
};

export default MessengerIcon;
