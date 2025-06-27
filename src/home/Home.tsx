import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import DetailsTickets from "./components/DetailsTickets";
import DetailsNfs from "./components/DetailsNfs";
import type { TypeTicket } from './types/Ticket'
import type { TypeNfs } from './types/Nfs'
import { format } from "date-fns";


export default function Home() {
  const [showDetails, setShowDetails] = useState(false);
  const [showDetailsNf, setShowDetailsNf] = useState(false);
  const [tickets, setTickets] = useState<TypeTicket[]>([]);
  const [nfsRetained, setNfsRetained] = useState<TypeNfs[]>([]);
  const [nfs, setNfs] = useState([]);
  const [selectTicket, setSelectedTicket] = useState<TypeTicket | null>(null);
  const [selectedNf, setSelectedNf] = useState<TypeNfs | null>(null);

  function formatDate(date: string) {
    let data = format(new Date(date), "dd/MM/yyyy");
    return data;
  }

  useEffect(() => {
    async function fetchBoletos() {
      const response = await apiClient.get("/api/boletos");
      setTickets(response.data);
    }

    fetchBoletos();
  }, []);

  useEffect(() => {
    async function fetchNfs() {
      const response = await apiClient.get("/api/notasfiscais/hoje");
      setNfs(response.data);
    }

    fetchNfs();
  }, []);

    useEffect(() => {
    async function fetchNfsRetained() {
      const response = await apiClient.get("/api/notasfiscais/retidas");
      console.log(response.data);
      setNfsRetained(response.data);
    }

    fetchNfsRetained();
  }, []);


  return (
    <div className="w-full flex justify-center items-center flex-col">
      <div className="pl-20 w-full h-screen flex justify-center items-center flex-col bg-[#f3f2f2]">
        <div className="w-[98%] rounded-xl shadow-xl flex justify-center p-2 flex-wrap bg-white">
          <div className="flex gap-10 w-[90%] p-8 flex-wrap items-center justify-center">
            <div className="w-72 h-40 bg-[#ef4444] rounded-lg shadow-sm flex flex-col p-4 gap-4 justify-center text-[#FDF8E7]">
              <p className="uppercase text-[14px] font-medium">
                Boletos Pendentes
              </p>
              <p className="uppercase text-[30px] font-bold">
                {tickets.length}
              </p>
              <p className="text-[14px]">Vencimento próximo</p>
            </div>
            <div className="w-72 h-40 bg-[#eab308] rounded-lg shadow-sm flex flex-col p-4 gap-4 justify-center text-[#FDF8E7]">
              <p className="uppercase text-[14px] font-medium">Notas Retidas</p>
              <p className="uppercase text-[30px] font-bold">{nfsRetained.length}</p>
              <p className="text-[14px]">Totas de NFs retidas</p>
            </div>
            <div className="w-72 h-40 bg-[#3B82F6] rounded-lg shadow-sm flex flex-col p-4 gap-4 justify-center text-[#FDF8E7]">
              <p className="uppercase text-[14px] font-medium">
                Notas Fiscais Recebidas Hoje
              </p>
              <p className="uppercase text-[30px] font-bold">{nfs.length}</p>
              <p className="text-[14px]">Total de NFs recebidas</p>
            </div>
          </div>
          <div className="w-[98%] flex justify-center items-center gap-6 p-2 flex-wrap">
            <div className=" w-full lg:w-[48%] h-[450px] flex flex-col overflow-x-auto rounded-lg shadow-lg bg-white p-6">
              <h2 className="w-full text-center mb-6 text-2xl font-semibold text-[#ef4444]">
                Boletos pendentes
              </h2>
              <table className="min-w-full table-auto border-collapse rounded-lg border-l w-full">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 text-sm ">
                    <th className="px-4 border-r py-2 text-left">Fornecedor</th>
                    <th className="px-4 border-r py-2 text-left">Valor</th>
                    <th className="px-4 border-r py-2 text-left">Vencimento</th>
                    <th className="px-4 border-r py-2 text-center">Detalhes</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-800">
                  {tickets.map((ticket) => (
                    <tr
                      key={ticket.id_ticket}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="px-4 border-r py-2">
                        {ticket.nf_received?.supplier?.fantasy_name}
                      </td>
                      <td className="px-4 border-r py-2">
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(ticket.ticket_value)}
                      </td>
                      <td className="px-4 border-r py-2">{formatDate(ticket.due_date)}</td>
                      <td className="px-4 border-r py-2 text-center">
                        <button
                          onClick={() => {
                            setShowDetails(true);
                            setSelectedTicket(ticket);
                          }}
                          className="hover:scale-110 transition-all duration-500 "
                        >
                          <img src="/svg/info.svg" alt="" className="" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="w-full lg:w-[48%] h-[450px] flex flex-col overflow-x-auto rounded-lg shadow-lg bg-white p-6">
              <h2 className="w-full text-center mb-6 text-2xl font-semibold text-[#eab308]">
                Notas Retidas
              </h2>
              <table className="min-w-full table-auto border-collapse rounded-lg border-l w-full">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 text-sm ">
                    <th className="px-4 border-r py-2 text-left">
                      Recebida em
                    </th>
                    <th className="px-4 border-r py-2 text-left">N° NFs</th>
                    <th className="px-4 border-r py-2 text-left">Fornecedor</th>
                    <th className="px-4 border-r py-2 text-left">Valor</th>
                    <th className="px-4 border-r py-2 text-center">
                      Recebido por
                    </th>
                    <th className="px-4 border-r py-2 text-center">Detalhes</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-800">
                  {nfsRetained.map((nf) => (
                    <tr
                      key={nf.id_nf_received}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="px-4 border-r py-2">
                          {formatDate(nf.date)}
                      </td>
                      <td className="px-4 border-r py-2">
                        {nf.id_nf}
                      </td>
                      <td className="px-4 border-r py-2">{nf.fantasyNameSupplier}</td>
                      <td className="px-4 border-r py-2">{nf.nf_value}</td>
                      <td className="px-4 border-r py-2">{nf.receivedBy}</td>
                      <td className="px-4 border-r py-2 text-center">
                        <button
                          onClick={() => {
                            setShowDetailsNf(true);
                            setSelectedNf(nf);
                          }}
                          className="hover:scale-110 transition-all duration-500 "
                        >
                          <img src="/svg/info.svg" alt="" className="" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {showDetails && selectTicket && (
        <DetailsTickets
          onClose={() => {
            setShowDetails(false);
            setSelectedTicket(null);
          }}
          ticket={selectTicket}
        />
      )}

      {showDetailsNf && selectedNf && (
        <DetailsNfs
          onClose={() => {
            setShowDetailsNf(false);
            setSelectedTicket(null);
          }}
          nf={selectedNf}
        />
      )}
    </div>
  );
}
