import Profile from './profile.model.js';

class ProfileRepository {
  create(data) {
    return Profile.create(data);
  }

  findByUser(userId) {
    return Profile.findOne({
      user: userId
    });
  }

  update(userId, data) {
    return Profile.findOneAndUpdate(
      {
        user: userId
      },
      data,
      {
        new: true,
        runValidators: true
      }
    );
  }

  delete(userId) {
    return Profile.findOneAndDelete({
      user: userId
    });
  }
}

export default new ProfileRepository();