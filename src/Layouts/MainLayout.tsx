// MainLayout.tsx
import React from "react";
import Header from "../componets/Headers/Header";
import Footer from "../componets/Footers/Footer";

// Define the type for the props object
interface MainLayoutProps {
  children: React.ReactNode; // Specify the children prop
}

// Use the defined type for the props object
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="main-layout">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
