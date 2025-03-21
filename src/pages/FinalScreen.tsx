import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import useFetchBalances from "../hooks/useFetchBalances";
import useSpendWithBar from "../hooks/useSpendWithBar";
import Popup from "../components/Popup";
import "../styles/FinalScreen.css";

const FinalScreen: React.FC = () => {
  const navigate = useNavigate();
  const [qrSize, setQrSize] = useState(500); // Tamanho padrão para tablets e telas maiores
  const [fontSize, setFontSize] = useState("24px"); // Tamanho padrão da fonte
  const rfidValue = localStorage.getItem("rfidValue") || "";
  const { balances, loading: balanceLoading, error: balanceError } = useFetchBalances();
  const { spendPoints, loading: spendLoading } = useSpendWithBar();
  const randomQRCodeURL = "https://bradesco-pre-cadastro.picbrand.dev.br/login";

  const [popupMessage, setPopupMessage] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const totalSaldo = balances.reduce((sum, balance) => sum + balance.Impact, 0);

  const handleConfirm = async () => {
    const result = await spendPoints(rfidValue);
    if (result.error) {
      setPopupMessage(result.error);
      setShowPopup(true);
    } else if (result.success) {
      setPopupMessage("Pontuação confirmada com sucesso!");
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        navigate("/redirectscreen");
      }, 2000);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setQrSize(250); // Tamanho reduzido para celulares
        setFontSize("18px"); // Fonte reduzida para celulares
      } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        setQrSize(500); // Tamanho padrão para tablets e desktops
        setFontSize("24px"); // Fonte padrão para tablets e desktops
      } else if (window.innerWidth >= 1024 && window.innerWidth < 1440) {
        setQrSize(700); // Aumenta o tamanho do QR para telas maiores
        setFontSize("28px"); // Aumenta um pouco a fonte
      } else {
        setQrSize(800); // Ajusta ainda mais para totens
        setFontSize("30px"); // Tamanho da fonte para totens
      }
    };
  
    handleResize(); // Executa no carregamento para definir o tamanho inicial
    window.addEventListener('resize', handleResize); // Ajusta o tamanho ao redimensionar a janela
  
    return () => {
      window.removeEventListener('resize', handleResize); // Limpa o event listener ao desmontar o componente
    };
  }, []);
  

  return (
    <div className="final-container" style={{
      backgroundImage: `url('/calc.png')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
      <Popup show={showPopup} message={popupMessage} />

      <h1 className="title" style={{
        color: "#cd092f",
        fontFamily: "BradescoSansBold",
        fontSize: fontSize, // Aplica o tamanho dinâmico da fonte
       marginTop: "20px", // Adiciona um espaçamento no topo
      }}>
        Confirmação de pontos
      </h1>
      <p className="description" style={{
          color: "#cd092f",
          fontFamily: "BradescoSans",
          fontSize: fontSize, // Aplica o tamanho dinâmico da fonte
        }}>
        Você vai gastar 10 pontos para participar do bar
      </p>

      <div className="saldo-container mb-10">
        {balanceLoading ? (
          <span>Carregando...</span>
        ) : balanceError ? (
          <span className="text-danger">{balanceError}</span>
        ) : (
          <button className="saldo-button" style={{
            backgroundColor: "#cd092f",
            color: "white",
            borderColor: "white",
            borderWidth: "1px",
            borderStyle: "solid",
            borderRadius: "9999px",
            padding: "12px 20px",
            fontSize: fontSize, // Aplica o tamanho dinâmico da fonte
            fontWeight: "bold",
            height: "80px",
            fontFamily: "BradescoSansBold",
            marginBottom: "20px",
          }}>Saldo atual: {totalSaldo}</button>
        )}
      </div>

      <p className="description" style={{
          color: "#cd092f",
          fontFamily: "BradescoSans",
          fontSize: fontSize, // Aplica o tamanho dinâmico da fonte
        }}>
        Caso queira ver toda a sua carteira de pontos, leia o QRCode abaixo
      </p>

      <div className="qrcode">
        <QRCodeSVG value={randomQRCodeURL} size={qrSize} />
      </div>

      <button
  className="confirm-button"
  onClick={handleConfirm}
  disabled={spendLoading}
  style={{
    backgroundColor: "#cd092f",
    color: "white",
    borderColor: "white",
    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: "9999px",
    padding: "12px 20px",
    fontSize: fontSize,
    fontWeight: "bold",
    height: "80px",
    fontFamily: "BradescoSansBold",
    marginBottom: "20px",
  }}
>
  {spendLoading ? "Carregando..." : "Confirmar ?"}
</button>


      <button className="confirm-button" onClick={() => navigate("/redirectscreen")} style={{
            backgroundColor: "#cd092f",
            color: "white",
            borderColor: "white",
            borderWidth: "1px",
            borderStyle: "solid",
            borderRadius: "9999px",
            padding: "12px 20px",
            fontSize: fontSize, // Aplica o tamanho dinâmico da fonte
            fontWeight: "bold",
            height: "80px",
            fontFamily: "BradescoSansBold",
            marginBottom: "20px",
          }}>Voltar</button>
    </div>
  );
};

export default FinalScreen;
