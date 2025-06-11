"use client";

import { useState, useCallback, useEffect } from 'react';
import { Search, Filter, LayoutGrid, List } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useDebounce } from '@/hooks/use-debounce';
import { SearchResults } from './search-results';
import { SearchFilters } from './search-filters';

interface SearchQuery {
  text: string;
  tags: string[];
  difficulty: string[];
  dateRange: string;
}

export function SearchInterface() {
  const [query, setQuery] = useState<SearchQuery>({
    text: '',
    tags: [],
    difficulty: [],
    dateRange: 'all'
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  
  const debouncedQuery = useDebounce(query.text, 500);
  
  const handleSearch = useCallback(async (searchQuery: SearchQuery) => {
    if (!searchQuery.text.trim() && searchQuery.tags.length === 0) return;
    
    setIsSearching(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsSearching(false);
  }, []);

  useEffect(() => {
    if (debouncedQuery || query.tags.length > 0) {
      handleSearch(query);
    }
  }, [debouncedQuery, query.tags, query.difficulty, query.dateRange, handleSearch]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Semantic Search</span>
          <div className="flex items-center gap-2">
            <Button
              variant={showFilters ? "default" : "outline"}
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <div className="flex rounded-md border">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Ask any question or search for topics..."
            value={query.text}
            onChange={(e) => setQuery(prev => ({ ...prev, text: e.target.value }))}
            className="pl-10 text-base"
          />
        </div>
        
        {query.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {query.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="cursor-pointer">
                {tag}
                <button
                  onClick={() => setQuery(prev => ({
                    ...prev,
                    tags: prev.tags.filter(t => t !== tag)
                  }))}
                  className="ml-1 text-xs"
                >
                  ×
                </button>
              </Badge>
            ))}
          </div>
        )}
        
        {showFilters && (
          <SearchFilters
            query={query}
            onQueryChange={setQuery}
          />
        )}
        
        <SearchResults
          query={query}
          viewMode={viewMode}
          isLoading={isSearching}
        />
      </CardContent>
    </Card>
  );
}