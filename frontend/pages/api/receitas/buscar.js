import corsMiddleware from "../../../utils/corsMiddleware";

export default async function handler(req, res) {
    await corsMiddleware(req, res);

    if (req.method === 'GET') {
        const { id } = req.query;

        try {
            const response = await fetch(`http://localhost:5000/recipe/buscar_receita?id=${id}`);
            if (!response.ok) {
                if (response.status === 404) {
                    return res.status(404).json({ message: "Receita não encontrada" });
                }
                throw new Error("Erro ao buscar receita");
            }

            const receita = await response.json();
            return res.status(200).json(receita);
        } catch (error) {
            console.error("Erro ao buscar receita:", error);
            return res.status(500).json({ message: "Erro ao buscar receita" });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Método ${req.method} não permitido`);
    }
}