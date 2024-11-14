import React, { useState } from "react";
import { useRouter } from "next/router";
import { VscArrowCircleLeft } from "react-icons/vsc";
import withAuth from "../../components/autenticacao";

const BuscarReceita = () => {
  const router = useRouter();
  const [receitaId, setReceitaId] = useState("");
  const [receita, setReceita] = useState(null);
  const [mensagemErro, setMensagemErro] = useState("");

  const handleBackToMenu = () => {
    router.push("/home");
  };

  const handleBuscar = async () => {
    try {
      const response = await fetch(`/api/receitas/buscar?id=${receitaId}`);

      if (!response.ok) {
        if (response.status === 404) {
          setReceita(null);
          alert("Receita não encontrada");
          return;
        }
        alert("Erro ao buscar receita");
        return;
      }

      const data = await response.json();
      setReceita(data);
    } catch (error) {
      console.error("Erro ao buscar receita:", error);
      alert("Erro ao buscar receita");
    }
  };


  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        fontFamily: "var(--font-family-ui)",
        color: "rgba(0, 100, 166, 0.50)",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          position: "fixed",
          top: "0",
          width: "100%",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#ffffff",
          zIndex: 1000,
          padding: "10px 0",
        }}
      >
        <VscArrowCircleLeft
          style={{
            fontSize: "50px",
            cursor: "pointer",
            position: "absolute",
            left: "10px",
          }}
          onClick={handleBackToMenu}
        />
        <h1 style={{ flex: 1, textAlign: "center", margin: 0 }}>Buscar Receita</h1>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "50px",
          width: "100%",
          maxWidth: "130px",
        }}
      >
        <label style={{ fontSize: "14px", marginBottom: "5px" }}>ID</label>
        <input
          type="text"
          value={receitaId}
          onChange={(e) => setReceitaId(e.target.value)}
          style={{
            backgroundColor: "rgba(0, 100, 166, 0.50)",
            border: "none",
            borderRadius: "20px",
            padding: "10px",
            width: "100%",
            maxWidth: "250px",
            textAlign: "center",
            color: "#ffffff",
            fontSize: "14px",
            outline: "none",
          }}
        />
        <div
          style={{
            height: "49px",
            width: "148px",
            position: "relative",
            cursor: receitaId ? "pointer" : "not-allowed",
            marginTop: "25px",
            marginBottom: "35px",
          }}
          onClick={receitaId ? handleBuscar : null}
        >
          <div
            style={{
              height: "49px",
              width: "146px",
              borderRadius: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "3px solid #0064a6",
            }}
          >
            <span
              style={{
                color: "#0064a6",
                fontFamily: "Inter-Regular, Helvetica",
                fontSize: "16px",
                fontWeight: "400",
              }}
            >
              buscar
            </span>
          </div>
        </div>
      </div>

      {mensagemErro && (
        <p style={{ color: "red", marginTop: "10px" }}>{mensagemErro}</p>
      )}

      {receita && (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "15px 30px",
              marginTop: "20px",
              width: "100%",
              maxWidth: "800px",
            }}
          >
            <div style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <label style={{ fontSize: "14px", marginBottom: "5px", textAlign: "center" }}>Descrição</label>
              <input
                type="text"
                value={receita?.txt_breve_material || ""}
                onChange={(e) => handleChange("txt_breve_material", e.target.value)}
                style={{
                  backgroundColor: "rgba(0, 100, 166, 0.50)",
                  border: "none",
                  borderRadius: "20px",
                  padding: "10px",
                  width: "100%",
                  textAlign: "center",
                  color: "#ffffff",
                  fontSize: "14px",
                  outline: "none",
                  maxWidth: "800px",
                }}
              />
            </div>

            {[
              { label: "Material", value: receita?.material },
              { label: "Preço Porção", value: `R$ ${receita?.preco_plano || "-"}` },
              { label: "Classe", value: receita?.classe },
              { label: "Categoria Incidência 1", value: receita?.categoria_incidencia1 },
              { label: "Categoria 1", value: receita?.cat1 },
              { label: "Incidência 1", value: receita?.incidencia_mes1 },
              { label: "Categoria Incidência 2", value: receita?.categoria_incidencia2 || "-" },
              { label: "Categoria 2", value: receita?.cat2 || "-" },
              { label: "Incidência 2", value: receita?.incidencia_mes2 || "-" },
              { label: "Glúten", value: receita?.gluten ? "Sim" : "Não" },
              { label: "Lactose", value: receita?.lactose ? "Sim" : "Não" },
              { label: "Osso", value: receita?.osso ? "Sim" : "Não" },
              { label: "Fragmento Osso", value: receita?.fragmento ? "Sim" : "Não" },
              { label: "Espinha", value: receita?.espinha ? "Sim" : "Não" },
              { label: "Calorias", value: receita?.kcal },
              { label: "CHO", value: receita?.cho },
              { label: "PTN", value: receita?.ptn },
              { label: "PTN Líquido", value: receita?.ptn_liq },
              { label: "Gordura Total", value: receita?.gord_total },
              { label: "Gordura Saturada", value: receita?.gord_sat },
              { label: "Quantidade (g)", value: receita?.qtd_g },
            ].map((field, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <label style={{ fontSize: "14px", marginBottom: "5px" }}>{field.label}</label>
                <input
                  type="text"
                  value={field.value || "-"}
                  readOnly
                  style={{
                    backgroundColor: "rgba(0, 100, 166, 0.50)",
                    border: "none",
                    borderRadius: "20px",
                    padding: "10px",
                    width: "100%",
                    maxWidth: "250px",
                    textAlign: "center",
                    color: "#ffffff",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />
              </div>
            ))}

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "30px",
                gridColumn: "1 / -1",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <label style={{ fontSize: "14px", marginBottom: "5px" }}>Fibra</label>
                <input
                  type="text"
                  value={receita?.fibra || "-"}
                  readOnly
                  style={{
                    backgroundColor: "rgba(0, 100, 166, 0.50)",
                    border: "none",
                    borderRadius: "20px",
                    padding: "10px",
                    maxWidth: "250px",
                    textAlign: "center",
                    color: "#ffffff",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <label style={{ fontSize: "14px", marginBottom: "5px" }}>Sódio</label>
                <input
                  type="text"
                  value={receita?.sodio || "-"}
                  readOnly
                  style={{
                    backgroundColor: "rgba(0, 100, 166, 0.50)",
                    border: "none",
                    borderRadius: "20px",
                    padding: "10px",
                    maxWidth: "250px",
                    textAlign: "center",
                    color: "#ffffff",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "20px",
              width: "100%",
              maxWidth: "800px",
            }}
          >
            <label style={{ fontSize: "14px", marginBottom: "5px" }}>Informações Adicionais</label>
            <textarea
              value={receita?.info_adicional || "-"}
              readOnly
              style={{
                backgroundColor: "rgba(0, 100, 166, 0.50)",
                border: "none",
                borderRadius: "20px",
                padding: "10px",
                width: "100%",
                height: "50px",
                color: "#ffffff",
                fontSize: "14px",
                fontFamily: "var(--font-family-ui)",
                resize: "none",
                outline: "none",
              }}
            />
          </div>
        </>
      )}

      <div style={{ height: "30px" }}></div>
    </div>
  );
};

export default withAuth(BuscarReceita);