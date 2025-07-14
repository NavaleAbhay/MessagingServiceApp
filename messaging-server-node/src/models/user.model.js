class User {
    constructor(username, password) {
      this.username = username;
      this.password = password;
      this.verified = false;
    }
  }
  module.exports = User;