import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileNavbar } from "@/components/layout/mobile-navbar";
import { Header } from "@/components/layout/header";
import { LiveChat } from "@/components/layout/live-chat";
import { JobCard } from "@/components/jobs/job-card";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const disciplines = [
  { value: "", label: "All Disciplines" },
  { value: "Computer Engineering", label: "Computer Engineering" },
  { value: "Electrical Engineering", label: "Electrical Engineering" },
  { value: "Mechanical Engineering", label: "Mechanical Engineering" },
  { value: "Civil Engineering", label: "Civil Engineering" },
  { value: "Chemical Engineering", label: "Chemical Engineering" },
  { value: "Data Science", label: "Data Science" }
];

const experienceLevels = [
  { value: "", label: "All Levels" },
  { value: "Entry Level", label: "Entry Level" },
  { value: "Mid Level", label: "Mid Level" },
  { value: "Senior Level", label: "Senior Level" }
];

export default function JobListingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDiscipline, setSelectedDiscipline] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const { toast } = useToast();

  // Fetch job listings
  const { data: jobs, isLoading } = useQuery({
    queryKey: [
      "/api/jobs", 
      selectedDiscipline ? `?discipline=${selectedDiscipline}` : ""
    ],
  });

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleApply = (jobId: number) => {
    toast({
      title: "Application Submitted",
      description: "Your application has been submitted successfully. You can track its status in your profile.",
    });
  };

  // Filter jobs based on search term and experience level
  const filteredJobs = jobs 
    ? jobs.filter((job: any) => {
        const matchesSearch = 
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesExperience = 
          !selectedExperience || 
          job.experienceLevel.toLowerCase() === selectedExperience.toLowerCase();
        
        return matchesSearch && matchesExperience;
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
            <h1 className="text-2xl font-bold text-gray-900">Job Listings</h1>
            <p className="mt-1 text-sm text-gray-500">Explore career opportunities in engineering</p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search jobs by title, company, or keywords..."
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
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Discipline" />
              </SelectTrigger>
              <SelectContent>
                {disciplines.map((discipline) => (
                  <SelectItem key={discipline.value} value={discipline.value}>
                    {discipline.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={selectedExperience}
              onValueChange={setSelectedExperience}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Experience level" />
              </SelectTrigger>
              <SelectContent>
                {experienceLevels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
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
              More Filters
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
                <h3 className="font-medium text-primary-800">AI-Powered Job Matching</h3>
                <p className="text-sm text-primary-600">Let our AI find the perfect jobs based on your skills, experience, and career goals.</p>
              </div>
            </div>
            <Button variant="secondary" className="bg-white border-primary-300 text-primary-700 hover:bg-primary-100">
              Get Recommendations
            </Button>
          </div>

          {/* Job Listings */}
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
            </div>
          ) : filteredJobs.length > 0 ? (
            <div className="space-y-6">
              {filteredJobs.map((job: any) => (
                <JobCard
                  key={job.id}
                  id={job.id}
                  title={job.title}
                  company={job.company}
                  location={job.location}
                  description={job.description}
                  discipline={job.discipline}
                  experienceLevel={job.experienceLevel}
                  salaryRange={job.salaryRange}
                  postedAt={job.createdAt}
                  onApply={handleApply}
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
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No job listings found</h3>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </main>

      <LiveChat />
    </div>
  );
}
