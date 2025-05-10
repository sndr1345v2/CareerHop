import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home-page";
import ResourcesPage from "@/pages/resources-page";
import DiscussionsPage from "@/pages/discussions-page";
import MentorsPage from "@/pages/mentors-page";
import JobListingsPage from "@/pages/job-listings-page";
import AuthPage from "@/pages/auth-page";
import ProfilePage from "@/pages/profile-page";
import { ProtectedRoute } from "./lib/protected-route";
import { AuthProvider } from "@/hooks/use-auth";

function Router() {
  return (
    <Switch>
      <ProtectedRoute path="/" component={HomePage} />
      <ProtectedRoute path="/resources" component={ResourcesPage} />
      <ProtectedRoute path="/discussions" component={DiscussionsPage} />
      <ProtectedRoute path="/mentors" component={MentorsPage} />
      <ProtectedRoute path="/jobs" component={JobListingsPage} />
      <ProtectedRoute path="/profile" component={ProfilePage} />
      <Route path="/auth" component={AuthPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
