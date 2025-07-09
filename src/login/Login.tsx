import { useEffect, useState } from 'react'
import '../css/button.css'
import apiClient from '../api/apiClient'
import { useNavigate } from "react-router-dom";
import Register from '../register/Register';

export default function Login(){
    const navigate = useNavigate();
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [erro, setErro] = useState('')
    const [showRegister, setShowRegister] = useState(false)
    const [mensagemSucesso, setMensagemSucesso] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setErro('')
        try {
            const response = await apiClient.post('login', {email, password})
            const token = response.data.token
            localStorage.setItem('token', token)
            navigate('/home')
        } catch (error:any) {
            if(error.response && error.response.data){
                setErro(error.response.data.message || "Erro ao fazer login")
            } else {
                setErro("Erro de conexão com o servidor")
            }
        }
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
        <div className="flex w-screen h-screen">
            {mensagemSucesso && (
                <div className="fixed top-6 left-6 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded shadow-md text-sm z-50">
                    {mensagemSucesso}
                </div>
            )}
            <div className="w-full sm:w-[40%] h-screen flex flex-col justify-center items-center">
                <div className="w-[80%] h-[500px] flex flex-col gap-6 justify-center items-center">
                    <h1 className="w-[90%] text-center font-semibold text-4xl text-blue-800">Faça Login</h1>
                    <form onSubmit={handleSubmit} className=" w-[90%] flex flex-col gap-4 items-center">
                            {erro && (
                            <div className="absolute bottom-20 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded shadow z-50">
                            {erro}
                            </div>
                        )}
                        <input type="email"  name="email" id="email" placeholder="E-mail" autoFocus required value={email} onChange={(e) => setEmail(e.target.value)} className='w-[86%] h-[40px] pl-4 border border-solid border-black rounded-md'/>
                        <input type="password" name="senha" id="senha" placeholder="Senha" required value={password} onChange={(e) => setPassword(e.target.value)} className='w-[86%] h-[40px] pl-4 border border-solid border-black rounded-md'/>
                        <a href="#" target='_blank' className='w-[70%] text-right text-[#0073b1] hover:underline'>Esqueceu a senha?</a>
                        <button type="submit" className="bn39"><span className="bn39span">Login</span></button>
                    </form>
                    <p>Ainda não possui cadastro? <button onClick={() => setShowRegister(true)} className='text-[#0073b1] hover:underline'>Cadastre-se</button></p>
                    { showRegister && (
                        <Register onClose={() => setShowRegister(false)} setMensagemSucesso={setMensagemSucesso}/>
                    )}
                </div>
            </div>
            <div className="sm:block hidden w-[80%] h-screen bg-green-300 bg-[url('/image-png/wp-login.png')] bg-cover bg-center">
            </div>
            
        </div>  
    )
}

