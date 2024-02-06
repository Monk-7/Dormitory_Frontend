import apiClient from '../services/apiClient';

interface loginProp {
  username: string;
  password: string;
}

interface registerProp {
  email: string,
  password: string,
  confirmPassword: string,
  name : string,
  lastname : string,
  phonenumber : string,
  role : string,
}

export const checkLogin = async () => {
  const token: string = localStorage.getItem('token') || '';
  try {
    const res = await apiClient('https://localhost:7282/Api/User/ValiDateToken', {
      method: 'GET',
    });
    if (res.status === 401 || res.status === 403) {
      localStorage.setItem('token', '');
      return false;
    }
  } catch (e) {
    console.log(e);
  }
  return true;
};
export const login = async (body: loginProp) => {
  
  try {
      const res = await apiClient('https://localhost:7282/Api/User/Login', {
        method: 'POST',
        data: body,
      });
      console.log(res);
      return res;
  }
  catch (error)
  {
    return error;
  }
};
export const registerFunc = async (body: registerProp) => {
  try {
    const res = await apiClient('https://localhost:7282/Api/User/Register', {
      method: 'POST',
      data: body,
    });
    console.log(res);
    return res;
  }
  catch (error)
  {
    return error;
  }
};