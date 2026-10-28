import { useState } from 'react';
import { Info, X, SlidersHorizontal } from 'lucide-react';

interface ClassExampleBannerProps {
  onOpenCustomizer: () => void;
}

export function ClassExampleBanner({ onOpenCustomizer }: ClassExampleBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <aside aria-label="Demo notice" className="bg-[#2A2622] text-[#E8D9C5] text-xs py-2 px-4 border-b border-[#3D3731] transition-all">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <Info className="w-3.5 h-3.5 text-[#C5A059] shrink-0 hidden sm:inline" />
          <span>
            <strong className="font-medium text-[#FAF8F5]">Class Example Notice:</strong> Silk Salon, prices, timings, and phone 98765 43210 are class examples only. Replace them with your own before publishing.
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCustomizer}
            className="inline-flex items-center gap-1.5 text-xs text-[#FAF8F5] underline hover:text-[#C5A059] transition-colors whitespace-nowrap cursor-pointer"
          >
            <SlidersHorizontal className="w-3 h-3" />
            <span>Customize Details</span>
          </button>
          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss notice"
            className="text-[#A89F91] hover:text-[#FAF8F5] transition-colors p-0.5 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
