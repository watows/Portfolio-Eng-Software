import React, { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { VscArrowCircleLeft } from "react-icons/vsc";
import { SlLogout } from "react-icons/sl";
import { useRouter } from "next/router";
import withAuth from "../components/autenticacao";

const NameBox = ({ setName, value }) => {
  const handleChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div
      className="box"
      style={{
        height: "49px",
        width: "328px",
        marginBottom: "10px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className="input-name" style={{ height: "49px", width: "330px", position: "relative" }}>
        <div className="overlap-group" style={{ height: "49px", width: "328px", position: "relative" }}>
          <div
            className="rectangle"
            style={{
              backgroundColor: "#0064a680",
              border: "3px solid #ffffff",
              borderRadius: "20px",
              height: "42px",
              width: "326px",
              position: "absolute",
              top: "0",
              left: "0",
            }}
          />
          <FaUser
            className="user-icon"
            style={{
              height: "20px",
              width: "20px",
              color: "#ffffff",
              position: "absolute",
              top: "14px",
              left: "21px",
            }}
          />
          <input
            type="text"
            placeholder="nome"
            value={value}
            onChange={handleChange}
            style={{
              color: "#ffffff",
              fontFamily: "Inter-Regular, Helvetica",
              fontSize: "16px",
              background: "transparent",
              border: "none",
              outline: "none",
              width: "276px",
              position: "absolute",
              top: "50%",
              left: "52px",
              transform: "translateY(-50%)",
              textAlign: "left",
            }}
          />
        </div>
      </div>
    </div>
  );
};

const EmailBox = ({ setEmail, value }) => {
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div
      className="box"
      style={{
        height: "49px",
        width: "328px",
        marginBottom: "10px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className="input-email" style={{ height: "49px", width: "330px", position: "relative" }}>
        <div className="overlap-group" style={{ height: "49px", width: "328px", position: "relative" }}>
          <div
            className="rectangle"
            style={{
              backgroundColor: "#0064a680",
              border: "3px solid #ffffff",
              borderRadius: "20px",
              height: "42px",
              width: "326px",
              position: "absolute",
              top: "0",
              left: "0",
            }}
          />
          <FaEnvelope
            className="mail-icon"
            style={{
              height: "20px",
              width: "20px",
              color: "#ffffff",
              position: "absolute",
              top: "14px",
              left: "21px",
            }}
          />
          <input
            type="email"
            placeholder="e-mail"
            value={value}
            onChange={handleChange}
            style={{
              color: "#ffffff",
              fontFamily: "Inter-Regular, Helvetica",
              fontSize: "16px",
              background: "transparent",
              border: "none",
              outline: "none",
              width: "276px",
              position: "absolute",
              top: "50%",
              left: "52px",
              transform: "translateY(-50%)",
              textAlign: "left",
            }}
          />
        </div>
      </div>
    </div>
  );
};

const PasswordBox = ({ setPassword }) => {
  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div
      className="box"
      style={{
        height: "49px",
        width: "328px",
        marginBottom: "20px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className="input-senha" style={{ height: "49px", width: "330px", position: "relative" }}>
        <div className="overlap-group" style={{ height: "49px", width: "328px", position: "relative" }}>
          <div
            className="rectangle"
            style={{
              backgroundColor: "#0064a680",
              border: "3px solid #ffffff",
              borderRadius: "20px",
              height: "42px",
              width: "326px",
              position: "absolute",
              top: "0",
              left: "0",
            }}
          />
          <FaLock
            className="lock-icon"
            style={{
              height: "20px",
              width: "20px",
              color: "#ffffff",
              position: "absolute",
              top: "14px",
              left: "20px",
            }}
          />
          <input
            type="password"
            placeholder="senha"
            onChange={handleChange}
            style={{
              color: "#ffffff",
              fontFamily: "Inter-Regular, Helvetica",
              fontSize: "16px",
              background: "transparent",
              border: "none",
              outline: "none",
              width: "276px",
              position: "absolute",
              top: "50%",
              left: "52px",
              transform: "translateY(-50%)",
              textAlign: "left",
            }}
          />
        </div>
      </div>
    </div>
  );
};

const RegisterButton = ({ handleRegister, isModified }) => {
  return (
    <div
      className="box"
      style={{
        height: "49px",
        width: "146px",
        marginBottom: "20px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className="button-alterar" style={{ height: "49px", width: "148px", position: "relative" }}>
        <div className="overlap-group" style={{ height: "49px", width: "146px", borderRadius: "20px", position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div
            className="rectangle"
            style={{
              backgroundColor: "#ffffff80",
              border: "3px solid #0064a6",
              borderRadius: "20px",
              height: "42px",
              width: "146px",
              position: "absolute",
              top: "0",
              left: "0",
            }}
          />
          <div
            className="text-wrapper"
            style={{
              color: "#0064a6",
              fontFamily: "Inter-Regular, Helvetica",
              fontSize: "16px",
              fontWeight: "400",
              textAlign: "center",
              zIndex: 1,
              cursor: isModified ? "pointer" : "not-allowed",
            }}
            onClick={isModified ? handleRegister : null}
          >
            Alterar
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [originalData, setOriginalData] = useState({});
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      router.push("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:5000/auth/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          setName(data.nome);
          setEmail(data.email);
          setOriginalData({ nome: data.nome, email: data.email });
        } else {
          alert(data.message || "Erro ao buscar dados do usuário");
          router.push("/login");
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        router.push("/login");
      }
    };

    fetchUserData();
  }, [router]);

  const handleUpdate = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch("http://localhost:5000/auth/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nome: name, email: email, senha: password || undefined }),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setOriginalData({ nome: name, email: email });
        setPassword("");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Erro ao atualizar dados do usuário:", error);
      alert("Ocorreu um erro ao atualizar os dados. Tente novamente.");
    }
  };

  const isModified = () => name !== originalData.nome || email !== originalData.email || password;

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.push("/login");
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
        position: "relative",
      }}
    >
      <div style={{ position: "fixed", top: "20px", left: "20px", cursor: "pointer" }} onClick={() => router.back()}>
        <VscArrowCircleLeft size={50} color="rgba(0, 100, 166, 0.5)" />
      </div>
      <h1 style={{ textAlign: "center", marginBottom: "40px", width: "100%" }}>Configurações</h1>
      <h2 style={{ textAlign: "center", marginBottom: "20px", width: "100%" }}>Dados do Usuário</h2>
      <NameBox setName={setName} value={name} />
      <EmailBox setEmail={setEmail} value={email} />
      <PasswordBox setPassword={setPassword} />
      <RegisterButton handleRegister={handleUpdate} isModified={isModified()} />
      <h2 style={{ textAlign: "center", marginTop: "40px", marginBottom: "20px", width: "100%" }}>Regras de Negócio</h2>
      <div
        style={{
          width: "70%",
          backgroundColor: "rgba(0, 100, 166, 0.1)",
          borderRadius: "10px",
          padding: "20px",
          textAlign: "left",
          color: "rgba(0, 100, 166, 0.8)",
          fontSize: "14px",
          lineHeight: "1.6",
          marginBottom: "40px",
        }}
      >
        <p>• Regra 1: Descrição da regra de negócio.</p>
        <p>• Regra 2: Descrição da regra de negócio.</p>
        <p>• Regra 3: Descrição da regra de negócio.</p>
      </div>

      <div
        style={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          marginTop: "20px",
          color: "rgba(0, 100, 166, 0.8)",
        }}
        onClick={handleLogout}
      >
        <SlLogout size={24} style={{ marginRight: "8px" }} />
        <span>Logout</span>
      </div>

      <footer
        style={{
          width: "100%",
          textAlign: "center",
          fontSize: "12px",
          color: "rgba(0, 100, 166, 0.5)",
          padding: "10px",
          borderTop: "1px solid rgba(0, 100, 166, 0.1)",
          marginTop: "auto",
          paddingBottom: "30px"
        }}
      >
        <p>Versão do App: 1.0.0</p>
        <p>© 2024 Cardápio Personalizado by Nathalya Melchert® | Todos direitos reservados</p>
      </footer>
    </div>
  );
};

export default withAuth(App);