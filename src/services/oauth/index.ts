import axios from "..";

export class GoogleOAuthService {
  static readonly root = "/google-oauth";

  static async login() {
    try {
      const response = await axios.get(`${this.root}/login`);

      window.location.href = response.data;
    } catch (error) {
      console.log(`구글 로그인 에러: ${error}`);
      throw error;
    }
  }

  static async loginSuccessRedirect(oauth_code: string) {
    try {
      const response = await axios.get(`${this.root}/callback`, {
        params: { code: oauth_code },
        withCredentials: true,
      });

      const accessToken = response.data.token;

      return accessToken;
    } catch (error) {
      console.log(`구글 로그인 redirect 에러: ${error}`);
      throw error;
    }
  }
}
