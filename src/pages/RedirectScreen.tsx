import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/RedirectScreen.css";

const RedirectScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleRedirect = (type: string) => {
    navigate("/nfcscreen", { state: { type } });
  };

  return (
    <div
      className="redirect-container"
      style={{
        backgroundImage: `url('/menu.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="redirect-title" style={{ color: "#cd092f" ,
          fontFamily: 'BradescoSansBold', // Aplica a fonte personalizada
        }}>Controle de Pontos</h1>
      <button
        onClick={() => handleRedirect("bar")}
        className="w-50 " // Utiliza 50% da largura do container
        style={{
          backgroundColor: "#cd092f", // Cor de fundo vermelha
          color: "white", // Texto branco
          borderColor: "white", // Borda branca
          borderWidth: "1px", // Largura da borda de 1px
          borderStyle: "solid", // Estilo da borda sólido
          borderRadius: "9999px", // Bordas completamente arredondadas
          padding: "12px 20px", // Aumenta o padding vertical para 12px e horizontal para 20px
          fontSize: "24px", // Ajuste opcional para tamanho da fonte
          fontWeight: "bold", // Define a fonte como negrito
          height: "80px", // Define a altura do botão para 50px
          fontFamily: 'BradescoSans', // Aplica a fonte personalizada
        }}
      >
        Bar
      </button>
      <button
        className="redirect-button"
        onClick={() => handleRedirect("manutencao")}
        style={{
          backgroundColor: "#cd092f", // Cor de fundo vermelha
          color: "white", // Texto branco
          borderColor: "white", // Borda branca
          borderWidth: "1px", // Largura da borda de 1px
          borderStyle: "solid", // Estilo da borda sólido
          borderRadius: "9999px", // Bordas completamente arredondadas
          padding: "12px 20px", // Aumenta o padding vertical para 12px e horizontal para 20px
          fontSize: "24px", // Ajuste opcional para tamanho da fonte
          fontWeight: "bold", // Define a fonte como negrito
          height: "80px", // Define a altura do botão para 50px
          fontFamily: 'BradescoSans', // Aplica a fonte personalizada
        }}
      >
        Manutenção de pontos
      </button>
      <button className="btn btn-danger" style={{
          position: "absolute", // Posiciona o botão absolutamente
          top: "10px", // 10px do topo do container
          right: "10px", // 10px da direita do container
        }} onClick={() => {
          sessionStorage.removeItem("cpf");
          navigate("/loginpromotor");
        }}>
          Sair
        </button>
      
    </div>
  );
};

export default RedirectScreen;
