import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";

type JobCardProps = {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  discipline: string;
  experienceLevel: string;
  salaryRange?: string;
  postedAt: Date;
  logoUrl?: string;
  onApply: (id: number) => void;
};

export function JobCard({
  id,
  title,
  company,
  location,
  description,
  discipline,
  experienceLevel,
  salaryRange,
  postedAt,
  logoUrl,
  onApply
}: JobCardProps) {
  const formattedTimeAgo = formatDistanceToNow(new Date(postedAt), { addSuffix: true });
  
  const experienceBadgeVariant = 
    experienceLevel.toLowerCase().includes("entry") ? "beginner" :
    experienceLevel.toLowerCase().includes("mid") ? "intermediate" :
    "advanced";
  
  // Simplify discipline string to match badge variants
  const getDisciplineVariant = (discipline: string) => {
    if (discipline.toLowerCase().includes("computer") || discipline.toLowerCase().includes("software")) 
      return "software";
    if (discipline.toLowerCase().includes("electric")) 
      return "electronics";
    if (discipline.toLowerCase().includes("data")) 
      return "data";
    if (discipline.toLowerCase().includes("material")) 
      return "materials";
    if (discipline.toLowerCase().includes("civil")) 
      return "civil";
    if (discipline.toLowerCase().includes("robot")) 
      return "robotics";
    return "default";
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-start space-x-4">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={`${company} logo`}
                className="w-12 h-12 rounded-md object-contain bg-gray-50 p-1"
              />
            ) : (
              <div className="w-12 h-12 rounded-md bg-primary-100 text-primary-700 flex items-center justify-center text-lg font-semibold">
                {company.charAt(0)}
              </div>
            )}
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              <div className="text-sm text-gray-500 mt-1">
                {company} • {location}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex gap-1 mb-2">
              <Badge variant={experienceBadgeVariant}>{experienceLevel}</Badge>
              <Badge variant={getDisciplineVariant(discipline)}>{discipline}</Badge>
            </div>
            <div className="text-xs text-gray-500">Posted {formattedTimeAgo}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="py-3">
        <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
        {salaryRange && (
          <div className="mt-3 flex items-center text-sm text-gray-600">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 mr-1 text-gray-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            <span>{salaryRange}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-3 border-t">
        <div className="flex space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-500 hover:text-gray-700"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 mr-1" 
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
            Save
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-500 hover:text-gray-700"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 mr-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" 
              />
            </svg>
            Share
          </Button>
        </div>
        <Button onClick={() => onApply(id)}>Apply Now</Button>
      </CardFooter>
    </Card>
  );
}
