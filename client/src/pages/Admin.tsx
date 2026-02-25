import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface WaitlistEntry {
  id: number;
  fullName: string;
  workEmail: string;
  company: string;
  role: string;
  createdAt: string;
}

export default function Admin() {
  const [apiUrl, setApiUrl] = useState<string>('/api/admin/waitlist');

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['waitlist-entries'],
    queryFn: async () => {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard - Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard - Error</h1>
        <p className="text-red-500">Error loading waitlist entries</p>
        <Button onClick={() => refetch()} className="mt-4">Try Again</Button>
      </div>
    );
  }

  const entries = data?.entries || [];

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Waitlist Entries</CardTitle>
          <CardDescription>
            Total entries: {entries.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {entries.length === 0 ? (
            <p className="text-muted-foreground">No entries yet.</p>
          ) : (
            <div className="space-y-6">
              {entries.map((entry: WaitlistEntry) => (
                <div key={entry.id} className="bg-card/60 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">{entry.fullName}</h3>
                    <span className="text-sm text-muted-foreground">
                      ID: {entry.id}
                    </span>
                  </div>
                  <p className="text-primary">📧 {entry.workEmail}</p>
                  <p>🏢 {entry.company}</p>
                  <p>👤 {entry.role}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Joined: {new Date(entry.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      <Button onClick={() => refetch()}>Refresh Data</Button>
    </div>
  );
}