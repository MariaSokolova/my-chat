import React from "react";
import './ErrorMessage.css'

const ErrorMessage = () => {
  return (
    <div className="error-message">
      <p>Please check your internet connection. Reconnection will start in a {8} minutes</p>
    </div>
  )
};

export default ErrorMessage
