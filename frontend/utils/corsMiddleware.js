import Cors from 'cors';

const cors = Cors({
  methods: ['POST', 'GET', 'PUT', 'DELETE', 'HEAD'],
  origin: 'http://localhost:3000',
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function corsMiddleware(req, res) {
  await runMiddleware(req, res, cors);
}