import React, { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { VscArrowCircleLeft } from "react-icons/vsc";
import { useRouter } from "next/router";

const NameBox = ({ setName }) => {
  const handleChange = (e) => {
    setName(e.target.value);
    console.log("Nome:", e.target.value);
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
      <div
        className="input-name"
        style={{
          height: "49px",
          width: "330px",
          position: "relative",
        }}
      >
        <div
          className="overlap-group"
          style={{
            height: "49px",
            width: "328px",
            position: "relative",
          }}
        >
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

const EmailBox = ({ setEmail }) => {
  const handleChange = (e) => {
    setEmail(e.target.value);
    console.log("Email:", e.target.value);
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
      <div
        className="input-email"
        style={{
          height: "49px",
          width: "330px",
          position: "relative",
        }}
      >
        <div
          className="overlap-group"
          style={{
            height: "49px",
            width: "328px",
            position: "relative",
          }}
        >
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
    console.log("Senha:", e.target.value);
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
      <div
        className="input-senha"
        style={{
          height: "49px",
          width: "330px",
          position: "relative",
        }}
      >
        <div
          className="overlap-group"
          style={{
            height: "49px",
            width: "328px",
            position: "relative",
          }}
        >
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

const RegisterButton = ({ handleRegister, name, email, password }) => {
  const isDisabled = !name || !email || !password;

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
      <div
        className="button-alterar"
        style={{
          height: "49px",
          width: "148px",
          position: "relative",
        }}
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
          }}
        >
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
              cursor: isDisabled ? "not-allowed" : "pointer",
            }}
            onClick={isDisabled ? null : handleRegister}
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
  const router = useRouter();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    
    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome: name, email, senha: password }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert(data.message);
        router.push("/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Erro ao registrar:", error);
      alert("Ocorreu um erro ao registrar. Tente novamente.");
    }
  };

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
      <div
        style={{
          position: "fixed",
          top: "20px",
          left: "20px",
          cursor: "pointer",
        }}
        onClick={() => router.back()}
      >
        <VscArrowCircleLeft size={40} color="rgba(0, 100, 166, 0.5)" />
      </div>

      <h1 style={{ textAlign: "center", marginBottom: "40px", width: "100%" }}>Configurações</h1>

      <h2 style={{ textAlign: "center", marginBottom: "20px", width: "100%" }}>Dados do Usuário</h2>
    
      <NameBox setName={setName} />
      <EmailBox setEmail={setEmail} />
      <PasswordBox setPassword={setPassword} />
      <RegisterButton handleRegister={handleRegister} name={name} email={email} password={password} />

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

export default App;