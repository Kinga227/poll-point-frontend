import axios from 'axios';
import { Answer } from '../types/AnswerTypes';

const answerApi = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    Accept: 'application/json',
  },
  withCredentials: true,
});

export const getMyAnswer = async (myAnswer) => {
    const { data } = await answerApi.get<[Answer]>('/answers', {
      params: myAnswer, 
    });
    console.log(data);
    return data;
  };