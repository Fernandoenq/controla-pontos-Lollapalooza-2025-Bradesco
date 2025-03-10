import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useRfidApi from "../hooks/useRfidApi";
import "../styles/NfcScreen.css";
import nfcImage from "../assets/nfclogo.png";

const NfcScreen: React.FC = () => {
  const navigate = useNavigate();
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
      navigate(-1);
    }
  };

  const isUUIDValid = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{2}$/.test(rfidValue);

  return (
    <div className="nfc-container">
      <h1 className="nfc-title">Passe o cartão</h1>
      <img src={nfcImage} alt="NFC" className="nfc-image" />
      <p className="rfid-data">{rfidValue ? `Cartão: ${rfidValue}` : "Aguardando leitura..."}</p>

      <button className="nfc-button" onClick={() => handleAction()} style={{ marginBottom: "10px" }}>
        Voltar
      </button>

      <button className="nfc-button" onClick={() => handleAction("/finalscreen")} disabled={!isUUIDValid}>
        Confirmar
      </button>
    </div>
  );
};

export default NfcScreen;