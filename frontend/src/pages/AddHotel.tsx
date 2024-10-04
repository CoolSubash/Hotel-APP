
import ManageHotel from '../forms/ManageHotelForm/ManageHotel'
import { useMutation } from 'react-query'

import * as apiClient from "../API-CLIENT"
import { useToast } from '../contexts/AppContext'
const AddHotel = () => {
    const {showToast}=useToast();
    const mutation=useMutation((data:FormData)=>apiClient.addHotel(data),{
        onSuccess:()=>{
            showToast({message:"Hotel added successfully",type:"SUCCESS"});
        },
        onError:(error:Error)=>{
            console.log(error)
            showToast({message:`Something Went Wrong ${error}`,type:"ERROR"})
        }
    })
    const handleSave=(data:FormData):void=>{
        mutation.mutate(data);
       
    }
    
  return (
    <ManageHotel onSave={handleSave} isLoading={mutation.isLoading}></ManageHotel>
  )
}

export default AddHotel