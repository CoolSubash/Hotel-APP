import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

interface childrenProps {
  children: React.ReactNode;
}
const Layout:React.FC<childrenProps> = ({ children }) => {
  return (
    <>
      <div className=" flex flex-col min-h-screen">
        <Header></Header>
        <Hero></Hero>
        <div className="container flex-1 ">
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
