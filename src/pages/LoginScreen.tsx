import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginScreen.css"; 
import { useApi } from "../hooks/useApi";
import Popup from "../components/Popup";

const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const { callApi, showPopup, popupMessage } = useApi(); 
  const [login, setLogin] = useState<string>("");
  const [secretKey, setSecretKey] = useState<string>("");

  const handleLogin = async () => {
    const loginData = {
      Login: login,
      SecretKey: secretKey,
    };
  
    const response = await callApi("/Organizer/Login", "PUT", loginData);
  
    if (response && response.Organizers && response.Organizers.length > 0) { 
      localStorage.setItem("OrganizerId", response.Organizers[0].OrganizerId.toString());
      console.log("OrganizerId salvo:", localStorage.getItem("OrganizerId"));
  
      setTimeout(() => {
        navigate("/redirectscreen"); 
      }, 1000);
    }
  };
  
  return (
    <div className="login-container"  style={{
      backgroundImage: `url('/login.png')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
      <Popup show={showPopup} message={popupMessage} />
      <h1 className="mb-4" style={{ color: "#cd092f" ,
          fontFamily: 'BradescoSansBold', // Aplica a fonte personalizada
          fontSize: "3vh", // Ajuste opcional para tamanho da fonte
        }}>Login do promotor</h1>

      <div className="input-container">
      <style>
          {`
    .input-placeholder-white::placeholder {
      color: white; /* Define a cor do placeholder para branco */
    }
  `}
        </style>
  
          <input
          type="text"
          className="form-control mb-3 block w-full px-3 py-2 text-white rounded-full placeholder-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent input-placeholder-white"
          placeholder="Digite seu usuário" 
          value={login} 
          onChange={(e) => setLogin(e.target.value)} 
         
          style={{ backgroundColor: "#cd092f", borderRadius: "9999px",
            fontFamily: 'BradescoSans', // Aplica a fonte personalizada
            fontSize: "2vh", // Ajuste opcional para tamanho da fonte
           }} // Max border-radius for full pill shape
        />
      </div>

      <div className="input-container">
      
          <input
          type="password" 
          id="password" 
          className="form-control mb-3 block w-full px-3 py-2 text-white rounded-full placeholder-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent input-placeholder-white"
          placeholder="Digite sua senha" 
          value={secretKey} 
          onChange={(e) => setSecretKey(e.target.value)} 
          style={{ backgroundColor: "#cd092f", borderRadius: "9999px",
            fontFamily: 'BradescoSans', 
            fontSize: "2vh", // Ajuste opcional para tamanho da fonte
           }} 
        />
        
      </div>
      <button
          className="w-50 login-button" // Utiliza 50% da largura do container
          onClick={handleLogin}
          disabled={!login || !secretKey}
          style={{
            backgroundColor: "#cd092f", // Cor de fundo vermelha
            color: "white", // Texto branco
            borderColor: "white", // Borda branca
            borderWidth: "1px", // Largura da borda de 1px
            borderStyle: "solid", // Estilo da borda sólido
            borderRadius: "9999px", // Bordas completamente arredondadas
            padding: "12px 20px", // Aumenta o padding vertical para 12px e horizontal para 20px
            fontSize: "3vh", // Ajuste opcional para tamanho da fonte
            fontWeight: "bold", // Define a fonte como negrito
            height: "50px", // Define a altura do botão para 50px
            fontFamily: 'BradescoSansButtom', // Aplica a fonte personalizada
          }}
        >
          Entrar
        </button>

     
    </div>
  );
};

export default LoginScreen;