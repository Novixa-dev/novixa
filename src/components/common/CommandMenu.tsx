'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../../context/LanguageContext';
import { SOLUTIONS, PRODUCTS, INDUSTRIES, INSIGHTS } from '../../content/data';
import { 
  Search, X, Layers, Sparkles, Building, BookOpen, 
  Briefcase, ArrowLeft, ArrowRight, CornerDownLeft, Shield 
} from 'lucide-react';

export const CommandMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();
  const { language, isRtl, t } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleSelect = (path: string) => {
    setOpen(false);
    setQuery('');
    router.push(path);
  };

  if (!open) return null;

  const normalizedQuery = query.toLowerCase().trim();

  // Search items across Solutions, Products, Industries, and Insights
  const solutionsMatches = SOLUTIONS.filter((s) => {
    if (!normalizedQuery) return false;
    const haystacks = [
      s.title.ar, s.title.en,
      s.subtitle.ar, s.subtitle.en,
      s.description.ar, s.description.en,
      s.badge.ar, s.badge.en,
      ...(s.features?.ar || []), ...(s.features?.en || [])
    ].map((txt) => txt.toLowerCase());
    return haystacks.some((h) => h.includes(normalizedQuery));
  });

  const productsMatches = PRODUCTS.filter((p) => {
    if (!normalizedQuery) return false;
    const haystacks = [
      p.name.ar, p.name.en,
      p.tagline.ar, p.tagline.en,
      p.title.ar, p.title.en,
      p.description.ar, p.description.en,
      p.category.ar, p.category.en,
      ...(p.features?.ar || []), ...(p.features?.en || []),
      ...(p.targetIndustries?.ar || []), ...(p.targetIndustries?.en || [])
    ].map((txt) => txt.toLowerCase());
    return haystacks.some((h) => h.includes(normalizedQuery));
  });

  const industriesMatches = INDUSTRIES.filter((i) => {
    if (!normalizedQuery) return false;
    const haystacks = [
      i.name.ar, i.name.en,
      i.description.ar, i.description.en,
      ...(i.challenges?.ar || []), ...(i.challenges?.en || []),
      ...(i.solutions?.ar || []), ...(i.solutions?.en || []),
      ...(i.productModules?.ar || []), ...(i.productModules?.en || [])
    ].map((txt) => txt.toLowerCase());
    return haystacks.some((h) => h.includes(normalizedQuery));
  });

  const insightsMatches = INSIGHTS.filter((a) => {
    if (!normalizedQuery) return false;
    const haystacks = [
      a.title.ar, a.title.en,
      a.category.ar, a.category.en,
      a.excerpt.ar, a.excerpt.en,
      ...(a.content?.ar || []), ...(a.content?.en || [])
    ].map((txt) => txt.toLowerCase());
    return haystacks.some((h) => h.includes(normalizedQuery));
  });

  const hasMatches =
    solutionsMatches.length > 0 ||
    productsMatches.length > 0 ||
    industriesMatches.length > 0 ||
    insightsMatches.length > 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
      onClick={() => setOpen(false)}
      role="presentation"
    >
      <div
        className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-right rtl:text-right ltr:text-left flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={t('البحث في الموقع', 'Site search')}
      >
        {/* Search Header */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" aria-hidden="true" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('ابحث في الأنظمة والحلول والمنتجات والمقالات...', 'Search solutions, products, industries, essays...')}
            aria-label={t('ابحث في الأنظمة والحلول والمنتجات والمقالات', 'Search solutions, products, industries, essays')}
            className="w-full bg-transparent border-none text-sm text-white placeholder-slate-500 focus:outline-none font-arabic"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={() => setOpen(false)}
            className="px-2 py-1 rounded bg-slate-800 text-[10px] font-mono text-slate-400 hover:text-white"
          >
            ESC
          </button>
        </div>

        {/* Search Results / Quick Links */}
        <div className="p-4 overflow-y-auto space-y-6 flex-grow">
          {/* Quick Pages when query is empty */}
          {!query && (
            <div className="space-y-2">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 px-2">
                {t('صفحات الموقع الرئيسية', 'Main Navigation')}
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => handleSelect(`/${language}/solutions`)}
                  className="p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800 border border-slate-800/80 text-right rtl:text-right ltr:text-left flex items-center justify-between text-slate-300 hover:text-white transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-blue-400" />
                    <span>{t('منظومة الحلول', 'Solutions')}</span>
                  </span>
                  <ArrowIcon className="w-3 h-3 text-slate-500" />
                </button>

                <button
                  onClick={() => handleSelect(`/${language}/products`)}
                  className="p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800 border border-slate-800/80 text-right rtl:text-right ltr:text-left flex items-center justify-between text-slate-300 hover:text-white transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                    <span>{t('المنتجات الرقمية', 'Products')}</span>
                  </span>
                  <ArrowIcon className="w-3 h-3 text-slate-500" />
                </button>

                <button
                  onClick={() => handleSelect(`/${language}/work`)}
                  className="p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800 border border-slate-800/80 text-right rtl:text-right ltr:text-left flex items-center justify-between text-slate-300 hover:text-white transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{t('الأعمال المختارة', 'Selected Work')}</span>
                  </span>
                  <ArrowIcon className="w-3 h-3 text-slate-500" />
                </button>

                <button
                  onClick={() => handleSelect(`/${language}/start-project`)}
                  className="p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800 border border-slate-800/80 text-right rtl:text-right ltr:text-left flex items-center justify-between text-slate-300 hover:text-white transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{t('ابدأ مشروعك', 'Start Project')}</span>
                  </span>
                  <ArrowIcon className="w-3 h-3 text-slate-500" />
                </button>
              </div>
            </div>
          )}

          {/* Results: Products */}
          {productsMatches.length > 0 && (
            <div className="space-y-2">
              <div className="text-[11px] font-mono uppercase tracking-wider text-teal-400 px-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t('المنتجات السحابية (SaaS)', 'Digital Products')}</span>
              </div>
              <div className="space-y-1">
                {productsMatches.map((prod) => (
                  <button
                    key={prod.id}
                    onClick={() => handleSelect(`/${language}/products/${prod.id}`)}
                    className="w-full p-2.5 rounded-xl bg-slate-950/50 hover:bg-slate-800 border border-slate-800/60 text-right rtl:text-right ltr:text-left flex items-center justify-between text-white transition-all group"
                  >
                    <div>
                      <div className="text-xs font-bold text-white font-display flex items-center gap-2">
                        <span>{prod.name[isRtl ? 'ar' : 'en']}</span>
                        <span className="text-[10px] text-teal-400 bg-teal-950 border border-teal-800 px-1.5 py-0.2 rounded font-mono">
                          {prod.category[isRtl ? 'ar' : 'en']}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 font-arabic truncate max-w-md">
                        {prod.tagline[isRtl ? 'ar' : 'en'] || prod.description[isRtl ? 'ar' : 'en']}
                      </div>
                    </div>
                    <ArrowIcon className="w-3.5 h-3.5 text-slate-500 group-hover:text-teal-400 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results: Solutions */}
          {solutionsMatches.length > 0 && (
            <div className="space-y-2">
              <div className="text-[11px] font-mono uppercase tracking-wider text-blue-400 px-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>{t('الحلول البرمجية', 'Software Solutions')}</span>
              </div>
              <div className="space-y-1">
                {solutionsMatches.map((sol) => (
                  <button
                    key={sol.id}
                    onClick={() => handleSelect(`/${language}/solutions`)}
                    className="w-full p-2.5 rounded-xl bg-slate-950/50 hover:bg-slate-800 border border-slate-800/60 text-right rtl:text-right ltr:text-left flex items-center justify-between text-white transition-all group"
                  >
                    <div>
                      <div className="text-xs font-bold text-white font-display">
                        {sol.title[isRtl ? 'ar' : 'en']}
                      </div>
                      <div className="text-[11px] text-slate-400 font-arabic truncate max-w-md">
                        {sol.subtitle[isRtl ? 'ar' : 'en'] || sol.description[isRtl ? 'ar' : 'en']}
                      </div>
                    </div>
                    <ArrowIcon className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results: Industries */}
          {industriesMatches.length > 0 && (
            <div className="space-y-2">
              <div className="text-[11px] font-mono uppercase tracking-wider text-amber-400 px-2 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5" />
                <span>{t('حلول القطاعات', 'Industry Verticals')}</span>
              </div>
              <div className="space-y-1">
                {industriesMatches.map((ind) => (
                  <button
                    key={ind.id}
                    onClick={() => handleSelect(`/${language}/industries/${ind.id}`)}
                    className="w-full p-2.5 rounded-xl bg-slate-950/50 hover:bg-slate-800 border border-slate-800/60 text-right rtl:text-right ltr:text-left flex items-center justify-between text-white transition-all group"
                  >
                    <div>
                      <div className="text-xs font-bold text-white font-display">
                        {ind.name[isRtl ? 'ar' : 'en']}
                      </div>
                      <div className="text-[11px] text-slate-400 font-arabic truncate max-w-md">
                        {ind.description[isRtl ? 'ar' : 'en']}
                      </div>
                    </div>
                    <ArrowIcon className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results: Insights */}
          {insightsMatches.length > 0 && (
            <div className="space-y-2">
              <div className="text-[11px] font-mono uppercase tracking-wider text-indigo-400 px-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{t('مقالات المعرفة', 'Insights Lab')}</span>
              </div>
              <div className="space-y-1">
                {insightsMatches.map((art) => (
                  <button
                    key={art.id}
                    onClick={() => handleSelect(`/${language}/insights/${art.id}`)}
                    className="w-full p-2.5 rounded-xl bg-slate-950/50 hover:bg-slate-800 border border-slate-800/60 text-right rtl:text-right ltr:text-left flex items-center justify-between text-white transition-all group"
                  >
                    <div>
                      <div className="text-xs font-bold text-white font-display">
                        {art.title[isRtl ? 'ar' : 'en']}
                      </div>
                      <div className="text-[11px] text-slate-400 font-arabic truncate max-w-md">
                        {art.excerpt[isRtl ? 'ar' : 'en']}
                      </div>
                    </div>
                    <ArrowIcon className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* No results message */}
          {query && !hasMatches && (
            <div className="p-8 text-center text-slate-400 space-y-2">
              <div className="text-sm font-semibold">{t('لم يتم العثور على نتائج مطابقة', 'No matching results found')}</div>
              <div className="text-xs text-slate-500 font-arabic">
                {t('جرب البحث بكلمات أخرى مثل "مطاعم"، "SaaS"، "حجز"، أو "ذكاء اصطناعي"', 'Try searching for terms like "restaurants", "SaaS", "booking", or "AI"')}
              </div>
            </div>
          )}
        </div>

        {/* Search Footer */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span className="flex items-center gap-1.5">
            <CornerDownLeft className="w-3 h-3 text-blue-400" />
            <span>{t('اضغط للتنقل السريع', 'Press to navigate')}</span>
          </span>
          <span>Novixa Global Search Engine</span>
        </div>
      </div>
    </div>
  );
};
