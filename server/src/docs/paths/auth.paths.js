export default {
  '/api/v1/auth/google': {
    post: {
      tags: ['Authentication'],
      summary: 'Login with Google ID Token',

      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                idToken: {
                  type: 'string'
                }
              }
            }
          }
        }
      },

      responses: {
        200: {
          description:
            'Login successful'
        }
      }
    }
  },

  '/api/v1/auth/refresh': {
    post: {
      tags: ['Authentication'],
      summary:
        'Refresh access token'
    }
  },

  '/api/v1/auth/logout': {
    post: {
      tags: ['Authentication'],
      security: [
        {
          bearerAuth: []
        }
      ],
      summary:
        'Logout user'
    }
  }
};