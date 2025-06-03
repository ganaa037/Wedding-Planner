"use client"
// Navigation.tsx
import React, { useState } from "react";

import SimpleThemeToggle from "./Simple-theme-toggle";

import { Login } from "./Login";
import CalendarButton from "./CalendarButton";



interface NavigationProps {
  isDay: boolean;
  onToggleTheme: () => void;
}

const Navigation = ({ isDay, onToggleTheme }: NavigationProps) => {
  const [showLogin, setShowLogin] = useState(false);

  const sampleLogin = {
    image: "https://via.placeholder.com/300x382",
    name: "Sample Dish",
    price: 12.99,
    ingredients: "Tomato, Cheese, Basil",
    id: "sample-id"
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full flex items-center justify-between px-8 py-3 shadow-lg z-50 transition-all duration-700 backdrop-blur-sm ${
          isDay ? "bg-[#3d4436]/95 text-white shadow-[#3d4436]/20" : "bg-[#1a1a2e]/95 text-gray-100 shadow-[#1a1a2e]/20"
        }`}
      >
        <div className="flex items-center">
          <img className="w-45 h-16" src="Logo.png" alt="Logo" />
        </div>
        <div className="flex items-center space-x-3">
          <SimpleThemeToggle isDay={isDay} onToggle={onToggleTheme} />
          <CalendarButton isDay={isDay} onClick={() => setShowLogin(true)} />
        </div>
      </nav>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <Login login={sampleLogin} onClose={() => setShowLogin(false)} />
        </div>
      )}
    </>
  );
};

export default Navigation;
