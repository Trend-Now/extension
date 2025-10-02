import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.trendnow.me',
  withCredentials: true,
  timeout: 10000,
});

export const axiosHotBoardList = async <T>(
  page?: number,
  size?: number
): Promise<T> =>
  (await axiosInstance.get('/api/v1/boards/list', { params: { page, size } }))
    .data;
