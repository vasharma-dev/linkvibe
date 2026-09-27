import React, { useState } from 'react';
import { ASSETS } from '../constants/initialData';
import { EventInfo } from '../types';
import { getLinkedInCreateEventUrl, getLinkedInFeedShareUrl } from '../utils/linkedinShare';

interface PostBuilderViewProps {
  event: EventInfo;
  onBackToStep1: () => void;
  onShowToast: (msg: string) => void;
}

export const PostBuilderView: React.FC<PostBuilderViewProps> = ({
  event,
  onBackToStep1,
  onShowToast,
}) => {
  const [selectedHookAngle, setSelectedHookAngle] = useState<'contrarian' | 'blueprint' | 'exclusive'>('blueprint');
  const [tone, setTone] = useState<'founder' | 'thought-leader' | 'high-energy'>('thought-leader');
  const [published, setPublished] = useState(false);
  const [postContent, setPostContent] = useState(
    `85% of GenAI startups won't make it to $10M ARR.\n\nNot because the models aren't smart enough.\n\nBecause they're building "cool wrappers" instead of defensible workflows.\n\nThis November, we're bringing together 300+ vetted founders, principal AI engineers, and Tier-1 VCs in NYC for one night only:\n\n🔥 GenAI Founders Summit 2025: From MVP to $10M ARR\n\nNo fluffy keynote speeches. Just raw teardowns:\n→ Moving from toy prompt engineering to agentic graph orchestration\n→ Surviving inference unit economics at 100M+ tokens/day\n→ Real enterprise contracts: how 3 seed founders closed Fortune 500 pilots\n\n📅 Thursday, Nov 14, 2025\n📍 Javits Center, NYC\n🎟️ 14 VIP Passes remaining\n\nDrop a comment with "PASS" or grab your ticket via the link below. Let's build what actually lasts.`
  );

  const [likesCount, setLikesCount] = useState(247);
  const [hasLiked, setHasLiked] = useState(false);

  const feedShareUrl = getLinkedInFeedShareUrl(postContent);
  const createEventUrl = getLinkedInCreateEventUrl();

  const hooks = [
    {
      id: 'blueprint',
      title: 'The Defensible Moat Blueprint',
      tag: 'Viral Score 98/100',
      preview: '85% of GenAI startups won\'t make it to $10M ARR... Here is what the top 1% are doing differently.',
    },
    {
      id: 'contrarian',
      title: 'The Brutal Truth About "AI Wrappers"',
      tag: 'Viral Score 94/100',
      preview: 'Stop talking about fine-tuning if you don\'t have unit economics. On Nov 14th in NYC, we\'re pulling back the curtain.',
    },
    {
      id: 'exclusive',
      title: 'High-Status Curated Gathering',
      tag: 'Viral Score 91/100',
      preview: 'NYC Founders & Engineers: 300+ Builders. 1 Night. Real ARR architectures only.',
    },
  ];

  const handleApplyHook = (hookId: 'contrarian' | 'blueprint' | 'exclusive') => {
    setSelectedHookAngle(hookId);
    if (hookId === 'contrarian') {
      setPostContent(
        `Unpopular opinion: 90% of AI product roadmaps are pure vanity.\n\nIf your users churn after the novelty of the chat interface wears off, you don't have a business—you have a demo.\n\nOn November 14th, we're gathering 300+ founders at Javits Center NYC who are proving the naysayers wrong:\n\n🚀 ${event.title}\n\nWe're skipping the panel fluff and doing live architecture audits with founders who crossed $1M -> $10M ARR.\n\n${event.activeHashtags.join(' ')}\n\nGrab your seat before Tier 1 closes.`
      );
    } else if (hookId === 'exclusive') {
      setPostContent(
        `NYC is officially the epicenter of Applied AI.\n\nNext week, ${event.registeredCount}+ top founders, operators, and lead researchers are meeting under one roof for ${event.title}.\n\n✅ 1:1 VC Lounges\n✅ Production Agentic Graph Teardowns\n✅ Curated VIP Founder Dinner\n\nSee you this Thursday, Nov 14 at Javits Center.\n\nRSVP in comments below.`
      );
    } else {
      setPostContent(
        `85% of GenAI startups won't make it to $10M ARR.\n\nNot because the models aren't smart enough.\n\nBecause they're building "cool wrappers" instead of defensible workflows.\n\nThis November, we're bringing together 300+ vetted founders, principal AI engineers, and Tier-1 VCs in NYC for one night only:\n\n🔥 ${event.title}\n\nNo fluffy keynote speeches. Just raw teardowns:\n→ Moving from toy prompt engineering to agentic graph orchestration\n→ Surviving inference unit economics at 100M+ tokens/day\n→ Real enterprise contracts: how 3 seed founders closed Fortune 500 pilots\n\n📅 ${event.startDate} • ${event.startTime}\n📍 ${event.locationName}\n🎟️ 14 VIP Passes remaining\n\n${event.activeHashtags.join(' ')}`
      );
    }
    onShowToast(`Applied "${hookId}" viral hook framework!`);
  };

  const handleCopyPost = () => {
    navigator.clipboard?.writeText(postContent);
    onShowToast('Post copy & hashtags copied to clipboard!');
  };

  const handleSchedulePost = () => {
    navigator.clipboard?.writeText(postContent);
    setPublished(true);
    onShowToast('Post copied to clipboard! Opening LinkedIn feed to publish...');
  };

  return (
    <div className="w-full">
      {/* Top Status Sub-bar */}
      <div className="w-full bg-[#f2f3ff] px-4 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3 border-b border-[#c7c4d8]/40">
        <div className="flex items-center gap-2.5">
          <button
            onClick={onBackToStep1}
            className="flex items-center gap-1 text-xs font-bold text-[#3525cd] hover:underline cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px]">arrow_back</span>
            Back to Step 1 (Event Details)
          </button>
          <span className="text-[#777587] text-xs">·</span>
          <span className="text-xs font-bold text-[#131b2e]">
            Step 2 of 2: Viral Post Builder &amp; AI Hook Engine
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#00687a] bg-[#acedff] px-3 py-1 rounded-full flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px]">trending_up</span>
            Predicted Reach: +42,000 Impressions
          </span>
        </div>
      </div>

      <div className="w-full px-4 lg:px-8 py-6 space-y-6 max-w-7xl mx-auto">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-[#131b2e] tracking-tight">
            Viral Post Builder &amp; AI Hook
          </h1>
          <p className="text-sm text-[#464555] mt-1 max-w-3xl">
            Trained on 10,000+ top-performing LinkedIn event announcements. Select an algorithmic hook, tune your voice, and schedule directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Post Editor & AI Hook Selector (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Hook Selector */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#c7c4d8]/40 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#eaedff]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#3525cd] text-[20px]">psychology</span>
                  <h2 className="text-base font-bold text-[#131b2e]">Select AI Viral Hook Engine</h2>
                </div>
                <span className="text-xs font-semibold text-[#3525cd]">3 Angles Generated</span>
              </div>

              <div className="space-y-3">
                {hooks.map((hook) => {
                  const isSelected = selectedHookAngle === hook.id;
                  return (
                    <div
                      key={hook.id}
                      onClick={() => handleApplyHook(hook.id as any)}
                      className={`p-4 rounded-xl cursor-pointer transition-all border ${
                        isSelected
                          ? 'bg-[#e2dfff]/20 border-[#3525cd] shadow-xs'
                          : 'bg-[#f2f3ff] hover:bg-[#eaedff] border-[#c7c4d8]/40'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-[#131b2e] flex items-center gap-1.5">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              isSelected ? 'bg-[#3525cd]' : 'bg-[#777587]'
                            }`}
                          ></span>
                          {hook.title}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-white text-[#00687a] text-[10px] font-bold border border-[#c7c4d8]/30">
                          {hook.tag}
                        </span>
                      </div>
                      <p className="text-xs text-[#464555] line-clamp-2">{hook.preview}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tone Selector & Editor */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#c7c4d8]/40 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#eaedff]">
                <h2 className="text-base font-bold text-[#131b2e]">Post Content &amp; Formatting</h2>
                <div className="flex items-center gap-1 bg-[#f2f3ff] p-1 rounded-lg border border-[#c7c4d8]/40">
                  <button
                    onClick={() => setTone('thought-leader')}
                    className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer ${
                      tone === 'thought-leader'
                        ? 'bg-white text-[#3525cd] shadow-xs'
                        : 'text-[#464555]'
                    }`}
                  >
                    Thought Leader
                  </button>
                  <button
                    onClick={() => setTone('high-energy')}
                    className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer ${
                      tone === 'high-energy'
                        ? 'bg-white text-[#3525cd] shadow-xs'
                        : 'text-[#464555]'
                    }`}
                  >
                    High Energy
                  </button>
                  <button
                    onClick={() => setTone('founder')}
                    className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer ${
                      tone === 'founder'
                        ? 'bg-white text-[#3525cd] shadow-xs'
                        : 'text-[#464555]'
                    }`}
                  >
                    Raw Founder
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <textarea
                  rows={14}
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  className="w-full p-4 rounded-xl bg-[#f2f3ff] text-xs font-mono text-[#131b2e] leading-relaxed focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30 border border-[#c7c4d8]/40 resize-y"
                ></textarea>
                <div className="flex items-center justify-between text-[11px] text-[#777587] pt-1">
                  <span>Formatting: UTF-8 Unicode Bold &amp; Arrows enabled</span>
                  <span>{postContent.length} characters • 2.5 min read</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleCopyPost}
                  className="px-4 py-2 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-xs font-bold text-[#131b2e] border border-[#c7c4d8]/40 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#3525cd]">
                    content_copy
                  </span>
                  Copy Text
                </button>

                <a
                  href={feedShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleSchedulePost}
                  className="px-5 py-2 rounded-xl bg-[#0a66c2] hover:bg-[#004182] text-white text-xs font-bold shadow-md shadow-[#0a66c2]/25 flex items-center gap-2 transition-all cursor-pointer transform active:scale-98"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.68 1.68 0 1 0 0-3.36 1.68 1.68 0 0 0 0 3.36m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                  </svg>
                  <span>Publish to LinkedIn Now</span>
                  <span className="material-symbols-outlined text-[15px]">open_in_new</span>
                </a>

                <a
                  href={createEventUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-xs font-bold text-[#464555] hover:text-[#131b2e] border border-[#c7c4d8]/40 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#00687a]">
                    event
                  </span>
                  Create LinkedIn Event Page
                </a>

                {published && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#e6f4ea] text-[#137333] text-xs font-bold animate-in fade-in duration-300">
                    <span className="material-symbols-outlined text-[15px]">check_circle</span>
                    Published to LinkedIn!
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: 1:1 LinkedIn Live Post Simulator (5 cols) */}
          <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-20">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-extrabold text-[#131b2e] uppercase tracking-wider">
                1:1 LinkedIn Feed Simulator
              </span>
              <span className="text-xs text-[#00687a] font-semibold">Feed Algorithm Checked</span>
            </div>

            {/* LinkedIn Post Card */}
            <div className="rounded-2xl bg-white shadow-xl border border-[#c7c4d8]/40 p-5 space-y-3">
              {/* Creator Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={event.hostAvatar}
                    alt={event.hostName}
                    className="w-12 h-12 rounded-full object-cover ring-1 ring-[#c7c4d8]/40"
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-bold text-[#131b2e] hover:underline cursor-pointer">
                        {event.hostName}
                      </span>
                      <span className="text-xs text-[#777587]">· 1st</span>
                    </div>
                    <p className="text-[11px] text-[#464555] line-clamp-1">
                      Founder &amp; Host @ LinkVibe • Top Voice • 142k followers
                    </p>
                    <p className="text-[10px] text-[#777587] flex items-center gap-1">
                      <span>2h • Edited</span>
                      <span>·</span>
                      <span className="material-symbols-outlined text-[12px]">public</span>
                    </p>
                  </div>
                </div>

                <button className="text-[#777587] hover:text-[#131b2e] cursor-pointer">
                  <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                </button>
              </div>

              {/* Post Body */}
              <div className="text-xs text-[#131b2e] whitespace-pre-line leading-relaxed">
                {postContent}
              </div>

              {/* Event Card Attachment Preview */}
              <div className="rounded-xl overflow-hidden border border-[#c7c4d8]/40 bg-[#f2f3ff] mt-2">
                <div className="h-28 bg-gradient-to-r from-[#3525cd] to-[#00687a] p-3 text-white flex flex-col justify-between">
                  <span className="px-2 py-0.5 rounded bg-white/20 text-[10px] font-bold uppercase tracking-wider w-fit">
                    LinkedIn Event
                  </span>
                  <div>
                    <p className="text-xs font-black drop-shadow-sm">{event.title}</p>
                    <p className="text-[10px] text-[#dae2fd]">
                      {event.startDate} • {event.locationName}
                    </p>
                  </div>
                </div>
                <div className="p-3 bg-white flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-[#131b2e]">linkedin.com/events</p>
                    <p className="text-[11px] text-[#777587]">{event.registeredCount} already registered</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={feedShareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleSchedulePost}
                      className="px-3 py-1.5 rounded-lg bg-[#0a66c2] hover:bg-[#004182] text-white text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.68 1.68 0 1 0 0-3.36 1.68 1.68 0 0 0 0 3.36m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                      </svg>
                      <span>Share</span>
                    </a>
                    <button
                      onClick={() => onShowToast('Simulating RSVP Click -> Opened Checkout!')}
                      className="px-3.5 py-1.5 rounded-lg bg-[#3525cd] hover:bg-[#4f46e5] text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      Register
                    </button>
                  </div>
                </div>
              </div>

              {/* Social Metrics */}
              <div className="flex items-center justify-between text-[11px] text-[#777587] pt-2 border-t border-[#eaedff]">
                <div className="flex items-center gap-1">
                  <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#3525cd] text-white text-[9px]">
                    👍
                  </span>
                  <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#ba1a1a] text-white text-[9px]">
                    ❤️
                  </span>
                  <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#00687a] text-white text-[9px]">
                    💡
                  </span>
                  <span className="ml-1 font-semibold">{likesCount}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>48 comments</span>
                  <span>19 reposts</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-4 gap-1 pt-1 border-t border-[#eaedff] text-xs font-semibold text-[#464555]">
                <button
                  type="button"
                  onClick={() => {
                    setHasLiked(!hasLiked);
                    setLikesCount(hasLiked ? likesCount - 1 : likesCount + 1);
                  }}
                  className={`py-2 rounded-lg flex items-center justify-center gap-1 hover:bg-[#f2f3ff] transition-colors cursor-pointer ${
                    hasLiked ? 'text-[#3525cd] font-bold' : ''
                  }`}
                >
                  <span className="material-symbols-outlined text-[17px]">thumb_up</span>
                  <span>{hasLiked ? 'Liked' : 'Like'}</span>
                </button>
                <button
                  type="button"
                  className="py-2 rounded-lg flex items-center justify-center gap-1 hover:bg-[#f2f3ff] transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[17px]">comment</span>
                  <span>Comment</span>
                </button>
                <button
                  type="button"
                  className="py-2 rounded-lg flex items-center justify-center gap-1 hover:bg-[#f2f3ff] transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[17px]">repeat</span>
                  <span>Repost</span>
                </button>
                <button
                  type="button"
                  onClick={handleCopyPost}
                  className="py-2 rounded-lg flex items-center justify-center gap-1 hover:bg-[#f2f3ff] transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[17px]">send</span>
                  <span>Send</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
