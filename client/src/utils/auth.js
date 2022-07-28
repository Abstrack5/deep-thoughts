import decode from 'jwt-decode';

class AuthService{
    // retrieve data saved in token
    getProfile() {
        return decode(this.getToken());
    }

    // check if the user is sttill logged in
    loggedIn() {
        //checks if there is a saved token and it's stlil valid
        const token = this.getToken();
        // use type coersion to check if token is NOT undefined and the toke is NOT expired
        return !!token && !this.isTokenExpired(token);
    }

    // check if the token has expired
    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() /1000) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }

    // retrieve token  from localStorage
    getToken() {
        // retrieves the user token from localStorage
        return localStorage.getItem('id_token');
    }

    // set token to localStorage and reload page to homepage
    login(idToken) {
        // saves user token to localStorage
        localStorage.setItem('id_token', idToken);

        window.location.assign('/');
    }

    //clear token from localStorage and force logout with reload
    logout() {
        //clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
        // this will reload the page and reset the state of the application
        window.location.assign('/');
    }
}

export default new AuthService();


//With this, we're creating a new JavaScript class called AuthService that we 
// instantiate a new version of for every component that imports it. This isn't always 
// necessary, but it does ensure we are using a new version of the functionality and 
// takes some of the risk out of leaving remnant data hanging around.