import React, { useEffect, useState } from 'react';
import { ASSETS, MOCK_ATTENDEE_PROFILES, TICKET_TIERS } from '../constants/initialData';
import { AttendeeInfo, EventInfo, TicketTier } from '../types';

interface AttendeeViewProps {
  event: EventInfo;
  attendee: AttendeeInfo;
  onUpdateAttendee: (updated: Partial<AttendeeInfo>) => void;
  onShowBookingSuccess: (tier: TicketTier) => void;
  onShowToast: (msg: string) => void;
}

export const AttendeeView: React.FC<AttendeeViewProps> = ({
  event,
  attendee,
  onUpdateAttendee,
  onShowBookingSuccess,
  onShowToast,
}) => {
  // 8m 42s countdown timer
  const [secondsRemaining, setSecondsRemaining] = useState(8 * 60 + 42);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}m : ${s.toString().padStart(2, '0')}s remaining`;
  };

  const selectedTier =
    TICKET_TIERS.find((t) => t.id === attendee.tierId) || TICKET_TIERS[1];

  const handleAutofillLinkedIn = () => {
    // Pick the next profile
    const currentIndex = MOCK_ATTENDEE_PROFILES.findIndex(
      (p) => p.name === attendee.name
    );
    const nextIndex = (currentIndex + 1) % MOCK_ATTENDEE_PROFILES.length;
    const nextProfile = MOCK_ATTENDEE_PROFILES[nextIndex];

    onUpdateAttendee({
      name: nextProfile.name,
      email: nextProfile.email,
      headline: nextProfile.headline,
      linkedinUrl: nextProfile.linkedinUrl,
      avatarUrl: nextProfile.avatarUrl,
    });
    onShowToast(`Synced profile credentials for ${nextProfile.name}`);
  };

  const handleToggleTag = (tag: string) => {
    if (attendee.tags.includes(tag)) {
      onUpdateAttendee({ tags: attendee.tags.filter((t) => t !== tag) });
    } else {
      onUpdateAttendee({ tags: [...attendee.tags, tag] });
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onUpdateAttendee({ avatarUrl: event.target.result as string });
          onShowToast('Updated smart badge portrait!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownloadPDF = () => {
    window.print();
    onShowToast('Preparing digital ticket for printing / PDF export');
  };

  const handleAddToCalendar = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//LinkVibe Creator Studio//EN
BEGIN:VEVENT
SUMMARY:${event.title} [VIP TICKET: ${attendee.name}]
DESCRIPTION:Access pass for ${attendee.name}. Seat: ${attendee.seat}, Zone: ${attendee.zone}
LOCATION:${event.locationAddress}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `VIP_Pass_${attendee.name.replace(/\s+/g, '_')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onShowToast('Added VIP ticket reservation to calendar!');
  };

  const handlePostAttending = () => {
    const postText = `Excited to join ${event.hostName} & 300+ founders at ${event.title} in NYC! Who else from my network will be there? Let's connect! 🚀 #GenAI #TechNetworking`;
    navigator.clipboard?.writeText(postText);
    onShowToast('Attendee post template copied! Opening LinkedIn sharing dialog...');
    window.open(
      `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(postText)}`,
      '_blank'
    );
  };

  return (
    <div className="w-full">
      {/* Interactive View State Bar */}
      <div className="w-full bg-[#f2f3ff] px-3 sm:px-4 lg:px-8 py-2.5 sm:py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-3 border-b border-[#c7c4d8]/40">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-wrap">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#acedff] text-[#004e5c] text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#00687a] animate-pulse"></span>
            Attendee Perspective
          </div>
          <div className="h-4 w-px bg-[#c7c4d8]/60 hidden sm:block"></div>
          <p className="text-[11px] sm:text-xs text-[#464555] font-medium">
            Live Checkout Experience &amp; Smart Digital Pass Preview
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 flex-wrap w-full sm:w-auto justify-between sm:justify-end">
          <span className="text-[11px] sm:text-xs text-[#464555] font-semibold">Stage:</span>
          <span className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-0.5 rounded-full bg-[#e2dfff] text-[#3323cc] text-xs font-bold">
            <span className="material-symbols-outlined text-[14px]">lock</span>
            Tier 1 VIP Reserved
          </span>
          <span className="text-xs text-[#3525cd] font-mono font-bold px-2 py-0.5 rounded bg-white border border-[#c7c4d8]/30">
            {formatTimer(secondsRemaining)}
          </span>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="w-full px-3 sm:px-4 lg:px-8 py-4 sm:py-6 space-y-5 sm:space-y-6 max-w-7xl mx-auto">
        {/* Event Banner Spotlight */}
        <div className="relative overflow-hidden rounded-2xl bg-white p-4 sm:p-6 lg:p-8 shadow-sm border border-[#c7c4d8]/40">
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-gradient-to-br from-[#c3c0ff]/40 to-[#acedff]/30 blur-3xl pointer-events-none"></div>
          <div className="absolute -left-20 -bottom-20 w-72 h-72 rounded-full bg-gradient-to-tr from-[#dae2fd]/50 to-[#3525cd]/10 blur-2xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#e2dfff] text-[#3323cc] text-xs font-bold uppercase tracking-wider">
                  Flagship Summit
                </span>
                <span className="flex items-center gap-1 text-[#464555] text-xs font-semibold">
                  <span className="material-symbols-outlined text-[16px] text-[#00687a]">verified</span>
                  LinkedIn Verified Community
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#131b2e] tracking-tight">
                {event.title}
              </h1>

              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-[#464555] text-xs pt-1">
                <span className="flex items-center gap-1.5 font-semibold text-[#131b2e]">
                  <span className="material-symbols-outlined text-[#3525cd] text-[18px]">
                    calendar_today
                  </span>
                  Thu, Nov 14, 2025 • 6:30 PM – 10:30 PM EST
                </span>
                <span className="flex items-center gap-1.5 font-semibold text-[#131b2e]">
                  <span className="material-symbols-outlined text-[#00687a] text-[18px]">
                    location_on
                  </span>
                  {event.locationName}
                </span>
                <span className="flex items-center gap-1 text-[#464555]">
                  <span className="material-symbols-outlined text-[16px]">group</span>
                  340+ Founders &amp; Operators Booked
                </span>
              </div>
            </div>

            {/* Host Card Pill */}
            <div className="shrink-0 flex items-center gap-3 p-3 rounded-2xl bg-[#f2f3ff] border border-[#eaedff] shadow-xs self-start lg:self-center">
              <div className="relative">
                <img
                  src={event.hostAvatar}
                  alt={event.hostName}
                  className="w-12 h-12 rounded-full object-cover shadow-sm ring-2 ring-white"
                />
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#00687a] text-white flex items-center justify-center text-[10px]">
                  <span className="material-symbols-outlined text-[10px]">check</span>
                </span>
              </div>
              <div className="min-w-0 pr-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#777587]">
                  Event Host
                </p>
                <p className="text-sm font-bold text-[#131b2e] leading-tight">
                  {event.hostName}
                </p>
                <p className="text-xs text-[#3525cd] truncate font-semibold">
                  {event.hostTitle}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Two-Column Workspace Split (7 cols Form, 5 cols Pass Card) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Booking & Badge Customization Form (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Attendee Info */}
            <div className="rounded-2xl bg-white p-4 sm:p-6 shadow-sm border border-[#c7c4d8]/40 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#eaedff]">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#e2dfff] text-[#3323cc] text-xs flex items-center justify-center font-bold">
                    1
                  </span>
                  <h2 className="text-base font-bold text-[#131b2e]">Attendee Credentials</h2>
                </div>
                <button
                  type="button"
                  onClick={handleAutofillLinkedIn}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eaedff] text-[#3525cd] text-xs font-bold hover:bg-[#e2dfff] transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">sync</span>
                  <span className="hidden xs:inline">Autofill from</span> LinkedIn
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#464555]">
                    Full Legal &amp; Display Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={attendee.name}
                      onChange={(e) => onUpdateAttendee({ name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#f2f3ff] text-xs font-semibold text-[#131b2e] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30 border border-[#c7c4d8]/40"
                    />
                    <span className="material-symbols-outlined absolute right-3 top-2.5 text-[18px] text-[#00687a]">
                      check_circle
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#464555]">
                    Work Email (Ticket Sent Here)
                  </label>
                  <input
                    type="email"
                    value={attendee.email}
                    onChange={(e) => onUpdateAttendee({ email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#f2f3ff] text-xs font-semibold text-[#131b2e] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30 border border-[#c7c4d8]/40"
                  />
                </div>

                <div className="md:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-[#464555]">
                    LinkedIn Professional Headline
                  </label>
                  <input
                    type="text"
                    value={attendee.headline}
                    onChange={(e) => onUpdateAttendee({ headline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#f2f3ff] text-xs font-semibold text-[#131b2e] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30 border border-[#c7c4d8]/40"
                  />
                  <p className="text-[11px] text-[#777587]">
                    This will appear directly under your photo on the physical badge &amp; digital pass.
                  </p>
                </div>

                <div className="md:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-[#464555]">LinkedIn Profile URL</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-xs text-[#777587] font-mono hidden sm:inline">
                      linkedin.com/in/
                    </span>
                    <input
                      type="text"
                      value={attendee.linkedinUrl}
                      onChange={(e) => onUpdateAttendee({ linkedinUrl: e.target.value })}
                      placeholder="username or URL"
                      className="w-full pl-3.5 sm:pl-32 pr-3.5 py-2.5 rounded-lg bg-[#f2f3ff] text-xs font-mono text-[#131b2e] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30 border border-[#c7c4d8]/40"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Custom Badge Photo Upload */}
            <div className="rounded-2xl bg-white p-4 sm:p-6 shadow-sm border border-[#c7c4d8]/40 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#eaedff]">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#e2dfff] text-[#3323cc] text-xs flex items-center justify-center font-bold">
                    2
                  </span>
                  <h2 className="text-base font-bold text-[#131b2e]">On-Site Smart Badge Photo</h2>
                </div>
                <span className="px-2.5 py-0.5 rounded-md bg-[#f2f3ff] text-[#464555] text-xs font-semibold">
                  RFID &amp; Face-Kiosk Ready
                </span>
              </div>
              <p className="text-xs text-[#464555]">
                Upload a clear high-res portrait for instant terminal badge printing at Javits Center kiosks and attendee discovery.
              </p>

              <div className="p-4 rounded-xl bg-[#f2f3ff] flex flex-col sm:flex-row items-center gap-4 border border-[#eaedff]">
                <div className="relative shrink-0">
                  <div className="w-24 h-24 rounded-xl overflow-hidden shadow-sm bg-white ring-2 ring-[#c7c4d8]/50">
                    <img
                      src={attendee.avatarUrl}
                      alt={attendee.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <label className="absolute -bottom-2 -right-2 p-2 rounded-full bg-[#3525cd] hover:bg-[#4f46e5] text-white shadow-md cursor-pointer transition-colors">
                    <span className="material-symbols-outlined text-[15px]">photo_camera</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoUpload}
                    />
                  </label>
                </div>

                <div className="space-y-2 flex-1 text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <button
                      type="button"
                      onClick={() => onShowToast('Portrait auto-centered for kiosk print!')}
                      className="px-3.5 py-1.5 rounded-lg bg-[#3525cd] hover:bg-[#4f46e5] text-white text-xs font-bold transition-all flex items-center gap-1 shadow-xs cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">crop</span>
                      Adjust &amp; Center
                    </button>
                    <label className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-[#eaedff] text-[#131b2e] text-xs font-bold transition-all flex items-center gap-1 shadow-xs border border-[#c7c4d8]/40 cursor-pointer">
                      <span className="material-symbols-outlined text-[16px]">sync_alt</span>
                      <span>Re-upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handlePhotoUpload}
                      />
                    </label>
                  </div>
                  <p className="text-[11px] text-[#464555] flex items-center justify-center sm:justify-start gap-1">
                    <span className="material-symbols-outlined text-[#00687a] text-[14px]">
                      done_all
                    </span>
                    Synced automatically from LinkedIn profile avatar • 1080x1080 PNG
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3: Ticket Type Selection */}
            <div className="rounded-2xl bg-white p-4 sm:p-6 shadow-sm border border-[#c7c4d8]/40 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#eaedff]">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#e2dfff] text-[#3323cc] text-xs flex items-center justify-center font-bold">
                    3
                  </span>
                  <h2 className="text-base font-bold text-[#131b2e]">Choose Admission Tier</h2>
                </div>
                <span className="text-xs text-[#00687a] font-bold">100% Tax Deductible</span>
              </div>

              <div className="space-y-3">
                {TICKET_TIERS.map((tier) => {
                  const isSelected = attendee.tierId === tier.id;
                  return (
                    <label
                      key={tier.id}
                      onClick={() => onUpdateAttendee({ tierId: tier.id })}
                      className={`flex items-start justify-between p-3.5 sm:p-4 rounded-xl cursor-pointer transition-all relative overflow-hidden ${
                        isSelected
                          ? 'bg-[#e2dfff]/30 border-2 border-[#3525cd] shadow-xs'
                          : 'bg-[#f2f3ff] hover:bg-[#eaedff] border border-[#c7c4d8]/40'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-[#3525cd]"></div>
                      )}
                      <div className="flex items-start gap-2.5 sm:gap-3 pl-1">
                        <input
                          type="radio"
                          name="ticket-tier"
                          checked={isSelected}
                          onChange={() => onUpdateAttendee({ tierId: tier.id })}
                          className="mt-1 h-4 w-4 text-[#3525cd] focus:ring-[#3525cd]"
                        />
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p
                              className={`text-xs sm:text-sm font-bold ${
                                isSelected ? 'text-[#3525cd]' : 'text-[#131b2e]'
                              }`}
                            >
                              {tier.name}
                            </p>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                isSelected
                                  ? 'bg-[#3525cd] text-white'
                                  : 'bg-[#eaedff] text-[#464555]'
                              }`}
                            >
                              {tier.badge}
                            </span>
                          </div>
                          <p className="text-xs text-[#464555] leading-relaxed">
                            {tier.description}
                          </p>

                          {tier.features && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {tier.features.map((feat, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-0.5 rounded bg-white text-[10px] sm:text-[11px] font-semibold text-[#3525cd] border border-[#c7c4d8]/30"
                                >
                                  {feat}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="text-right shrink-0 pl-2 sm:pl-3">
                        <span
                          className={`text-base sm:text-lg font-black ${
                            isSelected ? 'text-[#3525cd]' : 'text-[#131b2e]'
                          }`}
                        >
                          ${tier.price}
                        </span>
                        <p className="text-[10px] text-[#777587]">USD</p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Networking & Matchmaking Match tags */}
            <div className="rounded-2xl bg-white p-4 sm:p-6 shadow-sm border border-[#c7c4d8]/40 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-[#eaedff]">
                <span className="w-6 h-6 rounded-full bg-[#e2dfff] text-[#3323cc] text-xs flex items-center justify-center font-bold">
                  4
                </span>
                <h2 className="text-base font-bold text-[#131b2e]">
                  Networking &amp; Matchmaking Match tags
                </h2>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold text-[#464555]">
                  Select 3-5 interests to match with peer founders in the hall:
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    '#GenAI',
                    '#StartupFounders',
                    '#TechNetworking',
                    '#AgenticWorkflows',
                    '#SeriesAFunding',
                    '#B2BSaaS',
                  ].map((tag) => {
                    const isChecked = attendee.tags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleToggleTag(tag)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                          isChecked
                            ? 'bg-[#3525cd] text-white shadow-xs'
                            : 'bg-[#f2f3ff] text-[#464555] hover:bg-[#e2dfff] hover:text-[#3525cd]'
                        }`}
                      >
                        <span>{tag}</span>
                        <span className="material-symbols-outlined text-[14px]">
                          {isChecked ? 'check' : 'add'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-3 p-3.5 rounded-xl bg-[#f2f3ff] border border-[#eaedff] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={attendee.publicDirectory}
                    onChange={(e) => onUpdateAttendee({ publicDirectory: e.target.checked })}
                    className="h-4 w-4 rounded text-[#3525cd] focus:ring-[#3525cd]"
                  />
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-[#131b2e] block">
                      Show my profile in the public attendee networking directory
                    </span>
                    <span className="text-[11px] text-[#464555] block">
                      Allows verified attendees &amp; speakers to send 1-click LinkedIn connection invites during the summit.
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Primary CTA Trigger */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => onShowBookingSuccess(selectedTier)}
                className="w-full py-3.5 sm:py-4 px-4 sm:px-6 rounded-2xl bg-[#3525cd] hover:bg-[#4f46e5] text-white text-sm sm:text-base font-bold shadow-xl shadow-[#3525cd]/30 transition-all flex items-center justify-center gap-2 transform active:scale-99 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px] sm:text-[24px]">qr_code_scanner</span>
                <span>Complete Booking &amp; Generate QR Pass (${selectedTier.price})</span>
              </button>
              <p className="text-center text-xs text-[#464555] flex items-center justify-center gap-1.5 flex-wrap">
                <span className="material-symbols-outlined text-[16px] text-[#00687a]">security</span>
                <span>Encrypted 256-bit checkout • Instant Apple &amp; Google Wallet Pass sync</span>
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: Live Digital Event Pass & QR Code Ticket (5 Cols - Sticky) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-20">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00687a] animate-pulse"></span>
                <span className="text-xs font-extrabold text-[#131b2e] uppercase tracking-wider">
                  Live Pass Preview
                </span>
              </div>
              <span className="text-xs text-[#464555] font-mono font-bold">
                {attendee.passNumber}
              </span>
            </div>

            {/* Ultra-Modern VIP Event Pass Card */}
            <div className="relative w-full rounded-2xl overflow-hidden bg-[#283044] text-[#eef0ff] shadow-2xl border border-white/10">
              {/* Top Holographic Gradient Bar */}
              <div className="h-2.5 w-full bg-gradient-to-r from-[#e2dfff] via-[#57dffe] to-[#4f46e5]"></div>

              {/* Decorative Background Accents */}
              <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-[#3525cd]/25 blur-3xl pointer-events-none"></div>
              <div className="absolute -left-16 -bottom-16 w-56 h-56 rounded-full bg-[#00687a]/25 blur-3xl pointer-events-none"></div>

              {/* Ticket Header Area */}
              <div className="p-6 pb-4 border-b border-white/10 relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg overflow-hidden bg-[#3525cd] p-1 shadow-sm flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-[18px]">bolt</span>
                    </div>
                    <div>
                      <span className="text-sm font-black tracking-tight text-white">LinkVibe</span>
                      <span className="text-xs text-[#acedff] ml-1.5 font-mono font-bold">
                        EVENT PASS
                      </span>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#885500] to-[#4f46e5] text-white text-[11px] font-extrabold tracking-wider uppercase shadow-md">
                    {selectedTier.badgeCode}
                  </span>
                </div>

                <h3 className="text-xl font-black text-white leading-snug">
                  GenAI Founders Summit
                </h3>
                <p className="text-xs text-[#dae2fd] mt-0.5">
                  From MVP to $10M ARR • New York City
                </p>
              </div>

              {/* Attendee Profile Identification Strip */}
              <div className="p-6 py-4 bg-white/5 relative z-10 flex items-center gap-4">
                <div className="relative shrink-0">
                  <div className="w-16 h-16 rounded-xl overflow-hidden ring-2 ring-[#4f46e5] shadow-md bg-[#f2f3ff]">
                    <img
                      src={attendee.avatarUrl}
                      alt={attendee.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#00687a] text-white flex items-center justify-center">
                    <span className="material-symbols-outlined text-[12px]">verified</span>
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-extrabold text-white truncate">
                      {attendee.name || 'Alex Chen'}
                    </h4>
                    <span className="px-2 py-0.5 rounded bg-[#e2dfff]/20 text-[#acedff] text-[10px] font-mono font-bold">
                      DELEGATE
                    </span>
                  </div>
                  <p className="text-xs text-[#dae2fd] truncate">
                    {attendee.headline || 'Founding AI Engineer'}
                  </p>
                  <div className="flex items-center gap-3 text-[11px] text-[#d2d9f4] font-mono mt-1">
                    <span>SEAT: {attendee.seat}</span>
                    <span>•</span>
                    <span>ZONE: {attendee.zone}</span>
                  </div>
                </div>
              </div>

              {/* Perforated Tear-line Visual Separator */}
              <div className="relative flex items-center justify-between px-4 py-1">
                <div className="w-6 h-6 rounded-full bg-[#faf8ff] -ml-6 shadow-inner"></div>
                <div className="w-full border-t-2 border-dashed border-[#c7c4d8]/40 mx-2"></div>
                <div className="w-6 h-6 rounded-full bg-[#faf8ff] -mr-6 shadow-inner"></div>
              </div>

              {/* Scannable Dynamic QR Code Section */}
              <div className="p-6 pt-3 relative z-10 flex flex-col items-center text-center space-y-4">
                {/* Realistically Styled QR Code Card */}
                <div className="relative p-3.5 bg-white rounded-xl shadow-2xl">
                  {/* Stylized Vector QR Code with center LinkVibe sensors icon */}
                  <svg className="w-44 h-44 text-[#131b2e]" fill="currentColor" viewBox="0 0 200 200">
                    {/* Outer Corner Markers */}
                    <rect x="15" y="15" width="50" height="50" rx="6" stroke="currentColor" strokeWidth="10" fill="none" />
                    <rect x="29" y="29" width="22" height="22" rx="3" />
                    <rect x="135" y="15" width="50" height="50" rx="6" stroke="currentColor" strokeWidth="10" fill="none" />
                    <rect x="149" y="29" width="22" height="22" rx="3" />
                    <rect x="15" y="135" width="50" height="50" rx="6" stroke="currentColor" strokeWidth="10" fill="none" />
                    <rect x="29" y="149" width="22" height="22" rx="3" />

                    {/* Data Nodes Matrix */}
                    <rect x="75" y="20" width="12" height="12" />
                    <rect x="95" y="20" width="12" height="12" />
                    <rect x="115" y="20" width="12" height="12" />
                    <rect x="75" y="40" width="12" height="12" />
                    <rect x="115" y="40" width="12" height="12" />
                    <rect x="75" y="60" width="12" height="12" />
                    <rect x="95" y="60" width="12" height="12" />

                    {/* Middle Row Matrix Elements */}
                    <rect x="20" y="75" width="12" height="12" />
                    <rect x="40" y="75" width="12" height="12" />
                    <rect x="140" y="75" width="12" height="12" />
                    <rect x="165" y="75" width="12" height="12" />
                    <rect x="20" y="95" width="12" height="12" />
                    <rect x="55" y="95" width="12" height="12" />
                    <rect x="140" y="95" width="12" height="12" />
                    <rect x="170" y="95" width="12" height="12" />
                    <rect x="35" y="115" width="12" height="12" />
                    <rect x="150" y="115" width="12" height="12" />

                    {/* Lower Data Blocks */}
                    <rect x="75" y="135" width="12" height="12" />
                    <rect x="95" y="135" width="12" height="12" />
                    <rect x="115" y="135" width="12" height="12" />
                    <rect x="135" y="135" width="12" height="12" />
                    <rect x="160" y="135" width="12" height="12" />
                    <rect x="75" y="155" width="12" height="12" />
                    <rect x="115" y="155" width="12" height="12" />
                    <rect x="145" y="155" width="12" height="12" />
                    <rect x="75" y="175" width="12" height="12" />
                    <rect x="95" y="175" width="12" height="12" />
                    <rect x="135" y="175" width="12" height="12" />
                    <rect x="165" y="175" width="12" height="12" />

                    {/* Center Logo Punchout */}
                    <circle cx="100" cy="100" r="22" fill="#ffffff" />
                    <circle cx="100" cy="100" r="16" fill="#3525cd" />
                  </svg>

                  {/* Center Logo Marker */}
                  <span className="absolute inset-0 flex items-center justify-center pointer-events-none text-white">
                    <span className="material-symbols-outlined text-[16px]">sensors</span>
                  </span>
                </div>

                {/* Pass Security Verification Strip */}
                <div className="space-y-1 w-full">
                  <div className="flex items-center justify-between text-[#d2d9f4] font-mono text-[11px] px-2">
                    <span>GATE: {attendee.gate}</span>
                    <span>CRYPT-SIG: {attendee.cryptoSig}</span>
                    <span>VERIFIED NFC</span>
                  </div>
                  <p className="text-xs text-[#eef0ff]/80">
                    Hold phone near kiosk scanner or show QR to registration desk staff.
                  </p>
                </div>
              </div>

              {/* Bottom Venue & Timestamp Footing */}
              <div className="px-6 py-3 bg-white/10 border-t border-white/10 flex items-center justify-between text-white text-xs">
                <span className="flex items-center gap-1 font-semibold">
                  <span className="material-symbols-outlined text-[16px] text-[#57dffe]">pin_drop</span>
                  Javits Center, Hall E
                </span>
                <span className="font-mono text-xs text-[#d2d9f4]">6:30 PM EST</span>
              </div>
            </div>

            {/* Quick Pass Management Bento */}
            <div className="rounded-2xl bg-white p-5 shadow-sm border border-[#c7c4d8]/40 space-y-4">
              <p className="text-xs font-bold text-[#777587] uppercase tracking-wider">
                Quick Pass Management
              </p>

              {/* 1-Click Wallet Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => onShowToast('Added VIP Pass to Apple Wallet!')}
                  className="py-2.5 px-3 rounded-xl bg-[#131b2e] hover:bg-black text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">wallet</span>
                  Apple Wallet
                </button>
                <button
                  type="button"
                  onClick={() => onShowToast('Added VIP Pass to Google Wallet!')}
                  className="py-2.5 px-3 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-[#131b2e] text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm border border-[#c7c4d8]/40 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    account_balance_wallet
                  </span>
                  Google Wallet
                </button>
              </div>

              {/* Calendar & PDF Export Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-[#eaedff] text-[#464555]">
                <button
                  type="button"
                  onClick={handleDownloadPDF}
                  className="flex items-center gap-1.5 text-xs font-semibold hover:text-[#3525cd] transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">download</span>
                  Download PDF Ticket
                </button>
                <button
                  type="button"
                  onClick={handleAddToCalendar}
                  className="flex items-center gap-1.5 text-xs font-semibold hover:text-[#3525cd] transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">event</span>
                  Add to Calendar (.ics)
                </button>
              </div>

              {/* Viral LinkedIn Attendee Announcement */}
              <div className="p-3.5 rounded-xl bg-[#f2f3ff] border border-[#eaedff] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#3525cd] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">share</span>
                    Viral LinkedIn Attendee Announcement
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white text-[#00687a] text-[10px] font-bold border border-[#c7c4d8]/30">
                    +180 Reach
                  </span>
                </div>
                <p className="text-xs text-[#131b2e] italic line-clamp-2">
                  "Excited to join {event.hostName} &amp; 300+ founders at GenAI Founders Summit NYC this Thursday! Who else from my network will be there? Let's connect..."
                </p>
                <button
                  type="button"
                  onClick={handlePostAttending}
                  className="w-full py-2.5 rounded-lg bg-[#4f46e5] hover:bg-[#3525cd] text-white text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Post "I'm Attending" to LinkedIn</span>
                  <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Venue & Entry Logistics Section */}
        <div className="rounded-2xl bg-white p-4 sm:p-6 shadow-sm border border-[#c7c4d8]/40 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-[#131b2e]">Venue &amp; Entry Logistics</h2>
              <p className="text-xs text-[#464555]">
                Javits Center • Hall E entrance on 11th Ave • Dedicated LinkVibe VIP check-in turnstiles
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-[#acedff] text-[#004e5c] text-xs font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">near_me</span>
                Transit Verified
              </span>
              <a
                href="https://maps.google.com/?q=Javits+Center+NYC"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 rounded-lg bg-[#f2f3ff] hover:bg-[#eaedff] text-[#131b2e] text-xs font-bold transition-colors flex items-center gap-1 border border-[#c7c4d8]/40"
              >
                <span>Open in Google Maps</span>
                <span className="material-symbols-outlined text-[14px]">launch</span>
              </a>
            </div>
          </div>

          {/* Static Map Container with Verified NYC Location & Active Ping */}
          <div
            className="w-full h-48 sm:h-64 rounded-xl overflow-hidden shadow-inner relative bg-cover bg-center border border-[#c7c4d8]/40"
            style={{ backgroundImage: `url('${ASSETS.mapImage}')` }}
          >
            <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-white/95 backdrop-blur-md px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl shadow-lg flex items-center gap-2 text-[#131b2e] border border-[#c7c4d8]/40 max-w-[90%]">
              <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3525cd] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-[#3525cd]"></span>
              </span>
              <span className="text-[11px] sm:text-xs font-bold truncate">Registration Gate A • 11th Ave &amp; 36th St</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
