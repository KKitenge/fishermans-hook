import jwtDecode from 'jwt-decode';

export default class AuthService {
  static loggedIn() {
    const token = AuthService.getToken();
    return !!token && !AuthService.isTokenExpired(token);
  }

  static isTokenExpired(token) {
    if (!token) {
      return true;
    }

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      return decodedToken.exp < currentTime;
    } catch (error) {
      console.log('Error decoding token: ', error);
      return true;
    }
  }

  static getToken() {
    return localStorage.getItem('id_token');
  }

  static login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.pathname = '/';
  }

  static logout() {
    console.log("Logout User")
    localStorage.removeItem('id_token');
    window.location.pathname = '/login';
  }
}