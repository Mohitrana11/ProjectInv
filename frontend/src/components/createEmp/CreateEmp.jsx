import { useState } from 'react';
import Navbar from '../navbar/Navbar';
import './emp.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const CreateEmp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: [],
    avatar: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      const updatedCourses = checked
        ? [...formData.course, value]
        : formData.course.filter((course) => course !== value);
      setFormData({ ...formData, course: updatedCourses });
    } else if (type === 'file') {
      const file = e.target.files[0];
      setFormData({ ...formData, [name]: file });
      setImagePreview(file ? URL.createObjectURL(file) : null);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = new FormData(); // Use FormData for file upload
      Object.keys(formData).forEach((key) => {
        if (key === 'course') {
          formData[key].forEach((item) => payload.append('course', item));
        } else {
          payload.append(key, formData[key]);
        }
      });

      const response = await axios.post('/api/v1/employees', payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success(response.data?.message);
      navigate('/employees/list');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="createEmp min-h-screen flex items-center justify-center bg-gray-100 p-4 pt-[78px]">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center">Employee Form</h2>

          {/* Image Upload Section */}
          {/* <input type="file" name="avatar" accept="image/png, image/jpeg" onChange={handleChange} /> */}

          <input
            type="file"
            name="avatar"
            accept="image/png, image/jpeg"
            onChange={handleChange}
            className="hidden"
            id="upload-button"
          />

          <label htmlFor="upload-button" className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 bg-gray-100 cursor-pointer hover:bg-gray-200 transition-colors duration-300 rounded-lg ease-in-out w-[150px] h-[100px] ml-28">
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12 text-gray-500">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 16s1-1 3-1 4 1 4 1 2-2 4-2 4 2 4 2h1V6a2 2 0 00-2-2H5a2 2 0 00-2 2v10z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12h.01M3 6h18M5 6h14v2H5V6z" />
                </svg>
                <span className="mt-2 text-[14px]">Employee Image</span>
              </>
            )}
          </label>

           {/* Name and Email Fields */}
          <div className='flex flex-col md:flex-row gap-5 mb-4 mt-6'>
         <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 inputBox"
              placeholder='Name'
              required
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 inputBox"
              placeholder='Email'
              required
            />
          </div>

          {/* Mobile Number */}
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="inputBox w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5"
            pattern="[0-9]{10}"
            required
            placeholder='Mobile No'
          />

          {/* Designation Field */}
          <div className="mb-4 ">
            <label className="block font-semibold mb-2 text-md">Designation</label>
            <select
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 inputBox py-3"
              required
            >
              <option value="">Select Designation</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
          </div>

          {/* Gender Field */}
          <div className="mb-4 ml-2" >
            <label className="block font-semibold mb-2 text-md">Gender</label>
            <div className="flex space-x-4">
              <label className='flex items-center justify-center font-semibold'>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  onChange={handleChange}
                  className="mr-2 radio radio-success"
                  required
                />
                Male
              </label>
              <label className='flex items-center justify-center font-semibold'>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  onChange={handleChange}
                  className="mr-2 radio radio-success"
                  required
                />
                Female
              </label>
            </div>
          </div>

          {/* Course Field */}
          <div className=" ml-2 mb-6">
            <label className="block font-semibold mb-2 text-md">Course</label>
            <div className="flex space-x-4">
              <label className='flex  items-center text-md font-semibold'>
                <input
                  type="checkbox"
                  name="course"
                  value="MCA"
                  onChange={handleChange}
                  className="mr-2 checkbox checkbox-success"
                />
                MCA
              </label>
              <label  className='flex  items-center text-md font-semibold'>
                <input
                  type="checkbox"
                  name="course"
                  value="BCA"
                  onChange={handleChange}
                   className="mr-2 checkbox checkbox-success"
                />
                BCA
              </label>
              <label  className='flex  items-center text-md font-semibold'>
                <input
                  type="checkbox"
                  name="course"
                  value="BSC"
                  onChange={handleChange}
                   className="mr-2 checkbox checkbox-success"
                />
                BSC
              </label>
            </div>
          </div>


          <button type="submit" className="w-full bg-green-500 text-white p-2 rounded-lg hover:bg-green-600">
            {loading ? 'Loading...' : 'Submit'}
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateEmp;
