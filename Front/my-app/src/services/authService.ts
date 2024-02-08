import API from './api';

interface RegisterData {
  email: string;
  password: string;
  name: string;
}

interface LoginData {
  email: string;
  password: string;
}

const authService = {
  register: (data: RegisterData) => API.post('auth/register', data),
  login: (data: LoginData) => API.post('auth/login', data),
};

export default authService;
