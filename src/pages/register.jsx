import { useForm } from "react-hook-form";
import studentStore from "../store/student";
import { axiosInstance } from "../client/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const { register, getValues, handleSubmit } = useForm();
    const { login } = studentStore();
    const navigate = useNavigate()

    const onSubmit = async () => {
        try {
            const {
                name,
                surname,
                fatherName,
                matherName,
                age,
                gender,
                bloodGroup,
                courseOfStudy,
                collageName,
                phone,
                email,
                password,
            } = getValues();

            const response = await axiosInstance.post("/students/create", {
                name,
                surname,
                fatherName,
                matherName,
                age: parseInt(age, 10),
                gender,
                bloodGroup,
                courseOfStudy,
                collageName,
                phone: phone.toString(),
                email,
                password,
            });

            console.log("logging");
            console.log(response.data);
            login(response.data.student, response.data.token);
            navigate("/login")
        } catch (error) {
            console.log("Error On Fetching data", error);
        }
    };

    return (
        <div className="min-h-screen  bg-gray-100 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
          {/* <div className="mb-4 flex justify-end">
            <button
              onClick={logOut}
              className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg"
            >
              Logout
            </button>
          </div> */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex gap-2">
            <input
              {...register("name")}
              placeholder="Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
             <input
              {...register("surname")}
              placeholder="Surname"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
            </div>
          
          <div className="flex gap-2">
          <input
              {...register("fatherName")}
              placeholder="Father's Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
            <input
              {...register("matherName")}
              placeholder="Mother's Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
           
            <input
              {...register("age")}
              placeholder="Age"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
      
            {/* Gender Selection */}
            <div className="border border-gray-300 p-3 rounded-lg">
              <label className="font-medium block mb-2">Gender:</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    {...register("gender")}
                    type="radio"
                    value="Male"
                    className="mr-2"
                  />
                  Male
                </label>
                <label className="flex items-center">
                  <input
                    {...register("gender")}
                    type="radio"
                    value="Female"
                    className="mr-2"
                  />
                  Female
                </label>
                <label className="flex items-center">
                  <input
                    {...register("gender")}
                    type="radio"
                    value="Other"
                    className="mr-2"
                  />
                  Other
                </label>
              </div>
            </div>
      
            <input
              {...register("bloodGroup")}
              placeholder="Blood Group"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
            <input
              {...register("courseOfStudy")}
              placeholder="Course Of Study"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
            <input
              {...register("collageName")}
              placeholder="College Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
            <input
              {...register("phone")}
              placeholder="Phone Number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
            <div className="flex gap-2">
            <input
              {...register("email")}
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
            <input
              {...register("password")}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
            </div>
           
            <input
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
              value="Submit"
            />
          </form>
        </div>
      </div>
      
    );
};

export default Register;
