import { useEffect, useState } from 'react';
import { IoSearch } from "react-icons/io5";
import { LuClipboardEdit } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import Navbar from '../navbar/Navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuths } from '../../context/authContext';

const AdminDashBoard = () => {
  const [search, setSearch] = useState('');
  const [employeeList, setEmployeeList] = useState([]);

  // Fetch employee data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/v1/employees');
        setEmployeeList(response.data?.users || []);
      } catch (err) {
        toast.error('Error fetching employee data');
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (deleteId) => {
    try {
      const response = await axios.delete(`/api/v1/employee/${deleteId}`);
      toast.success(response.data?.message || 'Employee deleted successfully');
      setEmployeeList(employeeList.filter(emp => emp._id !== deleteId));
    } catch (err) {
      console.error('Error deleting employee:', err);
      toast.error(err.response?.data?.message || 'Error deleting employee');
    }
  };



  // Format date
  function formatToDate(isoDate) {
    const date = new Date(isoDate);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  }

  // Search functionality:
  const handleSearch = async (e) => {
    e.preventDefault();

    if (search.trim()) {
        try {
            const response = await axios.get(`/api/v1/employee?search=${search}`);
            setEmployeeList(response.data.users);
        } catch (err) {
            console.error('Error fetching employees:', err);
        }
    }
  };

  const {setUserIds} = useAuths();

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 w-full h-full pt-[80px]">
        <div className="bg-yellow-400 text-black p-2 font-bold">
          Employee List
        </div>

        <div className="my-4 flex flex-col sm:flex-row justify-between items-center">
          <div className='flex flex-row justify-between items-center gap-10'>
            <div className="font-bold">
              Total Count: {employeeList.length}
            </div>
            <Link to={'/createEmployee'} className="bg-green-500 border-none outline-none hover:bg-green-600 text-white py-1 px-4 rounded hover:scale-95 duration-150 delay-75">
              Create Employee
            </Link>
          </div>

          <form className="border border-gray-300 p-2 rounded-md mt-4 sm:mt-0 flex items-center justify-between" onSubmit={handleSearch}>
            <input
              type="text"
              value={search}
              placeholder="Search Employee"
              className='outline-none border-none bg-transparent'
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit"><IoSearch className='text-xl' /></button>
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
              {employeeList.map((employee) => (
                <tr key={employee._id} className="border-t">
                  <td className="p-3">{employee._id}</td>
                  <td className="p-3">
                    <img
                      src={employee.avatar}
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
                  <td className="p-3">{formatToDate(employee.createdAt)}</td>
                  <td className="p-3 flex flex-row gap-2">
                    <Link to={'/updateEmployee'} onClick={setUserIds(employee._id)} className="text-blue-500 hover:underline">
                      <LuClipboardEdit className="text-xl hover:text-green-500 duration-150" />
                    </Link>
                    <button onClick={() => handleDelete(employee._id)} className="text-red-500 hover:underline">
                      <MdDelete className="text-xl hover:text-red-900 duration-150" />
                    </button>
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

export default AdminDashBoard;
