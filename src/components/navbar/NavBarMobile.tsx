import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NavBarMobile() {
  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false); // novo estado

  const logout = () => {
    localStorage.setItem("token", "");
    navigate("/");
  };

  return (
    <>
      {/* Botão Hamburguer (só aparece no mobile) */}
      <button
        className="sm:hidden fixed top-4 left-4 z-50 p-2 bg-[#101024] text-white rounded"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        <img src="/svg/menu.svg" alt="Menu" className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isMobileOpen ? "flex" : "hidden"
        } sm:flex h-screen bg-[#101024] text-white transition-all duration-500 justify-around z-40
        ${isHovered ? "w-48" : "w-20"} fixed left-0 top-0 flex-col items-center`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex h-30 w-full justify-center mt-6">
          <span className="text-xl font-bold">
            {isHovered ? (
              <img src="/image-png/logo.png" alt="" />
            ) : (
              "SCRN"
            )}
          </span>
        </div>

        <nav className="flex flex-col gap-4 mt-4 px-2 w-full">
          <Link to="/home">
            <SidebarItem
              icon={<img src="/svg/ion_home.svg" className="w-5 h-5" />}
              label="Início"
              isHovered={isHovered}
              className="flex items-center gap-3 p-2 pl-4 rounded hover:bg-gradient-to-r hover:from-[#101024] hover:via-[#4a5461] hover:to-blue-300 cursor-pointer transition-all"
            />
          </Link>
          <Link to="/notasfiscais">
            <SidebarItem
              icon={<img src="/svg/notas.svg" className="w-5 h-5" />}
              label="Notas Fiscais"
              isHovered={isHovered}
              className="flex items-center gap-3 p-2 pl-4 rounded hover:bg-gradient-to-r hover:from-[#101024] hover:via-[#4a5461] hover:to-blue-300 cursor-pointer transition-all"
            />
          </Link>
          <Link to="/boletos">
            <SidebarItem
              icon={<img src="/svg/money.svg" className="w-5 h-5" />}
              label="Boletos"
              isHovered={isHovered}
              className="flex items-center gap-3 p-2 pl-4 rounded hover:bg-gradient-to-r hover:from-[#101024] hover:via-[#4a5461] hover:to-blue-300 cursor-pointer transition-all"
            />
          </Link>
          <Link to="/usuarios">
            <SidebarItem
              icon={<img src="/svg/users.svg" className="w-5 h-5" />}
              label="Usuários"
              isHovered={isHovered}
              className="flex items-center gap-3 p-2 pl-4 rounded hover:bg-gradient-to-r hover:from-[#101024] hover:via-[#4a5461] hover:to-blue-300 cursor-pointer transition-all"
            />
          </Link>
          <Link to="/fornecedores">
            <SidebarItem
              icon={<img src="/svg/fornecedores.svg" className="w-5 h-5" />}
              label="Fornecedores"
              isHovered={isHovered}
              className="flex items-center gap-3 p-2 pl-4 rounded hover:bg-gradient-to-r hover:from-[#101024] hover:via-[#4a5461] hover:to-blue-300 cursor-pointer transition-all"
            />
          </Link>
        </nav>

        <div className="w-full flex flex-col px-2 gap-4">
          <Link to="/conta">
            <SidebarItem
              icon={<img src="/svg/user.svg" className="w-5 h-5" />}
              label="Minha Conta"
              isHovered={isHovered}
              className="flex items-center gap-3 p-2 pl-4 rounded hover:bg-gradient-to-r hover:from-[#101024] hover:via-[#4a5461] hover:to-blue-300 cursor-pointer transition-all"
            />
          </Link>
          <button onClick={logout}>
            <SidebarItem
              icon={<img src="/svg/el_off.svg" className="w-5 h-5" />}
              label="Sair"
              isHovered={isHovered}
              className="flex gap-2 p-2 pl-4 rounded cursor-pointer transition-all text-red-500 font-bold hover:bg-gradient-to-r hover:from-[#101024] hover:via-[#613434] hover:to-red-300 hover:text-white"
            />
          </button>
        </div>
      </div>
    </>
  );
}

function SidebarItem({
  icon,
  label,
  isHovered,
  className,
}: {
  icon: React.ReactNode;
  label: string;
  isHovered: boolean;
  className: string;
}) {
  return (
    <div className={className}>
      <div className="w-6 h-6">{icon}</div>
      {isHovered && (
        <span className="overflow-hidden whitespace-nowrap transition-all duration-500 ml-1">
          {label}
        </span>
      )}
    </div>
  );
}
