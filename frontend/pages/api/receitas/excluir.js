import corsMiddleware from "../../../utils/corsMiddleware";

export default async function handler(req, res) {
    await corsMiddleware(req, res);

    if (req.method === 'DELETE') {
        const { id } = req.query;

        try {
            const response = await fetch(`http://127.0.0.1:5000/recipe/excluir_receita?id=${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                console.error("Erro do backend:", errorMessage);
                return res.status(response.status).json({ message: errorMessage });
            }

            const data = await response.json();
            return res.status(200).json(data);

        } catch (error) {
            console.error("Erro ao excluir receita:", error);
            return res.status(500).json({ message: 'Erro ao excluir receita' });
        }
    } else {
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end(`Método ${req.method} não permitido`);
    }
}