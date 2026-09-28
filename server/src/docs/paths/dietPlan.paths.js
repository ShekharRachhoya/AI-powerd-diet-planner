export default {
  '/api/v1/diet-plans/generate': {
    post: {
      tags: ['Diet Plans'],
      security: [
        {
          bearerAuth: []
        }
      ],

      summary:
        'Generate AI diet plan',

      responses: {
        202: {
          description:
            'Generation started'
        }
      }
    }
  },

  '/api/v1/diet-plans/latest': {
    get: {
      tags: ['Diet Plans'],
      security: [
        {
          bearerAuth: []
        }
      ],

      summary:
        'Get latest diet plan'
    }
  }
};