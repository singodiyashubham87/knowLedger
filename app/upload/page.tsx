import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { UploadInterface } from '@/components/upload/upload-interface';

export default function UploadPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Upload Q&A Content</h1>
          <p className="text-muted-foreground">
            Add new questions and answers to your knowledge base.
          </p>
        </div>
        
        <UploadInterface />
      </div>
    </DashboardLayout>
  );
}