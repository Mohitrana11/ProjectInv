// import React from 'react'
import { Outlet ,Navigate} from 'react-router-dom'
import { useAuths } from '../context/authContext';
function VerifyUser() {
    const {userData} = useAuths();
  return userData?<Outlet/>:<Navigate to={'/'}/>
}

export default VerifyUser;
