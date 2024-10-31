import React from 'react';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import * as apiclient from "../API-CLIENT"
import { useToast } from '../contexts/AppContext';
import ManageHotel from '../forms/ManageHotelForm/ManageHotel';
// Define the types for hotel data


const EditHotel: React.FC = () => {
  const { id } = useParams();

  const {showToast}= useToast();
  // Fetch the hotel data using `useQuery`
  const { data, isLoading, error } = useQuery(['singleHotel', id], () => apiclient.fetchMyHotelSingle(id as string), {
    enabled: !!id,
    onError: (error: Error) => {
      showToast({ message: "Error while fetching", type: "ERROR" });
    }
  });

 

  const mutation=useMutation((data:FormData)=>apiclient.UpdateHotel(data, id as string),{
    onSuccess:()=>{
        showToast({message:"Updated Successfully",type:"SUCCESS"})
    },
    onError:()=>{
        showToast({message:"Error while Saving",type:"ERROR"})
      }
      
  })

  const onSave=(data:FormData)=>{
    mutation.mutate(data);
  }
  
  

  return (
    
      <ManageHotel hotel={data} onSave={onSave} isLoading={isLoading} />
    
  );
};

export default EditHotel;
