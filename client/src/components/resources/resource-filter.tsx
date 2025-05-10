import React from "react";
import { cn } from "@/lib/utils";

type FilterOption = {
  label: string;
  value: string;
};

type ResourceFilterProps = {
  skillLevels: FilterOption[];
  disciplines: FilterOption[];
  sortOptions: FilterOption[];
  selectedSkillLevel: string;
  selectedDiscipline: string;
  selectedSort: string;
  onSkillLevelChange: (skillLevel: string) => void;
  onDisciplineChange: (discipline: string) => void;
  onSortChange: (sort: string) => void;
};

export function ResourceFilter({
  skillLevels,
  disciplines,
  sortOptions,
  selectedSkillLevel,
  selectedDiscipline,
  selectedSort,
  onSkillLevelChange,
  onDisciplineChange,
  onSortChange
}: ResourceFilterProps) {
  return (
    <div className="mb-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-start sm:items-center">
      <div className="flex space-x-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
        <button 
          className={cn(
            "px-4 py-2 rounded-md text-sm font-medium",
            selectedSkillLevel === "" 
              ? "bg-primary-600 text-white" 
              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
          )}
          onClick={() => onSkillLevelChange("")}
        >
          All Resources
        </button>
        
        {skillLevels.map((level) => (
          <button 
            key={level.value}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap",
              selectedSkillLevel === level.value 
                ? "bg-primary-600 text-white" 
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            )}
            onClick={() => onSkillLevelChange(level.value)}
          >
            {level.label}
          </button>
        ))}
      </div>
      
      <div className="flex space-x-2 ml-auto">
        <select 
          className="px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700"
          value={selectedDiscipline}
          onChange={(e) => onDisciplineChange(e.target.value)}
        >
          <option value="">All Disciplines</option>
          {disciplines.map((discipline) => (
            <option key={discipline.value} value={discipline.value}>
              {discipline.label}
            </option>
          ))}
        </select>
        
        <select 
          className="px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700"
          value={selectedSort}
          onChange={(e) => onSortChange(e.target.value)}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
