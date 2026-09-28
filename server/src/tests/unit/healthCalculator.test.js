import {
  calculateWaterIntake,
  calculateBMR,
  calculateTDEE,
  calculateMacros
}
from '../../utils/healthCalculator.js';

describe(
  'Health Calculations',
  () => {
    test(
      'should calculate water intake',
      () => {
        const result =
          calculateWaterIntake({
            weight: 80,
            activityLevel:
              'moderate'
          });

        expect(
          result
        ).toBe(
          3300
        );
      }
    );

    test(
      'should calculate bmr',
      () => {
        const result =
          calculateBMR({
            age: 25,
            gender:
              'male',
            height:
              175,
            weight:
              80
          });

        expect(
          result
        ).toBe(
          1774
        );
      }
    );

    test(
      'should calculate tdee',
      () => {
        const result =
          calculateTDEE({
            bmr: 1774,
            activityLevel:
              'moderate'
          });

        expect(
          result
        ).toBe(
          2749
        );
      }
    );

    test(
      'should calculate macros',
      () => {
        const result =
          calculateMacros({
            tdee: 2749,
            goal:
              'weight_loss'
          });

        expect(
          result.calories
        ).toBe(
          2249
        );
      }
    );
  }
);