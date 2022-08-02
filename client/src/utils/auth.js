import decode from 'jwt-decode';

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token) {
    const decoded = decode(token);
    // sets time so there can be an expiration time
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('id_token');
      return true;
    }
    return false;
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    // saves items item to localstorage
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    // clears toeksn from localstorage
    localStorage.removeItem('id_token');
    window.location.reload();
  }
}

export default new AuthService();
