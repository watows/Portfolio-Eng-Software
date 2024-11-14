import React, { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { useRouter } from "next/router";

const Image = () => {
  return (
    <div
      className="image"
      style={{
        height: "150px",
        width: "150px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        className="logo"
        alt="Logo"
        src="/images/img3.png"
        style={{
          height: "150px",
          width: "150px",
          objectFit: "cover",
          marginLeft: "50px",
        }}
      />
    </div>
  );
};

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
        marginTop: "70px",
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
        marginBottom: "40px",
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
        className="boto-cadastrar"
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
            cadastrar
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
        justifyContent: "center",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Image />
      <NameBox setName={setName} />
      <EmailBox setEmail={setEmail} />
      <PasswordBox setPassword={setPassword} />
      <RegisterButton handleRegister={handleRegister} name={name} email={email} password={password} />
    </div>
  );
};

export default App;