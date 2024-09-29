import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import "./index.css";
import { AppContextProvider } from "./contexts/AppContext";
import {
 
  QueryClient,
  QueryClientProvider,
 
 
} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'



// Create a new QueryClient instance
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <App />
       </AppContextProvider>
       <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>


  </StrictMode>
);
