import React, { useEffect, useState } from 'react';
import { EventInfo } from '../types';
import { generateEventAnnouncementText, getLinkedInCreateEventUrl, getLinkedInFeedShareUrl } from '../utils/linkedinShare';

interface ShareToLinkedInModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventInfo;
  onShowToast: (msg: string) => void;
}

export const ShareToLinkedInModal: React.FC<ShareToLinkedInModalProps> = ({
  isOpen,
  onClose,
  event,
  onShowToast,
}) => {
  const [postText, setPostText] = useState('');
  const [activeTab, setActiveTab] = useState<'feed' | 'official-event'>('feed');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setPostText(generateEventAnnouncementText(event));
      setCopied(false);
    }
  }, [isOpen, event]);

  if (!isOpen) return null;

  const shareUrl = getLinkedInFeedShareUrl(postText);
  const createEventUrl = getLinkedInCreateEventUrl();

  const handleCopyText = () => {
    navigator.clipboard?.writeText(postText);
    setCopied(true);
    onShowToast('Event announcement text copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePublishClick = () => {
    navigator.clipboard?.writeText(postText);
    onShowToast('Copied announcement to clipboard! Opening LinkedIn Feed...');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-[#c7c4d8]/40 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-[#0a66c2]/10 via-[#e2dfff]/20 to-[#f2f3ff] border-b border-[#eaedff] flex items-center justify-between">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#0a66c2] text-white flex items-center justify-center shadow-md shrink-0">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.68 1.68 0 1 0 0-3.36 1.68 1.68 0 0 0 0 3.36m1.39 9.74v-8.37H5.07v8.37h2.78z" />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <h3 className="text-sm sm:text-lg font-bold text-[#131b2e] truncate">
                  Publish Event to LinkedIn
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#0a66c2] text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">
                  Direct
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-[#464555] truncate">
                Broadcast your event announcement with 1-click publishing
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#777587] hover:text-[#131b2e] hover:bg-black/5 transition-colors cursor-pointer shrink-0"
          >
            <span className="material-symbols-outlined text-[20px] sm:text-[22px]">close</span>
          </button>
        </div>

        {/* Tab Selection */}
        <div className="px-4 sm:px-6 pt-3 sm:pt-4 flex gap-1 sm:gap-2 border-b border-[#eaedff] overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('feed')}
            className={`pb-2 sm:pb-2.5 px-2.5 sm:px-3 text-xs font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'feed'
                ? 'border-[#0a66c2] text-[#0a66c2]'
                : 'border-transparent text-[#777587] hover:text-[#131b2e]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">feed</span>
            Share Post to Feed
          </button>
          <button
            onClick={() => setActiveTab('official-event')}
            className={`pb-2 sm:pb-2.5 px-2.5 sm:px-3 text-xs font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'official-event'
                ? 'border-[#0a66c2] text-[#0a66c2]'
                : 'border-transparent text-[#777587] hover:text-[#131b2e]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">event</span>
            Create Native LinkedIn Event
          </button>
        </div>

        {/* Body content */}
        <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1">
          {activeTab === 'feed' ? (
            <>
              {/* Event Quick Snapshot Banner */}
              <div className="p-3.5 rounded-2xl bg-[#f2f3ff] border border-[#eaedff] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#3525cd] text-white flex items-center justify-center shrink-0 font-bold text-xs">
                    NOV
                    <br />
                    14
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#131b2e] truncate">{event.title}</p>
                    <p className="text-[11px] text-[#464555] truncate">
                      {event.locationName} • {event.format}
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-[#00687a] bg-[#acedff]/60 px-2.5 py-1 rounded-full shrink-0">
                  Ready to Publish
                </span>
              </div>

              {/* Editable Announcement Text */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#131b2e] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-[#0a66c2]">edit_note</span>
                    Announcement Message Preview (Editable)
                  </label>
                  <button
                    onClick={handleCopyText}
                    className="text-[11px] font-bold text-[#0a66c2] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      {copied ? 'check' : 'content_copy'}
                    </span>
                    {copied ? 'Copied!' : 'Copy to Clipboard'}
                  </button>
                </div>
                <textarea
                  rows={9}
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-[#faf8ff] text-xs font-mono text-[#131b2e] leading-relaxed border border-[#c7c4d8]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a66c2]/30 resize-y"
                  placeholder="Event announcement text..."
                ></textarea>
                <div className="flex items-center justify-between text-[11px] text-[#777587]">
                  <span>Optimized for LinkedIn algorithm &amp; CTR</span>
                  <span>{postText.length} characters</span>
                </div>
              </div>

              {/* Hashtag recommendations */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-[#777587] uppercase tracking-wider block">
                  Included Signals
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {event.activeHashtags.map((ht) => (
                    <span
                      key={ht}
                      className="px-2 py-0.5 rounded-md bg-[#e2dfff] text-[#3323cc] text-[11px] font-bold"
                    >
                      {ht}
                    </span>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-4 py-2">
              <div className="p-4 rounded-2xl bg-[#0a66c2]/5 border border-[#0a66c2]/20 space-y-2">
                <h4 className="text-sm font-bold text-[#131b2e] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#0a66c2]">calendar_month</span>
                  Native LinkedIn Events
                </h4>
                <p className="text-xs text-[#464555] leading-relaxed">
                  LinkedIn allows creators and organizations to host native Event pages. Attendees can click "Attend", invite their 1st-degree connections, and receive calendar push notifications directly inside LinkedIn.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#f2f3ff] border border-[#eaedff] space-y-3">
                <p className="text-xs font-bold text-[#131b2e]">Pre-formatted Event Metadata for LinkedIn:</p>
                <div className="space-y-1.5 text-xs text-[#464555]">
                  <p><strong className="text-[#131b2e]">Event Name:</strong> {event.title}</p>
                  <p><strong className="text-[#131b2e]">Event Format:</strong> {event.format}</p>
                  <p><strong className="text-[#131b2e]">Date &amp; Time:</strong> {event.startDate}, {event.startTime} EST</p>
                  <p><strong className="text-[#131b2e]">Location:</strong> {event.locationAddress}</p>
                  <p><strong className="text-[#131b2e]">Registration Link:</strong> {event.ticketUrl}</p>
                </div>
                <button
                  type="button"
                  onClick={handleCopyText}
                  className="px-3 py-1.5 rounded-lg bg-white border border-[#c7c4d8]/40 hover:bg-[#eaedff] text-xs font-bold text-[#131b2e] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[15px]">content_copy</span>
                  Copy All Event Details for LinkedIn Form
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-6 bg-[#f2f3ff] border-t border-[#eaedff] flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-[#c7c4d8]/60 bg-white hover:bg-[#eaedff] text-xs font-bold text-[#464555] hover:text-[#131b2e] transition-colors cursor-pointer text-center"
          >
            Cancel
          </button>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleCopyText}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white hover:bg-[#eaedff] text-xs font-bold text-[#131b2e] border border-[#c7c4d8]/40 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-[#0a66c2]">
                {copied ? 'check' : 'content_copy'}
              </span>
              <span>{copied ? 'Copied!' : 'Copy Text'}</span>
            </button>

            {activeTab === 'feed' ? (
              <a
                href={shareUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handlePublishClick}
                className="w-full sm:w-auto px-5 sm:px-6 py-2.5 rounded-xl bg-[#0a66c2] hover:bg-[#004182] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#0a66c2]/30 flex items-center justify-center gap-2 transition-all cursor-pointer transform active:scale-98 text-center"
              >
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.68 1.68 0 1 0 0-3.36 1.68 1.68 0 0 0 0 3.36m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                </svg>
                <span>Publish to LinkedIn Feed</span>
                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              </a>
            ) : (
              <a
                href={createEventUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  navigator.clipboard?.writeText(event.title);
                  onShowToast('Copied event title! Opening LinkedIn Events...');
                }}
                className="w-full sm:w-auto px-5 sm:px-6 py-2.5 rounded-xl bg-[#0a66c2] hover:bg-[#004182] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#0a66c2]/30 flex items-center justify-center gap-2 transition-all cursor-pointer transform active:scale-98 text-center"
              >
                <span>Open LinkedIn Event Creator</span>
                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
