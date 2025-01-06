import { useForm } from "react-hook-form";
import { axiosInstance } from "../client/api";
import vine, { errors } from "@vinejs/vine";
import { vineResolver } from "@hookform/resolvers/vine";
import studentStore from "../store/student";
import { useNavigate } from "react-router-dom";

const schema = vine.compile(
  vine.object({
    email: vine.string().email().minLength(1),
    password: vine.string().minLength(1),
  })
);

const Login = () => {
  const { register, getValues, handleSubmit, formState } = useForm({
    resolver: vineResolver(schema),
  });
  const { login, logOut, student } = studentStore();
  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      const { email, password } = getValues();
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      console.log("Logging in");
      console.log(response.data);
      login(response.data.student, response.data.token);
      if(!student) {
        errors("your Login with in correct student details")
      }
      navigate(`/students/${response.data.student.id}`);
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  console.log(formState.errors);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
  <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
    {student && (
      <div className="flex justify-end mb-4">
        <button
          onClick={logOut}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
        >
          Logout
        </button>
      </div>
    )}
    <form
      className="space-y-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Email Input */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">Email</label>
        <input
          {...register("email")}
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      {/* Password Input */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">Password</label>
        <input
          {...register("password")}
          placeholder="Enter your password"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      {/* Submit Button */}
      <div>
        <input
          type="submit"
          value="Login"
          className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
        />
      </div>
    </form>
  </div>
</div>

  );
};

export default Login;
