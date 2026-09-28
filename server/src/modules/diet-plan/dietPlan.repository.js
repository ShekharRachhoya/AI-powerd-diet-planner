import DietPlan from './dietPlan.model.js';

class DietPlanRepository {
  create(data) {
    return DietPlan.create(data);
  }

  findById(id) {
    return DietPlan.findById(id);
  }

  findLatestByUser(userId) {
    return DietPlan.findOne({
      user: userId
    }).sort({
      createdAt: -1
    });
  }

  update(id, payload) {
    return DietPlan.findByIdAndUpdate(
      id,
      payload,
      {
        new: true
      }
    );
  }
}

export default new DietPlanRepository();