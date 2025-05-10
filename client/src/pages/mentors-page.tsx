import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileNavbar } from "@/components/layout/mobile-navbar";
import { Header } from "@/components/layout/header";
import { LiveChat } from "@/components/layout/live-chat";
import { MentorCard } from "@/components/mentors/mentor-card";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const disciplines = [
  { value: "", label: "All Disciplines" },
  { value: "software", label: "Software Engineering" },
  { value: "electrical", label: "Electrical Engineering" },
  { value: "mechanical", label: "Mechanical Engineering" },
  { value: "civil", label: "Civil Engineering" },
  { value: "chemical", label: "Chemical Engineering" },
  { value: "data", label: "Data Science" }
];

export default function MentorsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDiscipline, setSelectedDiscipline] = useState("");
  const { toast } = useToast();

  // Fetch mentors
  const { data: mentors, isLoading } = useQuery({
    queryKey: [
      "/api/mentors", 
      selectedDiscipline ? `?expertise=${selectedDiscipline}` : ""
    ],
  });

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleConnect = (mentorId: number) => {
    toast({
      title: "Connection Request Sent",
      description: "Your mentorship request has been sent. You'll be notified when they respond.",
    });
  };

  // Filter mentors based on search term and discipline
  const filteredMentors = mentors
    ? mentors.filter((mentor: any) => {
        const nameMatch = mentor.user?.displayName.toLowerCase().includes(searchTerm.toLowerCase());
        const companyMatch = mentor.company.toLowerCase().includes(searchTerm.toLowerCase());
        const positionMatch = mentor.position.toLowerCase().includes(searchTerm.toLowerCase());
        
        return (nameMatch || companyMatch || positionMatch);
      })
    : [];

  return (
    <div className="flex min-h-screen pt-14 lg:pt-0">
      <MobileNavbar onMenuToggle={toggleSidebar} />
      <Sidebar className={sidebarOpen ? "translate-x-0" : ""} />
      
      <main className="flex-1 lg:ml-64">
        <Header />
        
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Find Mentors</h1>
            <p className="mt-1 text-sm text-gray-500">Connect with experienced professionals in your field</p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search mentors by name, company, or position..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10"
              />
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <Select
              value={selectedDiscipline}
              onValueChange={setSelectedDiscipline}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by discipline" />
              </SelectTrigger>
              <SelectContent>
                {disciplines.map((discipline) => (
                  <SelectItem key={discipline.value} value={discipline.value}>
                    {discipline.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button className="whitespace-nowrap">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Advanced Filters
            </Button>
          </div>

          {/* AI Recommendation Banner */}
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-8 flex items-center justify-between">
            <div className="flex items-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-8 w-8 text-primary-600 mr-3" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" 
                />
              </svg>
              <div>
                <h3 className="font-medium text-primary-800">AI-Powered Mentor Matching</h3>
                <p className="text-sm text-primary-600">CareerHop can recommend mentors based on your profile, interests, and career goals.</p>
              </div>
            </div>
            <Button variant="secondary" className="bg-white border-primary-300 text-primary-700 hover:bg-primary-100">
              Get Recommendations
            </Button>
          </div>

          {/* Mentors Grid */}
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
            </div>
          ) : filteredMentors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMentors.map((mentor: any) => (
                <MentorCard
                  key={mentor.id}
                  id={mentor.id}
                  name={mentor.user?.displayName || `Mentor ${mentor.id}`}
                  company={mentor.company}
                  position={mentor.position}
                  expertise={mentor.expertise}
                  yearsOfExperience={mentor.yearsOfExperience}
                  isVerified={mentor.isVerified}
                  rating={mentor.rating}
                  ratingCount={mentor.ratingCount}
                  onConnect={handleConnect}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-12 w-12 mx-auto text-gray-400 mb-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" 
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No mentors found</h3>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </main>

      <LiveChat />
    </div>
  );
}
