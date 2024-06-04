import customAxios from '../hooks/customAxios';
import Admins from '../pages/Admins';

interface loginCredentials {
  email: string;
  password: string;
}
interface createAdminCredentials {
  username: string;
  email: string;
  password: string;
  role: string;
}

export interface Admins {
  username: string;
  email: string;
  role: string;
  _id: string;
}



export const login = async (credentials: loginCredentials) => {
  const response = await customAxios.post('/api/v0/admin/login', credentials)
  console.log('response:', response.data);
  
  localStorage.setItem('token', response.data.token);

  
  return response.data;
}


export const createAdmin = async (credentials: createAdminCredentials) => {
  const response = await customAxios.post('/api/v0/admin/create', credentials, {
    headers: {
      'Authorization': `bearer ${localStorage.getItem('token')}`
      
    }
    
  });



  return response.data;
}

export const getAdmins = async () => {
  const response = await customAxios.get('/api/v1/admin/getAdmins', {
    headers: {
      'Authorization': `bearer ${localStorage.getItem('token')}`
    }
  });

  return response.data;

}

