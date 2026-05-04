"use client";

import dynamic from 'next/dynamic';

// Dynamically import KanbanBoard with SSR disabled
const KanbanBoard = dynamic(
  () => import('@/components/kanban-board'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex gap-4 overflow-x-auto p-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="min-w-[300px]">
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="h-6 bg-gray-200 rounded mb-4 animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-24 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
);

export default function KanbanBoardWrapper(props: any) {
  return <KanbanBoard {...props} />;
}