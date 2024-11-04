import corsMiddleware from "../../../utils/corsMiddleware";

export default async function handler(req, res) {
    // Executa o middleware de CORS
    await corsMiddleware(req, res);

    if (req.method === 'GET') {
        const { id } = req.query;

        try {
            console.log("Fetching receita from backend with ID:", id);
            const response = await fetch(`http://localhost:5000/recipe/buscar_receita?id=${id}`);
            console.log("Backend response status:", response.status);

            if (!response.ok) {
                const errorMessage = await response.text();
                console.error("Erro do backend:", errorMessage);
                throw new Error('Erro ao buscar receita');
            }

            const receita = await response.json();
            console.log("Receita fetched successfully:", receita);
            return res.status(200).json(receita);
        } catch (error) {
            console.error("Erro ao buscar receita no frontend handler:", error);
            return res.status(500).json({ message: 'Erro ao buscar receita' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Método ${req.method} não permitido`);
    }
}