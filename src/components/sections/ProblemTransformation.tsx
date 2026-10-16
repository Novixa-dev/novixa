'use client';

import React, { useRef, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';

export const ProblemTransformation: React.FC = () => {
  const { t } = useLanguage();

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Strict DOM-level property assignment required by WebKit/Chromium for autoplay
    video.muted = true;
    video.defaultMuted = true;

    const playVideo = async () => {
      try {
        video.muted = true;
        await video.play();
      } catch {
        // Will retry on intersection
      }
    };

    playVideo();

    // Start playing as soon as user scrolls this section into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.muted = true;
            video.play().catch(() => {});
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-white border-y border-slate-200/80 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 architectural-grid opacity-10 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <h2 className="text-2xl sm:text-4xl lg:text-4xl font-extrabold font-display text-slate-900 tracking-tight leading-snug">
            {t('تحول نموذج العمل والعمليات البرمجية', 'Operational Transformation & Unified Systems')}
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-arabic max-w-2xl mx-auto">
            {t(
              'الاعتماد على الواتساب والإكسل والبرامج المعزولة يلتهم وقت فريقك ويتسبب في ضياع الأرباح. شاهد أدناه محاكاة فيديو لمنظومة نوڤيكسا البرمجية الموحدة وكيف تتدفق العمليات تلقائياً في أقل من ثانية واحدة دون أي تدخل بشري.',
              'Relying on fragmented chats, manual spreadsheets, and disconnected tools drains your team\'s focus. Watch below how Novixa\'s unified engine synchronizes business operations in real-time with sub-second latency.'
            )}
          </p>
        </div>

        {/* Video Player */}
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden border border-slate-800/80 bg-[#060D1A] shadow-2xl">
            <video
              ref={videoRef}
              src="https://assets.mixkit.co/videos/23282/23282-720.mp4"
              poster="/videos/datacenter-blue-poster.jpg"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              onClick={togglePlay}
              className="w-full h-auto aspect-video object-cover cursor-pointer"
            >
              <source src="https://assets.mixkit.co/videos/23282/23282-720.mp4" type="video/mp4" />
              <source src="/videos/unified-engine.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

      </div>
    </section>
  );
};
