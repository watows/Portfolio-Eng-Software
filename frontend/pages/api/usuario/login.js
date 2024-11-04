import { cors, runMiddleware } from '../../utils/corsMiddleware';

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