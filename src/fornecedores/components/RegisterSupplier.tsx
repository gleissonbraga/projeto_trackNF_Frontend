import { useEffect, useState } from "react";
import "../../css/button.css"
import apiClient from "../../api/apiClient";



interface RegisterProps {
  onClose: () => void;
}


export default function RegisterSupplier({ onClose }: RegisterProps) {
  const [fantasy_name, setFantasy_name] = useState('')
  const [reason_name, setReason_name] = useState('')
  const [cnpjInput, setCnpj] = useState('')
  const [state_registration, setState_registration] = useState('')
  const [phone_number, setPhone_number] = useState('')
  const [email, setEmail] = useState('')

function formatCNPJInput(value: string) {
  return value
    .replace(/\D/g, '')                       // remove tudo que não for número
    .replace(/^(\d{2})(\d)/, '$1.$2')         // insere o primeiro ponto
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3') // insere o segundo ponto
    .replace(/\.(\d{3})(\d)/, '.$1/$2')       // insere a barra
    .replace(/(\d{4})(\d)/, '$1-$2')          // insere o hífen
    .slice(0, 18);                            // limita a 18 caracteres
}

function cleanCNPJ(value: string) {
  return value.replace(/\D/g, '')
}

  const handleSubmitRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    const cnpj = cleanCNPJ(cnpjInput)

    try {
      const response = await apiClient.post('/api/fornecedores', {fantasy_name, reason_name, cnpj, state_registration, phone_number, email})
      onClose()
    } catch (error) {
      
    }
  } 

  return (
    <div className="fixed inset-0 bg-black backdrop-blur-[1.6px] bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-[40%] h-[500px] relative bg-white rounded-lg flex flex-col items-center">
        <div className="absolut w-full bg-black flex justify-end rounded-t-lg ">
          <button
            className="relative bg-black text-center text-white hover:bg-red-600 text-xl font-bold w-[50px] h-[30px] rounded-tr-lg justify-center flex"
            onClick={onClose}
          >
            x
          </button>
        </div>
        <div>
          <h2 className="w-[90%] text-center font-semibold text-4xl text-blue-800 p-2">Cadastrar Fornecedor</h2>
        </div>
        <div className=" w-[90%] min-h-[350px] flex justify-center items-center">
          <form onSubmit={handleSubmitRegister} className="flex gap-2 flex-col items-center w-[90%]">
            <input type="text" placeholder="Nome Fantasia" className="border p-2 rounded w-[98%] border-gray-400"
            value={fantasy_name} autoFocus onChange={(e) => setFantasy_name(e.target.value)}
            name="fantasy_name" id="fantasy_name"/>
            <input type="text" placeholder="Nome Razão" className="border p-2 rounded w-[98%] border-gray-400"
            value={reason_name} onChange={(e) => setReason_name(e.target.value)}
            name="reason_name" id="reason_name"/>
            <div className="flex flex-wrap gap-2 items-center justify-center w-[98%]">
              <input type="text" placeholder="CNPJ" className="border p-2 rounded w-[56%] border-gray-400" maxLength={18}
              value={cnpjInput} autoFocus onChange={(e) => setCnpj(formatCNPJInput(e.target.value))}/>
              <input type="text" placeholder="Inscriçao Estadual"className="border p-2 rounded w-[40%] border-gray-400"
              value={state_registration} autoFocus onChange={(e) => setState_registration(e.target.value)} />
            </div>
            <div className="flex flex-wrap gap-2 items-center justify-center w-[98%]">
              <input type="text" placeholder="Email" className="border p-2 rounded w-[56%] border-gray-400"
              value={email} autoFocus onChange={(e) => setEmail(e.target.value)}/>
              <input type="text" placeholder="Telefone" className="border p-2 rounded w-[40%] border-gray-400"
              value={phone_number} autoFocus onChange={(e) => setPhone_number(e.target.value)}/>
             </div>

             <button type="submit" className="mt-4 bn39"><span className="bn39span">Cadastrar</span></button>
          </form>
        </div>

      </div>
    </div>
  );
}
