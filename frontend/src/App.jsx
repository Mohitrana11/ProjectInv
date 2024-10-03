import React from 'react';
import CreateEmp from './components/createEmp/CreateEmp';
import UpdateEmp from './components/createEmp/updateEmp';
import Home from './components/home/Home';

import Login from "./components/userAuthentication/login";
import Register from "./components/userAuthentication/register";

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminDashBoard from './components/dashboards/AdminDashBoard';

function App() {
  return (
    <div className='w-full h-full'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/home' element={<Home />} />
          <Route path='/employees/list' element={<AdminDashBoard/>} />
          <Route path="/createEmployee" element={<CreateEmp />} />
          <Route path="/updateEmployee" element={<UpdateEmp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;