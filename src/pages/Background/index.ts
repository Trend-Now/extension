import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.trendnow.me',
  withCredentials: false,
  timeout: 10000,
});

chrome.runtime.onMessage.addListener(
  (
    message: { type: string; page?: number; size?: number },
    sender,
    sendResponse
  ) => {
    if (message.type === 'GET_HOTBOARD_LIST') {
      axiosInstance
        .get('/api/v1/boards/list', {
          params: { page: message.page, size: message.size },
        })
        .then((res) => sendResponse({ success: true, data: res.data }))
        .catch((err) => sendResponse({ success: false, error: err.message }));

      return true; // async 응답 허용
    }
  }
);

chrome.runtime.onMessage.addListener(
  (message: { type: string; boardId: number }, sender, sendResponse) => {
    if (message.type === 'GET_HOTBOARD_INFO') {
      axiosInstance
        .get('/api/v1/boards/realtime', {
          params: { boardId: message.boardId },
        })
        .then((res) => sendResponse({ success: true, data: res.data }))
        .catch((err) => sendResponse({ success: false, error: err.message }));

      return true; // async 응답 허용
    }
  }
);
