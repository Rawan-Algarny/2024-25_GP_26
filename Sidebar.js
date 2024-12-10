import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/images/LOGO-Trans 1.svg";
import Svgs from "../../assets/svgs";
const Sidebar = ({ sidebarOpen, setSidebarOpen, isCustomerView }) => {
  const location = useLocation();
  const { pathname } = location;
  const trigger = useRef(null);
  const sidebar = useRef(null);
  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });
  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);
  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-40 flex h-screen w-[256px] flex-col items-center justify-between overflow-y-hidden bg-[#012657] duration-300 ease-linear lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col items-center gap-">
        <div className="flex items-center text-white font-bold justify-between gap-2 px-6 py-5 lg:py-4">
          <img src={logo} alt="logo" />
        </div>

        <div
          className="flex gap-2 items-center justify-center w-[80%] h-[55px]  cursor-pointer"
          // onClick={handleDropdownToggle}
        >
          <p className="font-semibold text-base text-white text-center">
            Welcome Sarah Amir
          </p>
        </div>
        <div
          className="flex gap-2 items-center justify-center w-full h-[55px] bg-[#05387B] cursor-pointer"
          // onClick={handleDropdownToggle}
        >
          <p className="font-semibold text-base text-white">Manage Zone</p>
          <Svgs.WhiteDropDown />
        </div>
        <div className="relative text-white text-sm">
          <div className="absolute left-[72.5px] top-[-15px] bottom-0 w-[2px] bg-[#05387B] h-[105px]"></div>
          <div className="pl-[4.2rem] pt-2 pb-4 space-y-4 mt-6">
            <div className="flex items-center gap-6">
              <div className="w-[13px] h-[13px] bg-[#05387B] rounded-full"></div>
              <NavLink
                to="/all-zone"
                className={({ isActive }) =>
                  `hover:text-gray-200 w-[116px] h-[14.7px] flex justify-center items-center font-normal text-[10px] text-white rounded-[4px] ${
                    isActive ? "bg-[#05387B]" : "bg-[#012657]"
                  }`
                }
              >
                All Zone
              </NavLink>
            </div>
            <div className="flex items-center gap-6">
              {/* Circle Icon */}
              <div className="w-[13px] h-[13px] bg-[#05387B] rounded-full"></div>
              <NavLink
                to="/add-zone"
                className={({ isActive }) =>
                  `hover:text-gray-200 w-[116px] h-[14.7px] flex justify-center items-center font-normal text-[10px] text-white rounded-[4px] ${
                    isActive ? "bg-[#05387B]" : "bg-[#012657]"
                  }`
                }
              >
                Add Zone
              </NavLink>
            </div>
          </div>
        </div>
        <div
          className="flex gap-2 items-center justify-center w-full h-[55px] bg-[#05387B] cursor-pointer"
          onClick={handleDropdownToggle}
        >
          <Svgs.Globe />
          <p className="font-semibold text-base text-white">
            Manage Streetlight
          </p>
          <Svgs.WhiteDropDown />
        </div>
        <div className="relative text-white text-sm">
          <div className="absolute left-[72.5px] top-[-15px] bottom-0 w-[2px] bg-[#05387B] h-[105px]"></div>
          <div className="pl-[4.2rem] pt-2 pb-4 space-y-4 mt-6">
            <div className="flex items-center gap-6">
              <div className="w-[13px] h-[13px] bg-[#05387B] rounded-full"></div>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `hover:text-gray-200 w-[116px] h-[14.7px] flex justify-center items-center font-normal text-[10px] text-white rounded-[4px] ${
                    isActive ? "bg-[#05387B]" : "bg-[#012657]"
                  }`
                }
              >
                All Streetlight
              </NavLink>
            </div>
            <div className="flex items-center gap-6">
              {/* Circle Icon */}
              <div className="w-[13px] h-[13px] bg-[#05387B] rounded-full"></div>
              <NavLink
                to="/add-lights"
                className={({ isActive }) =>
                  `hover:text-gray-200 w-[116px] h-[14.7px] flex justify-center items-center font-normal text-[10px] text-white rounded-[4px] ${
                    isActive ? "bg-[#05387B]" : "bg-[#012657]"
                  }`
                }
              >
                Add Streetlight
              </NavLink>
            </div>
          </div>
        </div>
        <div
          className="flex  gap-2 items-center justify-center w-[80%] h-[55px]  cursor-pointer text-center"
          // onClick={handleDropdownToggle}
        >
          <p className="font-semibold text-base text-white">
            Monitor Motion events
          </p>
        </div>
        <div
          className="flex gap-2 items-center justify-start w-[80%] h-[55px]  cursor-pointer"
          // onClick={handleDropdownToggle}
        >
          <p className="font-semibold text-base text-white text-center">
            View Consumption Analytics Report
          </p>
        </div>
        <div
          className="flex gap-2 items-center justify-start w-[80%] h-[55px]  cursor-pointer"
          // onClick={handleDropdownToggle}
        >
          <p className="font-semibold text-base text-white text-center">
            Monitor Fault Notifications
          </p>
        </div>
        <div className="flex items-center justify-center w-full mt-12">
          <span className="cursor-pointer">
            <Svgs.Logout />
          </span>
          <p className="font-semibold text-base text-white cursor-pointer">
            Logout
          </p>
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;
