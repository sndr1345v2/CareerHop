import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

type MentorCardProps = {
  id: number;
  name: string;
  company: string;
  position: string;
  expertise: string[];
  yearsOfExperience: number;
  isVerified: boolean;
  avatarUrl?: string;
  rating?: number;
  ratingCount?: number;
  onConnect: (id: number) => void;
};

export function MentorCard({
  id,
  name,
  company,
  position,
  expertise,
  yearsOfExperience,
  isVerified,
  avatarUrl,
  rating,
  ratingCount,
  onConnect
}: MentorCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-0">
        <div className="flex pt-6 px-6">
          <div className="mr-4">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={name}
                className="w-16 h-16 rounded-full object-cover border-2 border-white shadow"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xl font-semibold border-2 border-white shadow">
                {name.charAt(0)}
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center">
              <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
              {isVerified && (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 ml-1 text-primary-600" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                    clipRule="evenodd" 
                  />
                </svg>
              )}
            </div>
            <p className="text-sm text-gray-600">{position} at {company}</p>
            <p className="text-sm text-gray-500">{yearsOfExperience} years experience</p>
            
            {rating && ratingCount && (
              <div className="flex items-center mt-1">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-4 w-4 ${i < rating ? "text-yellow-400" : "text-gray-300"}`} 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs text-gray-500 ml-1">({ratingCount})</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-4 px-6 pb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Expertise</h4>
          <div className="flex flex-wrap gap-1">
            {expertise.map((skill, index) => (
              <Badge key={index} variant="default" className="mr-1 mb-1">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 border-t px-6 py-3">
        <div className="w-full flex justify-between items-center">
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
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            View Profile
          </Button>
          <Button 
            onClick={() => onConnect(id)}
            size="sm"
            className="gap-1"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4" 
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
            Connect
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
