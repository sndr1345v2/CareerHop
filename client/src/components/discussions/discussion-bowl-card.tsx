import React from "react";
import { Badge } from "@/components/ui/badge";

type DiscussionTopic = {
  id: number;
  title: string;
  author: string;
  replyCount: number;
};

type DiscussionBowlCardProps = {
  id: number;
  name: string;
  description: string;
  memberCount: number;
  newPostCount: number;
  isActive: boolean;
  recentTopics: DiscussionTopic[];
  onJoin: (id: number) => void;
};

export function DiscussionBowlCard({
  id,
  name,
  description,
  memberCount,
  newPostCount,
  isActive,
  recentTopics,
  onJoin
}: DiscussionBowlCardProps) {
  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
          <Badge variant="active" className={isActive ? "block" : "hidden"}>
            Active
          </Badge>
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span>{memberCount.toLocaleString()} members</span>
          <span className="mx-2">•</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span>{newPostCount} new posts today</span>
        </div>

        <div className="border-t border-gray-200 -mx-5 px-5 py-3">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Recent Topics</h4>
          <ul className="space-y-2">
            {recentTopics.map((topic) => (
              <li key={topic.id} className="text-sm">
                <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">
                  {topic.title}
                </a>
                <p className="text-gray-500 text-xs mt-0.5">Started by @{topic.author} • {topic.replyCount} replies</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-3 border-t border-gray-200 flex justify-between items-center">
        <div className="flex -space-x-2">
          {[...Array(3)].map((_, i) => (
            <div 
              key={i} 
              className="w-6 h-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-medium border border-white"
            >
              {String.fromCharCode(65 + i)}
            </div>
          ))}
          <div className="w-6 h-6 rounded-full border border-white bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-500">+{Math.min(memberCount - 3, 99)}</div>
        </div>
        <button 
          onClick={() => onJoin(id)}
          className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700 transition-colors"
        >
          Join Bowl
        </button>
      </div>
    </div>
  );
}
