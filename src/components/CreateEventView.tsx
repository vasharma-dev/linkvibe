import React, { useEffect, useRef, useState } from 'react';
import { ASSETS, PRESET_EVENTS, TRENDING_HASHTAGS } from '../constants/initialData';
import { EventFormat, EventInfo, Role } from '../types';

interface CreateEventViewProps {
  event: EventInfo;
  onUpdateEvent: (updated: Partial<EventInfo>) => void;
  onProceedToStep2: () => void;
  onSwitchPerspective: (role: Role) => void;
  onOpenQR: () => void;
  onPublishToLinkedIn: () => void;
  onShowToast: (msg: string) => void;
}

export const CreateEventView: React.FC<CreateEventViewProps> = ({
  event,
  onUpdateEvent,
  onProceedToStep2,
  onSwitchPerspective,
  onOpenQR,
  onPublishToLinkedIn,
  onShowToast,
}) => {
  const [customTagInput, setCustomTagInput] = useState('');
  const [showPresets, setShowPresets] = useState(false);
  const presetsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showPresets) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        presetsRef.current &&
        !presetsRef.current.contains(event.target as Node)
      ) {
        setShowPresets(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowPresets(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showPresets]);

  const eventFormats: { format: EventFormat; label: string; icon: string }[] = [
    { format: 'In-Person', label: 'In-Person', icon: 'domain' },
    { format: 'Hybrid', label: 'Hybrid', icon: 'hub' },
    { format: 'Virtual', label: 'Virtual', icon: 'computer' },
    { format: 'LinkedIn Audio', label: 'LinkedIn Audio', icon: 'graphic_eq' },
  ];

  const handleAddCustomTag = () => {
    if (!customTagInput.trim()) return;
    let tag = customTagInput.trim();
    if (!tag.startsWith('#')) tag = `#${tag}`;
    if (!event.tags.includes(tag)) {
      onUpdateEvent({ tags: [...event.tags, tag] });
      onShowToast(`Added topic tag ${tag}`);
    }
    setCustomTagInput('');
  };

  const handleToggleTag = (tag: string) => {
    if (event.tags.includes(tag)) {
      onUpdateEvent({ tags: event.tags.filter((t) => t !== tag) });
    } else {
      onUpdateEvent({ tags: [...event.tags, tag] });
    }
  };

  const handleAddTrendingHashtag = (tag: string) => {
    if (!event.activeHashtags.includes(tag)) {
      onUpdateEvent({ activeHashtags: [...event.activeHashtags, tag] });
      onShowToast(`Added ${tag} to active post hashtags`);
    } else {
      onShowToast(`${tag} is already in active hashtags`);
    }
  };

  const handleRemoveActiveHashtag = (tag: string) => {
    onUpdateEvent({ activeHashtags: event.activeHashtags.filter((t) => t !== tag) });
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(event.linkedinUrl || window.location.href);
    onShowToast('LinkedIn Event URL copied to clipboard!');
  };

  const handleExportICS = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//LinkVibe Creator Studio//EN
BEGIN:VEVENT
SUMMARY:${event.title}
DESCRIPTION:Hosted by ${event.hostName}. Registration: ${event.ticketUrl}
LOCATION:${event.locationAddress}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${event.title.substring(0, 20).replace(/\s+/g, '_')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onShowToast('Calendar (.ics) invite downloaded!');
  };

  const handleApplyPreset = (preset: (typeof PRESET_EVENTS)[0]) => {
    onUpdateEvent({
      title: preset.title,
      locationName: preset.location,
    });
    setShowPresets(false);
    onShowToast(`Applied preset: ${preset.name}`);
  };

  return (
    <div className="w-full">
      {/* Top Status & Controls Bar */}
      <div className="w-full bg-[#f2f3ff] px-3 sm:px-4 lg:px-8 py-2.5 sm:py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-3 border-b border-[#c7c4d8]/40">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="w-2.5 h-2.5 rounded-full bg-[#3525cd] animate-pulse"></span>
          <span className="text-xs font-bold text-[#3525cd]">
            Step 1 of 2: Event Details &amp; Presence
          </span>
          <span className="text-[#777587] text-xs">·</span>
          <span className="text-[11px] sm:text-xs text-[#464555]">Auto-saved 2s ago</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap w-full sm:w-auto justify-between sm:justify-end">
          <button
            type="button"
            onClick={onPublishToLinkedIn}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#0a66c2] hover:bg-[#004182] text-white text-xs font-bold shadow-xs transition-all cursor-pointer transform active:scale-98"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.68 1.68 0 1 0 0-3.36 1.68 1.68 0 0 0 0 3.36m1.39 9.74v-8.37H5.07v8.37h2.78z" />
            </svg>
            <span>Share to LinkedIn</span>
          </button>

          <div className="hidden xs:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#e2dfff] text-[#3323cc] text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#00687a] animate-pulse"></span>
            <span>Live Preview Sync</span>
          </div>

          <div ref={presetsRef} className="relative">
            <button
              onClick={() => setShowPresets(!showPresets)}
              type="button"
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-lg bg-white border border-[#c7c4d8]/60 hover:bg-[#f2f3ff] text-xs font-semibold text-[#131b2e] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px]">tune</span>
              <span>Presets</span>
              <span className="material-symbols-outlined text-[15px]">expand_more</span>
            </button>

            {showPresets && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-[#c7c4d8]/40 p-2 z-40">
                <p className="text-[11px] font-bold text-[#777587] px-2 py-1 uppercase tracking-wider">
                  Template Presets
                </p>
                {PRESET_EVENTS.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => handleApplyPreset(p)}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#f2f3ff] transition-colors group cursor-pointer"
                  >
                    <p className="text-xs font-bold text-[#131b2e] group-hover:text-[#3525cd]">
                      {p.name}
                    </p>
                    <p className="text-[11px] text-[#464555] truncate">{p.location}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Workspace Grid (7 cols Left Form, 5 cols Right Live Preview) */}
      <div className="w-full px-3 sm:px-4 lg:px-8 py-4 sm:py-6 max-w-7xl mx-auto space-y-5 sm:space-y-6">
        {/* Header Title Section */}
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#131b2e] tracking-tight">
            Create Event &amp; Gather Hype
          </h1>
          <p className="text-xs sm:text-sm text-[#464555] mt-1 max-w-3xl">
            Set up your LinkedIn event details. We'll synchronize real-time location and generate viral
            hook-ready post drafts in Step 2.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Event Configuration Form (7 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Event Basic Info */}
            <div className="rounded-2xl bg-white p-4 sm:p-6 shadow-sm border border-[#c7c4d8]/40 space-y-4">
              <div className="flex items-center justify-between pb-1 border-b border-[#eaedff]">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#e2dfff] text-[#3323cc] text-xs flex items-center justify-center font-bold">
                    1
                  </span>
                  <h2 className="text-base font-bold text-[#131b2e]">Event Basic Info</h2>
                </div>
                <span className="text-xs text-[#464555] font-medium">Public on LinkedIn &amp; Web</span>
              </div>

              {/* Event Name */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-[#464555]">Event Name</label>
                  <span className="text-xs text-[#777587] font-mono">
                    {event.title.length} / 100
                  </span>
                </div>
                <input
                  type="text"
                  maxLength={100}
                  value={event.title}
                  onChange={(e) => onUpdateEvent({ title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#f2f3ff] text-sm text-[#131b2e] font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30 border border-[#c7c4d8]/40 transition-all"
                  placeholder="Enter summit or meetup name..."
                />
              </div>

              {/* Event Type & Format */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#464555]">Event Type &amp; Format</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {eventFormats.map(({ format, label, icon }) => {
                    const isSelected = event.format === format;
                    return (
                      <button
                        key={format}
                        type="button"
                        onClick={() => onUpdateEvent({ format })}
                        className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#3525cd] text-white shadow-sm shadow-[#3525cd]/30'
                            : 'bg-[#f2f3ff] text-[#464555] hover:bg-[#eaedff] hover:text-[#131b2e] border border-[#c7c4d8]/30'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[17px]">{icon}</span>
                        <span>{label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 2. Date & Time Schedule */}
            <div className="rounded-2xl bg-white p-4 sm:p-6 shadow-sm border border-[#c7c4d8]/40 space-y-4">
              <div className="flex items-center justify-between pb-1 border-b border-[#eaedff]">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#e2dfff] text-[#3323cc] text-xs flex items-center justify-center font-bold">
                    2
                  </span>
                  <h2 className="text-base font-bold text-[#131b2e]">Date &amp; Time Schedule</h2>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#f2f3ff] text-xs font-semibold text-[#464555]">
                  <span className="material-symbols-outlined text-[14px]">public</span>
                  {event.timezone}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-[#464555]">Start Date &amp; Time</label>
                    <span className="text-[11px] text-[#00687a] font-medium">Doors open 30m prior</span>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={`${event.startDate} • ${event.startTime}`}
                      onChange={(e) => {
                        const val = e.target.value;
                        const parts = val.split('•');
                        onUpdateEvent({
                          startDate: parts[0]?.trim() || event.startDate,
                          startTime: parts[1]?.trim() || event.startTime,
                        });
                      }}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-[#f2f3ff] text-xs text-[#131b2e] font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30 border border-[#c7c4d8]/40"
                    />
                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-[#777587]">
                      calendar_today
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#464555]">End Date &amp; Time</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={`${event.endDate} • ${event.endTime}`}
                      onChange={(e) => {
                        const val = e.target.value;
                        const parts = val.split('•');
                        onUpdateEvent({
                          endDate: parts[0]?.trim() || event.endDate,
                          endTime: parts[1]?.trim() || event.endTime,
                        });
                      }}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-[#f2f3ff] text-xs text-[#131b2e] font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30 border border-[#c7c4d8]/40"
                    />
                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-[#777587]">
                      schedule
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Venue & Google Places Integration */}
            <div className="rounded-2xl bg-white p-4 sm:p-6 shadow-sm border border-[#c7c4d8]/40 space-y-4">
              <div className="flex items-center justify-between pb-1 border-b border-[#eaedff]">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#e2dfff] text-[#3323cc] text-xs flex items-center justify-center font-bold">
                    3
                  </span>
                  <h2 className="text-base font-bold text-[#131b2e]">
                    Venue &amp; Google Places Integration
                  </h2>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#00687a]">
                  <span className="material-symbols-outlined text-[15px]">verified</span>
                  Verified by Google Maps
                </span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#464555]">
                  Location / Venue Search (Powered by Google Places)
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-[18px] text-[#ba1a1a]">
                    location_on
                  </span>
                  <input
                    type="text"
                    value={event.locationAddress}
                    onChange={(e) => onUpdateEvent({ locationAddress: e.target.value })}
                    className="w-full pl-9 pr-20 py-2.5 rounded-lg bg-[#f2f3ff] text-xs text-[#131b2e] font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30 border border-[#c7c4d8]/40"
                  />
                  <a
                    href="https://maps.google.com/?q=Javits+Center+NYC"
                    target="_blank"
                    rel="noreferrer"
                    className="absolute right-2 px-2.5 py-1 rounded bg-white hover:bg-[#eaedff] text-[11px] font-bold text-[#3525cd] border border-[#c7c4d8]/50 flex items-center gap-1 transition-colors"
                  >
                    <span>View</span>
                    <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                  </a>
                </div>
              </div>

              {/* Location verified badges */}
              <div className="flex flex-wrap gap-2 pt-1">
                {event.locationFeatures.map((feat, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#f2f3ff] text-[#464555] text-xs font-medium border border-[#c7c4d8]/30"
                  >
                    <span className="material-symbols-outlined text-[14px] text-[#3525cd]">
                      {idx === 0
                        ? 'subway'
                        : idx === 1
                        ? 'accessible'
                        : idx === 2
                        ? 'meeting_room'
                        : 'local_parking'}
                    </span>
                    {feat}
                  </span>
                ))}
              </div>
            </div>

            {/* 4. Tags & Topic Categories */}
            <div className="rounded-2xl bg-white p-4 sm:p-6 shadow-sm border border-[#c7c4d8]/40 space-y-4">
              <div className="flex items-center justify-between pb-1 border-b border-[#eaedff]">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#e2dfff] text-[#3323cc] text-xs flex items-center justify-center font-bold">
                    4
                  </span>
                  <h2 className="text-base font-bold text-[#131b2e]">Tags &amp; Topic Categories</h2>
                </div>
                <span className="text-xs text-[#777587]">Recommended: 3–5 topics</span>
              </div>

              {/* Interactive Tag Chips */}
              <div className="flex flex-wrap gap-2">
                {[
                  '#ArtificialIntelligence',
                  '#StartupFounders',
                  '#TechNetworking',
                  '#VentureCapital',
                  '#GrowthHacking',
                  '#AgenticWorkflows',
                  '#B2BSaaS',
                ].map((tag) => {
                  const isSelected = event.tags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleToggleTag(tag)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#3525cd] text-white shadow-xs'
                          : 'bg-[#f2f3ff] text-[#464555] hover:bg-[#e2e7ff] hover:text-[#3525cd]'
                      }`}
                    >
                      <span>{tag}</span>
                      <span className="material-symbols-outlined text-[14px]">
                        {isSelected ? 'check' : 'add'}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Custom tag input */}
              <div className="flex items-center gap-2 pt-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-2.5 text-[#777587] font-bold text-xs">#</span>
                  <input
                    type="text"
                    value={customTagInput}
                    onChange={(e) => setCustomTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddCustomTag();
                      }
                    }}
                    placeholder="Add custom keyword (e.g. #AngelInvesting, #B2BTech)..."
                    className="w-full pl-7 pr-3 py-2 rounded-lg bg-[#f2f3ff] text-xs text-[#131b2e] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30 border border-[#c7c4d8]/40"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddCustomTag}
                  className="px-4 py-2 rounded-lg bg-[#f2f3ff] hover:bg-[#3525cd] hover:text-white text-[#131b2e] text-xs font-bold transition-all border border-[#c7c4d8]/50 flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[15px]">add</span>
                  <span>Add Tag</span>
                </button>
              </div>
            </div>

            {/* 5. Trending LinkedIn Hashtags */}
            <div className="rounded-2xl bg-white p-4 sm:p-6 shadow-sm border border-[#c7c4d8]/40 space-y-4">
              <div className="flex items-center justify-between pb-1 border-b border-[#eaedff]">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#e2dfff] text-[#3323cc] text-xs flex items-center justify-center font-bold">
                    5
                  </span>
                  <h2 className="text-base font-bold text-[#131b2e]">Trending LinkedIn Hashtags</h2>
                </div>
                <span className="text-xs font-semibold text-[#3525cd] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px]">trending_up</span>
                  Algorithm Reach Engine
                </span>
              </div>
              <p className="text-xs text-[#464555]">
                Tap suggested hashtags to include them in the automated viral post generation payload for Step 2.
              </p>

              {/* 4 Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TRENDING_HASHTAGS.map(({ tag, followers }) => (
                  <div
                    key={tag}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#f2f3ff] border border-[#c7c4d8]/30 hover:border-[#3525cd]/40 transition-all"
                  >
                    <div>
                      <p className="text-xs font-bold text-[#131b2e]">{tag}</p>
                      <p className="text-[11px] text-[#777587]">{followers}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleAddTrendingHashtag(tag)}
                      className="px-2.5 py-1 rounded-md bg-white hover:bg-[#3525cd] hover:text-white text-xs font-bold text-[#3525cd] border border-[#c7c4d8]/40 flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
                    >
                      <span>+ Add</span>
                    </button>
                  </div>
                ))}
              </div>

              {/* ACTIVE POST HASHTAGS (SYNCED TO STEP 2) */}
              <div className="pt-2">
                <span className="text-[11px] font-bold text-[#777587] uppercase tracking-wider block mb-2">
                  Active Post Hashtags (Synced to Step 2)
                </span>
                <div className="flex flex-wrap gap-2">
                  {event.activeHashtags.map((ht) => (
                    <span
                      key={ht}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e2dfff] text-[#3323cc] text-xs font-bold"
                    >
                      <span>{ht}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveActiveHashtag(ht)}
                        className="hover:text-[#ba1a1a] cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[13px]">close</span>
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 6. Social & External Registration Links */}
            <div className="rounded-2xl bg-white p-4 sm:p-6 shadow-sm border border-[#c7c4d8]/40 space-y-4">
              <div className="flex items-center justify-between pb-1 border-b border-[#eaedff]">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#e2dfff] text-[#3323cc] text-xs flex items-center justify-center font-bold">
                    6
                  </span>
                  <h2 className="text-base font-bold text-[#131b2e]">
                    Social &amp; External Registration Links
                  </h2>
                </div>
                <span className="text-xs font-semibold text-[#00687a]">Live deep-links</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#464555] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-[#3525cd]">link</span>
                    LinkedIn Event URL
                  </label>
                  <input
                    type="text"
                    value={event.linkedinUrl}
                    onChange={(e) => onUpdateEvent({ linkedinUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#f2f3ff] text-xs text-[#131b2e] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30 border border-[#c7c4d8]/40"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#464555] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-[#00687a]">
                      confirmation_number
                    </span>
                    Luma / Eventbrite Ticket URL
                  </label>
                  <input
                    type="text"
                    value={event.ticketUrl}
                    onChange={(e) => onUpdateEvent({ ticketUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#f2f3ff] text-xs text-[#131b2e] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30 border border-[#c7c4d8]/40"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#464555] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-[#131b2e]">tag</span>
                    X (Twitter) / Community Link
                  </label>
                  <input
                    type="text"
                    value={event.twitterUrl}
                    onChange={(e) => onUpdateEvent({ twitterUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#f2f3ff] text-xs text-[#131b2e] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30 border border-[#c7c4d8]/40"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#464555] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-[#777587]">
                      menu_book
                    </span>
                    Speaker Deck / Notion Agenda
                  </label>
                  <input
                    type="text"
                    value={event.notionUrl}
                    onChange={(e) => onUpdateEvent({ notionUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#f2f3ff] text-xs text-[#131b2e] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30 border border-[#c7c4d8]/40"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Actions Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    onUpdateEvent({
                      title: '',
                      locationAddress: '',
                      tags: [],
                    });
                    onShowToast('Cleared form fields');
                  }}
                  className="flex-1 sm:flex-initial px-3.5 py-2.5 rounded-xl border border-[#c7c4d8]/60 bg-white hover:bg-[#f2f3ff] text-xs font-bold text-[#464555] hover:text-[#131b2e] transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">clear_all</span>
                  Clear All
                </button>
                <button
                  type="button"
                  onClick={() => onShowToast('Draft saved successfully!')}
                  className="flex-1 sm:flex-initial px-3.5 py-2.5 rounded-xl border border-[#c7c4d8]/60 bg-white hover:bg-[#f2f3ff] text-xs font-bold text-[#131b2e] transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-2xs"
                >
                  <span className="material-symbols-outlined text-[16px]">bookmark</span>
                  Save as Draft
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onPublishToLinkedIn}
                  className="w-full sm:w-auto px-4 sm:px-5 py-3 rounded-xl bg-[#0a66c2] hover:bg-[#004182] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#0a66c2]/25 flex items-center justify-center gap-2 transition-all cursor-pointer transform active:scale-98"
                >
                  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.68 1.68 0 1 0 0-3.36 1.68 1.68 0 0 0 0 3.36m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                  </svg>
                  <span>Publish to LinkedIn</span>
                  <span className="material-symbols-outlined text-[15px]">send</span>
                </button>

                <button
                  type="button"
                  onClick={onProceedToStep2}
                  className="w-full sm:w-auto px-5 sm:px-6 py-3 rounded-xl bg-[#3525cd] hover:bg-[#4f46e5] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#3525cd]/25 flex items-center justify-center gap-2 transition-all cursor-pointer transform active:scale-98"
                >
                  <span>Proceed to Post Builder</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  <span className="hidden sm:inline text-[10px] bg-white/20 px-1 rounded">↵</span>
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Live Event Preview (5 Columns - Sticky) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-20">
            {/* Live Event Preview Header & Perspective Toggle */}
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00687a] animate-pulse"></span>
                <span className="text-xs font-extrabold text-[#131b2e] uppercase tracking-wider">
                  Live Event Preview
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-[#464555]">Perspective:</span>
                <button
                  onClick={() => onSwitchPerspective('attendee')}
                  type="button"
                  className="px-2.5 py-0.5 rounded-full bg-[#e2dfff] hover:bg-[#3525cd] hover:text-white text-[#3323cc] text-xs font-bold transition-all cursor-pointer"
                >
                  Organizer View ▾
                </button>
              </div>
            </div>

            {/* Realistically Styled Event Preview Card */}
            <div className="rounded-2xl overflow-hidden bg-white shadow-xl border border-[#c7c4d8]/40 transition-all hover:shadow-2xl">
              {/* Top Banner Graphic with Tech Grid Pattern */}
              <div className="relative h-36 bg-gradient-to-br from-[#3525cd] via-[#4f46e5] to-[#00687a] p-4 text-white flex flex-col justify-between overflow-hidden">
                {/* Grid Overlay */}
                <div
                  className="absolute inset-0 opacity-15 pointer-events-none"
                  style={{
                    backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
                    backgroundSize: '18px 18px',
                  }}
                ></div>

                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold tracking-wider uppercase flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px]">stars</span>
                    Featured LinkedIn Event
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-black/30 backdrop-blur-md text-[11px] font-semibold">
                    Starts in 18 Days
                  </span>
                </div>

                <div className="relative z-10">
                  <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#acedff]">
                    TECH &amp; AI SUMMITS 2025
                  </p>
                  <p className="text-sm font-extrabold leading-snug drop-shadow-sm">
                    From MVP to $10M ARR
                  </p>
                </div>
              </div>

              {/* Event Card Body */}
              <div className="p-5 space-y-4">
                {/* Title */}
                <h3 className="text-lg font-bold text-[#131b2e] leading-snug">
                  {event.title || 'Untitled Summit Event'}
                </h3>

                {/* Host Card Pill */}
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#f2f3ff] border border-[#eaedff]">
                  <div className="relative">
                    <img
                      src={event.hostAvatar}
                      alt={event.hostName}
                      className="w-10 h-10 rounded-full object-cover shadow-sm ring-1 ring-white"
                    />
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#00687a] text-white flex items-center justify-center text-[10px]">
                      <span className="material-symbols-outlined text-[10px]">check</span>
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#131b2e] truncate">
                      Hosted by {event.hostName} &amp; LinkVibe Founders
                    </p>
                    <p className="text-[11px] text-[#464555]">Top Voice • 142k LinkedIn Followers</p>
                  </div>
                </div>

                {/* Date & Location Details */}
                <div className="space-y-2 text-xs text-[#464555]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[17px] text-[#3525cd]">
                      calendar_today
                    </span>
                    <span className="font-semibold text-[#131b2e]">
                      Thursday, {event.startDate} • 6:30 PM – 9:30 PM EST
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[17px] text-[#00687a]">
                      location_on
                    </span>
                    <span>
                      {event.format} Event • Hall C Keynote Pavilion
                    </span>
                  </div>
                </div>

                {/* Venue Mini-Map Widget */}
                <div className="rounded-xl overflow-hidden border border-[#c7c4d8]/40 relative bg-[#eaedff]">
                  <div
                    className="w-full h-28 bg-cover bg-center"
                    style={{ backgroundImage: `url('${ASSETS.mapImage}')` }}
                  ></div>
                  <div className="p-3 bg-white flex items-center justify-between gap-2 border-t border-[#c7c4d8]/30">
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[#131b2e] truncate">
                        {event.locationName}
                      </p>
                      <p className="text-[11px] text-[#777587] truncate">
                        429 11th Ave, NYC
                      </p>
                    </div>
                    <a
                      href="https://maps.google.com/?q=Javits+Center"
                      target="_blank"
                      rel="noreferrer"
                      className="px-2.5 py-1 rounded bg-[#f2f3ff] hover:bg-[#eaedff] text-[11px] font-bold text-[#00687a] flex items-center gap-1 shrink-0"
                    >
                      <span>Open Map</span>
                      <span className="material-symbols-outlined text-[12px]">open_in_new</span>
                    </a>
                  </div>
                  <div className="px-3 py-1.5 bg-[#f2f3ff] border-t border-[#eaedff] flex items-center justify-between text-[11px] text-[#464555]">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px] text-[#3525cd]">subway</span>
                      2 min from 34th St-Hudson Yards
                    </span>
                    <span className="font-semibold text-[#00687a]">Verified Venue</span>
                  </div>
                </div>

                {/* EVENT TOPICS & SIGNALS */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-[#777587] uppercase tracking-wider block">
                    Event Topics &amp; Signals
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {event.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-full bg-[#f2f3ff] text-[#3525cd] text-[11px] font-semibold"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Attendee Social Proof */}
                <div className="p-3 rounded-xl bg-[#f2f3ff] border border-[#eaedff] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2 overflow-hidden">
                      <span className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-[#3525cd] text-white text-[10px] font-bold flex items-center justify-center">
                        A
                      </span>
                      <span className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-[#00687a] text-white text-[10px] font-bold flex items-center justify-center">
                        M
                      </span>
                      <span className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-[#ffd4a4] text-[#684000] text-[10px] font-bold flex items-center justify-center">
                        D
                      </span>
                      <span className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-[#dae2fd] text-[#3525cd] text-[9px] font-bold flex items-center justify-center">
                        +83
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#131b2e]">
                        {event.registeredCount} Founders Registered
                      </p>
                      <p className="text-[10px] text-[#464555]">
                        {event.connectionCount} of your 1st-degree LinkedIn connections are attending.
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-[#00687a] bg-[#acedff]/60 px-2 py-0.5 rounded-full shrink-0">
                    Trending in NYC
                  </span>
                </div>

                {/* Live Integrations Badges */}
                <div className="pt-1 flex items-center justify-between text-xs text-[#777587]">
                  <span>Live Integrations:</span>
                  <div className="flex items-center gap-2 text-[#3525cd]">
                    <span className="material-symbols-outlined text-[17px] hover:scale-110 transition-transform">
                      language
                    </span>
                    <span className="material-symbols-outlined text-[17px] hover:scale-110 transition-transform">
                      confirmation_number
                    </span>
                    <span className="material-symbols-outlined text-[17px] hover:scale-110 transition-transform">
                      tag
                    </span>
                    <span className="material-symbols-outlined text-[17px] hover:scale-110 transition-transform">
                      description
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ORGANIZER QUICK UTILITIES Bento */}
            <div className="rounded-xl bg-white p-4 shadow-sm border border-[#c7c4d8]/40 space-y-3">
              <span className="text-[11px] font-bold text-[#777587] uppercase tracking-wider block">
                Organizer Quick Utilities
              </span>

              {/* Direct LinkedIn Launch Action */}
              <button
                type="button"
                onClick={onPublishToLinkedIn}
                className="w-full py-2.5 px-3 rounded-xl bg-[#0a66c2] hover:bg-[#004182] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm shadow-[#0a66c2]/25 transition-all cursor-pointer transform active:scale-98"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.68 1.68 0 1 0 0-3.36 1.68 1.68 0 0 0 0 3.36m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                </svg>
                <span>Publish Event to LinkedIn</span>
                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              </button>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="py-2 px-2 rounded-lg bg-[#f2f3ff] hover:bg-[#eaedff] text-[#131b2e] text-xs font-bold flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer border border-[#c7c4d8]/30"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#3525cd]">content_copy</span>
                  <span>Copy Link</span>
                </button>
                <button
                  type="button"
                  onClick={onOpenQR}
                  className="py-2 px-2 rounded-lg bg-[#f2f3ff] hover:bg-[#eaedff] text-[#131b2e] text-xs font-bold flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer border border-[#c7c4d8]/30"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#00687a]">qr_code_2</span>
                  <span>Event QR</span>
                </button>
                <button
                  type="button"
                  onClick={handleExportICS}
                  className="py-2 px-2 rounded-lg bg-[#f2f3ff] hover:bg-[#eaedff] text-[#131b2e] text-xs font-bold flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer border border-[#c7c4d8]/30"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#885500]">event</span>
                  <span>Export .ics</span>
                </button>
              </div>
            </div>

            {/* Why complete event details? Card */}
            <div className="p-4 rounded-xl bg-[#e2dfff]/40 border border-[#3525cd]/20 space-y-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#3525cd] text-[18px]">auto_awesome</span>
                <span className="text-xs font-bold text-[#131b2e]">Why complete event details?</span>
              </div>
              <p className="text-xs text-[#464555] leading-relaxed">
                Step 2 uses this metadata to craft personalized viral LinkedIn carousel hooks, speaker highlights,
                and direct RSVP CTAs with 3.4x higher click-through.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
