import React, { useEffect, useState } from "react";
import "./PageContainer.css";
import logo from '../assets/images/SKELLA shaded.png'

const LogoAnimation = () => {

  document.addEventListener("DOMContentLoaded", () => {
    const animationElement = document.querySelector(".logo-animation");
  
    if (animationElement) {
      animationElement.addEventListener("animationend", () => {
        animationElement.remove(); // Remove the element from the DOM
      });
    }
  });

  return (
    <div className="logo-animation">
      <img src={logo} alt="Logo" className="logo" />
    </div>
  );
};

export default LogoAnimation;