import "../../css/overflow.css";
import { format } from "date-fns";
import type { TypeNfs } from "../types/Nfs";

type TicketsListProps = {
  onClose: () => void;
  nf: TypeNfs;
};

export default function DetailsTickets({ onClose, nf }: TicketsListProps) {
  function formatCNPJ(cnpj: string) {
    return cnpj.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      "$1.$2.$3/$4-$5"
    );
  }

  function formatPhone(phone: string | number): string {
  const cleaned = phone.toString().replace(/\D/g, ""); // remove tudo que não é número
  return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
}

  function formatDate(date: string) {
    let data = format(new Date(date), "dd/MM/yyyy");
    return data;
  }

  function formatMoney(money: number) {
    const formated = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(money);
    return formated;
  }

  return (
    <div className="fixed insert-0 bg-black bg-opacity-50 flex items-center justify-center z-50  w-full h-full">
      <div className="w-[70%] h-[670px] relative bg-white rounded-lg">
        <div className="absolut w-full bg-black flex justify-end rounded-t-lg ">
          <button
            className="relative bg-black text-center text-white hover:bg-red-600 text-xl font-bold w-[50px] h-[30px] rounded-tr-lg justify-center flex"
            onClick={onClose}
          >
            x
          </button>
        </div>
        {/* ############################################################################################## */}
        <div className=" w-full h-[640px] flex items-center justify-center custom-scroll gap-4 flex-wrap p-2 overflow-x-auto">
          <div className="w-[40%] min-h-[520px] shadow-md rounded-xl flex flex-col p-2 items-center transition-transform ease-in hover:translate-y-[-0.5rem] duration-300 ">
            <h3 className="text-[#1f2937] font-bold  text-[1.75rem] flex gap-4 break-all">
              <img src="/svg/nfs_detalhes.svg" alt="" className="w-7" />
              Detalhes da Nota Fiscal
            </h3>
            <div className="w-[80%] h-4 border-b-2 border-[#e5e7eb]"></div>
            <div className="flex w-[90%] mt-4">
              <div className="w-[100%]  flex flex-col gap-4 pl-2 pt-6">
                <div>
                  <p className="text-sm text-[#6b7280] font-medium mb-2">
                    Número da Nota
                  </p>
                  <h3 className="text-base font-semibold text-[#374151] break-all">
                    NF-{nf.id_nf}
                  </h3>
                </div>
                <div>
                  <p className="text-sm text-[#6b7280] font-medium mb-2">
                    Data da entrega
                  </p>
                  <h3 className="text-base font-semibold text-[#374151] break-all">
                    {formatDate(nf.date)}
                  </h3>
                </div>
                <div>
                  <p className="text-sm text-[#6b7280] font-medium mb-2">
                    Valor Total
                  </p>
                  <h3 className="text-2xl font-bold text-green-700 break-all">
                    {formatMoney(nf.nf_value)}
                  </h3>
                </div>
                <div>
                  <p className="text-sm text-[#6b7280] font-medium mb-2">
                    Emitente
                  </p>
                  <h3 className="text-base font-semibold text-[#374151] break-all">
                    {nf.fantasyNameSupplier}
                  </h3>
                </div>
                <div>
                  <p className="text-sm text-[#6b7280] font-medium mb-2">
                    Status
                  </p>
                  <h3 className="w-[26%] text-center text-base font-semibold bg-[#FEF9C3] p-1 rounded-3xl border-2 border-yellow-500 text-yellow-800">
                    {nf.status}
                  </h3>
                </div>
                <div className="text-center">
                  <button className="bg-[#4338CA] text-white w-[70%] rounded min-h-[34px] hover:bg-[#483fad] text-center font-bold">
                    Marcar como recebida
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* ############################################################################################## */}
                   <div className="w-[40%] min-h-[520px] shadow-md rounded-xl flex flex-col p-2 items-center transition-transform ease-in hover:translate-y-[-0.5rem] duration-300 ">
            <h3 className="text-[#1f2937] font-bold text-[1.75rem] flex gap-4 break-all">
              <img src="/svg/fornecedor_detalhes.svg" alt="" className="w-7" />
              Detalhes do Fornecedor
            </h3>
            <div className="w-[80%] h-4 border-b-2 border-[#e5e7eb]"></div>
            <div className="flex w-[90%] mt-4">
              <div className="w-[100%]  flex flex-col gap-4 pl-2 pt-6">
                <div>
                  <p className="text-sm text-[#6b7280] font-medium mb-2">
                    Nome do Fornecedor
                  </p>
                  <h3 className="text-base font-semibold text-[#374151] break-all">
                    {nf.fantasyNameSupplier}
                  </h3>
                </div>
                <div>
                  <p className="text-sm text-[#6b7280] font-medium mb-2">
                    CNPJ
                  </p>
                  <h3 className="text-base font-semibold text-[#374151] break-all">
                    {formatCNPJ(nf.cnpjSupplier)}
                  </h3>
                </div>
                <div>
                  <p className="text-sm text-[#6b7280] font-medium mb-2">
                    Inscrição Estadual
                  </p>
                  <h3 className="text-base font-semibold text-[#374151] break-all">
                    {nf.stateRegistrationSupplier}
                  </h3>
                </div>
                <div>
                  <p className="text-sm text-[#6b7280] font-medium mb-2">
                    Contato
                  </p>
                  <h3 className="text-base font-semibold text-[#374151] break-all">
                    {`${nf.phoneNumberSupplier == '' ? '(00) 00000-0000' : formatPhone(nf.phoneNumberSupplier)} / ${nf.emailSupplier}`}
                  </h3>
                </div>
              </div>
            </div>
          </div>
          {/* ############################################################################################## */}
          {nf.tickets.map(ticket => (
          <div className="w-[40%] min-h-[400px] shadow-md rounded-xl flex flex-col p-2 items-center transition-transform ease-in hover:translate-y-[-0.5rem] duration-300 ">
           <h3 className="text-[#1f2937] font-bold  text-[1.75rem] flex gap-4 break-all">
              <img src="/svg/boleto_detalhes.svg" alt="" className="w-7" />
              Detalhes do Boleto
            </h3>
            <div className="w-[80%] h-4 border-b-2 border-[#e5e7eb]"></div>
            <div className="flex w-[90%] mt-4">
              <div className="w-[100%]  flex flex-col gap-4 pl-2 pt-6">
                <div>
                  <p className="text-sm text-[#6b7280] font-medium mb-2">
                    Baneficiário
                  </p>
                  <h3 className="text-base font-semibold text-[#374151] break-all">
                    {nf.fantasyNameSupplier}
                  </h3>
                </div>
                <div>
                  <p className="text-sm text-[#6b7280] font-medium mb-2">
                    Vencimento
                  </p>
                  <h3 className="text-xl font-semibold text-red-600 break-all">
                    {formatDate(ticket.due_date)}
                  </h3>
                </div>
                <div>
                  <p className="text-sm text-[#6b7280] font-medium mb-2">
                    Valor
                  </p>
                  <h3 className="text-2xl font-bold text-green-700 break-all">
                    {formatMoney(ticket.ticket_value)}
                  </h3>
                </div>
                <div>
                  <p className="text-sm text-[#6b7280] font-medium mb-2">
                    Status
                  </p>
                  <h3 className={`w-[30%] text-center text-base font-semibold ${ticket.status == 'RECEBIDO' ? 'bg-[#DCFCE7] p-1 rounded-3xl border-2 border-green-500 text-green-800 ' : 'bg-[#FEE2E2] p-1 rounded-3xl border-2 border-red-500 text-red-800'}`}>
                    {ticket.status}
                  </h3>
                </div>
              </div>
            </div>
          </div>
          ))}
          
          {/* ############################################################################################## */}
        </div>
      </div>
    </div>
  );
}
