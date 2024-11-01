import React, { useState, useEffect } from "react";
import { FaEnvelope, FaLock, FaPlusCircle } from "react-icons/fa";
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
        marginTop: "70px",
        marginBottom: "10px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className="input-email" style={{ position: "relative", width: "100%" }}>
        <div
          className="rectangle"
          style={{
            backgroundColor: "#0064a680",
            border: "3px solid #ffffff",
            borderRadius: "20px",
            height: "42px",
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
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
      <div className="input-senha" style={{ position: "relative", width: "100%" }}>
        <div
          className="rectangle"
          style={{
            backgroundColor: "#0064a680",
            border: "3px solid #ffffff",
            borderRadius: "20px",
            height: "42px",
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
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
  );
};

const LoginButton = ({ handleLogin, email, password }) => {
  const isDisabled = !email || !password;

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
        className="boto-entrar"
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
            onClick={isDisabled ? null : handleLogin}
          >
            entrar
          </div>
        </div>
      </div>
    </div>
  );
};

const PlusCircle = ({ handleRegisterRedirect }) => {
  return (
    <div
      className="plus-circle"
      style={{
        height: "35px",
        width: "35px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={handleRegisterRedirect}
    >
      <FaPlusCircle
        className="icon"
        style={{
          height: "33px",
          width: "33px",
          color: "#0064a6",
        }}
      />
    </div>
  );
};

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha: password }),
      });
  
      if (!response.ok) {
        throw new Error('Login falhou! Verifique seu e-mail e senha.');
      }
  
      const data = await response.json();
      const token = data.token;
  
      localStorage.setItem("authToken", token);
  
      router.push("/home");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleRegisterRedirect = () => {
    router.push("/cadastro");
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
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      overflow: "hidden",
    }}>
      <Image />
      <EmailBox setEmail={setEmail} />
      <PasswordBox setPassword={setPassword} />
      <LoginButton handleLogin={handleLogin} email={email} password={password} />
      <PlusCircle handleRegisterRedirect={handleRegisterRedirect} />
    </div>
  );
};

export default App;