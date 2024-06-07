import tokenService from '../../utils/token';
import axios from '../../axiosConfig';
import { AuthResponse, LoginBody, SignUpBody } from '../../types';

const loginApi = '/login';
const registerApi = '/signup';
const refreshTokenApi = '/refreshToken';

class AuthService {

  handleAuthResponse(response: AuthResponse) {
    const { accessToken, refreshToken } = response.data;
    tokenService.saveToken(accessToken);
    tokenService.saveRefreshToken(refreshToken);
    return response;
  }

  register(formData: SignUpBody) {
    const loginBody: LoginBody = {
      email: formData.email,
      password: formData.password,
    };

    return axios.post(registerApi, formData).then(() => {
      return axios.post(loginApi, loginBody).then(this.handleAuthResponse);
    });
  }

  login(formData: LoginBody) {
    return axios.post(loginApi, formData).then(this.handleAuthResponse);
  }

  signOut() {
    tokenService.signOut();
  }

  refreshToken() {
    const body = {
      refreshToken: tokenService.getRefreshToken()
    };

    return axios.post(refreshTokenApi, body).then((response) => {
      const token = response.data;
      if (token) {
        tokenService.saveToken(token.accessToken);
      }
      return response;
    })
    .catch((error) => {
        window.location.href = '/login';
    });
  }
}

const authServiceInstance = new AuthService();

export default authServiceInstance;