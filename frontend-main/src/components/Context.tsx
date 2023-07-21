import React, { createContext, useState, ReactNode } from "react";

export interface ProductContextType {
  cartCount: number;
  updateCartCount: (count: number) => void;
}

interface ProductProviderProps {
  children: ReactNode;
}

export const productContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [cartCount, setCartCount] = useState<number>(0);

  const updateCartCount = (count: number) => {
    setCartCount(count);
  };

  return (
    <productContext.Provider
      value={{
        cartCount,
        updateCartCount,
      }}
    >
      {children}
    </productContext.Provider>
  );
};
