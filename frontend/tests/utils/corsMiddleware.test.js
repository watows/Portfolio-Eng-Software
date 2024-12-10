import { createMocks } from 'node-mocks-http';
import corsMiddleware from '../../utils/corsMiddleware';
import Cors from 'cors';

jest.mock('cors', () => jest.fn(() => (req, res, next) => next()));

describe('corsMiddleware', () => {
  it('should call the cors middleware correctly', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      headers: {
        'Origin': 'http://localhost:3000',
      },
    });

    await corsMiddleware(req, res);

    expect(Cors).toHaveBeenCalledWith({
      methods: ['POST', 'GET', 'PUT', 'DELETE', 'HEAD'],
      origin: 'http://localhost:3000',
    });

    expect(res._getStatusCode()).not.toBe(404);
  });
});