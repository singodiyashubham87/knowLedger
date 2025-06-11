"use client";

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SearchQuery {
  text: string;
  tags: string[];
  difficulty: string[];
  dateRange: string;
}

interface SearchFiltersProps {
  query: SearchQuery;
  onQueryChange: (query: SearchQuery) => void;
}

const availableTags = [
  'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 
  'Machine Learning', 'Database', 'API', 'CSS', 'HTML', 'Git'
];

const difficultyLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

export function SearchFilters({ query, onQueryChange }: SearchFiltersProps) {
  const handleTagToggle = (tag: string) => {
    const newTags = query.tags.includes(tag)
      ? query.tags.filter(t => t !== tag)
      : [...query.tags, tag];
    
    onQueryChange({ ...query, tags: newTags });
  };

  const handleDifficultyToggle = (difficulty: string) => {
    const newDifficulty = query.difficulty.includes(difficulty)
      ? query.difficulty.filter(d => d !== difficulty)
      : [...query.difficulty, difficulty];
    
    onQueryChange({ ...query, difficulty: newDifficulty });
  };

  const clearFilters = () => {
    onQueryChange({
      ...query,
      tags: [],
      difficulty: [],
      dateRange: 'all'
    });
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">Filters</CardTitle>
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="text-sm font-medium mb-3 block">Tags</Label>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => (
              <Badge
                key={tag}
                variant={query.tags.includes(tag) ? "default" : "outline"}
                className="cursor-pointer hover:bg-accent"
                onClick={() => handleTagToggle(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        
        <div>
          <Label className="text-sm font-medium mb-3 block">Difficulty Level</Label>
          <div className="space-y-2">
            {difficultyLevels.map((level) => (
              <div key={level} className="flex items-center space-x-2">
                <Checkbox
                  id={level}
                  checked={query.difficulty.includes(level)}
                  onCheckedChange={() => handleDifficultyToggle(level)}
                />
                <Label
                  htmlFor={level}
                  className="text-sm font-normal cursor-pointer"
                >
                  {level}
                </Label>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <Label className="text-sm font-medium mb-3 block">Date Range</Label>
          <Select value={query.dateRange} onValueChange={(value) => onQueryChange({ ...query, dateRange: value })}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This week</SelectItem>
              <SelectItem value="month">This month</SelectItem>
              <SelectItem value="year">This year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}