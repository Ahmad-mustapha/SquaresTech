import React, { useState } from 'react';
import Sidebar from '@/components/user/Sidebar';
import Header from '@/components/user/Header';

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const user = { fullName: 'SquaresTech Admin' };

    return (
        <div className="min-h-screen bg-gray-50 flex" style={{ fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif" }}>
            <Sidebar
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
            />

            {/* Main Content */}
            <div className="flex-1 min-w-0 flex flex-col lg:ml-[220px]">
                <Header
                    activeUser={user}
                    isMobileMenuOpen={isMobileMenuOpen}
                    setIsMobileMenuOpen={setIsMobileMenuOpen}
                />

                <main className="flex-1 p-4 lg:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
