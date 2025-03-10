import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import useFetchBalance from "../hooks/useFetchBalance";
import useSpendWithBar from "../hooks/useSpendWithBar";
import Popup from "../components/Popup";
import "../styles/FinalScreen.css";

const FinalScreen: React.FC = () => {
  const navigate = useNavigate();
  const rfidValue = localStorage.getItem("rfidValue") || "";
  const { balanceCurrentValue, loading: balanceLoading, error: balanceError } = useFetchBalance(rfidValue);
  const { spendPoints, success, loading: spendLoading, error: spendError } = useSpendWithBar();
  const randomQRCodeURL = "https://bradesco-pre-cadastro.picbrand.dev.br/login";

  const [popupMessage, setPopupMessage] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);

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
    if (showPopup) {
      const timer = setTimeout(() => setShowPopup(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  return (
    <div className="final-container">
      <Popup show={showPopup} message={popupMessage} />

      <h1 className="title">Confirmação de pontos</h1>
      <p className="description">Você vai gastar 10 pontos para participar do bar</p>

      <div className="saldo-container">
        {balanceLoading ? (
          <span>Carregando...</span>
        ) : balanceError ? (
          <span className="text-danger">{balanceError}</span>
        ) : (
          <button className="saldo-button">Saldo atual: {balanceCurrentValue}</button>
        )}
      </div>

      <p className="description">Caso queira ver toda a sua carteira de pontos, leia o QRCode abaixo</p>

      <div className="qrcode">
        <QRCodeSVG value={randomQRCodeURL} size={500} />
      </div>

      <button className="confirm-button" onClick={handleConfirm} disabled={spendLoading}>Confirmar pontuação?</button>
    </div>
  );
};

export default FinalScreen;