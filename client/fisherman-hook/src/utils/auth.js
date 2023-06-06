import decode from 'jwt-decode';

// Created a class to handle authentication methods
export default class AuthService {
    // Created a method to get the profile of the user
    getProfile() {
        return decode(this.getToken());
    }

    // Created a method to check if the user is logged in
    loggedIn() {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }

    // Created a method to check if the token is expired
    isTokenExpired(token) {
        const decoded = decode(token);

        if (decoded.exp < Date.now() / 1000) {
            localStorage.removeItem('id_token');
            return true;
        }

        return false;
    }

    // Created a method to get the token from local storage
    getToken() {
        return localStorage.getItem('id_token');
    }

    // Created a method to login the user
    login(idToken) {
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
    }

    // Created a method to logout the user
    logout() {
        localStorage.removeItem('id_token');
        window.location.reload();
    }
}
