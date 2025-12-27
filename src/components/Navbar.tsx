import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";
import { Button } from "./ui/button";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { api } from "../lib/axios";
import toast from "react-hot-toast";

const NAVBAR_HEIGHT = 64;

interface NavbarProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

export default function Navbar({ isAuthenticated, setIsAuthenticated }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

const handleLogout = async () => {
  try {
    // optional call, only for UI consistency
    localStorage.removeItem("token"); // actual logout happens here
    toast.success("Logout successful!");
  } catch {
    toast.error("Logout failed. Please try again.");
  }
  setIsAuthenticated(false);
  navigate("/");
};


  // 🔑 Reusable scroll navigation handler
  const handleScrollNav = (targetId: string) => {
    setIsOpen(false);

    const doScroll = () => {
      const el = document.getElementById(targetId);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    };

    if (!window.location.pathname.startsWith("/adhyaay")) {
      navigate("/adhyaay/");
      setTimeout(doScroll, 200);
    } else {
      doScroll();
    }
  };

  const navItems = [
    { name: "Home", to: "/adhyaay/", type: "route" },
    { name: "About", to: "aboutus", type: "scroll" },
    { name: "Teams", to: "teams", type: "scroll" },
    { name: "Services", to: "/adhyaay/councellors", type: "route" },
    { name: "Contact", to: "footer", type: "scroll" },
  ];

  return (
    <nav
      className="bg-white/80 backdrop-blur-md border-b border-white/20 shadow-lg fixed w-full z-50"
      style={{ height: NAVBAR_HEIGHT }}
    >
      <div className="max-w-7xl mx-auto h-full py-4">
        <div className="grid grid-cols-3 items-center h-full">
          {/* Logo */}
<div className="flex items-center gap-1 justify-start">
  <RouterLink to="/adhyaay/" onClick={() => setIsOpen(false)} className="flex items-center gap-1">
    <img src={logo} alt="Adhyaay Logo" className="h-8 w-8 ml-2" />
    <span className="text-xl md:text-2xl font-bold tracking-wide text-gray-900">
      ADHYAAY
    </span>
  </RouterLink>
</div>


          {/* Desktop Navigation */}
          <ul className="hidden md:flex gap-10 text-gray-800 font-medium justify-center">
            {navItems.map((item) => (
              <li key={item.name} className="relative group cursor-pointer">
                {item.type === "scroll" ? (
                  <span
                    onClick={() => handleScrollNav(item.to)}
                    className="relative inline-block transition-all duration-300 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-yellow-500 group-hover:bg-clip-text cursor-pointer"
                  >
                    {item.name}
                    <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-gradient-to-r from-orange-500 to-yellow-500 transition-all duration-300 ease-in-out group-hover:w-full" />
                  </span>
                ) : (
                  <RouterLink
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                    className="relative inline-block transition-all duration-300 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-yellow-500 group-hover:bg-clip-text"
                  >
                    {item.name}
                    <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-gradient-to-r from-orange-500 to-yellow-500 transition-all duration-300 ease-in-out group-hover:w-full" />
                  </RouterLink>
                )}
              </li>
            ))}
          </ul>

          {/* Auth Buttons (Desktop) */}
          <div className="hidden md:flex gap-3 justify-end">
            {isAuthenticated ? (
              <Button
                onClick={handleLogout}
                variant="outline"
                className="bg-red-600 text-white"
              >
                Logout
              </Button>
            ) : (
              <>
                <Button asChild variant="outline" className="bg-[#fe7500] text-white">
                  <RouterLink to="/adhyaay/login">Sign In</RouterLink>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border border-[#fe7500] text-[#fe7500]"
                >
                  <RouterLink to="/adhyaay/register">Sign Up</RouterLink>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden col-start-3 justify-self-end mx-5">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <ul className="md:hidden bg-white shadow-md px-6 py-4 space-y-4 text-gray-800 font-medium">
          {navItems.map((item) => (
            <li key={item.name}>
              {item.type === "scroll" ? (
                <span
                  onClick={() => handleScrollNav(item.to)}
                  className="block hover:text-orange-600 transition duration-200 cursor-pointer"
                >
                  {item.name}
                </span>
              ) : (
                <RouterLink
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className="block hover:text-orange-600 transition duration-200"
                >
                  {item.name}
                </RouterLink>
              )}
            </li>
          ))}

          {isAuthenticated ? (
            <li>
              <Button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="w-full bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Logout
              </Button>
            </li>
          ) : (
            <>
              <li>
                <Button asChild className="w-full bg-[#fe7500] text-white px-4 py-2 rounded-md">
                  <RouterLink to="/adhyaay/login" onClick={() => setIsOpen(false)}>
                    Sign In
                  </RouterLink>
                </Button>
              </li>
              <li>
                <Button asChild className="w-full border bg-[#fe7500] text-white px-4 py-2 rounded-md">
                  <RouterLink to="/adhyaay/register" onClick={() => setIsOpen(false)}>
                    Sign Up
                  </RouterLink>
                </Button>
              </li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
}
