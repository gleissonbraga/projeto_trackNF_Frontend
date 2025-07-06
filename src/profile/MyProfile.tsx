import { useEffect, useState } from "react";
import { cleanCPF } from "../utils/cleanCpf";
import apiClient from "../api/apiClient";
import { formatCPFInput } from "../utils/formatCpfInput";
import type { TypeUser } from "./types/User";

export default function MyProfile() {
  const [messageSuccess, setMessageSuccess] = useState("");
  const [user, setUser] = useState<TypeUser>();
  const [name, setName] = useState("");
  const [cpfinput, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isActive, setIsActive] = useState(user?.status === "ATIVO");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [erro, setErro] = useState({
    cpf: "",
    email: "",
    show: "",
  });

  const handleToggle = () => {
    setIsActive((prev) => !prev);
  };

  useEffect(() => {
    if (messageSuccess) {
      const timer = setTimeout(() => {
        setMessageSuccess("");
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [messageSuccess]);

  useEffect(() => {
    const message = localStorage.getItem("messageSuccess");
    if (message) {
      setMessageSuccess(message);
      localStorage.removeItem("messageSuccess"); // limpa depois de exibir
    }
  }, []);

  useEffect(() => {
    async function fetchUser() {
      const response = await apiClient.get(`/api/usuarios/usuario`);
      setUser(response.data);
    }

    fetchUser();
  }, []);

  const handleSubmitUpdate = async (e: React.FormEvent) => {
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
      // const actualPassword = user?.password
      // const password = passwordState == '' ? actualPassword : passwordState

      const fantasy_name = user?.company.fantasy_name;
      const reason_name = user?.company.reason_name;

      const response = await apiClient.put(`/api/usuarios/${user?.id_user}`, {
        name,
        cpf,
        email,
        ...(password !== "" && { password }),
        status: isActive ? "ATIVO" : "INATIVO",
        fantasy_name,
        reason_name,
      });
      localStorage.setItem("messageSuccess", "Dados Atualizados");
      window.location.reload();
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
    if (user) {
      setName(user.name || "");
      setCpf(user.cpf || "");
      setEmail(user.email || "");
      setIsActive(user.status == "ATIVO");
    }
  }, [user]);

  return (
    <div className="w-full h-screen pl-20 flex justify-center items-center bg-gray-300">
      {messageSuccess && (
        <div className="fixed top-6 right-6 h-20 bg-green-100 border font-semibold border-green-400 text-green-700 px-4 py-2 rounded shadow-md text-base z-50 flex items-center">
          {messageSuccess}
        </div>
      )}
      <div className="w-[90%] min-h-[620px] rounded-xl shadow-xl flex items-center p-2 bg-white flex-col">
        <div className="bg-teal-800 h-16 w-[60%] rounded-lg relative top-[-40px] text-white flex items-center pl-4 justify-center shadow-2xl">
          <h2 className="relative font-bold uppercase text-4xl break-all">
            Meus Dados
          </h2>
        </div>
        <div className="w-[98%] flex gap-4 p-2 justify-center">
          <div className=" w-[90%] min-h-[320px] flex justify-center items-center">
            <form
              onSubmit={handleSubmitUpdate}
              className="flex gap-4 flex-col items-center w-[90%]"
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
                                ${
                                  erro.email
                                    ? " border-red-500 bg-red-100 border-2 "
                                    : ""
                                } `}
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
                                ${
                                  erro.cpf
                                    ? " border-red-500 bg-red-100 border-2 "
                                    : ""
                                }`}
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
              <div className="flex gap-2 items-center justify-center w-[98%]">
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
              {/*  */}
                <div className="bg-blue-900 w-[38%] rounded-lg p-2"><h3 className="text-2xl text-center font-semibold uppercase text-white">Dados da Empresa</h3></div>
            <div className="flex gap-2 items-center justify-center w-[98%]">
                <div className="w-[50%] flex">
                  <input
                    disabled
                    value={`${user?.company.fantasy_name.toLocaleUpperCase()}`}
                    className="border-b-2 p-2 border-gray-600 h-10 w-full text-black bg-white"
                  />
                </div>
                <input
                disabled
                  className=" w-[48%] border-b-2 p-2 border-gray-600 h-10 bg-white"
                  value={`${user?.company.reason_name.toLocaleUpperCase()}`}
                />
              </div>
            <div className="flex gap-2 items-center justify-center w-[98%]">
                <div className="w-[50%] flex">
                  <input
                  disabled
                    value={`${user?.company.cnpj}`}
                    className="border-b-2 p-2 border-gray-600 h-10 w-full bg-white"
                  />
                </div>
                <input
                disabled
                  value={`${user?.company.state_registration}`}
                  className=" w-[48%] border-b-2 p-2 border-gray-600 h-10 bg-white"
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
    </div>
  );
}
