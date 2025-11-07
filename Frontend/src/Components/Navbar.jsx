import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { NavItems, adminNavItems } from "../Constants/Constants";
import { getUser, removeToken, removeUser } from "../utils/auth";

const Navbar = () => {
  const [user, setUser] = useState(getUser());
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  const ProfileDropdown = () => (
    <div className="relative" ref={profileRef}>
      <button
        onClick={() => setIsProfileOpen(!isProfileOpen)}
        className="flex items-center gap-3 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all duration-300 group"
      >
        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center font-bold text-black shadow-lg">
          {user?.fullName?.charAt(0)?.toUpperCase() || "?"}
        </div>
        <span className="font-medium text-white group-hover:text-emerald-300 transition-colors hidden xl:block">{user?.fullName || "User"}</span>
        <svg className={`w-4 h-4 text-emerald-400 transition-transform duration-300 hidden xl:block ${isProfileOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isProfileOpen && (
        <div className="absolute right-0 z-50 mt-3 w-72 rounded-2xl border border-emerald-500/30 bg-black/95 backdrop-blur-xl shadow-2xl shadow-emerald-500/10 overflow-hidden">
          <div className="bg-gradient-to-br from-emerald-500/10 to-green-500/5 border-b border-emerald-500/20 px-6 py-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center font-bold text-black shadow-lg">
                {user?.fullName?.charAt(0)?.toUpperCase() || "?"}
              </div>
              <div>
                <p className="text-lg font-semibold text-white">{user?.fullName}</p>
                <p className="text-xs text-emerald-400">{user?.collegeId}</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 truncate">{user?.email}</p>
          </div>
          <div className="px-4 py-3">
            <button
              onClick={handleLogout}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 py-3 font-semibold text-black transition-all duration-300 hover:from-emerald-400 hover:to-green-400 hover:shadow-lg hover:shadow-emerald-500/50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const MobileProfile = () => (
    <div className="mt-6 border-t border-emerald-500/30 pt-6">
      <div className="mb-6 flex items-center gap-4 p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-green-500 font-bold text-black shadow-lg">
          {user?.fullName?.charAt(0)?.toUpperCase() || "?"}
        </div>
        <div className="flex-1">
          <p className="text-lg font-semibold text-white">
            {user?.fullName || "User"}
          </p>
          <p className="text-sm text-emerald-400">{user?.collegeId}</p>
          <p className="text-xs text-gray-400 truncate">{user?.email}</p>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-500 py-4 font-semibold text-black transition-all duration-300 hover:from-emerald-400 hover:to-green-400 shadow-lg shadow-emerald-500/50"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        <span>Logout</span>
      </button>
    </div>
  );

  const isAdmin = user?.role === "admin";
  const navigationLinks = isAdmin ? [...NavItems, adminNavItems] : NavItems;

  useEffect(() => {
    const handleStorageChange = () => setUser(getUser());
    window.addEventListener("storage", handleStorageChange);
    const interval = setInterval(() => {
      const currentUser = getUser();
      if (JSON.stringify(currentUser) !== JSON.stringify(user)) {
        setUser(currentUser);
      }
    }, 500);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  const handleLogout = () => {
    removeToken();
    removeUser();
    setUser(null);
    setIsProfileOpen(false);
    setIsOpen(false);
    navigate("/login");
  };

  const navContainerRef = useRef(null);
  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (currentScrollY <= 10) {
      setIsNavVisible(true);
      if (navContainerRef.current) {
        navContainerRef.current.classList.remove("floating-nav");
        navContainerRef.current.classList.add("top-nav");
      }
      setLastScrollY(0);
      return;
    }
    if (navContainerRef.current) {
      navContainerRef.current.classList.add("floating-nav");
      navContainerRef.current.classList.remove("top-nav");
    }
    if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
    } else {
      setIsNavVisible(true);
    }
    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -120,
      duration: 0.3,
      ease: "power2.out",
    });
  }, [isNavVisible]);

  return (
    <div className="overflow-x-hidden">
      <div
        ref={navContainerRef}
        className="fixed inset-x-0 top-0 z-50 h-20 transition-all duration-700 bg-black/90 backdrop-blur-md border-b border-emerald-500/20"
      >
        <header className="h-full flex items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img 
              className="w-20 h-14 md:w-24 md:h-16 object-contain hover:scale-105 transition-transform duration-300" 
              src="/img/pulse-logo.png" 
              alt="Pulse Logo"
              width="112"
              height="80"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-center flex-1 px-8">
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-full px-4 py-2 border border-emerald-500/20">
              {navigationLinks.map((item, index) => (
                <NavLink
                  to={item.to}
                  key={index}
                  className={({ isActive }) =>
                    `relative px-5 py-2.5 text-sm lg:text-base font-semibold rounded-full transition-all duration-300 ${
                      isActive
                        ? "text-black bg-gradient-to-r from-emerald-400 to-green-500 shadow-lg shadow-emerald-500/50"
                        : "text-white hover:text-emerald-400 hover:bg-white/5"
                    }`
                  }
                >
                  {item.title}
                </NavLink>
              ))}
            </div>
          </nav>

          {/* Auth Buttons / Profile */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              {user ? (
                <ProfileDropdown />
              ) : (
                <div className="flex gap-3">
                  <NavLink
                    to="/login"
                    className="px-5 py-2.5 rounded-xl border border-emerald-500/30 bg-black/40 font-semibold text-white hover:bg-emerald-500/10 hover:border-emerald-500/50 transition-all duration-300 text-sm"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 font-semibold text-black hover:from-emerald-400 hover:to-green-400 transition-all duration-300 shadow-lg shadow-emerald-500/50 hover:shadow-emerald-400/60 text-sm"
                  >
                    Register
                  </NavLink>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative z-50 flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-500/30 bg-black/60 backdrop-blur-sm text-white transition-all duration-300 hover:bg-emerald-500/10 hover:border-emerald-500/50 focus:outline-none lg:hidden"
            >
              <div className="relative flex h-5 w-6 flex-col justify-between">
                <span
                  className={`block h-0.5 rounded-full bg-emerald-400 transition-all duration-300 ${
                    isOpen ? "w-6 translate-y-2 rotate-45" : "w-6"
                  }`}
                ></span>
                <span
                  className={`block h-0.5 rounded-full bg-emerald-400 transition-all duration-300 ${
                    isOpen ? "w-6 opacity-0" : "w-5"
                  }`}
                ></span>
                <span
                  className={`block h-0.5 rounded-full bg-emerald-400 transition-all duration-300 ${
                    isOpen ? "w-6 -translate-y-2 -rotate-45" : "w-4"
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </header>
      </div>

      <div
        className={clsx(
          "fixed inset-0 bg-gradient-to-br from-black via-emerald-950/20 to-black right-0 top-0 z-40 h-full w-full transform transition-all duration-500 ease-in-out lg:hidden backdrop-blur-xl",
          {
            "translate-x-0 opacity-100": isOpen,
            "translate-x-full opacity-0": !isOpen,
            "is-open": isOpen,
          }
        )}
      >
        <div className="flex h-full w-full flex-col items-center justify-between p-8 pt-28">
          <div className="flex w-full flex-col gap-3">
            {navigationLinks.map((link, index) => (
              <NavLink
                key={link.title}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  clsx(
                    "menu-item w-full rounded-2xl px-8 py-4 text-center text-xl font-semibold transition-all duration-300 ease-in-out border",
                    {
                      "bg-gradient-to-r from-emerald-500 to-green-500 text-black border-emerald-400 shadow-lg shadow-emerald-500/50":
                        isActive,
                      "text-white hover:bg-emerald-500/10 border-emerald-500/20 hover:border-emerald-500/40": !isActive,
                    }
                  )
                }
                style={{ "--delay": `${index * 0.1}s` }}
              >
                {link.title}
              </NavLink>
            ))}
          </div>

          <div className="w-full">
            {user ? (
              <MobileProfile />
            ) : (
              <div className="mt-4 flex w-full flex-col gap-4">
                <NavLink
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="rounded-2xl border-2 border-emerald-500/40 bg-black/40 backdrop-blur-sm px-6 py-4 text-center text-lg font-semibold text-white transition-all hover:bg-emerald-500/10 hover:border-emerald-500/60"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="rounded-2xl bg-gradient-to-r from-emerald-500 to-green-500 px-6 py-4 text-center text-lg font-semibold text-black transition-all hover:from-emerald-400 hover:to-green-400 shadow-lg shadow-emerald-500/50"
                >
                  Register
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
