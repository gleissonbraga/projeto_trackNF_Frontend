import { useState } from "react";
import apiClient from "../api/apiClient";
import { formatCPFInput } from "../utils/formatCpfInput";
import { cleanCPF } from "../utils/cleanCpf";
import { cleanCNPJ } from "../utils/cleanCnpj";
import { formatCNPJInput } from "../utils/formatCnpjInput";

interface RegisterProps {
    onClose: () => void
    setMensagemSucesso: (mensagem: string) => void;
}

export default function Register({ onClose, setMensagemSucesso }: RegisterProps) {


    const [name, setName] = useState('')
    const [cpfInput, setCpf] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [fantasy_name, setFatasyName] = useState('')
    const [reason_name, setReasonName] = useState('')
    const [cnpjInput, setCnpj] = useState('')
    const [state_registration, setStateRegistration] = useState('')
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [erro, setErro] = useState({
        cpf: "",
        email: "",
        reason_name: "",
        show: "",
        cnpj: "",
        state_registration: "",
    })

    const handleSubmitRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setErro({
        cpf: "",
        email: "",
        reason_name: "",
        show: "",
        cnpj: "",
        state_registration: "",
    })

        setFormSubmitted(true);
    if (password !== confirmPassword) {
      return;
    }
    
    const cpf = cleanCPF(cpfInput)
    const cnpj = cleanCNPJ(cnpjInput)
        try {
            const response = await apiClient.post('/api/usuarios', { name, cpf , email, password, fantasy_name , reason_name, cnpj, state_registration })
            setMensagemSucesso("Cadastrado com sucesso! Realize o login.");
            onClose()
        } catch (error: any) {
            if(error.response && error.response.data){
                const msg = error.response.data.message
                if(msg == "Todos os dados são obrigatórios") {
                    setErro(prev => ({ ...prev, show: "Preencha todos os dados"}))
                } else if (msg == "Este CPF já existe") {
                     setErro(prev => ({ ...prev, cpf: msg}))
                } else if (msg == "Este Email já existe") {
                   
                     setErro(prev => ({ ...prev, email: msg}))
                } else if (msg == "Este Nome Razão já existe") {
                   
                     setErro(prev => ({ ...prev, reason_name: msg}))
                } else if (msg == "Este CNPJ já existe") {
                 
                     setErro(prev => ({ ...prev, cnpj: msg}))
                } else if (msg == "Esta Inscrição Estadual já existe"){
                  
                     setErro(prev => ({ ...prev, state_registration: msg}))
                }     
           }
        }  
        
    }

    return(
        <div className="fixed inset-0 bg-black backdrop-blur-[1.6px] bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-[60%] h-[600px]  shadow-lg relative flex flex-col  items-center justify-center gap-4">
                    <button
                    className="absolute top-[0.2px] right-[0.4px] text-center text-gray-600 hover:text-red-500 hover:bg-red-100 text-xl font-semibold w-[30px] h-[30px] rounded-tr-lg justify-center flex"
                    onClick={onClose}
                    >
                        x
                    </button>
                <div className="flex flex-col items-center">
                    <h2 className="text-4xl font-semibold mb-4 text-blue-600">Cadastre-se</h2>
                    <p className="text-center text-xl font-semibold mb-4 w-[60%] text-gray-600">Crie sua conta e comece a gerenciar o recebimento das suas notas fiscais</p>
                </div>
                    {erro.show && <p className="absolute top-40 left-6 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded shadow-md text-sm z-50 w-auto">{erro.show}</p>}
                <div className="w-full">
                    <form onSubmit={handleSubmitRegister} className="flex gap-2 flex-col items-center">
                        <div className="flex gap-4 w-full items-center">
                            <div className="flex flex-col gap-4 w-[50%]">
                                <div className="flex gap-2 w-full">
                                    <input type="text" name="name" id="name" placeholder="Nome"
                                    value={name} autoFocus onChange={(e) => setName(e.target.value)} className="border-b-2 p-2 w-[98%] border-gray-600 h-10"/>
                                    <input type="text" maxLength={14} name="cpf" id="cpf" placeholder="CPF"
                                    value={formatCPFInput(cpfInput)} onChange={(e) => setCpf(e.target.value)}
                                    className={`border-b-2 p-2 w-[98%] border-gray-600 h-10
                                    ${erro.cpf ? " border-red-500 bg-red-100 border-2 " : ""}`}/>
                                </div>
                                    {erro.cpf && <span className="text-red-500 text-xs text-center">{erro.cpf}</span>}
                                <div className="flex flex-col gap-2 ">
                                    <input type="email" name="email" id="email" placeholder="Email"
                                    value={email} onChange={(e) => setEmail(e.target.value)} className={`border-b-2 p-2 w-[98%] border-gray-600 h-10
                                    ${erro.cpf ? " border-red-500 bg-red-100 border-2 " : ""}`} />
                                    {erro.email && <span className="text-red-500 text-xs text-center">{erro.email}</span>}
                                    <input type="password" name="password" id="password" placeholder="Senha"
                                    value={password} onChange={(e) => setPassword(e.target.value)} className="border-b-2 p-2 w-[98%] border-gray-600 h-10" />
                                    <input type="password" name="confirmPassword" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirme a senha" className={`border-b-2 p-2 w-[98%] border-gray-600 h-10`} />
                                </div>
                                {formSubmitted && password !== confirmPassword && (
              <span className="text-red-500 text-xs text-center block">
                Senhas incorretas
              </span>
            )}
                            </div>
                            <div className="flex flex-col gap-2 w-[50%]">
                                <h3 className="text-center text-2xl mb-4 text-blue-600">Insira os dados da Empresa</h3>
                                <input type="text" name="fantasy_name" id="fantasy_name" placeholder="Nome Fantasia"
                                value={fantasy_name} onChange={(e) => setFatasyName(e.target.value)} className="border-b-2 p-2 w-[98%] border-gray-600 h-10" />
                                <input type="text" name="reason_name" id="reason_name" placeholder="Nome Razão"
                                value={reason_name} onChange={(e) => setReasonName(e.target.value)} className={`border-b-2 p-2 w-[98%] border-gray-600 h-10
                                ${erro.reason_name ? " border-red-500 bg-red-100 border-2 " : ""}`} />
                                {erro.reason_name && <span className="text-red-500 text-xs text-center">{erro.reason_name}</span>}
                                <div className="flex gap-2">
                                    <input type="text" name="cnpj" id="cnpj" placeholder="CNPJ"
                                    maxLength={18}
                                    value={formatCNPJInput(cnpjInput)} onChange={(e) => setCnpj(e.target.value)} className={`border-b-2 p-2 w-[98%] border-gray-600 h-10
                                ${erro.cnpj ? " border-red-500 bg-red-100 border-2 " : ""}`} />
                                    <input type="text" name="state_registration" id="state_registration" placeholder="Inscrição estadual" 
                                    value={state_registration} onChange={(e) => setStateRegistration(e.target.value)} className={`border-b-2 p-2 w-[98%] border-gray-600 h-10
                                ${erro.state_registration ? " border-red-500 bg-red-100 border-2 " : ""}`} />
                                    
                                </div>
                                {(erro.state_registration || erro.cnpj) && <span className="text-red-500 text-xs text-center">{erro.state_registration || erro.cnpj}</span>}
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 w-[50%] mt-6 items-center">
                            <button type="submit" className="bn39"><span className="bn39span">Cadastrar</span></button>
                            <button
                            type="button"
                            onClick={onClose}
                            className="text-sm text-red-500 hover:underline mt-2"
                            >
                            Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}