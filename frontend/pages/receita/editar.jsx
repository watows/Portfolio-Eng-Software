import React, { useState } from "react";
import { useRouter } from "next/router";
import { VscArrowCircleLeft } from "react-icons/vsc";
import withAuth from "../../components/autenticacao";

const EditarReceita = () => {
  const router = useRouter();
  const [receitaId, setReceitaId] = useState("");
  const [receita, setReceita] = useState(null);
  const [dadosOriginais, setDadosOriginais] = useState(null);

  const handleBackToMenu = () => {
    router.push("/home");
  };

  const handleBuscar = async () => {
    try {
      const response = await fetch(`/api/receitas/buscar?id=${receitaId}`);
      if (!response.ok) {
        if (response.status === 404) {
          setReceita(null);
          setDadosOriginais(null);
          alert("Receita não encontrada");
          return;
        }
        alert("Erro ao buscar receita");
        return;
      }
      const data = await response.json();
      setReceita(data);
      setDadosOriginais(data);
    } catch (error) {
      console.error("Erro ao buscar receita:", error);
      alert("Erro ao buscar receita");
    }
  };

  const handleEditar = async () => {
    try {
      const response = await fetch(`/api/receitas/editar`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: receitaId, dados: receita }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erro ao editar receita:", {
          status: response.status,
          message: errorData.message || errorData,
        });
        throw new Error("Erro ao editar receita");
      }

      alert("Receita atualizada com sucesso!");
      setDadosOriginais(receita);
    } catch (error) {
      console.error("Erro ao editar receita:", error);
      alert("Erro ao editar receita");
    }
  };

  const hasChanges = JSON.stringify(receita) !== JSON.stringify(dadosOriginais);

  const handleChange = (field, value) => {
    setReceita((prev) => ({ ...prev, [field]: value }));
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
        <h1 style={{ flex: 1, textAlign: "center", margin: 0 }}>Editar Receita</h1>
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
              Buscar
            </span>
          </div>
        </div>
      </div>

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
              { label: "Material", field: "material" },
              { label: "Preço Porção", field: "preco_plano" },
              { label: "Classe", field: "classe" },
              { label: "Categoria Incidência 1", field: "categoria_incidencia1" },
              { label: "Categoria 1", field: "cat1" },
              { label: "Incidência 1", field: "incidencia_mes1" },
              { label: "Categoria Incidência 2", field: "categoria_incidencia2" },
              { label: "Categoria 2", field: "cat2" },
              { label: "Incidência 2", field: "incidencia_mes2" },
              { label: "Glúten", field: "gluten" },
              { label: "Lactose", field: "lactose" },
              { label: "Osso", field: "osso" },
              { label: "Fragmento Osso", field: "fragmento" },
              { label: "Espinha", field: "espinha" },
              { label: "Calorias", field: "kcal" },
              { label: "CHO", field: "cho" },
              { label: "PTN", field: "ptn" },
              { label: "PTN Líquido", field: "ptn_liq" },
              { label: "Gordura Total", field: "gord_total" },
              { label: "Gordura Saturada", field: "gord_sat" },
              { label: "Quantidade (g)", field: "qtd_g" },
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <label style={{ fontSize: "14px", marginBottom: "5px" }}>{item.label}</label>
                <input
                  type="text"
                  value={receita[item.field] || ""}
                  onChange={(e) => handleChange(item.field, e.target.value)}
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
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "30px",
              marginTop: "20px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <label style={{ fontSize: "14px", marginBottom: "5px" }}>Fibra</label>
              <input
                type="text"
                value={receita?.fibra || ""}
                onChange={(e) => handleChange("fibra", e.target.value)}
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
                value={receita?.sodio || ""}
                onChange={(e) => handleChange("sodio", e.target.value)}
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
              value={receita?.info_adicional || ""}
              onChange={(e) => handleChange("info_adicional", e.target.value)}
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

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                height: "49px",
                width: "148px",
                position: "relative",
                cursor: hasChanges ? "pointer" : "not-allowed",
                marginTop: "20px",
              }}
              onClick={hasChanges ? handleEditar : null}
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
                  Editar
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default withAuth(EditarReceita);