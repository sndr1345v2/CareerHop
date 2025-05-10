import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileNavbar } from "@/components/layout/mobile-navbar";
import { Header } from "@/components/layout/header";
import { LiveChat } from "@/components/layout/live-chat";
import { ResourceCard } from "@/components/resources/resource-card";
import { ResourceFilter } from "@/components/resources/resource-filter";
import { Loader2 } from "lucide-react";

const skillLevelOptions = [
  { label: "Beginner", value: "beginner" },
  { label: "Intermediate", value: "intermediate" },
  { label: "Advanced", value: "advanced" },
];

const disciplineOptions = [
  { label: "Computer Engineering", value: "Computer Engineering" },
  { label: "Mechanical Engineering", value: "Mechanical Engineering" },
  { label: "Electrical Engineering", value: "Electrical Engineering" },
  { label: "Civil Engineering", value: "Civil Engineering" },
  { label: "Chemical Engineering", value: "Chemical Engineering" },
  { label: "Data Science", value: "Data Science" },
];

const sortOptions = [
  { label: "Recently Updated", value: "recent" },
  { label: "Most Popular", value: "popular" },
  { label: "Top Rated", value: "rated" },
];

export default function ResourcesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedSkillLevel, setSelectedSkillLevel] = useState("");
  const [selectedDiscipline, setSelectedDiscipline] = useState("");
  const [selectedSort, setSelectedSort] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const resourcesPerPage = 6;

  // Fetch resources based on selected filters
  const { data: resources, isLoading } = useQuery({
    queryKey: [
      "/api/resources", 
      selectedSkillLevel ? `?skillLevel=${selectedSkillLevel}` : "",
      selectedDiscipline ? `?discipline=${selectedDiscipline}` : ""
    ],
  });

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Sort resources based on selected option
  const getSortedResources = () => {
    if (!resources) return [];
    
    const resourcesCopy = [...resources];
    
    switch (selectedSort) {
      case "popular":
        return resourcesCopy.sort((a, b) => b.ratingCount - a.ratingCount);
      case "rated":
        return resourcesCopy.sort((a, b) => b.rating - a.rating);
      case "recent":
      default:
        // Assume resources are already sorted by recency from API
        return resourcesCopy;
    }
  };
  
  // Get current page resources
  const sortedResources = getSortedResources();
  const indexOfLastResource = currentPage * resourcesPerPage;
  const indexOfFirstResource = indexOfLastResource - resourcesPerPage;
  const currentResources = sortedResources.slice(indexOfFirstResource, indexOfLastResource);
  const totalPages = Math.ceil(sortedResources.length / resourcesPerPage);

  // Get mentor name based on authorId (for demo purposes)
  const getAuthorName = (authorId: number) => {
    const authors = {
      1: "Dr. Michael Chen",
      2: "Prof. Sarah Kim",
      3: "Dr. James Wilson",
      4: "Prof. Emma Rodriguez",
      5: "Dr. Thomas Patel",
      6: "Prof. Robert Zhang"
    };
    return authors[authorId as keyof typeof authors] || `Author ${authorId}`;
  };

  return (
    <div className="flex min-h-screen pt-14 lg:pt-0">
      <MobileNavbar onMenuToggle={toggleSidebar} />
      <Sidebar className={sidebarOpen ? "translate-x-0" : ""} />
      
      <main className="flex-1 lg:ml-64">
        <Header />
        
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Educational Resources</h1>
            <p className="mt-1 text-sm text-gray-500">Browse resources by skill level or engineering discipline</p>
          </div>

          {/* Filter & Sort Toolbar */}
          <ResourceFilter
            skillLevels={skillLevelOptions}
            disciplines={disciplineOptions}
            sortOptions={sortOptions}
            selectedSkillLevel={selectedSkillLevel}
            selectedDiscipline={selectedDiscipline}
            selectedSort={selectedSort}
            onSkillLevelChange={setSelectedSkillLevel}
            onDisciplineChange={setSelectedDiscipline}
            onSortChange={setSelectedSort}
          />

          {/* Resources Cards Grid */}
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentResources.map((resource: any) => (
                  <ResourceCard
                    key={resource.id}
                    id={resource.id}
                    title={resource.title}
                    description={resource.description}
                    skillLevel={resource.skillLevel}
                    discipline={resource.discipline}
                    authorName={getAuthorName(resource.authorId)}
                    duration={resource.duration}
                    rating={resource.rating}
                    ratingCount={resource.ratingCount}
                    url={resource.url}
                  />
                ))}
              </div>

              {/* Pagination */}
              {sortedResources.length > resourcesPerPage && (
                <div className="mt-8 flex items-center justify-between">
                  <div className="flex-1 flex justify-between sm:hidden">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{indexOfFirstResource + 1}</span> to{" "}
                        <span className="font-medium">
                          {Math.min(indexOfLastResource, sortedResources.length)}
                        </span>{" "}
                        of <span className="font-medium">{sortedResources.length}</span> results
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <button
                          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                          disabled={currentPage === 1}
                          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                        >
                          <span className="sr-only">Previous</span>
                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                        
                        {[...Array(totalPages)].map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              currentPage === i + 1
                                ? "z-10 bg-primary-50 border-primary-500 text-primary-600"
                                : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                            }`}
                          >
                            {i + 1}
                          </button>
                        ))}
                        
                        <button
                          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                          disabled={currentPage === totalPages}
                          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                        >
                          <span className="sr-only">Next</span>
                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <LiveChat />
    </div>
  );
}
