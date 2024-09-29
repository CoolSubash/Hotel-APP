import { useContext,createContext,ReactNode, useState} from "react";
import Toast from "../components/Toast";
import { useQuery } from "react-query";
import * as apiclient from "../API-CLIENT"
export type toastMessage={
    message:string;
    type: "SUCCESS" | "ERROR"
}

export type AppContextType={
    showToast:(toastMessage: toastMessage)=> void;
    isLoggedIn:boolean,
    // setIsLoggedIn:(value:boolean)=>void
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Context Provider component
export const AppContextProvider = ({ children }: { children: ReactNode }) => {
    // Implementation of the showToast function
    const [toast, setToast]=useState<toastMessage | undefined>(undefined);
   
    const showToast = (toastMessage: toastMessage) => {
       setToast(toastMessage) // Log the toast message
    };

    const {isError}=useQuery("validateToken", apiclient.validateToken,{
        retry:false
    })
    
    
   

    return (
        <AppContext.Provider value={{ showToast,isLoggedIn:!isError}} >
          {
            toast &&
            <Toast message={toast?.message} type={toast?.type} onClose={()=>setToast(undefined)}></Toast>
            
          }  
        {children} 
        </AppContext.Provider>
    );
};

export const useToast=()=>{
    const context=useContext(AppContext);

    if(!context){
        throw new Error("useAppContext must be used within an AppContextProvider");
    }

    return context;
}