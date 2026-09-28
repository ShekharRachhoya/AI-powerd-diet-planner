export const schemas = {
  ApiResponse: {
    type: 'object',
    properties: {
      success: {
        type: 'boolean'
      },
      message: {
        type: 'string'
      },
      data: {
        type: 'object'
      }
    }
  },

  Profile: {
    type: 'object',
    properties: {
      _id: {
        type: 'string'
      },

      age: {
        type: 'number'
      },

      gender: {
        type: 'string'
      },

      height: {
        type: 'number'
      },

      weight: {
        type: 'number'
      },

      goal: {
        type: 'string'
      },

      activityLevel: {
        type: 'string'
      },

      dietaryPreferences: {
        type: 'array',
        items: {
          type: 'string'
        }
      },

      allergies: {
        type: 'array',
        items: {
          type: 'string'
        }
      },

      medicalConditions: {
        type: 'array',
        items: {
          type: 'string'
        }
      },

      calculations: {
        type: 'object',
        properties: {
          waterIntake: {
            type: 'number'
          },
          bmr: {
            type: 'number'
          },
          tdee: {
            type: 'number'
          },
          calories: {
            type: 'number'
          },
          protein: {
            type: 'number'
          },
          carbs: {
            type: 'number'
          },
          fats: {
            type: 'number'
          },
          completionPercentage: {
            type: 'number'
          }
        }
      }
    }
  },

  DietPlan: {
    type: 'object',
    properties: {
      _id: {
        type: 'string'
      },

      status: {
        type: 'string'
      },

      goal: {
        type: 'string'
      },

      calories: {
        type: 'number'
      },

      protein: {
        type: 'number'
      },

      carbs: {
        type: 'number'
      },

      fats: {
        type: 'number'
      },

      meals: {
        type: 'array',
        items: {
          type: 'object'
        }
      },

      recommendations: {
        type: 'array',
        items: {
          type: 'string'
        }
      }
    }
  }
};