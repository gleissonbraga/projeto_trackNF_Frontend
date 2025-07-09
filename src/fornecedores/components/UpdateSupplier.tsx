import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import type { TypeSupplier } from "../types/Suppliers";
import formatPhone from "../../utils/format/formatPhone";
import cleanPhone from "../../utils/clean/cleanPhone";



interface UpdateProps {
  onClose: () => void;
  selectSupplier: TypeSupplier | null;
}




export default function UpdateSupplier({
  onClose,
  selectSupplier,
}: UpdateProps) {
  const [isActive, setIsActive] = useState(selectSupplier?.status === "ATIVO");
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
    show: "",
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

  const handleToggle = () => {
  setIsActive(prev => !prev);
};

  function cleanCNPJ(value: string) {
    return value.replace(/\D/g, "");
  }

  const handleSubmitUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro({
      reason_name: "",
      cnpj: "",
      state_registration: "",
      show: "",
    });

    const cnpj = cleanCNPJ(cnpjInput);
    const phone = cleanPhone(phone_number)

    try {
      const response = await apiClient.put(
        `/api/fornecedores/${selectSupplier?.id_supplier}`,
        {
          fantasy_name,
          reason_name,
          cnpj,
          state_registration,
          phone_number: phone,
          email,
          status: isActive ? "ATIVO" : "INATIVO"
        }
      );
      
      onClose();
    } catch (error: any) {
      if (error.response && error.response.data) {
        const msg = error.response.data.message;
        if (msg == "Preencha todos os dados") {
          setErro((prev) => ({
            ...prev,
            show: "Todos os dados são obrigatórios",
          }));
        } else if (msg == "Este Nome Razão já existe") {
          setErro((prev) => ({ ...prev, reason_name: msg }));
        } else if (msg == "Este CNPJ já existe") {
          setErro((prev) => ({ ...prev, cnpj: msg }));
        } else if (msg == "Esta Inscrição Estadual já existe") {
          setErro((prev) => ({ ...prev, state_registration: msg }));
        }
      }
    }
  };


  useEffect(() => {
  if (selectSupplier) {
    setFantasy_name(selectSupplier.fantasy_name || "");
    setReason_name(selectSupplier.reason_name || "");
    setCnpj(formatCNPJInput(selectSupplier.cnpj || ""));
    setState_registration(selectSupplier.state_registration || "");
    setPhone_number(formatPhone(selectSupplier.phone_number || ""));
    setEmail(selectSupplier.email || "");
    setIsActive(selectSupplier.status === "ATIVO");
  }
}, [selectSupplier]);
  return (
    <div className="fixed inset-0 bg-black backdrop-blur-[1.6px] bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-[40%] min-h-[500px] relative bg-white rounded-lg flex flex-col items-center pb-10">
        <div className="absolut w-full bg-black flex justify-end rounded-t-lg ">
          <button
            className="relative bg-black text-center text-white hover:bg-red-600 text-xl font-bold w-[50px] h-[30px] rounded-tr-lg justify-center flex"
            onClick={onClose}
          >
            x
          </button>
        </div>
        <div className="flex items-center justify-center w-[90%] mt-6">
          <h2 className="w-[90%] text-center font-semibold text-xl sm:text-4xl text-blue-800 p-2">
            Atualizar Fornecedor
          </h2>
        </div>
        {erro.show && (
          <div className=" bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded shadow-md text-sm z-50 w-auto">
            {erro.show}
          </div>
        )}
        <div className=" w-[90%] min-h-[320px] flex justify-center items-center">
          <form
            onSubmit={handleSubmitUpdate}
            className="flex gap-2 flex-col items-center w-[90%]"
          >
            <input
              type="text"
              placeholder="Nome Fantasia"
              className=" p-2  w-[98%] border-b-2 border-gray-600"
              value={fantasy_name}
              autoFocus
              onChange={(e) => setFantasy_name(e.target.value)}
              name="fantasy_name"
              id="fantasy_name"
            />
            <input
              type="text"
              placeholder="Nome Razão"
              className={` p-2 w-[98%] border-b-2 border-gray-600
              ${
                erro.reason_name ? " border-red-500 bg-red-100 border-2 " : ""
              }`}
              value={reason_name}
              onChange={(e) => setReason_name(e.target.value)}
              name="reason_name"
              id="reason_name"
            />
            {erro.reason_name && (
              <span className="text-red-500 text-xs text-center">
                {erro.reason_name}
              </span>
            )}
            <div className="flex flex-wrap gap-2 items-center justify-center w-[98%]">
              <input
                type="text"
                placeholder="CNPJ"
                className={` p-2  w-[100%] sm:w-[56%] border-b-2 border-gray-600
                ${erro.cnpj ? " border-red-500 bg-red-100 border-2 " : ""}`}
                maxLength={18}
                value={cnpjInput}
                onChange={(e) => setCnpj(formatCNPJInput(e.target.value))}
              />
              <input
                type="text"
                placeholder="Inscriçao Estadual"
                className={` p-2  w-[100%] sm:w-[40%] border-b-2 border-gray-600
                  ${
                    erro.state_registration
                      ? " border-red-500 bg-red-100 border-2 "
                      : ""
                  }`}
                value={state_registration}
                onChange={(e) => setState_registration(e.target.value)}
              />
            </div>
            {erro.cnpj && (
              <span className="text-red-500 text-xs text-center">
                {erro.cnpj}
              </span>
            )}
            {erro.state_registration && (
              <span className="text-red-500 text-xs text-center">
                {erro.state_registration}
              </span>
            )}
            <div className="flex flex-wrap gap-2 items-center justify-center w-[98%]">
              <input
                type="text"
                placeholder="Email"
                className=" p-2  w-[100%] sm:w-[56%] border-b-2 border-gray-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="Telefone"
                className=" p-2 w-[100%] sm:w-[40%] border-b-2 border-gray-600"
                maxLength={15}
                value={phone_number}
                onChange={(e) => setPhone_number(formatPhone(e.target.value))}
              />
            </div>
            <div className="flex items-center justify-start w-full mt-2 px-2">
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={handleToggle}
                    className="sr-only"
                  />
                  <div className={`block ${isActive ? "bg-green-600" : "bg-red-500"} w-[5.6rem] h-6 rounded-full`}>
                    <p className={`text-sm font-semibold ${isActive ? "text-left pl-2 pt-[0.6px] text-green-200" : "text-right pr-2 pt-[0.6px] text-red-200"}`}>
                      {isActive ? "Ativo" : "Inativo"}
                    </p>
                  </div>
                  <div
                    className={`dot absolute left-1 top-1 bg-white w-6 h-4 rounded-full transition ${
                      isActive ? "translate-x-14" : ""
                    }`}
                  ></div>
                </div>
              </label>
            </div>
            <button type="submit" className="mt-4 bn39">
              <span className="bn39span">Salvar</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
