import {
    Link,
    useLocation,
} from "react-router-dom";

import "./Sidebar.css";

export default function Sidebar() {
    const location = useLocation();

    return (
        <aside className="sidebar">

            <div className="sidebar-logo gap-3">
                {/* Brand Logo Icon */}
                <svg className="w-8 h-8 flex-shrink-0" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="16" cy="16" r="14" fill="url(#orange-grad)" />
                    <rect x="10" y="10" width="12" height="12" rx="2" stroke="white" strokeWidth="2.5" opacity="0.9" />
                    <line x1="10" y1="16" x2="22" y2="16" stroke="white" strokeWidth="2.5" opacity="0.9" />
                    <line x1="16" y1="10" x2="16" y2="22" stroke="white" strokeWidth="2.5" opacity="0.9" />
                    <defs>
                        <linearGradient id="orange-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#f97316" />
                            <stop stopColor="#ea580c" />
                        </linearGradient>
                    </defs>
                </svg>
                <span className="font-extrabold text-white text-xl tracking-tight">Productr</span>
            </div>

            <div className="sidebar-search">
                <div className="sidebar-search-icon">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>
                <input
                    type="text"
                    placeholder="Search"
                />
            </div>

            <nav className="sidebar-nav">

                <Link
                    to="/home"
                    className={`sidebar-link ${location.pathname === "/home"
                            ? "active"
                            : ""
                        }`}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                    </svg>
                    Home
                </Link>

                <Link
                    to="/products"
                    className={`sidebar-link ${location.pathname ===
                            "/products"
                            ? "active"
                            : ""
                        }`}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                    </svg>
                    Products
                </Link>

            </nav>

        </aside>
    );
}