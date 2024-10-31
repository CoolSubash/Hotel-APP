
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";

interface childrenProps {
  children: React.ReactNode;
}
const Layout:React.FC<childrenProps> = ({ children }) => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header></Header>
        <Hero></Hero>
        <SearchBar/>
  
       
        <div className="my-6 container mx-auto flex-1">
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
