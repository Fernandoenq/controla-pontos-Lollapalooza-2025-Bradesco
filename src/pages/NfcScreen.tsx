import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useRfidApi from "../hooks/useRfidApi";
import "../styles/NfcScreen.css";

const NfcScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const tipo = location.state?.type || ""; // Obtendo o valor passado

  const { rfidValue, clearRetryInterval, resetRfidApi } = useRfidApi();

  useEffect(() => {
    console.log("Limpando cache do NFC...");
    localStorage.removeItem("rfidValue");
  }, []);

  const handleAction = (destino?: string) => {
    console.log("Ação acionada, parando consultas e resetando estado.");
    clearRetryInterval();
    resetRfidApi();

    if (destino) {
      navigate(destino);
    } else {
      navigate("/redirectscreen");
    }
  };

  const handleConfirm = () => {
    if (tipo === "bar") {
      navigate("/finalscreen");
    } else if (tipo === "manutencao") {
      navigate("/maintenance");
    }
  };

  const isUUIDValid = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{2}$/.test(
    rfidValue
  );

  return (
    <div
      className="nfc-container"
      style={{
        backgroundImage: `url('/redireciona.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1
        className="nfc-title"
        style={{
          color: "#cd092f",
          fontFamily: "BradescoSansBold", // Aplica a fonte personalizada
         
        }}
      >
        Aproxime seu Cartão da Maquininha
      </h1>
      <img
        src="cielo.png"
        alt="cielo"
        style={{
          height: "80px", // Altura igual à do botão
          width: "auto", // Largura automática para manter as proporções
          marginBottom: "20px", // Adiciona margem inferior de
        }}
      />

      <p
        className="rfid-data"
        style={{
          color: "#cd092f",
          fontFamily: "BradescoSans", // Aplica a fonte personalizada
        }}
      >
        {rfidValue ? `Cartão: ${rfidValue}` : "Aguardando leitura..."}
      </p>

     

      <button
        className="nfc-button"
        onClick={handleConfirm}
        disabled={!isUUIDValid}
        style={{
          backgroundColor: "#cd092f", // Cor de fundo vermelha
          color: "white", // Texto branco
          borderColor: "white", // Borda branca
          borderWidth: "1px", // Largura da borda de 1px
          borderStyle: "solid", // Estilo da borda sólido
          borderRadius: "9999px", // Bordas completamente arredondadas
          padding: "12px 20px", // Aumenta o padding vertical para 12px e horizontal para 20px
          fontSize: "2vh", // Ajuste opcional para tamanho da fonte
          fontWeight: "bold", // Define a fonte como negrito
          height: "80px", // Define a altura do botão para 50px
          fontFamily: "BradescoSansButtom", // Aplica a fonte personalizada
        }}
      >
        Confirmar
      </button>
      <button
        className="nfc-button"
        onClick={() => handleAction()}
        style={{
          backgroundColor: "#cd092f", // Cor de fundo vermelha
          color: "white", // Texto branco
          borderColor: "white", // Borda branca
          borderWidth: "1px", // Largura da borda de 1px
          borderStyle: "solid", // Estilo da borda sólido
          borderRadius: "9999px", // Bordas completamente arredondadas
          padding: "12px 20px", // Aumenta o padding vertical para 12px e horizontal para 20px
          fontSize: "2vh", // Ajuste opcional para tamanho da fonte
          fontWeight: "bold", // Define a fonte como negrito
          height: "80px", // Define a altura do botão para 50px
          fontFamily: "BradescoSansButtom", // Aplica a fonte personalizada
          marginTop: "20px", // Adiciona margem inferior de 20px
        }}
      >
        Voltar
      </button>
    </div>
  );
};

export default NfcScreen;
