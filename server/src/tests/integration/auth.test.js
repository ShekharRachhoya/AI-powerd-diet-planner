import request
from 'supertest';

import app
from '../setup/testServer.js';

describe(
  'Auth API',
  () => {
    test(
      'POST /auth/google should fail without token',
      async () => {
        const res =
          await request(
            app
          )
            .post(
              '/api/v1/auth/google'
            )
            .send({});

        expect(
          res.status
        ).toBe(
          400
        );
      }
    );
  }
);