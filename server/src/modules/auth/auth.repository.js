import User from "../user/user.model.js";

class AuthRepository {
  findById(id) {
    return User.findById(id);
  }

  findByEmail(email) {
    return User.findOne({ email });
  }

  save(user) {
    return user.save();
  }
}

export default new AuthRepository();