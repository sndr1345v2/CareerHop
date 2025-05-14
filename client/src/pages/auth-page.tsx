import React, { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { AuthForm } from "@/components/auth/auth-form";
import { useLocation } from "wouter";

export default function AuthPage() {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  // Redirect to home if already logged in
  useEffect(() => {
    if (user && !isLoading) {
      setLocation("/");
    }
  }, [user, isLoading, setLocation]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Auth form column */}
      <div className="flex-1 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <svg className="h-12 w-12 text-primary-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 10C6.10457 10 7 9.10457 7 8C7 6.89543 6.10457 6 5 6C3.89543 6 3 6.89543 3 8C3 9.10457 3.89543 10 5 10Z" fill="currentColor"/>
                <path d="M19 10C20.1046 10 21 9.10457 21 8C21 6.89543 20.1046 6 19 6C17.8954 6 17 6.89543 17 8C17 9.10457 17.8954 10 19 10Z" fill="currentColor"/>
                <path d="M12 10C13.1046 10 14 9.10457 14 8C14 6.89543 13.1046 6 12 6C10.8954 6 10 6.89543 10 8C10 9.10457 10.8954 10 12 10Z" fill="currentColor"/>
                <path d="M5 18C6.10457 18 7 17.1046 7 16C7 14.8954 6.10457 14 5 14C3.89543 14 3 14.8954 3 16C3 17.1046 3.89543 18 5 18Z" fill="currentColor"/>
                <path d="M19 18C20.1046 18 21 17.1046 21 16C21 14.8954 20.1046 14 19 14C17.8954 14 17 14.8954 17 16C17 17.1046 17.8954 18 19 18Z" fill="currentColor"/>
                <path d="M12 18C13.1046 18 14 17.1046 14 16C14 14.8954 13.1046 14 12 14C10.8954 14 10 14.8954 10 16C10 17.1046 10.8954 18 12 18Z" fill="currentColor"/>
                <path d="M5 5V11M12 5V11M19 5V11M5 13V19M12 13V19M19 13V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome to CareerHop EDIT HERE</h1>
            <p className="mt-2 text-gray-600">The engineering career community platform</p>
          </div>
          
          <AuthForm />
        </div>
      </div>
      
      {/* Hero column */}
      <div className="hidden lg:flex lg:flex-1 bg-primary-600 text-white p-12 items-center justify-center">
        <div className="max-w-lg">
          <h2 className="text-4xl font-bold mb-6">Jumpstart Your Engineering Career</h2>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Connect with Industry Mentors</h3>
                <p className="text-primary-100">Get guidance from experienced professionals who understand your field and can help you navigate your career path.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Discover Career Opportunities</h3>
                <p className="text-primary-100">Find job listings tailored to your skills and interests with AI-powered matching technology.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Join Discussion Bowls</h3>
                <p className="text-primary-100">Engage in conversations with peers and experts in specialized engineering fields to expand your knowledge.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Access Educational Resources</h3>
                <p className="text-primary-100">Find curated content at all skill levels to help you grow professionally and technically.</p>
              </div>
            </div>
          </div>
          
          <div className="mt-10 pt-6 border-t border-primary-500">
            <p className="font-medium">Join thousands of engineering students bridging the gap between academia and industry.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
