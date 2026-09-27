import React from 'react';
import { AttendeeInfo, EventInfo, TicketTier } from '../types';
import { ShareToLinkedInModal } from './ShareToLinkedInModal';

interface ModalsProps {
  showQRModal: boolean;
  onCloseQRModal: () => void;
  showLinkedInModal: boolean;
  onCloseLinkedInModal: () => void;
  bookingSuccessTier: TicketTier | null;
  onCloseBookingSuccess: () => void;
  event: EventInfo;
  attendee: AttendeeInfo;
  toastMessage: string | null;
  onShowToast: (msg: string) => void;
}

export const Modals: React.FC<ModalsProps> = ({
  showQRModal,
  onCloseQRModal,
  showLinkedInModal,
  onCloseLinkedInModal,
  bookingSuccessTier,
  onCloseBookingSuccess,
  event,
  attendee,
  toastMessage,
  onShowToast,
}) => {
  return (
    <>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-4 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 z-50 flex items-center justify-center sm:justify-start gap-2.5 px-4 py-3 rounded-xl bg-[#131b2e] text-white text-xs font-semibold shadow-2xl border border-white/10 animate-bounce duration-300 max-w-md mx-auto sm:mx-0">
          <span className="material-symbols-outlined text-[#57dffe] text-[18px]">
            check_circle
          </span>
          <span className="truncate">{toastMessage}</span>
        </div>
      )}

      {/* Share / Publish to LinkedIn Modal */}
      <ShareToLinkedInModal
        isOpen={showLinkedInModal}
        onClose={onCloseLinkedInModal}
        event={event}
        onShowToast={onShowToast}
      />

      {/* Event QR Code Modal */}
      {showQRModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-4 sm:p-6 shadow-2xl border border-[#c7c4d8]/40 space-y-4 text-center">
            <div className="flex items-center justify-between pb-2 border-b border-[#eaedff]">
              <span className="text-xs font-bold text-[#131b2e] uppercase tracking-wider">
                Event Registration QR
              </span>
              <button
                onClick={onCloseQRModal}
                className="text-[#777587] hover:text-[#131b2e] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="p-3 sm:p-4 bg-[#f2f3ff] rounded-xl flex items-center justify-center">
              <svg className="w-40 h-40 sm:w-48 sm:h-48 text-[#131b2e]" fill="currentColor" viewBox="0 0 200 200">
                <rect x="15" y="15" width="50" height="50" rx="6" stroke="currentColor" strokeWidth="10" fill="none" />
                <rect x="29" y="29" width="22" height="22" rx="3" />
                <rect x="135" y="15" width="50" height="50" rx="6" stroke="currentColor" strokeWidth="10" fill="none" />
                <rect x="149" y="29" width="22" height="22" rx="3" />
                <rect x="15" y="135" width="50" height="50" rx="6" stroke="currentColor" strokeWidth="10" fill="none" />
                <rect x="29" y="149" width="22" height="22" rx="3" />
                <rect x="75" y="20" width="12" height="12" />
                <rect x="95" y="20" width="12" height="12" />
                <rect x="115" y="20" width="12" height="12" />
                <rect x="75" y="40" width="12" height="12" />
                <rect x="115" y="40" width="12" height="12" />
                <circle cx="100" cy="100" r="16" fill="#3525cd" />
              </svg>
            </div>

            <div>
              <p className="text-sm font-bold text-[#131b2e]">{event.title}</p>
              <p className="text-xs text-[#464555] mt-0.5">
                Scan to RSVP on LinkedIn or Javits Check-in Kiosks
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  window.print();
                  onCloseQRModal();
                }}
                className="py-2.5 px-3 rounded-xl bg-[#3525cd] hover:bg-[#4f46e5] text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Print / Save QR
              </button>
              <button
                type="button"
                onClick={onCloseQRModal}
                className="py-2.5 px-3 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-[#131b2e] text-xs font-bold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Confirmed Modal */}
      {bookingSuccessTier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-[#c7c4d8]/40 space-y-4 sm:space-y-5 text-center relative overflow-hidden">
            {/* Top festive header */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#3525cd] via-[#00687a] to-[#885500]"></div>

            <div className="w-14 h-14 mx-auto rounded-full bg-[#acedff]/60 text-[#00687a] flex items-center justify-center shadow-inner">
              <span className="material-symbols-outlined text-[32px]">check_circle</span>
            </div>

            <div>
              <span className="px-3 py-1 rounded-full bg-[#e2dfff] text-[#3323cc] text-xs font-bold uppercase tracking-wider">
                Registration Confirmed
              </span>
              <h3 className="text-xl font-extrabold text-[#131b2e] mt-2">
                You're In! Welcome to the Summit
              </h3>
              <p className="text-xs text-[#464555] mt-1">
                Your ticket and verified NFC digital pass have been issued to{' '}
                <strong className="text-[#131b2e]">{attendee.email}</strong>.
              </p>
            </div>

            {/* Ticket details summary */}
            <div className="p-4 rounded-2xl bg-[#f2f3ff] text-left space-y-2 text-xs border border-[#eaedff]">
              <div className="flex justify-between">
                <span className="text-[#777587]">Attendee Name:</span>
                <span className="font-bold text-[#131b2e]">{attendee.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#777587]">Admission Tier:</span>
                <span className="font-bold text-[#3525cd]">{bookingSuccessTier.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#777587]">Pass Identifier:</span>
                <span className="font-mono text-[#131b2e]">{attendee.passNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#777587]">Assigned Gate:</span>
                <span className="font-semibold text-[#131b2e]">Gate A-Express (Hall E)</span>
              </div>
              <div className="flex justify-between border-t border-[#c7c4d8]/40 pt-2 font-bold text-sm">
                <span>Total Paid:</span>
                <span className="text-[#3525cd]">${bookingSuccessTier.price} USD</span>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={onCloseBookingSuccess}
                className="w-full py-3 rounded-xl bg-[#3525cd] hover:bg-[#4f46e5] text-white text-xs font-bold transition-all shadow-md shadow-[#3525cd]/25 cursor-pointer"
              >
                View Live Smart Digital Pass
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
