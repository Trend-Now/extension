import { HotBoardKey } from '../const/hotboard';

interface MessageError {
  error?: string;
}

export interface HotBoardListMessage {
  type: keyof HotBoardKey;
  page?: number;
  size?: number;
}

export interface HotBoardListMessageResponse extends MessageError {
  success: boolean;
  data?: HotBoardListResponse;
}

export interface HotBoardInfoMessage {
  type: keyof HotBoardKey;
  boardId: number;
}

export interface HotBoardInfoMessageResponse extends MessageError {
  success: boolean;
  data?: HotBoardInfoResponse;
}

export interface HotBoardListResponse {
  totalPageCount: number;
  totalBoardCount: number;
  boardInfoDtos: HotBoardList[];
}

export interface HotBoardList {
  boardId: number;
  boardName: string;
  postCount: number;
  viewCount: number;
  boardLiveTime: number;
  score: number;
  createdAt: string;
  updatedAt: string;
}

export interface HotBoardInfoResponse {
  boardId: number;
  boardName: string;
  boardLiveTime: number;
  boardExpiredTime: number;
  score: number;
  summary: string;
}
