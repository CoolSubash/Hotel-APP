

import { useForm} from "react-hook-form";
import { QueryClient, useMutation } from "react-query";
import * as apiclient from "../API-CLIENT"
import { useToast } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
export type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};



const Register = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch
  } = useForm<Inputs>();

  const navigate=useNavigate();
  const {showToast}=useToast();
  const queryClient=new QueryClient();
 const mutation=useMutation({
    mutationFn: (data:Inputs)=> apiclient.Register(data as Inputs),
    onSuccess:async()=>{
        await queryClient.invalidateQueries("validateToken");
        showToast({message:"Successfully Register",type:"SUCCESS"});
        navigate("/");
        window.location.reload();
       
       
    },
    onError:(error:Error)=>{
      showToast({ message: error.message, type: "ERROR" });
    }
    
 })

 const onSubmit=(data:Inputs)=>{
    mutation.mutate(data as Inputs);

 }


 

  return (
    <form className="flex flex-col my-10 gap-5" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-3xl font-bold">Create an Account</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("firstName", { required: true })}
          ></input>
          {errors.firstName && <span>This field is required</span>}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("lastName", { required: true })}
          ></input>
          {errors.lastName && <span>This field is required</span>}
        </label>
      </div>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: true })}
        ></input>
        {errors.email && <span>This field is required</span>}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "The password character must be at least 6",
            },
          })}
        ></input>
        {errors.password && <span>{errors.password.message}</span>}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Confirm Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("confirmPassword", {
            required: "This field is required",
            validate: (val) => {
              if (val !== watch("password")) {
                return "Your passwords do no match";
              } else if (!val) {
                return "This field is required";
              }
            },
          })}
        ></input>
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </label>


       <span>
       <button
          type="submit"
          className="bg-blue-600 text-white p-4 font-bold hover:bg-blue-500 text-xl"
        >
          Create Account
        </button>
       </span>

    
    </form>
  );
};

export default Register;
