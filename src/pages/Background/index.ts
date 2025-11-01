import axios from 'axios';
import {
  HotBoardInfoMessage,
  HotBoardInfoMessageResponse,
  HotBoardInfoResponse,
  HotBoardListMessage,
  HotBoardListMessageResponse,
  HotBoardListResponse,
} from '../shared/types/hotBoards';
import { ChromeRuntime } from '../shared/lib/chrome';

const axiosInstance = axios.create({
  baseURL: 'https://api.trendnow.me',
  withCredentials: false,
  timeout: 10000,
});

ChromeRuntime.addListener<HotBoardListMessage, HotBoardListMessageResponse>(
  (
    message: { type: string; page?: number; size?: number },
    _,
    sendResponse
  ) => {
    if (message.type === 'GET_HOTBOARD_LIST') {
      axiosInstance
        .get<HotBoardListResponse>('/api/v1/boards/list', {
          params: { page: message.page, size: message.size },
        })
        .then((res) => sendResponse({ success: true, data: res.data }))
        .catch((err) => sendResponse({ success: false, error: err.message }));

      return true; // async 응답 허용
    }
  }
);

ChromeRuntime.addListener<HotBoardInfoMessage, HotBoardInfoMessageResponse>(
  (message, _, sendResponse) => {
    if (message.type === 'GET_HOTBOARD_INFO') {
      axiosInstance
        .get<HotBoardInfoResponse>('/api/v1/boards/realtime', {
          params: { boardId: message.boardId },
        })
        .then((res) => sendResponse({ success: true, data: res.data }))
        .catch((err) => sendResponse({ success: false, error: err.message }));

      return true; // async 응답 허용
    }
  }
);
