import React from 'react';
import { EventInfo } from '../types';

interface AnalyticsViewProps {
  event: EventInfo;
  onShowToast: (msg: string) => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  event,
  onShowToast,
}) => {
  const metrics = [
    {
      label: 'LinkedIn Reach Velocity',
      value: '142,850',
      change: '+28.4%',
      changePositive: true,
      subtext: 'across 4 creator post broadcasts',
      icon: 'trending_up',
      color: '#3525cd',
    },
    {
      label: 'Confirmed Bookings',
      value: `${event.registeredCount}`,
      change: '+42 today',
      changePositive: true,
      subtext: '85.5% of Javits Hall E capacity',
      icon: 'confirmation_number',
      color: '#00687a',
    },
    {
      label: 'Click-to-RSVP Conversion',
      value: '18.4%',
      change: '+3.2%',
      changePositive: true,
      subtext: 'vs 5.1% LinkedIn event average',
      icon: 'insights',
      color: '#885500',
    },
    {
      label: 'VIP Ticket Gross Volume',
      value: '$17,582',
      change: '14 seats left',
      changePositive: false,
      subtext: 'Tier 1 VIP closing in 8 hours',
      icon: 'payments',
      color: '#3323cc',
    },
  ];

  const dailyVelocity = [
    { day: 'Mon', count: 28, height: '40%' },
    { day: 'Tue', count: 45, height: '62%' },
    { day: 'Wed', count: 62, height: '80%' },
    { day: 'Thu', count: 88, height: '95%' },
    { day: 'Fri', count: 54, height: '70%' },
    { day: 'Sat', count: 32, height: '45%' },
    { day: 'Sun', count: 33, height: '48%' },
  ];

  return (
    <div className="w-full">
      {/* Sub-bar */}
      <div className="w-full bg-[#f2f3ff] px-4 lg:px-8 py-3 flex items-center justify-between border-b border-[#c7c4d8]/40">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00687a] animate-pulse"></span>
          <span className="text-xs font-bold text-[#131b2e]">
            Live Event Intelligence &amp; RSVP Funnel Analytics
          </span>
          <span className="text-[#777587] text-xs">·</span>
          <span className="text-xs text-[#464555]">Updated 1m ago</span>
        </div>
        <button
          onClick={() => onShowToast('Exported complete attendee report (CSV)!')}
          className="px-3 py-1 rounded-lg bg-white border border-[#c7c4d8]/60 hover:bg-[#eaedff] text-xs font-bold text-[#3525cd] flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[15px]">download</span>
          Export Full Report
        </button>
      </div>

      <div className="w-full px-4 lg:px-8 py-6 space-y-6 max-w-7xl mx-auto">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-[#131b2e] tracking-tight">
            Event Growth &amp; Audience Telemetry
          </h1>
          <p className="text-sm text-[#464555] mt-1">
            Real-time synchronization with LinkedIn Event API, Luma webhooks, and on-site RFID kiosk counters.
          </p>
        </div>

        {/* 4 Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-[#c7c4d8]/40 shadow-xs space-y-2 hover:border-[#3525cd]/40 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#777587]">{m.label}</span>
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={{ color: m.color }}
                >
                  {m.icon}
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-[#131b2e] font-['Plus_Jakarta_Sans']">
                  {m.value}
                </span>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    m.changePositive
                      ? 'bg-[#acedff]/60 text-[#004e5c]'
                      : 'bg-[#ffdad6] text-[#ba1a1a]'
                  }`}
                >
                  {m.change}
                </span>
              </div>
              <p className="text-[11px] text-[#464555]">{m.subtext}</p>
            </div>
          ))}
        </div>

        {/* Two Column Visual Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Daily Velocity Chart (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl bg-white p-6 shadow-sm border border-[#c7c4d8]/40 space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-[#eaedff]">
              <div>
                <h3 className="text-base font-bold text-[#131b2e]">Daily RSVP Velocity</h3>
                <p className="text-xs text-[#777587]">Registrations logged per 24h cycle</p>
              </div>
              <span className="text-xs font-bold text-[#3525cd] bg-[#e2dfff] px-3 py-1 rounded-full">
                Peak: Thursday (+88)
              </span>
            </div>

            {/* Bar Visualizer */}
            <div className="h-56 flex items-end justify-between gap-3 pt-6 px-2">
              {dailyVelocity.map((item) => (
                <div key={item.day} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="text-[11px] font-mono font-bold text-[#777587] group-hover:text-[#3525cd]">
                    {item.count}
                  </div>
                  <div
                    className="w-full bg-[#e2dfff] group-hover:bg-[#3525cd] rounded-t-lg transition-all"
                    style={{ height: item.height }}
                  ></div>
                  <span className="text-xs font-semibold text-[#464555]">{item.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Attendee Role & Demographic Breakdown (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl bg-white p-6 shadow-sm border border-[#c7c4d8]/40 space-y-4">
            <div className="pb-2 border-b border-[#eaedff]">
              <h3 className="text-base font-bold text-[#131b2e]">Attendee Demographics</h3>
              <p className="text-xs text-[#777587]">Verified LinkedIn seniority &amp; roles</p>
            </div>

            <div className="space-y-3 pt-1">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Founders &amp; CEOs (Seed to Series B)</span>
                  <span className="font-bold text-[#3525cd]">42%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-[#f2f3ff] overflow-hidden">
                  <div className="h-full bg-[#3525cd] rounded-full" style={{ width: '42%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Staff / Principal AI Engineers</span>
                  <span className="font-bold text-[#00687a]">31%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-[#f2f3ff] overflow-hidden">
                  <div className="h-full bg-[#00687a] rounded-full" style={{ width: '31%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Venture Capital &amp; Angel Investors</span>
                  <span className="font-bold text-[#885500]">18%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-[#f2f3ff] overflow-hidden">
                  <div className="h-full bg-[#885500] rounded-full" style={{ width: '18%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Growth &amp; Enterprise GTM Leaders</span>
                  <span className="font-bold text-[#777587]">9%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-[#f2f3ff] overflow-hidden">
                  <div className="h-full bg-[#777587] rounded-full" style={{ width: '9%' }}></div>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#f2f3ff] border border-[#eaedff] flex items-center justify-between text-xs font-semibold text-[#131b2e]">
              <span>Audience Match Score:</span>
              <span className="text-[#00687a] font-bold">96.8% High Intent</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
