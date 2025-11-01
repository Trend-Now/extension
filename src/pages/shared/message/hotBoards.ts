import { useQuery } from '@tanstack/react-query';
import {
  HotBoardInfoResponse,
  HotBoardInfoMessage,
  HotBoardInfoMessageResponse,
  HotBoardListResponse,
  HotBoardListMessage,
  HotBoardListMessageResponse,
} from '../types/hotBoards';
import { ChromeRuntime } from '../lib/chrome';

export function useHotBoardList(
  page?: number,
  size?: number,
  enabled?: boolean
) {
  return useQuery<HotBoardListResponse>({
    queryKey: ['hotBoards', page, size],
    queryFn: () =>
      new Promise((resolve, reject) => {
        ChromeRuntime.sendMessage<
          HotBoardListMessage,
          HotBoardListMessageResponse
        >({ type: 'GET_HOTBOARD_LIST', page, size }, (response) => {
          if (response.success && response.data) resolve(response.data);
          else reject(new Error(response.error));
        });
      }),
    enabled,
  });
}

export function useHotBoardInfo(
  boardId: number,
  config?: { enabled: boolean }
) {
  return useQuery<HotBoardInfoResponse>({
    queryKey: ['hotBoardInfo', boardId],
    queryFn: () =>
      new Promise((resolve, reject) => {
        ChromeRuntime.sendMessage<
          HotBoardInfoMessage,
          HotBoardInfoMessageResponse
        >({ type: 'GET_HOTBOARD_INFO', boardId }, (response) => {
          if (response.success && response.data) resolve(response.data);
          else reject(new Error(response.error));
        });
      }),
    enabled: config?.enabled ?? true,
  });
}
