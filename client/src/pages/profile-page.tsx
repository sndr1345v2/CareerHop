import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileNavbar } from "@/components/layout/mobile-navbar";
import { Header } from "@/components/layout/header";
import { LiveChat } from "@/components/layout/live-chat";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function ProfilePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const { user } = useAuth();
  const { toast } = useToast();

  // Mock data for applications and saved jobs
  const applications = [
    { id: 1, title: "Software Engineer Intern", company: "TechCorp", status: "Applied", date: "2023-07-15" },
    { id: 2, title: "Frontend Developer", company: "WebSolutions Inc.", status: "Interview", date: "2023-07-10" },
    { id: 3, title: "Machine Learning Engineer", company: "AI Innovations", status: "Rejected", date: "2023-06-28" }
  ];

  const savedJobs = [
    { id: 1, title: "Junior Software Developer", company: "Startup XYZ", location: "Remote", postedAt: "2023-07-12" },
    { id: 2, title: "Data Analyst", company: "DataCorp", location: "San Francisco, CA", postedAt: "2023-07-08" }
  ];

  // Update profile settings
  const handleUpdateProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen pt-14 lg:pt-0">
      <MobileNavbar onMenuToggle={toggleSidebar} />
      <Sidebar className={sidebarOpen ? "translate-x-0" : ""} />
      
      <main className="flex-1 lg:ml-64">
        <Header />
        
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
            <p className="mt-1 text-sm text-gray-500">Manage your account settings and preferences</p>
          </div>

          <Tabs 
            defaultValue={activeTab} 
            onValueChange={setActiveTab} 
            className="space-y-6"
          >
            <TabsList className="grid grid-cols-3 sm:grid-cols-4 gap-2 w-full">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="saved">Saved Jobs</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                    <div className="w-24 h-24 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-4xl font-semibold border-2 border-white shadow">
                      {user.displayName.charAt(0)}
                    </div>
                    <div className="space-y-1">
                      <h2 className="text-xl font-semibold">{user.displayName}</h2>
                      <p className="text-gray-500">{user.discipline || "Engineering Student"}</p>
                      <p className="text-gray-500">{user.university || "University"}</p>
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" variant="outline">Change Photo</Button>
                        <Button size="sm">Edit Profile</Button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Personal Information</h3>
                      <div className="space-y-3">
                        <div>
                          <Label className="text-sm text-gray-500">Display Name</Label>
                          <p className="font-medium">{user.displayName}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-gray-500">Email</Label>
                          <p className="font-medium">{user.email}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-gray-500">Username</Label>
                          <p className="font-medium">@{user.username}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-3">Academic Information</h3>
                      <div className="space-y-3">
                        <div>
                          <Label className="text-sm text-gray-500">University</Label>
                          <p className="font-medium">{user.university || "Not specified"}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-gray-500">Discipline</Label>
                          <p className="font-medium">{user.discipline || "Not specified"}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-gray-500">Graduation Year</Label>
                          <p className="font-medium">{user.graduationYear || "Not specified"}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3">Bio</h3>
                    <p className="text-gray-700">{user.bio || "No bio has been added yet."}</p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end">
                    <Button onClick={handleUpdateProfile}>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Applications Tab */}
            <TabsContent value="applications">
              <Card>
                <CardHeader>
                  <CardTitle>Job Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  {applications.length > 0 ? (
                    <div className="divide-y divide-gray-200">
                      {applications.map((app) => (
                        <div key={app.id} className="py-4 flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{app.title}</h3>
                            <p className="text-sm text-gray-500">{app.company}</p>
                            <p className="text-xs text-gray-400">Applied on {new Date(app.date).toLocaleDateString()}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <Badge
                              variant={
                                app.status === "Applied" ? "default" :
                                app.status === "Interview" ? "intermediate" :
                                "destructive"
                              }
                            >
                              {app.status}
                            </Badge>
                            <Button variant="ghost" size="sm">View</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10">
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
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">No applications yet</h3>
                      <p className="text-gray-500 mb-4">Start applying to jobs to see your applications here</p>
                      <Button>Browse Jobs</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Saved Jobs Tab */}
            <TabsContent value="saved">
              <Card>
                <CardHeader>
                  <CardTitle>Saved Jobs</CardTitle>
                </CardHeader>
                <CardContent>
                  {savedJobs.length > 0 ? (
                    <div className="divide-y divide-gray-200">
                      {savedJobs.map((job) => (
                        <div key={job.id} className="py-4 flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{job.title}</h3>
                            <p className="text-sm text-gray-500">{job.company} • {job.location}</p>
                            <p className="text-xs text-gray-400">Saved on {new Date(job.postedAt).toLocaleDateString()}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Remove</Button>
                            <Button size="sm">Apply</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10">
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
                          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                        />
                      </svg>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">No saved jobs yet</h3>
                      <p className="text-gray-500 mb-4">Save jobs to view them later</p>
                      <Button>Browse Jobs</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Privacy Tab */}
            <TabsContent value="privacy">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Profile Visibility</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Semi-Anonymous Mode</Label>
                          <p className="text-sm text-gray-500">Hide your full name and contact details from other users</p>
                        </div>
                        <Switch checked={user.isAnonymous} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Show Profile to Recruiters</Label>
                          <p className="text-sm text-gray-500">Allow recruiters to find and contact you about relevant jobs</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Discoverable in Mentorship</Label>
                          <p className="text-sm text-gray-500">Allow others to find you for mentorship opportunities</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Communication Preferences</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Email Notifications</Label>
                          <p className="text-sm text-gray-500">Receive updates and notifications via email</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Direct Messages</Label>
                          <p className="text-sm text-gray-500">Allow users to send you direct messages</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Job Alerts</Label>
                          <p className="text-sm text-gray-500">Receive notifications about new job openings</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end">
                    <Button onClick={handleUpdateProfile}>Save Privacy Settings</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <LiveChat />
    </div>
  );
}
