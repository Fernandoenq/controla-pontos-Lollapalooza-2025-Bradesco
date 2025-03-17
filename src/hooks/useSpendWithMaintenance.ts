import { useState } from "react";

const useSpendWithMaintenance = () => {
  const [popupMessage, setPopupMessage] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const sendRequest = async (impactValue: number, justification: string) => {
    const organizerId = localStorage.getItem("OrganizerId") || "";
    const rfidvalue = localStorage.getItem("rfidValue") || "";

    const payload = {
      ExternalCode: rfidvalue,
      OrganizerId: organizerId,
      Operation: impactValue === 10 ? 1 : 2,
      Justification: justification,
    };
    console.log(payload)
    try {
      const response = await fetch("https://api-back.picbrand.dev.br/Balance/SpendWithMaintenance", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setPopupMessage("Operação realizada com sucesso!");
      } else {
        setPopupMessage("Erro ao processar a solicitação.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      setPopupMessage("Erro ao conectar com o servidor.");
    }

    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000); // Esconde o popup após 3 segundos
  };

  return { sendRequest, popupMessage, showPopup };
};

export default useSpendWithMaintenance;
