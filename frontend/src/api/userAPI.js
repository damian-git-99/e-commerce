const { default: axios } = require('axios');

class UserAPI {
  async login (email, password) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const { data } = await axios.post(
      'http://localhost:5000/api/users/login',
      { email, password },
      config
    );

    return data;
  }

  async signup (name, email, password) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const { data } = await axios.post('http://localhost:5000/api/users/signup',
      { name, email, password },
      config
    );

    return data;
  }

  async getUserDetails (token) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    };
    const { data } = await axios.get('http://localhost:5000/api/users/profile', config);
    return data;
  }
}

export const userAPI = new UserAPI();
