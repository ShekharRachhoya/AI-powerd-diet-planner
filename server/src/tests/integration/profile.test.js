import request
from 'supertest';

import app
from '../setup/testServer.js';

describe(
  'Profile API',
  () => {
    test(
      'GET profile without token',
      async () => {
        const res =
          await request(
            app
          )
            .get(
              '/api/v1/profile'
            );

        expect(
          res.status
        ).toBe(
          401
        );
      }
    );
  }
);