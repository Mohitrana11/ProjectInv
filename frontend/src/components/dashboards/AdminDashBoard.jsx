import { useState } from 'react';
import { IoSearch } from "react-icons/io5";
import { LuClipboardEdit } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import Navbar from '../navbar/Navbar';
import { Link } from 'react-router-dom';
const employees = [
  {
    id: 1,
    image: '/path-to-avatar.jpg', // replace with actual image path
    name: 'hukum',
    email: 'hcgupta@cstech.in',
    mobile: '954010044',
    designation: 'HR',
    gender: 'Male',
    course: 'MCA',
    createDate: '13-Feb-21',
  },
  {
    id: 2,
    image: '/path-to-avatar.jpg', // replace with actual image path
    name: 'manish',
    email: 'manish@cstech.in',
    mobile: '954010033',
    designation: 'Sales',
    gender: 'Male',
    course: 'BCA',
    createDate: '12-Feb-21',
  },
  {
    id: 3,
    image: '/path-to-avatar.jpg', // replace with actual image path
    name: 'yash',
    email: 'yash@cstech.in',
    mobile: '954010022',
    designation: 'Manager',
    gender: 'Male',
    course: 'BSC',
    createDate: '11-Feb-21',
  },
  {
    id: 4,
    image: '/path-to-avatar.jpg', // replace with actual image path
    name: 'abhishek',
    email: 'abhishek@cstech.in',
    mobile: '954010033',
    designation: 'HR',
    gender: 'Male',
    course: 'MCA',
    createDate: '13-Feb-21',
  },
  {
      id: 5,
      image: '/path-to-avatar.jpg', // replace with actual image path
      name: 'abhishek',
      email: 'abhishek@cstech.in',
      mobile: '954010033',
      designation: 'HR',
      gender: 'Male',
      course: 'MCA',
      createDate: '13-Feb-21',
    },
];
const AdminDashBoard = () => {
  const [search,setSearch] = useState('');
  const handleSearch = (e)=>{
    e.preventDefault();
    // setSearch('');
  }

  return (
    <>
    <Navbar/>
     <div className="container mx-auto p-4 w-full h-full pt-[80px]">
      <div className="bg-yellow-400 text-black p-2 font-bold">
        Employee List
      </div>

      <div className="my-4 flex flex-col sm:flex-row justify-between items-center ">
        <div className='flex flex-row justify-between items-center gap-10'>

        <div className="font-bold">
          Total Count: {employees.length}
        </div>
        <Link to={'/createEmployee'} className="bg-green-500 border-none outline-none hover:bg-green-600 text-white py-1 px-4 rounded hover:scale-95 duration-150 delay-75">
          Create Employee
        </Link>
        </div>
        <form className="border border-gray-300 p-2 rounded-md mt-4 sm:mt-0  flex  items-center justify-between" onSubmit={handleSearch} >
        <input
            type="text"
            value={search}
            placeholder="Search Employee"
            className='outline-none border-none bg-transparent'
            onChange={(e)=>{setSearch(e.target.value)}}
        />
        <button><IoSearch className='text-xl' /></button>

        </form>

      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">Unique ID</th>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Mobile No</th>
              <th className="p-3">Designation</th>
              <th className="p-3">Gender</th>
              <th className="p-3">Course</th>
              <th className="p-3">Create Date</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id} className="border-t">
                <td className="p-3">{employee.id}</td>
                <td className="p-3">
                  <img
                    src={employee.image}
                    alt={employee.name}
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="p-3">{employee.name}</td>
                <td className="p-3">
                  <a href={`mailto:${employee.email}`} className="text-blue-500">
                    {employee.email}
                  </a>
                </td>
                <td className="p-3">{employee.mobile}</td>
                <td className="p-3">{employee.designation}</td>
                <td className="p-3">{employee.gender}</td>
                <td className="p-3">{employee.course}</td>
                <td className="p-3">{employee.createDate}</td>
                <td className="p-3 flex flex-row">
                  <Link to={'/updateEmployee'} className="text-blue-500 hover:underline"><LuClipboardEdit  className="text-xl hover:text-green-500 duration-150 "/></Link> -
                  <button className="text-red-500 hover:underline"><MdDelete className="text-xl hover:text-red-900 duration-150 " /></button>
                </td>
              </tr> 
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default AdminDashBoard ;
