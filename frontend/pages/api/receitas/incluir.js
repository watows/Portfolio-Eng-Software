import corsMiddleware from "../../../utils/corsMiddleware";

export default async function handler(req, res) {
    await corsMiddleware(req, res);

    if (req.method === 'POST') {
        const dados = req.body;

        try {
            const response = await fetch(`http://localhost:5000/recipe/incluir_receita`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dados),
            });

            if (response.ok) {
                const data = await response.json();
                return res.status(201).json(data);
            } else {
                const errorData = await response.json();
                console.error("Erro do backend:", errorData.message || errorData);
                return res.status(response.status).json({ message: errorData.message || "Erro ao incluir receita" });
            }
        } catch (error) {
            console.error("Erro ao incluir receita:", error);
            return res.status(500).json({ message: "Erro ao incluir receita" });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Método ${req.method} não permitido`);
    }
}