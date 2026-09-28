import User from "./user.model.js";

class UserRepository {
  create(data) {
    return User.create(data);
  }

  findByEmail(email) {
    return User.findOne({ email });
  }

  findById(id) {
    return User.findById(id);
  }

  findByGoogleId(googleId) {
    return User.findOne({
      googleId
    });
  }

  save(user) {
    return user.save();
  }
}

export default new UserRepository();