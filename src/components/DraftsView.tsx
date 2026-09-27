import React from 'react';
import { EventInfo } from '../types';

interface DraftsViewProps {
  currentEvent: EventInfo;
  onLoadDraft: (draft: Partial<EventInfo>) => void;
  onShowToast: (msg: string) => void;
}

export const DraftsView: React.FC<DraftsViewProps> = ({
  currentEvent,
  onLoadDraft,
  onShowToast,
}) => {
  const drafts = [
    {
      id: '1',
      title: currentEvent.title,
      format: currentEvent.format,
      date: 'Nov 14, 2025',
      location: currentEvent.locationName,
      status: 'In Progress (Active)',
      updated: '2 mins ago',
      tagsCount: currentEvent.tags.length,
    },
    {
      id: '2',
      title: 'NYC AI Investors & Demo Night: Top 10 Seed Startups Live',
      format: 'In-Person',
      date: 'Dec 03, 2025',
      location: 'Spring Studios, Tribeca, NYC',
      status: 'Ready for Review',
      updated: 'Yesterday, 4:15 PM',
      tagsCount: 4,
    },
    {
      id: '3',
      title: 'Autonomous Agents Hackathon & Mixer: Productionizing LLMs',
      format: 'Hybrid',
      date: 'Jan 18, 2026',
      location: 'Google Chelsea Market Pavilion, NYC',
      status: 'Draft Outline',
      updated: '3 days ago',
      tagsCount: 5,
    },
  ];

  return (
    <div className="w-full">
      {/* Sub-bar */}
      <div className="w-full bg-[#f2f3ff] px-4 lg:px-8 py-3 flex items-center justify-between border-b border-[#c7c4d8]/40">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[17px] text-[#3525cd]">drafts</span>
          <span className="text-xs font-bold text-[#131b2e]">Saved Drafts &amp; Stored Campaigns</span>
          <span className="text-[#777587] text-xs">·</span>
          <span className="text-xs text-[#464555]">3 drafts saved</span>
        </div>
      </div>

      <div className="w-full px-4 lg:px-8 py-6 space-y-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-[#131b2e] tracking-tight">
              Event Drafts &amp; Workspaces
            </h1>
            <p className="text-sm text-[#464555] mt-1">
              Resume editing, duplicate templates, or push saved event campaigns to live status.
            </p>
          </div>
          <button
            onClick={() => onShowToast('New blank draft initialized!')}
            className="px-4 py-2.5 rounded-xl bg-[#3525cd] hover:bg-[#4f46e5] text-white text-xs font-bold transition-all shadow-md shadow-[#3525cd]/20 flex items-center gap-1.5 self-start cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            Create New Event Draft
          </button>
        </div>

        {/* Drafts List */}
        <div className="space-y-4">
          {drafts.map((d) => (
            <div
              key={d.id}
              className="p-5 rounded-2xl bg-white border border-[#c7c4d8]/40 shadow-xs hover:border-[#3525cd]/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#e2dfff] text-[#3323cc] text-[11px] font-bold">
                    {d.format}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#f2f3ff] text-[#464555] text-[11px] font-semibold">
                    {d.status}
                  </span>
                  <span className="text-[11px] text-[#777587]">Updated {d.updated}</span>
                </div>
                <h3 className="text-base font-bold text-[#131b2e] leading-snug">{d.title}</h3>
                <p className="text-xs text-[#464555] flex items-center gap-3">
                  <span>📅 {d.date}</span>
                  <span>📍 {d.location}</span>
                  <span>🏷️ {d.tagsCount} tags</span>
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    onLoadDraft({
                      title: d.title,
                      locationName: d.location,
                    });
                    onShowToast(`Loaded "${d.title}" into active workspace!`);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#3525cd] hover:bg-[#4f46e5] text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Resume Editing
                </button>
                <button
                  type="button"
                  onClick={() => onShowToast('Draft cloned to duplicate copy!')}
                  className="p-2 rounded-xl hover:bg-[#f2f3ff] text-[#464555] hover:text-[#131b2e] transition-colors border border-[#c7c4d8]/40 cursor-pointer"
                  title="Duplicate"
                >
                  <span className="material-symbols-outlined text-[18px]">content_copy</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
