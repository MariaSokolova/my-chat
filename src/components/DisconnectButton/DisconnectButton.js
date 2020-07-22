import React from 'react';
import {Link} from "react-router-dom";

import './DisconnectButton.css'

const DisconnectButton = () => {
    return (
      <>
        <Link className="disconnect-button"  to={'/'}>Disconnect</Link>
      </>
    );
};

export default DisconnectButton;
