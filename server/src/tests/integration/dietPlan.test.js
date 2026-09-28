import request
from 'supertest';

import app
from '../setup/testServer.js';

describe(
  'Diet Plan API',
  () => {
    test(
      'GET latest plan without token',
      async () => {
        const res =
          await request(
            app
          )
            .get(
              '/api/v1/diet-plans/latest'
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