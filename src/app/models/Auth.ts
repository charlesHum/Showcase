export default class Auth {
  auth: boolean;
  token: string;

  constructor(auth, token) {
    this.auth = auth;
    this.token = token;
  }
}
