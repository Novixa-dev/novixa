'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Workflow,
  CheckCircle,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Zap,
} from 'lucide-react';

export const ProblemTransformation: React.FC = () => {
  const { t } = useLanguage();

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if (video.requestFullscreen) {
      video.requestFullscreen();
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold shadow-sm">
            <Workflow className="w-3.5 h-3.5 text-cyan-600" />
            <span>{t('تحول نموذج العمل والعمليات', 'Operational Transformation')}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display text-slate-900 tracking-tight leading-snug">
            {t('الأعمال لا تحتاج مزيدًا من الأدوات المتفرقة.', 'Businesses don\'t need more disconnected tools.')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-blue-700">
              {t('تحتاج نظاماً واحداً مترابطاً يعمل بدقة.', 'They need one unified engine that works seamlessly.')}
            </span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-arabic max-w-2xl mx-auto">
            {t(
              'الاعتماد على الواتساب والإكسل والبرامج المعزولة يلتهم وقت فريقك ويتسبب في ضياع الأرباح. شاهد أدناه محاكاة فيديو لمنظومة نوڤيكسا البرمجية الموحدة وكيف تتدفق العمليات تلقائياً في أقل من ثانية واحدة دون أي تدخل بشري.',
              'Relying on fragmented chats, manual spreadsheets, and disconnected tools drains your team\'s focus. Watch below how Novixa\'s unified engine synchronizes business operations in real-time with sub-second latency.'
            )}
          </p>
        </div>

        {/* Video Player Showcase Container */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-slate-950/95 border border-cyan-500/40 rounded-3xl p-4 sm:p-7 shadow-2xl shadow-cyan-950/30 relative space-y-6">
            
            {/* Header Window Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 flex-wrap gap-4">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-1.5 opacity-80">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-xs font-mono text-slate-400 ms-2">
                  novixa-unified-engine.mp4
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-emerald-400 bg-emerald-950 border border-emerald-800 px-3 py-1 rounded-full font-mono font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {t('محاكاة حية للمنظومة', 'Live Engine Simulation')}
                </span>
                <span className="hidden sm:inline-flex text-xs font-mono text-cyan-300 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg">
                  1080p • 60FPS
                </span>
              </div>
            </div>

            {/* Video Player Element with Bezel & Overlay Controls */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-[#060D1A] group shadow-2xl">
              <video
                ref={videoRef}
                src="/videos/unified-engine.mp4"
                poster="/videos/unified-engine-poster.jpg"
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-auto aspect-video object-cover"
              />

              {/* Progress Bar Line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800/80 z-20">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Subtle Floating Player Controls Bar */}
              <div className="absolute bottom-3 end-3 z-30 flex items-center gap-2 bg-slate-950/85 backdrop-blur-md border border-slate-700/80 px-3 py-1.5 rounded-xl shadow-lg">
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                  className="p-1.5 text-slate-300 hover:text-[#38BDF8] transition-colors cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-[#38BDF8]" />}
                </button>

                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                  className="p-1.5 text-slate-300 hover:text-[#38BDF8] transition-colors cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#38BDF8]" />}
                </button>

                <button
                  type="button"
                  onClick={toggleFullscreen}
                  aria-label="Fullscreen"
                  className="p-1.5 text-slate-300 hover:text-[#38BDF8] transition-colors cursor-pointer"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              {/* Video Play Badge on Hover */}
              {!isPlaying && (
                <button
                  type="button"
                  onClick={togglePlay}
                  className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-slate-900/90 border border-[#38BDF8] flex items-center justify-center text-[#38BDF8] shadow-2xl transition-transform hover:scale-110 cursor-pointer"
                >
                  <Play className="w-7 h-7 ms-1 fill-current" />
                </button>
              )}
            </div>

            {/* 3 Unified Benefit Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Unified Item 1 */}
              <div className="p-5 bg-slate-900/80 rounded-xl border border-cyan-500/20 text-right rtl:text-right ltr:text-left space-y-2.5">
                <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm font-display">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>{t('لوحة تشغيل مركزية موحدة', 'Central Operations Hub')}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-arabic">
                  {t('جميع طلبات العملاء وحجوزاتهم تتدفق تلقائياً إلى شاشة موحدة دون الحاجة لتدخل بشري أو إعادة إدخال البيانات يدوياً.', 'All orders, bookings, and customer tickets instantly flow into one queue without duplicate data entry.')}
                </p>
              </div>

              {/* Unified Item 2 */}
              <div className="p-5 bg-slate-900/80 rounded-xl border border-cyan-500/20 text-right rtl:text-right ltr:text-left space-y-2.5">
                <div className="flex items-center gap-2 text-teal-300 font-bold text-sm font-display">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>{t('مزامنة المخزون في اللحظة', 'Real-Time Inventory Sync')}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-arabic">
                  {t('خصم المنتجات والمكونات فورياً مع كل عملية بيع مع إرسال إشعارات استباقية قبل نفاد أي صنف لمنع تعطل البيع.', 'Items are automatically deducted across branches with proactive restock threshold notifications.')}
                </p>
              </div>

              {/* Unified Item 3 */}
              <div className="p-5 bg-slate-900/80 rounded-xl border border-cyan-500/20 text-right rtl:text-right ltr:text-left space-y-2.5">
                <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm font-display">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>{t('ذكاء تحليلي وقرارات فورية', 'Live Mobile Analytics')}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-arabic">
                  {t('اتخاذ قرارات تشغيلية وتسويقية مبنية على أرقام دقيقة ولحظية من هاتفك في أي وقت ومن أي مكان في العالم.', 'Real-time sales curves, margins, and branch performance metrics available on your mobile 24/7.')}
                </p>
              </div>
            </div>

            {/* Bottom Metric Bar */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-cyan-300 font-mono">
              <span className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                <span>{t('النتيجة المباشرة: أتمتة كاملة، سرعة فائقة في التنفيذ، وتوسع تشغيلي آمن', 'Outcome: Automated workflows, instant execution, and sustainable scale')}</span>
              </span>
              <span className="font-bold text-emerald-400 bg-emerald-950 px-3 py-1 rounded-md border border-emerald-800">+65% Speed</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
