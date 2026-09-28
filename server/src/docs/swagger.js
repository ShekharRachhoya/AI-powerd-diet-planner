import swaggerUi
from 'swagger-ui-express';

import swaggerJsdoc
from 'swagger-jsdoc';

import {
  schemas
}
from './components/schemas.js';

import {
  responses
}
from './components/responses.js';

import {
  securitySchemes
}
from './components/security.js';

import authPaths
from './paths/auth.paths.js';

import profilePaths
from './paths/profile.paths.js';

import dietPlanPaths
from './paths/dietPlan.paths.js';

const spec =
  swaggerJsdoc({
    definition: {
      openapi: '3.0.0',

      info: {
        title:
          'AI Health Coach API',

        version:
          '1.0.0',

        description:
          'Production-grade AI Health Coach Backend API'
      },

      servers: [
        {
          url:
            'http://localhost:5000'
        }
      ],

      components: {
        securitySchemes,
        schemas,
        responses
      },

      paths: {
        ...authPaths,
        ...profilePaths,
        ...dietPlanPaths
      }
    },

    apis: []
  });

export const swaggerDocs =
  app => {
    app.use(
      '/docs',
      swaggerUi.serve,
      swaggerUi.setup(
        spec,
        {
          explorer:
            true
        }
      )
    );
  };