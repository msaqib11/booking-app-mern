import React from 'react'
import { Outlet } from 'react-router';
import { useState } from 'react';
import Sidebar from './sidebar';
import Header from './header';
const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="grow p-6">
          <Outlet/>
        </main>
      </div>
    </div>
  )
}

export default Layout