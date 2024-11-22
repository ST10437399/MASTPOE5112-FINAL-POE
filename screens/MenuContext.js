import React, { createContext, useContext, useState } from 'react';

// Create the MenuContext
const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [dishes, setDishes] = useState([]);

  // Function to add a dish
  const addDish = (dish) => {
    setDishes((prevDishes) => [...prevDishes, dish]);
  };

  return (
    <MenuContext.Provider value={{ dishes, addDish, setDishes }}>
      {children}
    </MenuContext.Provider>
  );
};


// Hook to use the MenuContext
export const useMenu = () => useContext(MenuContext);
