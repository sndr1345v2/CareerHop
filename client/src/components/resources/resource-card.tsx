import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type ResourceCardProps = {
  id: number;
  title: string;
  description: string;
  skillLevel: string;
  discipline: string;
  authorName: string;
  authorAvatar?: string;
  duration: string;
  rating: number;
  ratingCount: number;
  url: string;
};

export function ResourceCard({
  id,
  title,
  description,
  skillLevel,
  discipline,
  authorName,
  authorAvatar,
  duration,
  rating,
  ratingCount,
  url
}: ResourceCardProps) {
  // Map skill level to badge variant
  const skillLevelVariant = 
    skillLevel === "beginner" ? "beginner" : 
    skillLevel === "intermediate" ? "intermediate" : 
    "advanced";
  
  // Map discipline to badge variant or use default
  const disciplineVariant = 
    discipline === "Computer Engineering" || discipline === "Programming" ? "software" :
    discipline === "Electrical Engineering" || discipline === "Electronics" ? "electronics" :
    discipline === "Data Science" ? "data" :
    discipline === "Materials" ? "materials" :
    discipline === "Civil Engineering" ? "civil" :
    discipline === "Robotics" ? "robotics" :
    "default";
  
  // Calculate stars for rating
  const fullStars = Math.floor(rating);
  const remainingStars = 5 - fullStars;

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center space-x-1">
            <Badge variant={skillLevelVariant} className="capitalize">
              {skillLevel}
            </Badge>
            <Badge variant={disciplineVariant}>
              {discipline}
            </Badge>
          </div>
          <button className="text-gray-400 hover:text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          </button>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {/* Rating stars */}
            {[...Array(fullStars)].map((_, i) => (
              <svg key={`full-${i}`} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            {[...Array(remainingStars)].map((_, i) => (
              <svg key={`empty-${i}`} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-xs text-gray-500 ml-1">({rating.toFixed(1)})</span>
          </div>
          <span className="text-xs text-gray-500">{duration}</span>
        </div>
      </div>
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
        <div className="flex items-center">
          {authorAvatar ? (
            <img src={authorAvatar} alt={authorName} className="h-6 w-6 rounded-full" />
          ) : (
            <div className="h-6 w-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-medium">
              {authorName.charAt(0).toUpperCase()}
            </div>
          )}
          <span className="text-xs font-medium text-gray-500 ml-2">{authorName}</span>
        </div>
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs font-medium text-primary-600 hover:text-primary-700"
        >
          Access Resource
        </a>
      </div>
    </div>
  );
}
