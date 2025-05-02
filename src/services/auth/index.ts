import axios from "..";

export class AuthService {
  static readonly api = "/auth";

  static async issueAccessToken() {
    await axios.get(`${this.api}/issue-token`);
  }

  static async logout() {
    await axios.post(`${this.api}/logout`);
    window.location.reload();
  }

  static async testAccountLogin(code: string) {
    await axios.post(`${this.api}/test-account`, {
      code: code,
    });
  }
}
