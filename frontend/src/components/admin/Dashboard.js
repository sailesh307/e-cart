import { useState } from 'react';
import AdminSideBar from './AdminSideBar';
import { FaBars } from 'react-icons/fa';

const Dashboard = ({ children, activeTab }) => {
    // open if in destop mode else close
    const [sidebarOpen, setSidebarOpen] = useState(
        window.innerWidth > 768 ? true : false
    );


    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside
                className={`${sidebarOpen ? 'block' : 'hidden'
                    }  bg-gray-800 text-white`}
            >
                <AdminSideBar activeTab={activeTab} setSidebarOpen={setSidebarOpen} />
            </aside>

            {/* Content */}
            <main className={`w-full ${sidebarOpen ? 'ml-72' : 'ml-0'} min-h-screen transition-all duration-300 ease-in-out`}>
                <div className="flex flex-col gap-6 sm:m-8 p-2 pb-6 overflow-hidden">
                    {/* Toggle Sidebar Button */}
                    {!sidebarOpen && <button
                        onClick={() => setSidebarOpen(!sidebarOpen)} // Toggle sidebar state
                        className="bg-gray-700 w-10 h-10 rounded-full shadow text-white flex items-center justify-center"
                    >
                        <FaBars />
                    </button>}
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
