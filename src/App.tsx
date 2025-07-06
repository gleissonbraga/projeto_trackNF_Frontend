import VerifyLogin from './components/VerifyLogin';
import Layout from './Layout';
import Login from './login/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './home/Home';
import Fornecedores from './fornecedores/Fornecedores';
import "@fontsource/inter"
import "@fontsource/inter/400.css";
import "@fontsource/inter/700.css";
import Users from './users/Users';
import Notasfiscais from './nfs/NotasFiscais';
import MyProfile from './profile/MyProfile';
import Slips from './slips/Slips';


function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Login/>} />
          <Route element={<Layout />}>

              <Route path='/home' element={
                <VerifyLogin>
                    <Home/>
                </VerifyLogin>}>
              </Route>
              <Route path='/notasfiscais' element={
                <VerifyLogin>
                    <Notasfiscais/>
                </VerifyLogin>}>
              </Route>
              <Route path='/boletos' element={
                <VerifyLogin>
                    <Slips/>
                </VerifyLogin>}>
              </Route>
              <Route path='/usuarios' element={
                <VerifyLogin>
                    <Users/>
                </VerifyLogin>}>
              </Route>
              <Route path='/fornecedores' element={
                <VerifyLogin>
                    <Fornecedores/>
                </VerifyLogin>}>
              </Route>
              <Route path='/conta' element={
                <VerifyLogin>
                    <MyProfile/>
                </VerifyLogin>}>
              </Route>

                
          </Route>
      </Routes>
    </BrowserRouter>
  )
}


export default App
