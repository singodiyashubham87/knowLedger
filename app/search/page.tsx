import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { AdvancedSearchInterface } from '@/components/search/advanced-search-interface';

export default function SearchPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Advanced Search</h1>
          <p className="text-muted-foreground">
            Find exactly what you're looking for with advanced filters and semantic search.
          </p>
        </div>
        
        <AdvancedSearchInterface />
      </div>
    </DashboardLayout>
  );
}