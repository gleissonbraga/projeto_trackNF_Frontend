import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import formatMoney from "../utils/formatMoney";
import type { TypeNf } from "./types/TypeNf";
import formatDate from "../utils/formatDate";

export default function Notasfiscais() {

    const [nfs, setNfs] = useState<TypeNf[]>([])


  useEffect(() => {
    async function fetchNfs() {
      const response = await apiClient.get("/api/notasfiscais");
      setNfs(response.data);
    }

    fetchNfs();
  }, []);


  console.log(nfs)

  return (
    <div className="w-full h-screen pl-20 flex justify-center items-center bg-[#f3f2f2]">
      <div className="w-[90%] min-h-[620px] rounded-xl shadow-xl flex items-center p-2 bg-white flex-col">
        <div className="bg-teal-500 h-16 w-[60%] rounded-lg relative top-[-40px] text-white flex items-center pl-4 justify-center shadow-2xl">
          <h2 className="relative font-bold uppercase text-4xl break-all">
            Notas Fiscais
          </h2>
        </div>
        <div className="w-[98%] flex gap-4 p-2">
          <div className="w-[18%]">
            <button className="flex items-center justify-center gap-1 p-3 rounded-lg bg-green-600 text-white hover:bg-green-700 hover:scale-[1.04] transition-transform">
              <img src="/svg/add.svg" className="inline w-6"></img> Adicionar
              Nota Fiscal
            </button>
          </div>
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
              {nfs.map(nf => (
                <tr key={nf.id_nf_received} className="border-b hover:bg-gray-50">
                <td className="px-4 border-r py-2">{nf.id_nf}</td>
                <td className="px-4 border-r py-2">{nf.supplier}</td>
                <td className="px-4 border-r py-2">{formatMoney(nf.nf_value)}</td>
                <td className="px-4 border-r py-2">{nf.type_nf}</td>
                <td className="px-4 border-r py-2"><button disabled={nf.type_nf == "BONIFICAÇÃO"} className={`hover:underline  ${nf.type_nf == "BONIFICAÇÃO" ? "text-gray-500" : "text-black"}`}>Ver Boleto</button></td>
                <td className="px-4 border-r py-2">{nf.receivedBy}</td>
                <td className="px-4 border-r py-2">{nf.status}</td>
                <td className="px-4 border-r py-2">{formatDate(nf.date_now)}</td>
                <td className="px-4 border-r py-2">
                  <div className="flex gap-4 justify-center w-[100%]">
                    <button>
                      <img
                        src="/svg/ditar.svg"
                        alt=""
                        className="hover:scale-110 transition-transform delay-100"
                      />
                    </button>

                    <button>
                      <img
                        src="/svg/excluir.svg"
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
        </div>
      </div>
    </div>
  );
}
