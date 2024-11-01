import React from "react";
import { useRouter } from "next/router";
import { VscArrowCircleLeft } from "react-icons/vsc";

const EditarReceita = () => {
  const router = useRouter();

  const handleBackToMenu = () => {
    router.push("/home");
  };

  const handleBuscar = () => {
    console.log("Buscar receita");
  };

  const handleEditar = () => {
    console.log("Editar receita");
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
            cursor: "pointer",
            marginTop: "25px",
            marginBottom: "35px"
          }}
          onClick={handleBuscar}
        >
          <div
            style={{
              height: "49px",
              width: "146px",
              borderRadius: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#ffffff80",
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
        {[
          "Material",
          "Preço Porção",
          "Classe",
          "Categoria Incidência 1",
          "Categoria 1",
          "Incidência 1",
          "Categoria Incidência 2",
          "Categoria 2",
          "Incidência 2",
          "Glúten",
          "Lactose",
          "Osso",
          "Fragmento Osso",
          "Espinha",
          "CHO",
          "PTN",
          "PTN L",
          "Gord T",
          "Gord S",
          "Fibra",
          "Sódio",
        ].map((label, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <label style={{ fontSize: "14px", marginBottom: "5px" }}>{label}</label>
            <input
              type="text"
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
          style={{
            backgroundColor: "rgba(0, 100, 166, 0.50)",
            border: "none",
            borderRadius: "20px",
            padding: "10px",
            width: "100%",
            height: "100px",
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
            cursor: "pointer",
            marginTop: "20px",
          }}
          onClick={handleEditar}
        >
          <div
            style={{
              height: "49px",
              width: "146px",
              borderRadius: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#ffffff80",
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
              editar
            </span>
          </div>
        </div>
      </div>

      <div style={{ height: "30px" }}></div>
    </div>
  );
};

export default EditarReceita;