import axios from 'axios';
import { Category } from '../types/CategoryTypes';

const categoryApi = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    Accept: 'application/json',
  },
  withCredentials: true,
});

export const getAllCategories = async () => {
  const { data } = await categoryApi.get<Category[]>('/categories');
  console.log(data);
  return data;
};