import { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Define the SearchContext type
type SearchContextType = {
  destination: string;
  adultCount: number;
  childCount: number;
  checkIn: Date;
  checkOut: Date;
  saveSearch: (
    destination: string,
    adultCount: number,
    childCount: number,
    checkIn: Date,
    checkOut: Date
  ) => void;
};

// Create the context with a default value of `undefined`
const SearchContextStore = createContext<SearchContextType | undefined>(undefined);

// Helper to parse date strings from sessionStorage back to Date objects
const parseDate = (dateString: string) => (dateString ? new Date(dateString) : new Date());

// The context provider component
const SearchContextProvider = ({ children }: { children: ReactNode }) => {
  const [destination, setDestination] = useState<string>(
    sessionStorage.getItem("destination") || ""
  );
  const [adultCount, setAdultCount] = useState<number>(
    Number(sessionStorage.getItem("adultCount"))  || 1
  );
  const [childCount, setChildCount] = useState<number>(
    Number(sessionStorage.getItem("childCount") || 0)
  );
  const [checkIn, setCheckIn] = useState<Date>(
    parseDate(sessionStorage.getItem("checkIn") || new Date().toString())
  );
  
  const defaultCheckOutDate = new Date(checkIn);
  defaultCheckOutDate.setDate(defaultCheckOutDate.getDate() + 30);

  const [checkOut, setCheckOut] = useState<Date>(
    parseDate(sessionStorage.getItem("checkOut") || defaultCheckOutDate.toString())
  );

  // Save values to sessionStorage on changes in the search criteria
  useEffect(() => {
    sessionStorage.setItem("destination", destination);
    sessionStorage.setItem("adultCount", adultCount.toString());
    sessionStorage.setItem("childCount", childCount.toString());
    sessionStorage.setItem("checkIn", checkIn.toISOString());
    sessionStorage.setItem("checkOut", checkOut.toISOString());
  }, [destination, adultCount, childCount, checkIn, checkOut]);

  // Save search function to update both context state and sessionStorage
  const saveSearch = (
    destination: string,
    adultCount: number,
    childCount: number,
    checkIn: Date,
    checkOut: Date
  ) => {
    setDestination(destination);
    setAdultCount(adultCount);
    setChildCount(childCount);
    setCheckIn(checkIn);
    setCheckOut(checkOut);

    sessionStorage.setItem("destination", destination);
    sessionStorage.setItem("adultCount", adultCount.toString());
    sessionStorage.setItem("childCount", childCount.toString());
    sessionStorage.setItem("checkIn", checkIn.toISOString());
    sessionStorage.setItem("checkOut", checkOut.toISOString());
  };

  return (
    <SearchContextStore.Provider value={{ destination, adultCount, childCount, checkIn, checkOut, saveSearch }}>
      {children}
    </SearchContextStore.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContextStore);
  if (!context) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
};

export default SearchContextProvider;
