import axios from "..";

export class AuthService {
  static readonly api = "/auth";

  static async issueAccessToken() {
    const response = (await axios.get(`${this.api}/issue-token`))?.data;

    axios.defaults.headers.common.Authorization = `Bearer ${response?.token}`;

    return response?.token;
  }

  static async logout() {
    await axios.post(`${this.api}/logout`);
    window.location.reload();
  }
}
