import { cors, runMiddleware } from '../../../utils/corsMiddleware';

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

  if (req.method === 'GET') {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    try {
      const response = await fetch(`http://localhost:5000/auth/user`, {
        method: 'GET',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar dados do usuário');
      }

      const userData = await response.json();
      res.status(200).json(userData);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar dados do usuário', error: error.message });
    }

  } else if (req.method === 'PUT') {
    const token = req.headers.authorization;
    const updatedData = req.body;

    if (!token) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    try {
      const response = await fetch(`http://localhost:5000/auth/user`, {
        method: 'PUT',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar dados do usuário');
      }

      const result = await response.json();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar dados do usuário', error: error.message });
    }

  } else {
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}