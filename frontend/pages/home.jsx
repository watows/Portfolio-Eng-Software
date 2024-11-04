import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AiFillSetting, AiFillSignature, AiFillReconciliation, AiFillEye, AiFillBulb } from "react-icons/ai";
import withAuth from "../components/autenticacao";

const Home = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    } else {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      body {
        margin: 0;
        overflow-y: hidden;
      }
      ::placeholder {
        color: #ffffff !important;
        opacity: 1;
      }
    `;
    document.head.appendChild(style);
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#ffffff",
      }}
    >
      <div
        style={{
          width: "303px",
          backgroundColor: "#80b2d3",
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          fontFamily: "var(--font-family-ui)",
          lineHeight: "140%",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <div
            style={{
              color: "#ffffff",
              fontWeight: "normal",
              fontSize: "14px",
            }}
          >
            Menu
          </div>
          <div
            style={{
              color: "#ffffff",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            Cardápio Personalizado
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "35px",
            color: "#ffffff",
            cursor: "pointer",
            fontWeight: "normal",
            fontSize: "14px",
          }}
          onClick={() => router.push("/cardapio/gerar")}
        >
          <AiFillBulb style={{ marginRight: "10px", fontSize: "20px" }} />
          Gerar Cardápio
        </div>

        <div style={{ borderBottom: "1px solid #ffffff", margin: "15px 0" }} />

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {[
            { name: "Incluir Receita", route: "/receita/incluir" },
            { name: "Editar Receita", route: "/receita/editar" },
            { name: "Excluir Receita", route: "/receita/excluir" },
            { name: "Buscar Receita", route: "/receita/buscar" },
          ].map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                color: "#ffffff",
                cursor: "pointer",
                fontWeight: "normal",
                fontSize: "14px",
              }}
              onClick={() => router.push(item.route)}
            >
              <AiFillSignature style={{ marginRight: "10px", fontSize: "20px" }} />
              {item.name}
            </div>
          ))}
        </div>

        <div style={{ borderBottom: "1px solid #ffffff", margin: "15px 0" }} />

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {[
            { name: "Relatório Custo", route: "/relatorio/custo" },
            { name: "Relatório Nutricional", route: "/relatorio/nutricional" },
          ].map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                color: "#ffffff",
                cursor: "pointer",
                fontWeight: "normal",
                fontSize: "14px",
              }}
              onClick={() => router.push(item.route)}
            >
              <AiFillReconciliation style={{ marginRight: "10px", fontSize: "20px" }} />
              {item.name}
            </div>
          ))}
        </div>

        <div style={{ borderBottom: "1px solid #ffffff", margin: "15px 0" }} />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            color: "#ffffff",
            cursor: "pointer",
            fontWeight: "normal",
            fontSize: "14px",
          }}
          onClick={() => router.push("/cardapio/visualizar")}
        >
          <AiFillEye style={{ marginRight: "10px", fontSize: "20px" }} />
          Visualização Mensal
        </div>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            justifyContent: "flex-start",
            cursor: "pointer",
          }}
          onClick={() => router.push("/configuracoes")}
        >
          <AiFillSetting style={{ color: "#ffffff", fontSize: "25px" }} />
        </div>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          alt="Logo"
          src="/images/img3.png"
          style={{
            width: "450px",
            height: "auto",
            opacity: 0.2,
          }}
        />
      </div>
    </div>
  );
};

export default withAuth(Home);