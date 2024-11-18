import corsMiddleware from "../../../utils/corsMiddleware";

export default async function handler(req, res) {
    await corsMiddleware(req, res);

    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).end(`Método ${req.method} não permitido`);
    }

    const { action } = req.body;

    if (action === "verificar") {
        // Lógica para verificar cardápio
        try {
            const response = await fetch("http://127.0.0.1:5000/menu/verificar_cardapio", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(req.body),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Erro ao verificar cardápio existente:", errorData);
                return res.status(response.status).json({
                    message: errorData.message || "Erro ao verificar cardápio existente",
                    detalhes: errorData,
                });
            }

            const data = await response.json();
            return res.status(200).json(data);
        } catch (error) {
            console.error("Erro inesperado ao verificar cardápio:", error);
            return res.status(500).json({
                message: "Erro inesperado ao verificar cardápio",
                detalhes: error.message,
            });
        }
    } else if (action === "salvar") {
        // Lógica para salvar cardápio
        try {
            const response = await fetch("http://127.0.0.1:5000/menu/salvar_cardapio", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(req.body),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Erro ao salvar cardápio:", errorData);
                return res.status(response.status).json({
                    message: errorData.message || "Erro ao salvar cardápio",
                    detalhes: errorData,
                });
            }

            const data = await response.json();
            return res.status(200).json(data);
        } catch (error) {
            console.error("Erro inesperado ao salvar cardápio:", error);
            return res.status(500).json({
                message: "Erro inesperado ao salvar cardápio",
                detalhes: error.message,
            });
        }
    } else if (action === "gerar") {
        // Lógica para gerar cardápio
        try {
            const response = await fetch("http://127.0.0.1:5000/menu/gerar_cardapio", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(req.body),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Erro ao gerar cardápio:", errorData);
                return res.status(response.status).json({
                    message: errorData.message || "Erro ao gerar cardápio",
                    detalhes: errorData,
                });
            }

            const data = await response.json();
            return res.status(200).json(data);
        } catch (error) {
            console.error("Erro inesperado ao gerar cardápio:", error);
            return res.status(500).json({
                message: "Erro inesperado ao gerar cardápio",
                detalhes: error.message,
            });
        }
    } else {
        return res.status(400).json({ message: "Ação inválida fornecida" });
    }
}