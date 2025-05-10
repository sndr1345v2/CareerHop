import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileNavbar } from "@/components/layout/mobile-navbar";
import { Header } from "@/components/layout/header";
import { LiveChat } from "@/components/layout/live-chat";
import { DiscussionBowlCard } from "@/components/discussions/discussion-bowl-card";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function DiscussionsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  // Fetch discussion bowls
  const { data: discussionBowls, isLoading } = useQuery({
    queryKey: ["/api/discussion-bowls"],
  });

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleJoinBowl = (bowlId: number) => {
    toast({
      title: "Bowl Joined",
      description: "You have successfully joined this discussion bowl.",
    });
  };

  // Filter bowls based on search term
  const filteredBowls = discussionBowls 
    ? discussionBowls.filter((bowl: any) => 
        bowl.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        bowl.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bowl.discipline.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="flex min-h-screen pt-14 lg:pt-0">
      <MobileNavbar onMenuToggle={toggleSidebar} />
      <Sidebar className={sidebarOpen ? "translate-x-0" : ""} />
      
      <main className="flex-1 lg:ml-64">
        <Header />
        
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Discussion Bowls</h1>
            <p className="mt-1 text-sm text-gray-500">Join conversations with peers and mentors in your field</p>
          </div>

          {/* Search and Create */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search bowls by name, description, or discipline..."
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
            <Button className="whitespace-nowrap">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Create New Bowl
            </Button>
          </div>

          {/* Discussion Bowls Grid */}
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
            </div>
          ) : filteredBowls.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredBowls.map((bowl: any) => (
                <DiscussionBowlCard
                  key={bowl.id}
                  id={bowl.id}
                  name={bowl.name}
                  description={bowl.description}
                  memberCount={bowl.memberCount}
                  newPostCount={bowl.postCount}
                  isActive={bowl.isActive}
                  recentTopics={generateTopics(bowl.name)}
                  onJoin={handleJoinBowl}
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
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No discussion bowls found</h3>
              <p className="text-gray-500">Try adjusting your search or create a new bowl</p>
            </div>
          )}
        </div>
      </main>

      <LiveChat />
    </div>
  );
}

// Helper function to generate sample topics for each bowl
function generateTopics(bowlName: string) {
  const topics = {
    "Software Engineering": [
      {
        id: 1,
        title: "Best practices for React performance optimization",
        author: "codemaster",
        replyCount: 23
      },
      {
        id: 2,
        title: "How to prepare for software engineering interviews",
        author: "techrecruiter",
        replyCount: 47
      },
      {
        id: 3,
        title: "Is a CS degree still worth it in 2023?",
        author: "curious_student",
        replyCount: 89
      }
    ],
    "Mechanical Engineering": [
      {
        id: 1,
        title: "Sustainable materials in automotive design",
        author: "green_engineer",
        replyCount: 31
      },
      {
        id: 2,
        title: "CFD simulation best practices for HVAC systems",
        author: "thermal_expert",
        replyCount: 19
      },
      {
        id: 3,
        title: "Career transition from mechanical to mechatronics",
        author: "career_shifter",
        replyCount: 42
      }
    ],
    "Electrical Engineering": [
      {
        id: 1,
        title: "Circuit optimization for battery-powered devices",
        author: "power_saver",
        replyCount: 28
      },
      {
        id: 2,
        title: "FPGA vs ASIC: Which to choose for your project?",
        author: "chip_designer",
        replyCount: 36
      },
      {
        id: 3,
        title: "Getting started with embedded systems programming",
        author: "micro_expert",
        replyCount: 54
      }
    ]
  };

  return topics[bowlName as keyof typeof topics] || [
    {
      id: 1,
      title: "Welcome to the " + bowlName + " bowl",
      author: "moderator",
      replyCount: 12
    },
    {
      id: 2,
      title: "Share your " + bowlName + " experiences",
      author: "community_lead",
      replyCount: 8
    },
    {
      id: 3,
      title: "Latest trends in " + bowlName,
      author: "trend_watcher",
      replyCount: 15
    }
  ];
}
