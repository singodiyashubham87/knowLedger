"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SearchInterface } from './search-interface';
import { SearchFilters } from './search-filters';

interface SearchQuery {
  text: string;
  tags: string[];
  difficulty: string[];
  dateRange: string;
}

export function AdvancedSearchInterface() {
  const [query, setQuery] = useState<SearchQuery>({
    text: '',
    tags: [],
    difficulty: [],
    dateRange: 'all'
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-1">
        <SearchFilters query={query} onQueryChange={setQuery} />
      </div>
      <div className="lg:col-span-3">
        <SearchInterface />
      </div>
    </div>
  );
}