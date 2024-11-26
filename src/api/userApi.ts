import axios from 'axios';
import { UserInput } from '../types/UserTypes.ts';

const userApi = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    Accept: 'application/json',
  },
  withCredentials: true,
});

//registration
export const postUser = async (formData: UserInput) => {
  await userApi.post('/users', formData);
};

export const loginUser = async (formData: UserInput) => {
  await userApi.post('/login', formData);
}

export const logoutUser = async () => {
  await userApi.post('/logout');
}