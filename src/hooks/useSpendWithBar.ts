import { useState } from "react";

const useSpendWithBar = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const spendPoints = async (rfidValue: string): Promise<{ success: boolean; error: string | null }> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    const organizerId = localStorage.getItem("OrganizerId");
    const apiUrl = `http://18.231.158.211:3335/Balance/SpendWithBar/${rfidValue}/${organizerId}`;
    console.log(apiUrl)
    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        }
      });
      
      const data = await response.json();
      console.log(rfidValue);
      
      if (response.status === 200) {
        setSuccess(true);
        return { success: true, error: null };
      } else if (response.status === 422) {
        const errorMsg = data.Errors ? data.Errors.join(", ") : "Erro desconhecido";
        setError(errorMsg);
        return { success: false, error: errorMsg };
      } else {
        setError("Erro ao processar solicitação.");
        return { success: false, error: "Erro ao processar solicitação." };
      }
    } catch (err) {
      setError("Erro de conexão com o servidor.");
      return { success: false, error: "Erro de conexão com o servidor." };
    } finally {
      setLoading(false);
    }
  };

  return { spendPoints, success, loading, error };
};

export default useSpendWithBar;