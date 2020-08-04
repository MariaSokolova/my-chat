import React from "react";
import './ErrorMessage.css'

const ErrorMessage = ({message, type}) => {
  return (
    <div className="error-message">
      <div className={type}>
        {message}
      </div>
    </div>
  )
};

export default ErrorMessage

