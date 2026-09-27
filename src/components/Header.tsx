import React, { useEffect, useRef, useState } from 'react';
import { ASSETS } from '../constants/initialData';
import { NavTab, Role } from '../types';

interface HeaderProps {
  currentRole: Role;
  onRoleChange: (role: Role) => void;
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  onSaveDraft: () => void;
  onGeneratePost: () => void;
  onPublishToLinkedIn: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  activeTab,
  onTabChange,
  onSaveDraft,
  onGeneratePost,
  onPublishToLinkedIn,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showNotifications) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showNotifications]);

  const mockNotifications = [
    {
      id: '1',
      text: 'Priya Sharma approved the keynote speaker slide deck.',
      time: '10m ago',
      unread: true,
    },
    {
      id: '2',
      text: 'New VIP Ticket purchased by David Miller (Partner @ Benchmark).',
      time: '42m ago',
      unread: true,
    },
    {
      id: '3',
      text: 'LinkedIn Event auto-synced with 342 confirmed attendees.',
      time: '2h ago',
      unread: true,
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#ffffff]/95 backdrop-blur-md border-b border-[#c7c4d8]/50 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      {/* Primary Header Row */}
      <div className="h-16 w-full px-3 sm:px-4 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand & Desktop Role Switcher */}
        <div className="flex items-center gap-2 sm:gap-6 shrink-0">
          <button
            onClick={() => {
              onTabChange('create-event');
              onRoleChange('organizer');
            }}
            className="flex items-center gap-2 text-left focus:outline-none group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 shadow-sm shadow-[#3525cd]/30 group-hover:scale-105 transition-transform">
              <img
                src={ASSETS.logo}
                alt="LinkVibe Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-['Plus_Jakarta_Sans'] text-base sm:text-lg text-[#131b2e] tracking-tight font-extrabold">
              LinkVibe
            </span>
            <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-[#e2dfff] text-[#3323cc] font-['Inter'] text-[10px] sm:text-[11px] uppercase tracking-wider font-bold">
              PRO
            </span>
          </button>

          {/* Desktop Perspective Selector (Organizer vs Attendee) */}
          <div className="hidden lg:flex items-center p-1 rounded-full bg-[#f2f3ff] border border-[#c7c4d8]/40">
            <button
              type="button"
              onClick={() => onRoleChange('organizer')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                currentRole === 'organizer'
                  ? 'bg-white text-[#3525cd] shadow-[0_1px_2px_rgba(0,0,0,0.08)]'
                  : 'text-[#464555] hover:text-[#131b2e]'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">stars</span>
              Organizer
            </button>
            <button
              type="button"
              onClick={() => onRoleChange('attendee')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                currentRole === 'attendee'
                  ? 'bg-white text-[#3525cd] shadow-[0_1px_2px_rgba(0,0,0,0.08)]'
                  : 'text-[#464555] hover:text-[#131b2e]'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">visibility</span>
              Attendee
            </button>
          </div>
        </div>

        {/* Desktop Primary Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-[#f2f3ff] border border-[#c7c4d8]/40">
          <button
            type="button"
            onClick={() => {
              onTabChange('create-event');
              onRoleChange('organizer');
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'create-event' && currentRole === 'organizer'
                ? 'bg-[#3525cd] text-white shadow-sm'
                : 'text-[#464555] hover:text-[#131b2e]'
            }`}
          >
            1. Create Event
          </button>
          <button
            type="button"
            onClick={() => onTabChange('post-builder')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'post-builder'
                ? 'bg-[#3525cd] text-white shadow-sm'
                : 'text-[#464555] hover:text-[#131b2e]'
            }`}
          >
            2. Post Builder &amp; AI Hook
          </button>
          <button
            type="button"
            onClick={() => onTabChange('drafts')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'drafts'
                ? 'bg-[#3525cd] text-white shadow-sm'
                : 'text-[#464555] hover:text-[#131b2e]'
            }`}
          >
            Drafts
          </button>
          <button
            type="button"
            onClick={() => onTabChange('analytics')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'analytics'
                ? 'bg-[#3525cd] text-white shadow-sm'
                : 'text-[#464555] hover:text-[#131b2e]'
            }`}
          >
            Analytics
          </button>
        </nav>

        {/* Right Action Tools */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* LinkedIn Share button - icon on mobile, full text on tablet/desktop */}
          <button
            onClick={onPublishToLinkedIn}
            type="button"
            title="Publish Event to LinkedIn"
            className="flex items-center justify-center gap-1.5 h-9 px-2.5 sm:px-3 rounded-xl bg-[#0a66c2] hover:bg-[#004182] text-white text-xs font-bold shadow-sm shadow-[#0a66c2]/25 transition-all cursor-pointer transform active:scale-95"
          >
            <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.68 1.68 0 1 0 0-3.36 1.68 1.68 0 0 0 0 3.36m1.39 9.74v-8.37H5.07v8.37h2.78z" />
            </svg>
            <span className="hidden md:inline">Share to LinkedIn</span>
          </button>

          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={onSaveDraft}
              type="button"
              className="h-9 px-3 rounded-xl border border-[#c7c4d8]/70 bg-white hover:bg-[#f2f3ff] text-[#131b2e] text-xs font-semibold transition-colors cursor-pointer shadow-xs"
            >
              Save Draft
            </button>
            <button
              onClick={onGeneratePost}
              type="button"
              className="flex items-center gap-1 h-9 px-3.5 rounded-xl bg-[#4f46e5] hover:bg-[#3525cd] text-white text-xs font-bold shadow-sm shadow-[#4f46e5]/30 transition-all cursor-pointer transform active:scale-98"
            >
              <span>Post Builder</span>
              <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
            </button>
          </div>

          <div className="h-5 w-px bg-[#c7c4d8]/60 hidden sm:block mx-0.5"></div>

          {/* Notifications Dropdown */}
          <div ref={notificationRef} className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                if (unreadCount > 0) setUnreadCount(0);
              }}
              aria-label="Notifications"
              className="relative p-2 rounded-xl text-[#464555] hover:text-[#131b2e] hover:bg-[#e2e7ff] transition-colors cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ba1a1a] ring-2 ring-white animate-pulse"></span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] max-w-xs sm:w-80 bg-white rounded-2xl shadow-2xl border border-[#c7c4d8]/40 p-3.5 z-50 text-xs animate-in fade-in duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-[#eaedff]">
                  <span className="font-bold text-[#131b2e] text-xs">Notifications</span>
                  <span className="text-[11px] text-[#4f46e5] font-semibold cursor-pointer hover:underline">Mark all read</span>
                </div>
                <div className="divide-y divide-[#f2f3ff] max-h-64 overflow-y-auto">
                  {mockNotifications.map((notif) => (
                    <div key={notif.id} className="py-2.5 px-1 hover:bg-[#f2f3ff] rounded-lg transition-colors">
                      <p className="text-[#131b2e] text-xs leading-snug">{notif.text}</p>
                      <span className="text-[10px] text-[#777587] mt-1 block">{notif.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Badge */}
          <div className="flex items-center gap-1.5 pl-0.5 cursor-pointer group">
            <div className="relative">
              <img
                src={ASSETS.hostAvatar}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-[#4f46e5]/40 shadow-sm group-hover:ring-[#3525cd] transition-all"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#00687a] ring-2 ring-white"></span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Secondary Responsive Navigation & Perspective Bar */}
      <div className="lg:hidden w-full bg-[#faf8ff] border-t border-[#c7c4d8]/40 px-3 py-2 flex items-center justify-between gap-2 overflow-x-auto scrollbar-none">
        {/* Role Toggle Switch */}
        <div className="flex items-center p-0.5 rounded-xl bg-[#eaedff] border border-[#c7c4d8]/30 shrink-0">
          <button
            type="button"
            onClick={() => onRoleChange('organizer')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
              currentRole === 'organizer'
                ? 'bg-white text-[#3525cd] shadow-xs'
                : 'text-[#464555]'
            }`}
          >
            <span className="material-symbols-outlined text-[13px]">stars</span>
            Organizer
          </button>
          <button
            type="button"
            onClick={() => onRoleChange('attendee')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
              currentRole === 'attendee'
                ? 'bg-white text-[#3525cd] shadow-xs'
                : 'text-[#464555]'
            }`}
          >
            <span className="material-symbols-outlined text-[13px]">visibility</span>
            Attendee
          </button>
        </div>

        {/* Scrollable View Tabs */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={() => {
              onTabChange('create-event');
              onRoleChange('organizer');
            }}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer shrink-0 ${
              activeTab === 'create-event' && currentRole === 'organizer'
                ? 'bg-[#3525cd] text-white shadow-xs'
                : 'bg-white text-[#464555] border border-[#c7c4d8]/30'
            }`}
          >
            1. Event
          </button>
          <button
            type="button"
            onClick={() => onTabChange('post-builder')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer shrink-0 ${
              activeTab === 'post-builder'
                ? 'bg-[#3525cd] text-white shadow-xs'
                : 'bg-white text-[#464555] border border-[#c7c4d8]/30'
            }`}
          >
            2. Post Builder
          </button>
          <button
            type="button"
            onClick={() => onTabChange('drafts')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer shrink-0 ${
              activeTab === 'drafts'
                ? 'bg-[#3525cd] text-white shadow-xs'
                : 'bg-white text-[#464555] border border-[#c7c4d8]/30'
            }`}
          >
            Drafts
          </button>
          <button
            type="button"
            onClick={() => onTabChange('analytics')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer shrink-0 ${
              activeTab === 'analytics'
                ? 'bg-[#3525cd] text-white shadow-xs'
                : 'bg-white text-[#464555] border border-[#c7c4d8]/30'
            }`}
          >
            Analytics
          </button>
        </div>
      </div>
    </header>
  );
};
