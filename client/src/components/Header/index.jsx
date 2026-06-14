import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Header.css";

export default function Header() {
    const location = useLocation();
    const { logout } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const email = localStorage.getItem("email") || "User";
    const isHome = location.pathname === "/home";

    return (
        <header className="header justify-between">
            {/* Left side breadcrumb */}
            <div className="flex items-center gap-2">
                {isHome ? (
                    <>
                        <svg className="w-4.5 h-4.5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                        <span className="text-sm font-semibold text-gray-600">Home</span>
                    </>
                ) : (
                    <>
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                        </svg>
                        <span className="text-sm font-semibold text-gray-600">Products</span>
                    </>
                )}
            </div>

            {/* Right side search and profile */}
            <div className="flex items-center gap-4">
                <div className="header-search">
                    <div className="header-search-icon">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Search Services, Products"
                    />
                </div>

                {/* Profile dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center focus:outline-none cursor-pointer"
                    >
                        <img
                            className="header-profile hover:scale-[1.03] active:scale-[0.98] transition-all"
                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80"
                            alt="User profile"
                        />
                    </button>

                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2.5 w-52 bg-white border border-gray-100 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-200">
                            <div className="px-4 py-2.5 border-b border-gray-50">
                                <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">Logged In As</p>
                                <p className="text-xs font-bold text-gray-700 truncate mt-0.5">{email}</p>
                            </div>
                            <button
                                onClick={logout}
                                className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 font-semibold transition cursor-pointer flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                </svg>
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}