import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import  register from '../../assets/EmployeeImage.webp'
import './user.css'
import axios from "axios";
import toast from "react-hot-toast";
function Register(){
  const [userInput, setUserInput] = useState({});


  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e) => {
      setUserInput({
        ...userInput,
        [e.target.name]: e.target.value
      });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try{
      console.log('working');
      const response =await axios.post('/api/v1/register',userInput);
      const data = response.data;
      toast.success(data?.message)
      navigate('/home');
      localStorage.setItem('myUser',JSON.stringify(data));
    }catch(err){
      toast.success(err.response?.data?.message);
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex items-center justify-center overflow-hidden" >

      <div className="hidden md:flex">
        <img src={register } alt="" className="w-full h-full" />
      </div>

      <div className="authCss  bg-white p-8 rounded-xl shadow-lg w-full max-w-[370px] px-10 ml-5 py-3">
        <h1 className="text-3xl  mb-4 text-center">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Username</label>
            <input
              name="username"
              type="text"
              placeholder="Enter your username"
              onChange={handleInput}
              className="w-full px-4  py-3 outline-none border-none rounded-lg focus:outline-none inputCss"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              onChange={handleInput}
              className="w-full px-4  py-3 outline-none border-none rounded-lg focus:outline-none inputCss"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              onChange={handleInput}
              className="w-full px-4  py-3 outline-none border-none rounded-lg focus:outline-none  inputCss"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </form>
        <div className="mt-4 text-center mb-4">
          <p>
            Already have an account?{" "}
            <Link to="/" className="text-blue-600 hover:underline font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
