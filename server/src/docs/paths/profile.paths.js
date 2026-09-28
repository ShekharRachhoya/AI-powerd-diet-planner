export default {
  '/api/v1/profile': {
    get: {
      tags: ['Profile'],
      security: [
        {
          bearerAuth: []
        }
      ],

      summary:
        'Get profile',

      responses: {
        200: {
          description:
            'Profile fetched'
        }
      }
    },

    post: {
      tags: ['Profile'],
      security: [
        {
          bearerAuth: []
        }
      ],

      summary:
        'Create profile',

      requestBody: {
        required: true,

        content: {
          'application/json': {
            schema: {
              $ref:
                '#/components/schemas/Profile'
            }
          }
        }
      }
    },

    patch: {
      tags: ['Profile'],
      security: [
        {
          bearerAuth: []
        }
      ],

      summary:
        'Update profile'
    },

    delete: {
      tags: ['Profile'],
      security: [
        {
          bearerAuth: []
        }
      ],

      summary:
        'Delete profile'
    }
  }
};