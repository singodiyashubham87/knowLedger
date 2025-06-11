"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Clock, ThumbsUp, Eye, BookOpen } from 'lucide-react';

interface SearchQuery {
  text: string;
  tags: string[];
  difficulty: string[];
  dateRange: string;
}

interface SearchResult {
  id: string;
  question: string;
  answer: string;
  tags: string[];
  difficulty: string;
  views: number;
  likes: number;
  createdAt: string;
  relevanceScore: number;
}

interface SearchResultsProps {
  query: SearchQuery;
  viewMode: 'grid' | 'list';
  isLoading: boolean;
}

// Mock data for demonstration
const mockResults: SearchResult[] = [
  {
    id: '1',
    question: 'How do you implement debounced search in React?',
    answer: 'To implement debounced search in React, you can create a custom hook that uses setTimeout to delay the search execution...',
    tags: ['React', 'JavaScript', 'Hooks'],
    difficulty: 'Intermediate',
    views: 245,
    likes: 18,
    createdAt: '2024-01-15',
    relevanceScore: 0.95
  },
  {
    id: '2',
    question: 'What is the difference between useState and useReducer?',
    answer: 'useState is perfect for simple state management, while useReducer is better for complex state logic...',
    tags: ['React', 'Hooks', 'State Management'],
    difficulty: 'Beginner',
    views: 189,
    likes: 24,
    createdAt: '2024-01-14',
    relevanceScore: 0.88
  },
  {
    id: '3',
    question: 'How to optimize Next.js app performance?',
    answer: 'Next.js performance optimization involves several strategies including code splitting, image optimization...',
    tags: ['Next.js', 'Performance', 'Optimization'],
    difficulty: 'Advanced',
    views: 302,
    likes: 31,
    createdAt: '2024-01-13',
    relevanceScore: 0.91
  }
];

export function SearchResults({ query, viewMode, isLoading }: SearchResultsProps) {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    // Simulate API call
    if (query.text || query.tags.length > 0) {
      setResults(mockResults);
    } else {
      setResults([]);
    }
  }, [query]);

  useEffect(() => {
    let filtered = results;

    // Filter by tags
    if (query.tags.length > 0) {
      filtered = filtered.filter(result =>
        query.tags.some(tag => result.tags.includes(tag))
      );
    }

    // Filter by difficulty
    if (query.difficulty.length > 0) {
      filtered = filtered.filter(result =>
        query.difficulty.includes(result.difficulty)
      );
    }

    // Sort by relevance score
    filtered = filtered.sort((a, b) => b.relevanceScore - a.relevanceScore);

    setFilteredResults(filtered);
  }, [results, query.tags, query.difficulty]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-5 w-3/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-20 w-full" />
              <div className="flex gap-2 mt-4">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-14" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!query.text && query.tags.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">Start searching</h3>
        <p className="text-muted-foreground">
          Enter a question or select tags to find relevant Q&As
        </p>
      </div>
    );
  }

  if (filteredResults.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-lg font-medium mb-2">No results found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search query or filters
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Found {filteredResults.length} results
        </p>
      </div>

      <div className={viewMode === 'grid' ? 'grid gap-4 md:grid-cols-2' : 'space-y-4'}>
        {filteredResults.map((result) => (
          <Card key={result.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-4">
                <CardTitle className="text-lg leading-6">
                  {result.question}
                </CardTitle>
                <Badge variant="outline" className="text-xs">
                  {Math.round(result.relevanceScore * 100)}% match
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {result.answer}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {result.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                <Badge 
                  variant={
                    result.difficulty === 'Beginner' ? 'default' : 
                    result.difficulty === 'Intermediate' ? 'secondary' : 'destructive'
                  } 
                  className="text-xs"
                >
                  {result.difficulty}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {result.views}
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-3 w-3" />
                    {result.likes}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {new Date(result.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}