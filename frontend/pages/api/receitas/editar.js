import corsMiddleware from "../../../utils/corsMiddleware";

export default async function handler(req, res) {
    await corsMiddleware(req, res);

    if (req.method === 'PUT') {
        const { id, dados } = req.body;

        try {
            const response = await fetch(`http://127.0.0.1:5000/recipe/editar_receita`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, dados }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Erro ao editar receita');
            }

            const data = await response.json();
            return res.status(200).json(data);
        } catch (error) {
            console.error("Erro ao editar receita:", error);
            return res.status(500).json({ message: 'Erro ao editar receita' });
        }
    } else {
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Método ${req.method} não permitido`);
    }
}