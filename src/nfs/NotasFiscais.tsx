import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import formatMoney from "../utils/formatMoney";
import type { TypeNf } from "./types/TypeNf";
import formatDate from "../utils/formatDate";
import RegisterNf from "./components/RegisterNf";
import type { TypeTickets } from "./types/TypeTickets";
import UpdateNf from "./components/UpdateNf";
import { useConfirm } from "../hook/UseConfirm";

export default function Notasfiscais() {
  const [nfs, setNfs] = useState<TypeNf[]>([]);
  const [showRegister, setShowRegister] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectNf, setSelectNf] = useState<TypeNf | null>(null)
  const { confirm, ConfirmDialog } = useConfirm();
  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const itemsPerPage = 4;
  const totalPages = Math.ceil(nfs.length / itemsPerPage);

  const paginatedNfs = nfs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    async function fetchNfs() {
      const response = await apiClient.get("/api/notasfiscais");
      setNfs(response.data);
    }

    fetchNfs();
  }, []);

  const handleDeleted = async (id_nf_received: string) => {
      const response = await apiClient.delete(`/api/notasfiscais/${id_nf_received}`);

      console.log("excluido")
  }


    useEffect(() => {
        if (mensagemSucesso) {
            const timer = setTimeout(() => {
            setMensagemSucesso('');
            }, 8000);
        return () => clearTimeout(timer);
    }
    }, [mensagemSucesso]);

  return (

    <div className="w-full h-screen pl-20 flex justify-center items-center bg-[#f3f2f2]">
                  {mensagemSucesso && (
                <div className="fixed top-6 right-6 h-20 bg-green-100 border font-semibold border-green-400 text-green-700 px-4 py-2 rounded shadow-md text-base z-50 flex items-center">
                    {mensagemSucesso}
                </div>
            )} 


      <div className="w-[90%] min-h-[620px] rounded-xl shadow-xl flex items-center p-2 bg-white flex-col">
        <div className="bg-teal-500 h-16 w-[60%] rounded-lg relative top-[-40px] text-white flex items-center pl-4 justify-center shadow-2xl">
          <h2 className="relative font-bold uppercase text-4xl break-all">
            Notas Fiscais
          </h2>
        </div>
        <div className="w-[98%] flex gap-4 p-2">
          <div className="w-[18%]">
            <button
              className="flex items-center justify-center gap-1 p-3 rounded-lg bg-green-600 text-white hover:bg-green-700 hover:scale-[1.04] transition-transform"
              onClick={() => setShowRegister(true)}
            >
              <img src="/svg/add.svg" className="inline w-6"></img> Adicionar
              Nota Fiscal
            </button>
          </div>
          {showRegister && (
            <RegisterNf onClose={() => setShowRegister(false)} setMensagemSucesso={setMensagemSucesso} />
          )}
          <div className="w-[18%]">
            <button className="flex items-center justify-center gap-1 p-3 rounded-lg bg-[#182737] text-white hover:bg-[#1f3347] hover:scale-[1.04] transition-transform">
              <img src="/svg/search.svg" className="inline w-6"></img> Buscar
              Nota Fiscal
            </button>
          </div>
        </div>

        <div className="w-[98%] min-h-[29rem] mt-6 flex flex-col justify-between">
          <table className="min-w-full table-auto border-collapse  border-l w-full">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm">
                <th className="px-4 border-r py-2 text-left">N° NF</th>
                <th className="px-4 border-r py-2 text-left">Fornecedor</th>
                <th className="px-4 border-r py-2 text-left">Valor</th>
                <th className="px-4 border-r py-2 text-left">Tipo</th>
                <th className="px-4 border-r py-2 text-left">Boleto</th>
                <th className="px-4 border-r py-2 text-left">Recebido Por</th>
                <th className="px-4 border-r py-2 text-left">Status</th>
                <th className="px-4 border-r py-2 text-left">
                  Data Recebimento
                </th>
                <th className="px-4 border-r py-2 text-left">Ações</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-800">
              {paginatedNfs.map((nf) => (
                <tr
                  key={nf.id_nf_received}
                  className="border-b hover:bg-gray-200"
                >
                  <td className="px-4 border-r py-2">{nf.id_nf}</td>
                  <td className="px-4 border-r py-2">{nf.supplier.toUpperCase()}</td>
                  <td className="px-4 border-r py-2">
                    {formatMoney(nf.nf_value)}
                  </td>
                  <td className="px-4 border-r py-2">{nf.type_nf}</td>
                  {nf.tickets.length == 0 && (
                    <td className="px-4 border-r py-2 text-center">
                      ------------------
                    </td>
                  )
                    
                  }
                  {nf.tickets.map(ticket => (
                    <td key={ticket.id_ticket} className="px-4 border-r py-2 flex gap-2 items-center">
                      <span className="bg-[#E2E8F0] p-1 rounded-lg">{formatMoney(ticket.ticket_value)}</span>
                      <span className="bg-[#E2E8F0] p-1 rounded-lg">{formatDate(ticket.due_date)} </span>
                      <span>
                        {ticket.status == 'RECEBIDO' ? <p className="bg-[#22C55E] rounded-full w-3 h-3"></p> : ""}
                        {ticket.status == 'PENDENTE' ? <p className="bg-[#FACC15] rounded-full w-3 h-3"></p> : ""}
                        {ticket.status == 'CANCELADO' ? <p className="bg-[#EF4444] rounded-full w-3 h-3"></p> : ""}
                      </span>
                    </td>  
                  ))}
                  
                  <td className="px-4 border-r py-2">{nf.receivedBy.toUpperCase()}</td>
                  <td className="px-4 border-r py-2">
                    <span className="text-center">

                    {nf.status == 'RECEBIDA' ? <p className="p-1 rounded-xl bg-[#DCFCE7] text-green-800 border-2 border-green-500 ">{nf.status}</p> : ""}
                      {nf.status == 'RETIDA' ? <p className="p-1 rounded-xl  bg-[#FEF9C3] text-yellow-800 border-2 border-yellow-500">{nf.status}</p> : ""}
                      {nf.status == 'DEVOLVIDA' ? <p className="p-1 rounded-xl bg-[#f86565] text-red-800 border-2 border-red-800">{nf.status}</p> : ""}
                    </span>
                  </td>
                  <td className="px-4 border-r py-2">
                    {formatDate(nf.date_now)}
                  </td>
                  <td className="px-4 border-r py-2">
                    <div className="flex gap-4 justify-center w-[100%]">
                      <button onClick={() => {setShowUpdate(true); setSelectNf(nf)}}>
                        <img
                          src="/svg/ditar.svg"
                          alt=""
                          className="hover:scale-110 transition-transform delay-100"
                        />
                      </button>

                      <button onClick={() => confirm(() => handleDeleted(nf.id_nf_received), {title: "Excluir Nota Fiscal", message: `Deseja realmente excluir a NF: ${nf.id_nf}?`})}>
                        <img
                          src="/svg/excluir.svg"
                          alt=""
                          className="hover:scale-110 transition-transform delay-100"
                        />
                      </button>
                      <ConfirmDialog />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showUpdate && <UpdateNf onClose={() => setShowUpdate(false)} nf={selectNf} />}
          <div className="flex justify-center mt-4 gap-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
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
              className="px-4 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
