import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../client/api";

const Home = () => {
  const { id } = useParams(); 
  const [student, setStudent] = useState(null);


  const fetchStudent = async () => {
    try {
      
      const response = await axiosInstance.get(`/students/${id}`);
      console.log("API Response:", response.data);
      setStudent(response.data);
    } catch (err) {
      console.error("Error fetching student:", err);
     
    }
  };

  useEffect(() => {
    if (id) fetchStudent();
  }, [id]);

 

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
<div className="min-h-screen flex items-center justify-center bg-gray-100">
  <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-xl space-y-4">
    <h2 className="text-2xl font-semibold text-gray-700 flex items-center gap-2">
      Welcome, <span className="text-blue-600">{student.name}</span> <span className="text-blue-600">{student.surname}</span>
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <span className="font-medium text-gray-600">Father Name:</span> {student.fatherName}
      </div>
      <div>
        <span className="font-medium text-gray-600">Mother Name:</span> {student.matherName}
      </div>
      <div>
        <span className="font-medium text-gray-600">Age:</span> {student.age}
      </div>
      <div>
        <span className="font-medium text-gray-600">Gender:</span> {student.gender}
      </div>
      <div>
        <span className="font-medium text-gray-600">Blood Group:</span> {student.bloodGroup}
      </div>
      <div>
        <span className="font-medium text-gray-600">Course Of Study:</span> {student.courseOfStudy}
      </div>
      <div>
        <span className="font-medium text-gray-600">Collage Name:</span> {student.collageName}
      </div>
      <div>
        <span className="font-medium text-gray-600">Phone:</span> {student.phone}
      </div>
    </div>
    <p className="text-gray-600">
      <span className="font-medium">Email:</span> {student.email}
    </p>
  </div>
</div>

  );
};

export default Home;
