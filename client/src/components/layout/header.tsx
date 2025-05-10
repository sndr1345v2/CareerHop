import React from "react";
import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";

export function Header() {
  const { user } = useAuth();
  
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm hidden lg:block">
      <div className="px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex-1 flex items-center space-x-4">
            <div className="w-full max-w-xl relative">
              <input 
                type="text" 
                placeholder="Search resources, mentors, or jobs..." 
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link href="/notifications">
              <a className="p-2 rounded-full text-gray-500 hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </a>
            </Link>
            <Link href="/messages">
              <a className="p-2 rounded-full text-gray-500 hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </Link>
            <div className="h-6 w-px bg-gray-300"></div>
            <Link href="/profile">
              <a className="flex items-center space-x-2">
                {user && (
                  <>
                    <div className="h-8 w-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center">
                      {user.displayName.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{user.displayName}</span>
                  </>
                )}
              </a>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
