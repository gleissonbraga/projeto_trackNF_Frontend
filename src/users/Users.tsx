import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import type { TypeUsers } from "./Types/TypeUsers";
import formatDate from "../utils/format/formatDate";
import RegisterUser from "./components/RegisterUser";
import UpdateUser from "./components/UpdateUser";

export default function Users() {
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const [showRegister, setShowRegister] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState<TypeUsers[]>([]);
  const [usersActive, setUsersActive] = useState<TypeUsers[]>([]);
  const [usersInactive, setUsersInactive] = useState<TypeUsers[]>([]);
  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const [selectUser, setSelectUser] = useState<TypeUsers | null>(null);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const paginatedUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  function formatCPF(cpf: string) {
    return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
  }

  const handleRegister = () => {
    setShowRegister(true);
  };
  const handleUpdate = () => {
    setShowUpdate(true);
  };

  useEffect(() => {
    async function fetchSuppliers() {
      const response = await apiClient.get("/api/usuarios/");
      setUsers(response.data);
    }

    async function fechSuppliersActive() {
      const response = await apiClient.get("/api/usuarios/ativos");
      setUsersActive(response.data);
    }

    async function fechSuppliersInactive() {
      const response = await apiClient.get("/api/usuarios/inativos");
      setUsersInactive(response.data);
    }

    fechSuppliersInactive();
    fechSuppliersActive();
    fetchSuppliers();
  }, []);


      useEffect(() => {
        if (mensagemSucesso) {
            const timer = setTimeout(() => {
            setMensagemSucesso('');
            }, 8000);
        return () => clearTimeout(timer);
    }
    }, [mensagemSucesso]);

  return (
    <div className="w-full sm:pl-20 min-h-[740px] pt-6 flex justify-center items-center bg-[#f3f2f2]">
                        {mensagemSucesso && (
                <div className="fixed top-6 right-6 h-20 bg-green-100 border font-semibold border-green-400 text-green-700 px-4 py-2 rounded shadow-md text-base z-50 flex items-center">
                    {mensagemSucesso}
                </div>
            )} 
      <div className="w-[90%] min-h-[620px] rounded-xl shadow-xl flex items-center p-2 bg-white flex-col">
        <div className="bg-blue-400 h-16 w-[60%] rounded-lg relative top-[-40px] text-white flex items-center pl-4 justify-center shadow-2xl">
          <h2 className="relative font-bold uppercase 
          text-lg sm:text-4xl break-all">
            Usuários
          </h2>
        </div>
        <div className="w-[90%] flex gap-2">
          <button
            className={` ${
              isHovered == "Cadastrar Usuário" ? "min-w-[18%]" : "w-12"
            } flex font-semibold text-base gap-1 rounded-lg p-2 bg-blue-600 hover:text-white  duration-500`}
            onMouseEnter={() => setIsHovered("Cadastrar Usuário")}
            onMouseLeave={() => setIsHovered(null)}
            onClick={handleRegister}
          >
            <img src="/svg/add.svg" className="inline w-6"></img>
            <SidebarItem
              label="Cadastrar Usuário"
              isHovered={isHovered == "Cadastrar Usuário"}
              className={
                "flex items-center gap-1 rounded transition-all duration-500 text-white"
              }
            />
          </button>
          {showRegister && (
            <RegisterUser onClose={() => setShowRegister(false)} setMensagemSucesso={setMensagemSucesso}/>
          )}

          <span
            className={` ${
              isHovered == "Usuários Ativos" ? "min-w-[15%]" : "min-w-[7%]"
            } flex gap-2 font-semibold text-base rounded-lg p-2 bg-[#22C55E] text-white  duration-500 cursor-pointer`}
            onMouseEnter={() => setIsHovered("Usuários Ativos")}
            onMouseLeave={() => setIsHovered(null)}
          >
            <img src="/svg/fornecedor_ativo.svg" className="inline w-6"></img>
            {usersActive.length}

            <SidebarItem
              label="Usuários Ativos"
              isHovered={isHovered == "Usuários Ativos"}
              className={
                "flex items-center gap-1 rounded transition-all duration-500 text-white"
              }
            />
          </span>

          <span
            className={` ${
              isHovered == "Usuários Inativos"
                ? "min-w-[15%]"
                : "min-w-[7%]"
            } flex gap-2 font-semibold text-base rounded-lg p-2 bg-[#EF4444] text-white  duration-500 cursor-pointer`}
            onMouseEnter={() => setIsHovered("Usuários Inativos")}
            onMouseLeave={() => setIsHovered(null)}
          >
            <img src="/svg/fornecedor_inativo.svg" className="inline w-6"></img>
            {usersInactive.length}
            <SidebarItem
              label="Usuários Inativos"
              isHovered={isHovered == "Usuários Inativos"}
              className={
                "flex items-center gap-1 rounded transition-all duration-500 text-white"
              }
            />
          </span>
        </div>
        <div className="w-[98%] min-h-[29rem] mt-6 flex flex-col justify-between overflow-x-auto">
          <table className="min-w-full table-auto border-collapse  border-l w-full">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm ">
                <th className="px-4 border-r py-2 text-left">Nome</th>
                <th className="px-4 border-r py-2 text-left">CPF</th>
                <th className="px-4 border-r py-2 text-left">Email</th>
                <th className="px-4 border-r py-2 text-left">Data Cadastro</th>
                <th className="px-4 border-r py-2 text-left">Ativo</th>
                <th className="px-4 border-r py-2 text-left">Ações</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-800">
              {paginatedUsers.map((user) => (
                <tr key={user.id_user} className="border hover:bg-gray-300">
                  <td className="px-4 border-r py-2">{user.name.toUpperCase()}</td>
                  <td className="px-4 border-r py-2">{formatCPF(user.cpf)}</td>
                  <td className="px-4 border-r py-2">{user.email}</td>
                  <td className="px-4 border-r py-2">
                    {formatDate(user.date_now)}
                  </td>
                  <td className="px-4 border-r py-2 flex justify-center">
                    {user.status == "ATIVO" ? (
                      <img src="/svg/active.svg" alt="" />
                    ) : (
                      <img src="/svg/inactive.svg" alt="" />
                    )}
                  </td>
                  <td className="px-4 border-r py-2">
                    <div className="flex gap-4 justify-center w-[100%]">
                      <button onClick={() => {handleUpdate(); setSelectUser(user)}}  >
                        <img
                          src="/svg/ditar.svg"
                          alt=""
                          className="hover:scale-110 transition-transform delay-100"
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-4 gap-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-1 bg-[#101024] text-white rounded disabled:opacity-50"
            >
              &lt;
            </button>

            <span className="text-gray-700 font-semibold">
              {currentPage}/{totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-1 bg-[#101024] text-white rounded disabled:opacity-50"
            >
              &gt;
            </button>
          </div>
          {showUpdate && (
                      <UpdateUser onClose={() => setShowUpdate(false)} selectUser={selectUser} />
                    )}
        </div>
      </div>
    </div>
  );
}

function SidebarItem({
  label,
  isHovered,
  className,
}: {
  label: string;
  isHovered: boolean;
  className: string;
}) {
  return (
    <div className={className}>
      {/* <div className="w-6 h-6 transition-all duration-0">{icon}</div> */}
      {isHovered && (
        <span
          className={`overflow-hidden whitespace-nowrap transition-all duration-500 tracking-wider${
            isHovered ? "opacity-100 ml-1" : "opacity-0 ml-[-8px]"
          }`}
        >
          {label}
        </span>
      )}
    </div>
  );
}
