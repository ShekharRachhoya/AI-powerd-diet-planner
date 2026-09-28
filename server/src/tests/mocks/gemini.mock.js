export default {
  generate:
    jest.fn(async () => ({
      meals: [
        {
          name:
            'Breakfast',
          calories: 500,
          foods: [
            'Oats',
            'Banana'
          ]
        }
      ],
      recommendations: [
        'Drink water'
      ]
    }))
};