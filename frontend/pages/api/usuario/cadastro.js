import { cors, runMiddleware } from '../../utils/corsMiddleware';

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

  if (req.method === 'POST') {
    const { username, password, email } = req.body;

    res.status(201).json({ message: 'Cadastro bem-sucedido' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}