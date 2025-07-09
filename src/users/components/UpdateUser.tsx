import { useEffect, useState } from "react";
import "../../css/button.css";
import apiClient from "../../api/apiClient";
import type { TypeUsers } from "../Types/TypeUsers";
import { cleanCPF } from "../../utils/clean/cleanCpf";
import { formatCPFInput } from "../../utils/format/formatCpfInput";

interface RegisterProps {
  onClose: () => void;
  selectUser: TypeUsers | null;
}

export default function UpdateUser({ onClose, selectUser }: RegisterProps) {
  const [name, setName] = useState("");
  const [cpfinput, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isActive, setIsActive] = useState(selectUser?.status === "ATIVO");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [erro, setErro] = useState({
    cpf: "",
    email: "",
    show: "",
  });

  const handleToggle = () => {
    setIsActive((prev) => !prev);
  };

  const handleSubmitRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    setErro({
      cpf: "",
      email: "",
      show: "",
    });

    setFormSubmitted(true);
    if (password !== confirmPassword) {
      return;
    }
    
    const cpf = cleanCPF(cpfinput);

    try {
      //   const actualPassword = selectUser?.password
      //   const password = passwordState == '' ? actualPassword : passwordState

      const fantasy_name = selectUser?.company.fantasy_name;
      const reason_name = selectUser?.company.reason_name;

      const response = await apiClient.put(
        `/api/usuarios/${selectUser?.id_user}`,
        {
          name,
          cpf,
          email,
          ...(password !== "" && { password }),
          status: isActive ? "ATIVO" : "INATIVO",
          fantasy_name,
          reason_name,
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
        } else if (msg == "Este CPF já existe") {
          setErro((prev) => ({ ...prev, cpf: msg }));
        } else if (msg == "Este Email já existe") {
          setErro((prev) => ({ ...prev, email: msg }));
        }
      }
    }
  };

  useEffect(() => {
    if (selectUser) {
      setName(selectUser.name || "");
      setCpf(selectUser.cpf || "");
      setEmail(selectUser.email || "");
      setIsActive(selectUser.status == "ATIVO");
    }
  }, [selectUser]);

  return (
    <div className="fixed inset-0 bg-black backdrop-blur-[1.6px] bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-[40%] min-h-[500px] relative bg-white rounded-lg flex flex-col items-center">
        <div className="absolut w-full bg-black flex justify-end rounded-t-lg ">
          <button
            className="relative bg-black text-center text-white hover:bg-red-600 text-xl font-bold w-[50px] h-[30px] rounded-tr-lg justify-center flex"
            onClick={onClose}
          >
            x
          </button>
        </div>
        <div className="flex items-center justify-center w-full mt-8">
          <h2 className="w-[90%] text-center font-semibold text-4xl text-blue-800 p-2">
            Atualizar Usuário
          </h2>
        </div>
        {erro.show && (
          <div className=" bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded shadow-md text-sm z-50 w-auto">
            {erro.show}
          </div>
        )}
        <div className=" w-[90%] min-h-[320px] flex justify-center items-center">
          <form
            onSubmit={handleSubmitRegister}
            className="flex gap-2 flex-col items-center w-[90%]"
          >
            <input
              type="text"
              placeholder="Nome"
              className=" w-[98%] border-b-2 p-2 border-gray-600 h-10"
              value={name}
              autoFocus
              onChange={(e) => setName(e.target.value)}
              name="name"
              id="name"
            />
            <input
              type="text"
              placeholder="E-mail"
              className={`w-[98%] border-b-2 p-2 border-gray-600 h-10
                ${erro.email ? " border-red-500 bg-red-100 border-2 " : ""} `}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              id="email"
            />
            {erro.email && (
              <span className="text-red-500 text-xs text-center">
                {erro.email}
              </span>
            )}
            <div className="flex flex-wrap gap-2 items-center justify-left w-[98%]">
              <input
                type="text"
                placeholder="CPF"
                className={`w-[56%] border-b-2 p-2 border-gray-600 h-10
                ${erro.cpf ? " border-red-500 bg-red-100 border-2 " : ""}`}
                maxLength={18}
                value={formatCPFInput(cpfinput)}
                onChange={(e) => setCpf(e.target.value)}
              />
            </div>
            {erro.cpf && (
              <span className="text-red-500 text-xs text-center">
                {erro.cpf}
              </span>
            )}
            <div className="flex gap-2 items-center justify-center w-[98%] flex-wrap sm:flex-row">
              <div className="w-[50%] flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Senha"
                  className="border-b-2 p-2 border-gray-600 h-10 w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  onMouseDown={() => setShowPassword(true)}
                  onMouseUp={() => setShowPassword(false)}
                  onMouseLeave={() => setShowPassword(false)}
                  className="border-b-2 p-2 border-gray-600 h-10 flex items-center justify-center cursor-pointer"
                >
                  <img
                    src={
                      showPassword ? "/svg/eyes-on.svg" : "/svg/eyes-off.svg"
                    }
                    className="w-5"
                    alt="toggle password"
                  />
                </span>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirmar Senha"
                className=" w-[48%] border-b-2 p-2 border-gray-600 h-10"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                  <div
                    className={`block ${
                      isActive ? "bg-green-600" : "bg-red-500"
                    } w-[5.6rem] h-6 rounded-full`}
                  >
                    <p
                      className={`text-sm font-semibold ${
                        isActive
                          ? "text-left pl-2 pt-[0.6px] text-green-200"
                          : "text-right pr-2 pt-[0.6px] text-red-200"
                      }`}
                    >
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
                        {formSubmitted && password !== confirmPassword && (
              <span className="text-red-500 text-xs text-center block">
                Senhas incorretas
              </span>
            )}
            <button type="submit" className="mt-4 bn39">
              <span className="bn39span">Salvar</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
