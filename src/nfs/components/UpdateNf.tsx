import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import type { TypeTickets } from "../types/TypeTickets";
import type { TypeUsers } from "../../users/Types/TypeUsers";
import type { TypeSupplier } from "../../fornecedores/types/Suppliers";
import type { TypeNf } from "../types/TypeNf";
import "../../css/overflow.css";

interface RegisterProps {
  onClose: () => void;
  nf: TypeNf | null
}

export default function UpdateNf({ onClose, nf }: RegisterProps) {

  const [erro, setErro] = useState({ show: "" });
  const [id_nf, setId_nf] = useState("")
  const [id_supplier, setId_supplier] = useState("")
  const [type_nf, setType_nf] = useState("")
  const [status, setStatus] = useState("")
  const [nf_value, setNf_value] = useState("")
  const [id_user, setId_user] = useState("")
  const [supplier, setSupplier] = useState("")
  const [receivedBy, setReceivedBy] = useState("")
  const [suppliers, setSuppliers] = useState<TypeSupplier[]>([]);
  const [users, setUsers] = useState<TypeUsers[]>([]);
  const [tickets, setTickets] = useState<TypeTickets[]>([
    {
    
      ticket_value: "",
      due_date: "",
      status: "",
    },
  ]);

  function handleChangeSupplier(e: React.ChangeEvent<HTMLSelectElement>) {
    console.log("teste handle")
    setId_supplier(e.target.value)
  }

  function handleChangeUser(e: React.ChangeEvent<HTMLSelectElement>) {
    setId_user(e.target.value)
  }

  const addTicket = () => {
    setTickets([...tickets, { ticket_value: 0, due_date: "", status: "" }]);
  };

  const removeTicket = (index: number) => {
    const updated = [...tickets];
    updated.splice(index, 1);
    setTickets(updated);
  };

  const handleChange = (
    index: number,
    field: keyof TypeTickets,
    value: string | number
  ) => {
    const updated = [...tickets];
    if (field === "ticket_value") {
      updated[index][field] = Number(value);
    } else {
      updated[index][field] = value as string;
    }
    setTickets(updated);
  };

    useEffect(() => {
    async function fetchUsers() {
      const response = await apiClient.get("/api/usuarios/ativos");
      setUsers(response.data);
    }

    async function fetchSuppliers() {
      const response = await apiClient.get("/api/fornecedores/ativos");
      setSuppliers(response.data);
    }

    fetchSuppliers();
    fetchUsers();
  }, []);

  const handleSubmitRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro({
      show: "",
    });

    
    console.log({ id_nf, id_supplier, nf_value, type_nf, id_user, status, tickets})
    try {
        const idSupplierToSend = id_supplier === "" ? nf?.id_supplier : id_supplier
        const idUserToSend = id_user === "" ? nf?.id_user : id_user
      const response = await apiClient.put(`/api/notasfiscais/${nf?.id_nf_received}`, {id_nf, id_supplier: idSupplierToSend, nf_value, type_nf, id_user: idUserToSend, status, tickets});
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
  if (nf) {
    setId_nf(nf.id_nf || "");
    setSupplier(nf.supplier || "");
    setNf_value(String(nf.nf_value));
    setType_nf(nf.type_nf || "");
    setReceivedBy(nf.receivedBy || "");
    setStatus(nf.status || "");
    setId_supplier(nf.id_supplier || "")
    setId_user(nf.id_user)

    const mappedTickets = nf.tickets.map(ticket => ({
      id_ticket: ticket.id_ticket,
      ticket_value: ticket.ticket_value,
      due_date: ticket.due_date,
      status: ticket.status,
    }));
    setTickets(mappedTickets);
  }

}, [nf]);

  return (
    <div className="fixed inset-0 bg-black backdrop-blur-[1.6px] bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-[70%] h-[680px] relative bg-white rounded-lg flex flex-col items-center custom-scroll  overflow-x-auto">
        <div className="absolut w-full bg-black flex justify-end rounded-t-lg">
          <button
            className="relative bg-black text-center text-white hover:bg-red-600 text-xl font-bold w-[50px] h-[30px] rounded-tr-lg justify-center flex"
            onClick={onClose}
          >
            x
          </button>
        </div>
        <div className="flex items-center justify-center w-[90%] mt-6">
          <h2 className="w-[90%] text-center font-semibold text-4xl text-blue-800 p-2 md:h-20">
            Atualizar Nota Fiscal
          </h2>
        </div>

        <div className=" w-[90%] flex justify-center items-center mt-6 ">
          <form
            onSubmit={handleSubmitRegister}
            className="flex gap-6 sm:gap-2 flex-col items-center w-[90%] flex-wrap"
          >
            <div className="flex gap-2 w-[88%] mb-6
            flex-wrap justify-center md:justify-start">
              <div className="flex flex-col  w-[80%]
              sm:w-[30%]">
                <span className="font-semibold">N° Nota Fiscal</span>
                <input
                  type="text"
                  className="border-b-2 p-2 border-gray-400 h-10"
                  value={id_nf}
                  onChange={(e) => setId_nf(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-[80%]
              flex-wrap justify-center md:justify-start">
                <span className="font-semibold">Fornecedor</span>
                <select
                  id="frutas"
                  name="fruta"
                  className="border-b-2 p-2 w-[98%] border-gray-400 h-10"
                  value={id_supplier} onChange={handleChangeSupplier}
                  >
                    <option disabled value="" className="text-sm">{supplier.toLocaleUpperCase()}</option>
                  {suppliers.map(supplier => (
                    <option key={supplier.id_supplier} value={supplier.id_supplier} className="text-sm">{supplier.reason_name.toLocaleUpperCase()}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-2 w-[88%] mb-6
            flex-wrap justify-center md:justify-start">
              <div className="flex flex-col w-[80%]">
                <span className="font-semibold">Operação da NF</span>
                <select
                  id="frutas"
                  name="fruta"
                  className="border-b-2 p-2 w-[98%] border-gray-400 h-10"
                  value={type_nf}
                  onChange={(e) => setType_nf(e.target.value)}
                >
                  <option value="" className="text-sm">Selecione</option>
                  <option value="BONIFICAÇÃO" className="text-sm">BONIFICAÇÃO</option>
                  <option value="VENDA" className="text-sm">VENDA</option>
                  <option value="TROCA" className="text-sm">TROCA</option>
                </select>
              </div>
              <div className="flex flex-col w-[80%]
              flex-wrap justify-center md:justify-start">
                <span className="font-semibold">Status</span>
                <select
                  id="frutas"
                  name="fruta"
                  className="border-b-2 p-2 w-[98%] border-gray-400 h-10"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="" className="text-sm">Selecione</option>
                  <option value="DEVOLVIDA" className="text-sm">DEVOLVIDA</option>
                  <option value="RECEBIDA" className="text-sm">RECEBIDA</option>
                  <option value="RETIDA" className="text-sm">RETIDA</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 w-[88%] mb-6
            flex-wrap justify-center md:justify-start">
              <div className="flex flex-col   w-[80%]  sm:w-[30%]">
                <label htmlFor="">Valor NF</label>
                <input
                  type="text"
                  className="border-b-2 p-2 border-gray-400 h-10"
                  value={nf_value}
                  onChange={(e) => setNf_value(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-[80%]
              flex-wrap justify-center md:justify-start">
                <span className="font-semibold">Recebido por</span>

                <select
                  id="frutas"
                  name="fruta"
                  className="border-b-2 p-2 w-[98%] border-gray-400 h-10"
                  value={id_user} onChange={handleChangeUser}
                >
                  <option disabled value="" className="text-sm">{receivedBy.toLocaleUpperCase()}</option>
                    {users.map(user => (
                    <option key={user.id_user} value={user.id_user} className="text-sm">{user.name.toLocaleUpperCase()}</option>
                  ))}
                </select>
              </div>
            </div>
            {tickets.map((ticket, index) => (
              <div key={ticket.id_ticket} className="flex border-2 p-2 rounded-xl flex-col md:justify-start md:flex-row justify-around w-[80%]">
                <input
                  type="number"
                  value={ticket.ticket_value}
                  onChange={(e) =>
                    handleChange(index, "ticket_value", e.target.value)
                  }
                  placeholder="Valor"
                  className="border-b-2 border-gray-400 w-[26%] text-gray-500"
                />
                <input
                  type="date"
                  value={ticket.due_date}
                  onChange={(e) =>
                    handleChange(index, "due_date", e.target.value)
                  }
                  className="border-b-2 border-gray-400 text-gray-500" 
                />
                <select
                  value={ticket.status}
                  onChange={(e) =>
                    handleChange(index, "status", e.target.value)
                  }

                  className="border-b-2 border-gray-400 text-gray-500"
                >
                  <option value="" className="text-sm">Selecione o status</option>
                  <option value="PENDENTE" className="text-sm">PENDENTE</option>
                  <option value="RECEBIDO" className="text-sm">RECEBIDO</option>
                </select>
                <button type="button" onClick={() => removeTicket(index)}>
                  <img src="/svg/excluir.svg" alt="" />
                </button>
              </div>
            ))}
            <div className="w-[80%] mt-2">
              <button type="button" onClick={addTicket} className="bg-blue-600 p-1 rounded-lg">
              <img src="/svg/add.svg" alt="" />
            </button>
            </div>

            <button type="submit" className="mt-4 bn39 mb-4">
              <span className="bn39span">Salvar</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
