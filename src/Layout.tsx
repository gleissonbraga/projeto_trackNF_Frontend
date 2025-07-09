import { Outlet } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import NavBarMobile from "./components/navbar/NavBArMobile";


export default function Layout() {
  return (
    <div className=" min-h-screen">
      <div className="max-w-[1920px] mx-auto font-inter ">
        <NavBarMobile />
        <NavBar/>
        <Outlet />
      </div>
    </div>
  );
}