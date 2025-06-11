import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { SearchInterface } from '@/components/search/search-interface';
import { RecentActivity } from '@/components/dashboard/recent-activity';
import { QuickStats } from '@/components/dashboard/quick-stats';

export default function HomePage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Welcome to KnowLedger</h1>
          <p className="text-muted-foreground">
            Search and manage your Q&A knowledge base with AI-powered semantic search.
          </p>
        </div>
        
        <QuickStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <SearchInterface />
          </div>
          <div>
            <RecentActivity />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}