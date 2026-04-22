import React from 'react';
// import { Moon } from "react-icons/hi2";

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-24 bg-[#373B53] flex flex-col justify-between rounded-r-3xl z-10">
      <div className="h-24 w-24 bg-[#7C5DFA] rounded-r-3xl flex items-center justify-center relative overflow-hidden">
        <div className="absolute bottom-0 w-full h-1/2 bg-[#9277FF] rounded-tl-3xl"></div>
        <div className="relative z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center">
          <div className="w-6 h-6 bg-[#7C5DFA] rounded-full"></div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <button className="mb-8 text-slate-400 hover:text-white transition-colors">
          {/* <Moon className="w-6 h-6 fill-current" /> */}
        </button>
        <div className="w-full h-px bg-slate-500 mb-6"></div>
        <div className="mb-6">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
            alt="avatar"
            className="w-10 h-10 rounded-full border-2 border-slate-500"
          />
        </div>
      </div>
    </aside>
  );
}

