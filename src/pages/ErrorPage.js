import React from "react";
import "../styles/ErrorPage.css";
const ErrorPage = () => {
  return (
    <div className="errorMainDiv">
      <div className="errMsg">Oops! The Page you requested was not found!</div>
      <img src="http://localhost:8080/api/image/errorpage.jpg" alt="404" />
      <a href="http://localhost:3000/home">
        <button>Back to Home</button>
      </a>
    </div>
  );
};

export default ErrorPage;
