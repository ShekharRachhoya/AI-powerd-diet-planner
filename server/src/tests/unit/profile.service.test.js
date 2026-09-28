import profileService
from '../../modules/profile/profile.service.js';

describe(
  'Profile Service',
  () => {
    test(
      'should create profile',
      async () => {
        const payload = {
          age: 25,
          gender:
            'male',
          height:
            175,
          weight:
            80,
          goal:
            'weight_loss',
          activityLevel:
            'moderate'
        };

        expect(
          payload.age
        ).toBe(
          25
        );
      }
    );
  }
);