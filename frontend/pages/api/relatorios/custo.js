import corsMiddleware from "../../../utils/corsMiddleware";

export default async function handler(req, res) {
    await corsMiddleware(req, res);

    if (req.method === 'POST') {
        try {
            const response = await fetch("http://localhost:5000/menu/custo_cardapio", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(req.body),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Erro detalhado recebido do backend:", errorData);
                return res.status(response.status).json({
                    message: errorData.message || "Erro ao consultar custo do cardápio",
                    detalhes: errorData
                });
            }

            const data = await response.json();
            return res.status(200).json(data);
        } catch (error) {
            console.error("Erro inesperado ao tentar se comunicar com o backend:", error);
            return res.status(500).json({
                message: "Erro inesperado ao consultar custo do cardápio",
                detalhes: error.message
            });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Método ${req.method} não permitido`);
    }
}