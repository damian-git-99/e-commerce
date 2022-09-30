const { default: axios } = require('axios');

class UserAPI {
  async login (email, password) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    );

    return data;
  }
}

export const userAPI = new UserAPI();
