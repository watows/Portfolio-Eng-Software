import React, { useState } from "react";
import { useRouter } from "next/router";
import { VscArrowCircleLeft } from "react-icons/vsc";
import withAuth from "../../components/autenticacao";

const IncluirReceita = () => {
  const router = useRouter();
  const [receita, setReceita] = useState({
    txt_breve_material: "",
    material: "",
    preco_plano: "",
    classe: "",
    categoria_incidencia1: "",
    cat1: "",
    incidencia_mes1: "",
    categoria_incidencia2: "",
    cat2: "",
    incidencia_mes2: "",
    gluten: "",
    lactose: "",
    osso: "",
    fragmento: "",
    espinha: "",
    kcal: "",
    cho: "",
    ptn: "",
    ptn_liq: "",
    gord_total: "",
    gord_sat: "",
    qtd_g: "",
    fibra: "",
    sodio: "",
    info_adicional: "",
  });

  const handleBackToMenu = () => {
    router.push("/home");
  };

  const handleChange = (field, value) => {
    setReceita((prev) => ({ ...prev, [field]: value }));
  };

  const handleIncluir = async () => {
    const receitaTratada = {
      ...receita,
      preco_plano: receita.preco_plano || null,
      incidencia_mes1: receita.incidencia_mes1 || null,
      incidencia_mes2: receita.incidencia_mes2 || null,
      kcal: receita.kcal || null,
      cho: receita.cho || null,
      ptn: receita.ptn || null,
      ptn_liq: receita.ptn_liq || null,
      gord_total: receita.gord_total || null,
      gord_sat: receita.gord_sat || null,
      qtd_g: receita.qtd_g || null,
      fibra: receita.fibra || null,
      sodio: receita.sodio || null,
      gluten: receita.gluten === true ? true : receita.gluten === false ? false : null,
      lactose: receita.lactose === true ? true : receita.lactose === false ? false : null,
      osso: receita.osso === true ? true : receita.osso === false ? false : null,
      fragmento: receita.fragmento === true ? true : receita.fragmento === false ? false : null,
      espinha: receita.espinha === true ? true : receita.espinha === false ? false : null,
    };
  
    try {
      const response = await fetch(`/api/receitas/incluir`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(receitaTratada),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao incluir receita");
      }
  
      alert("Receita incluída com sucesso!");
      router.push("/home");
    } catch (error) {
      console.error("Erro ao incluir receita:", error);
      alert("Erro ao incluir receita");
    }
  };
  
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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
        <h1 style={{ flex: 1, textAlign: "center", margin: 0 }}>Incluir Receita</h1>
      </div>

      <div style={{ marginTop: "80px", width: "100%", maxWidth: "800px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "15px 30px",
            width: "100%",
          }}
        >
          <div style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <label style={{ fontSize: "14px", marginBottom: "5px", textAlign: "center" }}>Descrição</label>
            <input
              type="text"
              value={receita.txt_breve_material}
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
                value={receita[item.field]}
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
            flexDirection: "column",
            alignItems: "center",
            marginTop: "20px",
            width: "100%",
            maxWidth: "800px",
          }}
        >
          <label style={{ fontSize: "14px", marginBottom: "5px" }}>Informações Adicionais</label>
          <textarea
            value={receita.info_adicional}
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
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <div
          className="botao-incluir"
          style={{
            height: "49px",
            width: "148px",
            position: "relative",
            cursor: "pointer",
            marginTop: "20px",
          }}
          onClick={handleIncluir}
        >
          <div
            className="overlap-group"
            style={{
              height: "49px",
              width: "146px",
              borderRadius: "20px",
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#ffffff80",
              border: "3px solid #0064a6",
            }}
          >
            <div
              className="text-wrapper"
              style={{
                color: "#0064a6",
                fontFamily: "Inter-Regular, Helvetica",
                fontSize: "16px",
                fontWeight: "400",
                textAlign: "center",
                zIndex: 1,
              }}
            >
              Incluir
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(IncluirReceita);