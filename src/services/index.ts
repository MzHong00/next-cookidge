import axios from "axios";

import type { ApiFetchOptions } from "@/types/common";
import { AuthService } from "./auth";

// 요청 메모이제이션으로 사용될 API를 요청하는 인스턴스
export const apiFetch = async <T>(
  url: string,
  init?: ApiFetchOptions
): Promise<T> => {
  const { cookie, ...config } = init || {};

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/${url}`, {
    headers: {
      Cookie: `${cookie}`,
    },
    next: {
      revalidate: 10,
      ...config,
    },
  });
  const data = await res.json();

  return data;
};

// NextJS 서버 측 -> API 서버
export const axiosBeApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/api`,
});

// 일반적인 코어 인스턴스
const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_CLIENT}/api/`,
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // 엑세스 토큰 만료 (재발급 로직)
    if (error.response?.status === 498) {
      await AuthService.issueAccessToken();

      // 기존 요청의 data를 JSON으로 파싱하여 복원
      if (error.config.data) error.config.data = JSON.parse(error.config.data);
      const response = await axios.request(error.config);

      return response;
    }

    // 리프레시 토큰 만료 (로그아웃 로직)
    if (error.response?.status === 488) {
      AuthService.logout();
    }

    throw error;
  }
);

export default instance;
