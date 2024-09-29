import { useForm } from "react-hook-form";
import { Link,useNavigate } from "react-router-dom";
import * as apiclient from "../API-CLIENT";
import { useMutation } from "react-query";
import { useToast} from "../contexts/AppContext";
export type SignInFormData = {
  email: string;
  password: string;
};
import { QueryClient } from "react-query";

const SignIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>();
   const navigate=useNavigate()
   const queryClient=new QueryClient();
   const {showToast}=useToast();


  const mutation = useMutation({
    mutationFn: (data: SignInFormData) => apiclient.login(data as any),
    onSuccess: async() => {
      await queryClient.invalidateQueries("validateToken");
      showToast({message:"Login Successfully",type:"SUCCESS"});
      navigate("/");
     
      window.location.reload();
    },
    onError: (error: any) => {
        showToast({ message: error.message, type: "ERROR" });
    }
  });

  const onSubmit = (data: SignInFormData) => {
    mutation.mutate(data);
  };

  return (
    <form className="flex flex-col my-10 gap-5" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-3xl font-bold">Sign In</h2>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: "This field is required" })}
        />
        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password", {
            required: "This field is required",
            minLength: { value: 6, message: "Password must be at least 6 characters" }
          })}
        />
        {errors.password && <span className="text-red-500">{errors.password.message}</span>}
      </label>
      <button
        type="submit"
        className="bg-blue-600 text-white flex justify-center items-center mx-auto px-8 py-2 font-bold hover:bg-blue-500 text-xl"
      >
        Login
      </button>
      <span className="flex items-center mx-auto justify-between">
        <span className="text-sm">
          Not Registered?{" "}
          <Link className="underline" to="/register">
            Create an account here
          </Link>
        </span>
      </span>
    </form>
  );
};

export default SignIn;
