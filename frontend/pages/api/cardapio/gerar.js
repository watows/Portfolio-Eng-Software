import corsMiddleware from "../../../utils/corsMiddleware";

export default async function handler(req, res) {
  await corsMiddleware(req, res);

  const { action } = req.body;

  if (req.method === "POST") {
    try {
      if (action === "gerar") {
        // Lógica para gerar cardápio
        const response = await fetch("http://127.0.0.1:5000/menu/gerar_cardapio", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(req.body),
        });

        if (!response.ok) {
          const errorData = await response.json();
          return res.status(response.status).json({
            message: errorData.message || "Erro ao gerar cardápio",
            detalhes: errorData,
          });
        }

        const data = await response.json();
        res.status(200).json(data);

      } else if (action === "verificar") {
        // Lógica para verificar se existe um cardápio para o mês/ano
        const response = await fetch("http://127.0.0.1:5000/menu/verificar_cardapio", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(req.body),
        });

        if (!response.ok) {
          const errorData = await response.json();
          return res.status(response.status).json({
            message: errorData.message || "Erro ao verificar cardápio",
            detalhes: errorData,
          });
        }

        const data = await response.json();
        res.status(200).json(data);

      } else if (action === "salvar") {
        // Lógica para salvar cardápio
        const { cardapio } = req.body;

        // Validação dos dados do cardápio antes de enviar para o backend
        const cardapioCompletado = cardapio.map((day) => {
          if (!day || !day.date) {
            throw new Error(`Data ausente ou inválida no cardápio: ${JSON.stringify(day)}`);
          }
          day.items.forEach((item) => {
            if (!item.name || !item.quantity || !item.kcal) {
              throw new Error(`Item incompleto no cardápio: ${JSON.stringify(item)}`);
            }
          });
          return day;
        });

        const response = await fetch("http://127.0.0.1:5000/menu/salvar_cardapio", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...req.body,
            cardapio: cardapioCompletado,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          return res.status(response.status).json({
            message: errorData.message || "Erro ao salvar cardápio",
            detalhes: errorData,
          });
        }

        const data = await response.json();
        res.status(200).json(data);

      } else {
        res.status(400).json({ message: "Ação inválida especificada." });
      }
    } catch (error) {
      console.error("Erro inesperado:", error);
      res.status(500).json({
        message: "Erro inesperado ao processar a solicitação",
        detalhes: error.message,
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}