import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileNavbar } from "@/components/layout/mobile-navbar";
import { Header } from "@/components/layout/header";
import { LiveChat } from "@/components/layout/live-chat";
import { ResourceCard } from "@/components/resources/resource-card";
import { DiscussionBowlCard } from "@/components/discussions/discussion-bowl-card";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useToast();

  // Fetch resources
  const { data: resources, isLoading: isLoadingResources } = useQuery({
    queryKey: ["/api/resources"],
  });

  // Fetch discussion bowls
  const { data: discussionBowls, isLoading: isLoadingBowls } = useQuery({
    queryKey: ["/api/discussion-bowls"],
  });

  const handleJoinBowl = (bowlId: number) => {
    toast({
      title: "Bowl Joined",
      description: "You have successfully joined this discussion bowl.",
    });
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen pt-14 lg:pt-0">
      <MobileNavbar onMenuToggle={toggleSidebar} />
      <Sidebar className={sidebarOpen ? "translate-x-0" : ""} />
      
      <main className="flex-1 lg:ml-64">
        <Header />
        
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Welcome to CareerHop</h1>
            <p className="mt-1 text-sm text-gray-500">Your engineering career community platform</p>
          </div>

          {/* Featured Resources Section */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Featured Resources</h2>
              <a href="/resources" className="text-sm font-medium text-primary-600 hover:text-primary-700">
                View All Resources
              </a>
            </div>

            {isLoadingResources ? (
              <div className="flex justify-center py-10">
                <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources && resources.slice(0, 3).map((resource: any) => (
                  <ResourceCard
                    key={resource.id}
                    id={resource.id}
                    title={resource.title}
                    description={resource.description}
                    skillLevel={resource.skillLevel}
                    discipline={resource.discipline}
                    authorName={`Dr. ${resource.authorId === 1 ? 'Michael Chen' : 
                                  resource.authorId === 2 ? 'Sarah Kim' : 
                                  'James Wilson'}`}
                    duration={resource.duration}
                    rating={resource.rating}
                    ratingCount={resource.ratingCount}
                    url={resource.url}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Popular Discussion Bowls Section */}
          <div className="mt-12">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Popular Discussion Bowls</h2>
              <a href="/discussions" className="text-sm font-medium text-primary-600 hover:text-primary-700">
                View All Bowls
              </a>
            </div>

            {isLoadingBowls ? (
              <div className="flex justify-center py-10">
                <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {discussionBowls && discussionBowls.slice(0, 2).map((bowl: any) => (
                  <DiscussionBowlCard
                    key={bowl.id}
                    id={bowl.id}
                    name={bowl.name}
                    description={bowl.description}
                    memberCount={bowl.memberCount}
                    newPostCount={bowl.postCount}
                    isActive={bowl.isActive}
                    recentTopics={[
                      {
                        id: 1,
                        title: bowl.name === "Software Engineering" 
                          ? "Best practices for React performance optimization"
                          : "Sustainable materials in automotive design",
                        author: bowl.name === "Software Engineering" 
                          ? "codemaster" 
                          : "green_engineer",
                        replyCount: bowl.name === "Software Engineering" ? 23 : 31
                      },
                      {
                        id: 2,
                        title: bowl.name === "Software Engineering" 
                          ? "How to prepare for software engineering interviews"
                          : "CFD simulation best practices for HVAC systems",
                        author: bowl.name === "Software Engineering" 
                          ? "techrecruiter" 
                          : "thermal_expert",
                        replyCount: bowl.name === "Software Engineering" ? 47 : 19
                      },
                      {
                        id: 3,
                        title: bowl.name === "Software Engineering" 
                          ? "Is a CS degree still worth it in 2023?"
                          : "Career transition from mechanical to mechatronics",
                        author: bowl.name === "Software Engineering" 
                          ? "curious_student" 
                          : "career_shifter",
                        replyCount: bowl.name === "Software Engineering" ? 89 : 42
                      }
                    ]}
                    onJoin={handleJoinBowl}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <LiveChat />
    </div>
  );
}
