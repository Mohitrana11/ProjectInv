import { Link, useNavigate } from "react-router-dom";
import {  useState } from "react";
import './user.css'
import login  from '../../assets/EmployeeImage.webp'
import axios from 'axios';
import toast from 'react-hot-toast';
function Login() {
  const [userInput, setUserInput] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleInput = (e) => {
    setUserInput({
      ...userInput,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit =async  (e) => {
    e.preventDefault();
    setLoading(true);
    try{
      console.log('working');
      const response =await axios.post('/api/v1/login',userInput);
      const data = response.data;
      toast.success(data?.message)
      navigate('/home');
      localStorage.setItem('myUser',JSON.stringify(data));
    }catch(err){
      toast.error(err.response?.data?.message || 'Something went wrong');
    }finally{
      setLoading(false);
    }
  };


  // useEffect(()=>{},[]);


  return (
    <div className=" w-full h-screen bg-gray-100 flex items-center  justify-center px-4 py-4  overflow-hidden">
      <div className="hidden md:flex">
        <img src={login } alt="" className="w-full h-full" />
      </div>
      <div className="authCss  bg-white p-8 rounded-xl shadow-lg w-full max-w-[370px] px-10 ml-5 ">
        <h1 className="text-3xl text-center mb-8">Login</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              onChange={handleInput}
              className="w-full px-4 py-3 outline-none border-none rounded-lg focus:outline-none focus:border-blue-500 inputCss "
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              onChange={handleInput}
              className="w-full px-4  py-3 outline-none border-none rounded-lg focus:outline-none focus:border-blue-500 inputCss"
            />
          </div>
          <div className="text-right mb-4">
            <a to="" className="text-blue-500 hover:underline">
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {loading?'Loading...':'Login'}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p>
            Not a{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:underline font-medium"
            >
              Register User?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
