/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AnalyticsView } from './components/AnalyticsView';
import { AttendeeView } from './components/AttendeeView';
import { CreateEventView } from './components/CreateEventView';
import { DraftsView } from './components/DraftsView';
import { Header } from './components/Header';
import { Modals } from './components/Modals';
import { PostBuilderView } from './components/PostBuilderView';
import { ASSETS, INITIAL_ATTENDEE, INITIAL_EVENT } from './constants/initialData';
import { AttendeeInfo, EventInfo, NavTab, Role, TicketTier } from './types';

export default function App() {
  const [role, setRole] = useState<Role>('organizer');
  const [activeTab, setActiveTab] = useState<NavTab>('create-event');
  const [event, setEvent] = useState<EventInfo>(INITIAL_EVENT);
  const [attendee, setAttendee] = useState<AttendeeInfo>(INITIAL_ATTENDEE);

  // Modal & Toast state
  const [showQRModal, setShowQRModal] = useState(false);
  const [showLinkedInModal, setShowLinkedInModal] = useState(false);
  const [bookingSuccessTier, setBookingSuccessTier] = useState<TicketTier | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3000);
  };

  const handleUpdateEvent = (updated: Partial<EventInfo>) => {
    setEvent((prev) => ({ ...prev, ...updated }));
  };

  const handleUpdateAttendee = (updated: Partial<AttendeeInfo>) => {
    setAttendee((prev) => ({ ...prev, ...updated }));
  };

  const handleRoleChange = (newRole: Role) => {
    setRole(newRole);
    if (activeTab !== 'create-event') {
      setActiveTab('create-event');
    }
    showToast(`Switched perspective to ${newRole === 'organizer' ? 'Organizer' : 'Attendee'}`);
  };

  const handleSaveDraft = () => {
    showToast('Event draft and post campaign saved!');
  };

  const handleGeneratePost = () => {
    setActiveTab('post-builder');
    showToast('Navigated to Post Builder & AI Hook!');
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col font-['Plus_Jakarta_Sans']">
      {/* Persistent Navigation Header */}
      <Header
        currentRole={role}
        onRoleChange={handleRoleChange}
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab === 'create-event' && role !== 'organizer') {
            // Keep role preference or default to organizer
          }
        }}
        onSaveDraft={handleSaveDraft}
        onGeneratePost={handleGeneratePost}
        onPublishToLinkedIn={() => setShowLinkedInModal(true)}
      />

      {/* Main View Area with Top Padding for Fixed Header */}
      <main className="flex-1 w-full pt-16 bg-[#faf8ff]">
        {activeTab === 'post-builder' ? (
          <PostBuilderView
            event={event}
            onBackToStep1={() => setActiveTab('create-event')}
            onShowToast={showToast}
          />
        ) : activeTab === 'drafts' ? (
          <DraftsView
            currentEvent={event}
            onLoadDraft={(d) => {
              handleUpdateEvent(d);
              setActiveTab('create-event');
            }}
            onShowToast={showToast}
          />
        ) : activeTab === 'analytics' ? (
          <AnalyticsView event={event} onShowToast={showToast} />
        ) : role === 'organizer' ? (
          <CreateEventView
            event={event}
            onUpdateEvent={handleUpdateEvent}
            onProceedToStep2={() => setActiveTab('post-builder')}
            onSwitchPerspective={(newRole) => handleRoleChange(newRole)}
            onOpenQR={() => setShowQRModal(true)}
            onPublishToLinkedIn={() => setShowLinkedInModal(true)}
            onShowToast={showToast}
          />
        ) : (
          <AttendeeView
            event={event}
            attendee={attendee}
            onUpdateAttendee={handleUpdateAttendee}
            onShowBookingSuccess={(tier) => {
              setBookingSuccessTier(tier);
              showToast(`Reservation created for ${attendee.name}!`);
            }}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Application Modals and Feedback Toast */}
      <Modals
        showQRModal={showQRModal}
        onCloseQRModal={() => setShowQRModal(false)}
        showLinkedInModal={showLinkedInModal}
        onCloseLinkedInModal={() => setShowLinkedInModal(false)}
        bookingSuccessTier={bookingSuccessTier}
        onCloseBookingSuccess={() => setBookingSuccessTier(null)}
        event={event}
        attendee={attendee}
        toastMessage={toastMessage}
        onShowToast={showToast}
      />

      {/* Footer */}
      <footer className="w-full bg-white border-t border-[#c7c4d8]/40 py-8 mt-12">
        <div className="w-full px-4 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded overflow-hidden shrink-0">
              <img
                src={ASSETS.logo}
                alt="LinkVibe Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs text-[#464555] font-['Inter'] font-semibold">
              © 2024 LinkVibe Creator Studio. Built for LinkedIn builders.
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs font-semibold text-[#464555]">
            <a href="#community" className="hover:text-[#131b2e] transition-colors">
              Community Guidelines
            </a>
            <a href="#terms" className="hover:text-[#131b2e] transition-colors">
              Terms
            </a>
            <a href="#privacy" className="hover:text-[#131b2e] transition-colors">
              Privacy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
