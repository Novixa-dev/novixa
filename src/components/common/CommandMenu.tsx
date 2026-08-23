'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ViewType } from '../../types';
import { 
  Search, Command, ArrowRight, ArrowLeft, Layers, Briefcase, 
  Sparkles, Cpu, BookOpen, Calculator, Globe, X, ExternalLink,
  Activity, ShieldCheck, Check, MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: ViewType) => void;
}

interface CommandItem {
  id: string;
  titleAr: string;
  titleEn: string;
  categoryAr: string;
  categoryEn: string;
  icon: React.ComponentType<{ className?: string }>;
  shortcut?: string;
  action: () => void;
}

export const CommandMenu: React.FC<CommandMenuProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const { language, toggleLanguage, isRtl, t } = useLanguage();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const items: CommandItem[] = useMemo(() => [
    {
      id: 'home',
      titleAr: 'الصفحة الرئيسية',
      titleEn: 'Home Page',
      categoryAr: 'التنقل العام',
      categoryEn: 'General Navigation',
      icon: Command,
      shortcut: 'H',
      action: () => { onNavigate('home'); onClose(); }
    },
    {
      id: 'solutions',
      titleAr: 'الحلول البرمجية والمعمارية',
      titleEn: 'Engineering Solutions & Architecture',
      categoryAr: 'التنقل العام',
      categoryEn: 'General Navigation',
      icon: Layers,
      shortcut: 'S',
      action: () => { onNavigate('solutions'); onClose(); }
    },
    {
      id: 'products',
      titleAr: 'منتجات نوڤيكسا الرقمية (SaaS)',
      titleEn: 'Novixa Digital Products (SaaS)',
      categoryAr: 'التنقل العام',
      categoryEn: 'General Navigation',
      icon: Sparkles,
      shortcut: 'P',
      action: () => { onNavigate('products'); onClose(); }
    },
    {
      id: 'industries',
      titleAr: 'القطاعات والحلول التشغيلية',
      titleEn: 'Industry Verticals & Operations',
      categoryAr: 'التنقل العام',
      categoryEn: 'General Navigation',
      icon: ShieldCheck,
      shortcut: 'I',
      action: () => { onNavigate('industries'); onClose(); }
    },
    {
      id: 'work',
      titleAr: 'دراسات الحالة والأعمال المختارة',
      titleEn: 'Selected Work & Case Studies',
      categoryAr: 'التنقل العام',
      categoryEn: 'General Navigation',
      icon: Briefcase,
      shortcut: 'W',
      action: () => { onNavigate('work'); onClose(); }
    },
    {
      id: 'about',
      titleAr: 'عن نوڤيكسا وفلسفة الهندسة',
      titleEn: 'About Novixa & Engineering Philosophy',
      categoryAr: 'التنقل العام',
      categoryEn: 'General Navigation',
      icon: Cpu,
      shortcut: 'A',
      action: () => { onNavigate('about'); onClose(); }
    },
    {
      id: 'insights',
      titleAr: 'مختبر المعرفة والمقالات التقنية',
      titleEn: 'Knowledge Lab & Tech Articles',
      categoryAr: 'التنقل العام',
      categoryEn: 'General Navigation',
      icon: BookOpen,
      shortcut: 'K',
      action: () => { onNavigate('insights'); onClose(); }
    },
    {
      id: 'start-project',
      titleAr: 'بدء استشارة مشروع جديد وحاسبة المعمارية',
      titleEn: 'Start Project & Architecture Calculator',
      categoryAr: 'الإجراءات السريعة',
      categoryEn: 'Quick Actions',
      icon: Calculator,
      shortcut: '↵',
      action: () => { onNavigate('start'); onClose(); }
    },
    {
      id: 'toggle-lang',
      titleAr: language === 'ar' ? 'التحويل إلى اللغة الإنجليزية (English)' : 'Switch to Arabic (العربية)',
      titleEn: language === 'ar' ? 'Switch to English' : 'التحويل إلى العربية',
      categoryAr: 'الإجراءات السريعة',
      categoryEn: 'Quick Actions',
      icon: Globe,
      shortcut: 'L',
      action: () => { toggleLanguage(); onClose(); }
    },
    {
      id: 'product-pulse',
      titleAr: 'استكشاف منصة Novixa Pulse (نبض)',
      titleEn: 'Explore Novixa Pulse Platform',
      categoryAr: 'المنتجات الرقمية',
      categoryEn: 'Digital Products',
      icon: Activity,
      action: () => { onNavigate('products'); onClose(); }
    },
    {
      id: 'product-pos',
      titleAr: 'منظومة نقاط البيع والضيافة Novixa POS',
      titleEn: 'Novixa Restaurant POS & Kitchen Display',
      categoryAr: 'المنتجات الرقمية',
      categoryEn: 'Digital Products',
      icon: Layers,
      action: () => { onNavigate('products'); onClose(); }
    }
  ], [language, onNavigate, onClose, toggleLanguage]);

  const filteredItems = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase().trim();
    return items.filter(item => {
      const title = (language === 'ar' ? item.titleAr : item.titleEn).toLowerCase();
      const cat = (language === 'ar' ? item.categoryAr : item.categoryEn).toLowerCase();
      return title.includes(q) || cat.includes(q) || item.id.includes(q);
    });
  }, [items, query, language]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
          e.preventDefault();
          onClose(); // Inverted or toggle
        }
        return;
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev < filteredItems.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : filteredItems.length - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-slate-950/80 backdrop-blur-md transition-all"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.16, ease: 'easeOut' }}
          className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden text-right rtl:text-right ltr:text-left"
          onClick={e => e.stopPropagation()}
        >
          {/* Search Header */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-800 bg-slate-950/50">
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              placeholder={t('ابحث في الأنظمة، الحلول، دراسات الحالة، أو المقالات...', 'Search systems, solutions, case studies, or articles...')}
              className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none font-arabic"
            />
            {query && (
              <button 
                onClick={() => setQuery('')}
                className="p-1 rounded-md text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800 text-slate-400 border border-slate-700">
              ESC
            </kbd>
          </div>

          {/* Items List */}
          <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
            {filteredItems.length === 0 ? (
              <div className="py-12 text-center text-slate-500 text-sm font-arabic">
                {t('لا توجد نتائج مطابقة لـ "', 'No results found for "')}{query}"
              </div>
            ) : (
              filteredItems.map((item, idx) => {
                const IconComp = item.icon;
                const isSelected = idx === selectedIndex;
                return (
                  <button
                    key={item.id}
                    onClick={item.action}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm transition-all text-right rtl:text-right ltr:text-left ${
                      isSelected 
                        ? 'bg-blue-600 text-white font-medium shadow-sm' 
                        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-blue-700 text-white' : 'bg-slate-800 text-slate-400'}`}>
                        <IconComp className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-display font-medium leading-snug">
                          {language === 'ar' ? item.titleAr : item.titleEn}
                        </div>
                        <div className={`text-[11px] ${isSelected ? 'text-blue-100' : 'text-slate-500'} font-arabic`}>
                          {language === 'ar' ? item.categoryAr : item.categoryEn}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {item.shortcut && (
                        <kbd className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                          isSelected ? 'bg-blue-700/80 text-blue-100' : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}>
                          {item.shortcut}
                        </kbd>
                      )}
                      <ArrowIcon className={`w-3.5 h-3.5 opacity-60 ${isSelected ? 'opacity-100' : ''}`} />
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Footer Shortcuts Help */}
          <div className="px-4 py-2.5 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <div className="flex items-center gap-3">
              <span>↑↓ {t('للتنقل', 'Navigate')}</span>
              <span>↵ {t('للاختيار', 'Select')}</span>
              <span>ESC {t('للإغلاق', 'Close')}</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-blue-400">
              <span>Novixa Engine Core</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
