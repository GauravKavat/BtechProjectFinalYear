"use client";

import React, { useState, useEffect } from "react";
import { Users, Award, BookOpen, Settings, BarChart3, Search, Shield, ChevronLeft } from "lucide-react";
import Link from "next/link";

// Mock data for the frontend admin panel
const MOCK_USERS = [
  { id: "1", name: "Alex Johnson", email: "alex@example.com", points: 15420, modulesCompleted: 3, badges: 3, role: "Admin", status: "Active" },
  { id: "2", name: "Sarah Smith", email: "sarah.s@example.com", points: 8900, modulesCompleted: 2, badges: 1, role: "User", status: "Active" },
  { id: "3", name: "Mike Chen", email: "mike.chen@example.com", points: 4200, modulesCompleted: 1, badges: 0, role: "User", status: "Inactive" },
  { id: "4", name: "Emma Davis", email: "emma.d@example.com", points: 21500, modulesCompleted: 3, badges: 5, role: "User", status: "Active" },
  { id: "5", name: "James Wilson", email: "j.wilson@example.com", points: 1200, modulesCompleted: 0, badges: 0, role: "User", status: "Active" },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTheme, setActiveTheme] = useState("teal");

  // Load the active theme to match the main site
  useEffect(() => {
    const savedTheme = localStorage.getItem("aquaquest_theme");
    if (savedTheme) {
       setActiveTheme(savedTheme === "classic" || savedTheme === "theme-classic" ? "teal" : savedTheme);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !document?.body) return;
    
    const classes = Array.from(document.body.classList);
    classes.forEach((c) => {
      if (c.startsWith("theme-")) {
        document.body.classList.remove(c);
      }
    });
    
    document.body.classList.add(`theme-${activeTheme}`);
  }, [activeTheme]);

  const filteredUsers = MOCK_USERS.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`theme-${activeTheme} flex min-h-screen bg-gradient-to-b from-theme-bg-gradient-from to-theme-bg-gradient-to`}>
      
      {/* Sidebar Navigation */}
      <aside className="w-56 bg-white/80 backdrop-blur-md border-r border-theme-primary/10 hidden md:flex flex-col shadow-xl z-20">
        <div className="p-4 border-b border-theme-primary/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-theme-primary flex items-center justify-center text-white shadow-sm shadow-theme-primary/20">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight text-theme-primary-dark leading-tight">
                Admin Panel
              </h1>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">AquaQuest</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 flex flex-col gap-1.5">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg font-extrabold text-sm transition-all ${
              activeTab === "overview"
                ? "bg-theme-primary text-white shadow-sm"
                : "text-slate-500 hover:bg-theme-primary/10 hover:text-theme-primary-dark"
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Overview
          </button>
          
          <button
            onClick={() => setActiveTab("users")}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg font-extrabold text-sm transition-all ${
              activeTab === "users"
                ? "bg-theme-primary text-white shadow-sm"
                : "text-slate-500 hover:bg-theme-primary/10 hover:text-theme-primary-dark"
            }`}
          >
            <Users className="w-4 h-4" />
            Users
          </button>

          <button
            onClick={() => setActiveTab("content")}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg font-extrabold text-sm transition-all ${
              activeTab === "content"
                ? "bg-theme-primary text-white shadow-sm"
                : "text-slate-500 hover:bg-theme-primary/10 hover:text-theme-primary-dark"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Content
          </button>
          
          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg font-extrabold text-sm transition-all ${
              activeTab === "settings"
                ? "bg-theme-primary text-white shadow-sm"
                : "text-slate-500 hover:bg-theme-primary/10 hover:text-theme-primary-dark"
            }`}
          >
            <Settings className="w-4 h-4" />
            Settings
          </button>
        </nav>

        <div className="p-3 border-t border-theme-primary/10">
          <Link 
            href="/"
            className="flex items-center justify-center gap-1.5 w-full py-2 rounded-lg font-extrabold text-sm text-theme-primary-dark bg-theme-primary-light hover:bg-theme-primary/20 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to App
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        {/* Mobile Header (visible only on small screens) */}
        <header className="md:hidden bg-white/80 backdrop-blur-md border-b border-theme-primary/10 p-3 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-theme-primary" />
            <span className="font-black text-base text-theme-primary-dark">Admin</span>
          </div>
          <Link href="/" className="text-[10px] font-bold bg-theme-primary/10 text-theme-primary px-2.5 py-1 rounded-md">
            Exit
          </Link>
        </header>

        <div className="p-4 md:p-6 max-w-6xl mx-auto w-full">
          {activeTab === "overview" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="mb-4">
                <h2 className="text-2xl font-black text-slate-800">Dashboard Overview</h2>
                <p className="text-slate-500 font-bold text-xs mt-0.5">Monitor your platform's engagement and growth.</p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                  <div className="absolute -right-4 -top-4 w-16 h-16 bg-theme-secondary/10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-theme-secondary/20 flex items-center justify-center mb-3 text-theme-secondary">
                      <Users className="w-5 h-5" />
                    </div>
                    <p className="text-2xl font-black text-slate-800">1,248</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">Total Guardians</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                  <div className="absolute -right-4 -top-4 w-16 h-16 bg-theme-primary/10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-theme-primary/20 flex items-center justify-center mb-3 text-theme-primary-dark">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <p className="text-2xl font-black text-slate-800">8,592</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">Modules Completed</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                  <div className="absolute -right-4 -top-4 w-16 h-16 bg-amber-400/10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center mb-3 text-amber-500">
                      <Award className="w-5 h-5" />
                    </div>
                    <p className="text-2xl font-black text-slate-800">3,420</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">Badges Earned</p>
                  </div>
                </div>

                <div className="bg-theme-primary rounded-2xl p-4 border border-theme-primary-dark shadow-sm relative overflow-hidden group">
                  <div className="absolute -right-4 -top-4 w-16 h-16 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-3 text-white">
                      <BarChart3 className="w-5 h-5" />
                    </div>
                    <p className="text-2xl font-black text-white">45.2M</p>
                    <p className="text-[10px] font-bold text-theme-primary-light uppercase tracking-wider mt-0.5">Total Points</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions & Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                  <h3 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
                    <Award className="w-4 h-4 text-theme-primary" />
                    Top Performing Users
                  </h3>
                  <div className="space-y-2.5">
                    {MOCK_USERS.slice(0, 3).map((user, idx) => (
                      <div key={user.id} className="flex items-center p-3 rounded-xl bg-slate-50 hover:bg-theme-primary/5 transition-colors border border-slate-100">
                        <div className={`w-8 h-8 text-sm rounded-full flex items-center justify-center font-black text-white ${idx === 0 ? 'bg-amber-400' : idx === 1 ? 'bg-slate-400' : 'bg-amber-700'}`}>
                          #{idx + 1}
                        </div>
                        <div className="ml-3 flex-1">
                          <p className="font-bold text-sm text-slate-800">{user.name}</p>
                          <p className="text-[10px] text-slate-500 font-semibold">{user.email}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-sm text-theme-primary-dark">{user.points.toLocaleString()} pts</p>
                          <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">{user.badges} Badges</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-theme-primary-light rounded-2xl p-5 border border-theme-primary/20">
                  <h3 className="text-lg font-black text-theme-primary-dark mb-1.5">Supabase Backend</h3>
                  <p className="text-xs font-semibold text-slate-600 mb-4">
                    Backend integration is currently pending.
                  </p>
                  <div className="bg-white/60 p-3 rounded-xl border border-theme-primary/10">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Status</span>
                      <span className="text-[9px] bg-slate-200 text-slate-600 font-black px-1.5 py-0.5 rounded-md">DISCONNECTED</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 mb-1">
                      <div className="bg-slate-400 h-1.5 rounded-full" style={{ width: '0%' }}></div>
                    </div>
                    <p className="text-[9px] text-center text-slate-400 font-bold mt-1.5">Waiting for integration</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
                <div>
                  <h2 className="text-2xl font-black text-slate-800">User Management</h2>
                  <p className="text-slate-500 font-bold text-xs mt-0.5">View and manage all registered players.</p>
                </div>
                
                <div className="relative w-full md:w-auto">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full md:w-56 pl-8 pr-3 py-1.5 rounded-lg border-2 border-slate-200 focus:border-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-primary/10 transition-all font-semibold text-xs placeholder:text-slate-400 text-slate-800 bg-white"
                  />
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-2.5 text-[10px] font-black text-slate-500 uppercase tracking-wider">User</th>
                        <th className="px-4 py-2.5 text-[10px] font-black text-slate-500 uppercase tracking-wider">Points</th>
                        <th className="px-4 py-2.5 text-[10px] font-black text-slate-500 uppercase tracking-wider">Progress</th>
                        <th className="px-4 py-2.5 text-[10px] font-black text-slate-500 uppercase tracking-wider">Role</th>
                        <th className="px-4 py-2.5 text-[10px] font-black text-slate-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                          <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-4 py-2">
                              <div className="flex items-center">
                                <div className="h-7 w-7 rounded-full bg-gradient-to-br from-theme-primary to-theme-secondary flex items-center justify-center text-white text-xs font-black shadow-sm">
                                  {user.name.charAt(0)}
                                </div>
                                <div className="ml-3">
                                  <div className="font-bold text-sm text-slate-800">{user.name}</div>
                                  <div className="text-[10px] text-slate-500 font-semibold">{user.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-2">
                              <span className="font-black text-sm text-amber-500">{user.points.toLocaleString()}</span>
                            </td>
                            <td className="px-4 py-2">
                              <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold text-slate-600">{user.modulesCompleted}/3 Modules</span>
                                <div className="w-20 h-1 bg-slate-100 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-theme-primary rounded-full" 
                                    style={{ width: `${(user.modulesCompleted / 3) * 100}%` }}
                                  ></div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-2">
                              <span className={`px-2 py-0.5 inline-flex text-[9px] leading-4 font-black uppercase tracking-wider rounded-md ${
                                user.role === 'Admin' ? 'bg-theme-secondary/10 text-theme-secondary' : 'bg-slate-100 text-slate-600'
                              }`}>
                                {user.role}
                              </span>
                            </td>
                            <td className="px-4 py-2">
                              <span className={`px-2 py-0.5 inline-flex text-[9px] leading-4 font-black uppercase tracking-wider rounded-md ${
                                user.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                              }`}>
                                {user.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="px-4 py-8 text-center text-xs text-slate-500 font-bold">
                            No users found matching "{searchQuery}"
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                
                <div className="px-4 py-2.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-500">Showing {filteredUsers.length} users</span>
                  <div className="flex gap-1.5">
                    <button disabled className="px-2.5 py-1 rounded-md border border-slate-200 text-[10px] font-bold text-slate-400 bg-slate-100 cursor-not-allowed">Previous</button>
                    <button disabled className="px-2.5 py-1 rounded-md border border-slate-200 text-[10px] font-bold text-slate-400 bg-slate-100 cursor-not-allowed">Next</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "content" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
                <div>
                  <h2 className="text-2xl font-black text-slate-800">Content Management</h2>
                  <p className="text-slate-500 font-bold text-xs mt-0.5">Manage learning modules and badges.</p>
                </div>
                <button className="px-4 py-2 rounded-lg bg-theme-primary text-white font-extrabold text-xs shadow-sm hover:bg-theme-primary-hover transition-colors">
                  + Create New Module
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Active Modules List */}
                <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
                  <h3 className="text-lg font-black text-slate-800 mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-theme-secondary" />
                    Active Modules
                  </h3>
                  <div className="space-y-2.5">
                    {["Ocean Basics", "Coral Reefs", "Deep Sea Mysteries"].map((mod, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-theme-primary/30 transition-all">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-white text-sm ${i === 0 ? 'bg-theme-primary' : i === 1 ? 'bg-theme-secondary' : 'bg-theme-accent'}`}>
                            {i + 1}
                          </div>
                          <div>
                            <p className="font-bold text-sm text-slate-800">{mod}</p>
                            <p className="text-[10px] text-slate-500 font-semibold">Updated 2 days ago</p>
                          </div>
                        </div>
                        <button className="text-[10px] font-bold bg-white border border-slate-200 text-slate-600 px-2.5 py-1 rounded-md hover:bg-slate-100">
                          Edit
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Badge Management */}
                <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
                  <h3 className="text-lg font-black text-slate-800 mb-3 flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-500" />
                    Badge Management
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { name: "Ocean Guardian", icon: "🛡️", color: "bg-teal-100" },
                      { name: "Trivia Champ", icon: "🏆", color: "bg-amber-100" },
                      { name: "Memory Master", icon: "🧠", color: "bg-sky-100" },
                      { name: "Deep Diver", icon: "🤿", color: "bg-indigo-100" }
                    ].map((badge, i) => (
                      <div key={i} className={`p-3 rounded-xl ${badge.color} flex flex-col items-center justify-center text-center gap-1.5 border border-slate-100/50 hover:scale-105 transition-transform cursor-pointer`}>
                        <span className="text-2xl">{badge.icon}</span>
                        <span className="text-[10px] font-black text-slate-700 leading-tight">{badge.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="mb-4">
                <h2 className="text-2xl font-black text-slate-800">Admin Settings</h2>
                <p className="text-slate-500 font-bold text-xs mt-0.5">Configure platform preferences and rules.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* General Configuration */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
                  <h3 className="text-lg font-black text-slate-800 border-b border-slate-100 pb-3">General Configuration</h3>
                  
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Platform Name</label>
                    <input type="text" defaultValue="AquaQuest" className="w-full px-3 py-2 rounded-lg border-2 border-slate-200 focus:border-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-primary/10 transition-all font-semibold text-sm text-slate-800" />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Support Email</label>
                    <input type="email" defaultValue="support@aquaquest.edu" className="w-full px-3 py-2 rounded-lg border-2 border-slate-200 focus:border-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-primary/10 transition-all font-semibold text-sm text-slate-800" />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div>
                      <p className="font-bold text-sm text-slate-800">Maintenance Mode</p>
                      <p className="text-[10px] text-slate-500 font-semibold">Disable access for non-admin</p>
                    </div>
                    <div className="relative inline-block w-10 h-5 rounded-full bg-slate-200 cursor-pointer shadow-inner">
                      <div className="absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition-transform"></div>
                    </div>
                  </div>
                </div>

                {/* Gamification Settings */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
                  <h3 className="text-lg font-black text-slate-800 border-b border-slate-100 pb-3">Gamification Rules</h3>
                  
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Points per Module</label>
                    <input type="number" defaultValue="50" className="w-full px-3 py-2 rounded-lg border-2 border-slate-200 focus:border-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-primary/10 transition-all font-semibold text-sm text-slate-800" />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Points per Quiz</label>
                    <input type="number" defaultValue="10" className="w-full px-3 py-2 rounded-lg border-2 border-slate-200 focus:border-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-primary/10 transition-all font-semibold text-sm text-slate-800" />
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 flex justify-end gap-2.5">
                    <button className="px-4 py-2 rounded-lg font-extrabold text-xs text-slate-500 hover:bg-slate-100 transition-colors">
                      Cancel
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-theme-primary text-white font-extrabold text-xs shadow-sm hover:bg-theme-primary-hover transition-colors">
                      Save Settings
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
