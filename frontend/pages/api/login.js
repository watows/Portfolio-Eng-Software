import Cors from 'cors';

const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
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

export default async function handler(req, res) {
    await runMiddleware(req, res, cors);

    if (req.method === 'POST') {
        const { email, senha } = req.body;

        res.status(200).json({ message: 'Login bem-sucedido' });

    } else {

        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Método ${req.method} não permitido`);
    }
}