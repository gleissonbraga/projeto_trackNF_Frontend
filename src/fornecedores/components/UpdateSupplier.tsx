import { useState } from "react";
import apiClient from "../../api/apiClient";
import type { TypeSupplier } from "../types/Suppliers";

interface UpdateProps {
  onClose: () => void
  selectSupplier: TypeSupplier | null
}

export default function UpdateSupplier({ onClose, selectSupplier }: UpdateProps) {
  const [fantasy_name, setFantasy_name] = useState("");
  const [reason_name, setReason_name] = useState("");
  const [cnpjInput, setCnpj] = useState("");
  const [state_registration, setState_registration] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState({
    reason_name: "",
    cnpj: "",
    state_registration,
    show: ''
  });

  function formatCNPJInput(value: string) {
    return value
      .replace(/\D/g, "") // remove tudo que não for número
      .replace(/^(\d{2})(\d)/, "$1.$2") // insere o primeiro ponto
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3") // insere o segundo ponto
      .replace(/\.(\d{3})(\d)/, ".$1/$2") // insere a barra
      .replace(/(\d{4})(\d)/, "$1-$2") // insere o hífen
      .slice(0, 18); // limita a 18 caracteres
  }

  function cleanCNPJ(value: string) {
    return value.replace(/\D/g, "");
  }

  const handleSubmitRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro({
      reason_name: "",
      cnpj: "",
      state_registration: "",
      show: ''
    });

    const cnpj = cleanCNPJ(cnpjInput);

    try {
      const response = await apiClient.post(`/api/fornecedores/${selectSupplier?.id_supplier}`, {
        fantasy_name,
        reason_name,
        cnpj,
        state_registration,
        phone_number,
        email,
      });
      onClose();
    } catch (error: any) {
      if (error.response && error.response.data) {
        const msg = error.response.data.message;
        if (msg == "Preencha todos os dados") {
          setErro((prev) => ({ ...prev, show: "Todos os dados são obrigatórios" }));
        } else if (msg == "Este Nome Razão já existe") {
          setErro((prev) => ({ ...prev, reason_name: msg }))
        } else if (msg == "Este CNPJ já existe") {
          setErro((prev) => ({ ...prev, cnpj: msg }));
        } else if (msg == "Esta Inscrição Estadual já existe") {
          setErro((prev) => ({ ...prev, state_registration: msg }));
        }
      }
    }
  };
  return (
    <div className="fixed inset-0 bg-black backdrop-blur-[1.6px] bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-[70%] h-[670px] relative bg-white rounded-lg">
        <div className="absolut w-full bg-black flex justify-end rounded-t-lg ">
          <button
            className="relative bg-black text-center text-white hover:bg-red-600 text-xl font-bold w-[50px] h-[30px] rounded-tr-lg justify-center flex"
            onClick={onClose}
          >
            x
          </button>
        </div>
      </div>
    </div>
  );
}
