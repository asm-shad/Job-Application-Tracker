"use client";

import dynamic from 'next/dynamic';

// Dynamically import KanbanBoard with SSR disabled
const KanbanBoard = dynamic(
  () => import('@/components/kanban-board'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex gap-4 overflow-x-auto pb-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="min-w-75 shrink-0">
            <div className="bg-gray-100 rounded-lg">
              <div className="h-12 bg-gray-200 rounded-t-lg animate-pulse"></div>
              <div className="p-4 space-y-2">
                <div className="h-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
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