import { useState, useId } from 'react';
import { X, RotateCcw, Check, SlidersHorizontal, Info } from 'lucide-react';
import { SalonConfig } from '../types';
import { SALON_CONFIG } from '../data/salonData';

interface OwnerCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  salonConfig: SalonConfig;
  onSaveConfig: (newConfig: SalonConfig) => void;
}

export function OwnerCustomizerModal({
  isOpen,
  onClose,
  salonConfig,
  onSaveConfig,
}: OwnerCustomizerModalProps) {
  const modalTitleId = useId();
  const [formData, setFormData] = useState<SalonConfig>(salonConfig);
  const [savedFeedback, setSavedFeedback] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig(formData);
    setSavedFeedback(true);
    setTimeout(() => {
      setSavedFeedback(false);
      onClose();
    }, 800);
  };

  const handleReset = () => {
    setFormData(SALON_CONFIG);
    onSaveConfig(SALON_CONFIG);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={modalTitleId}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
    >
      <div className="relative bg-[#FAF8F5] border border-[#DDD5C7] w-full max-w-xl shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#2A2622] text-[#FAF8F5] px-6 py-4 flex items-center justify-between border-b border-[#3D3731]">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#C5A059]" />
            <h2 id={modalTitleId} className="text-lg font-display tracking-tight text-[#FAF8F5]">
              Publishing & Customizer Tool
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#A89F91] hover:text-[#FAF8F5] transition-colors p-1 cursor-pointer"
            aria-label="Close customizer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
          <div className="p-3 bg-[#F4EFEA] border border-[#E6DFD5] text-xs text-[#5C5449] flex items-start gap-2">
            <Info className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
            <p>
              Per your instructions: <em>"Silk Salon, prices, timings, and phone 98765 43210 are class examples only. Replace them with your own before publishing."</em>
              You can preview your actual salon details below anytime.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#1E1B18] mb-1">
                Salon Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-3 py-2 text-sm bg-white border border-[#D5CCC0] focus:border-[#2A2622] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1E1B18] mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="w-full px-3 py-2 text-sm bg-white border border-[#D5CCC0] focus:border-[#2A2622] focus:outline-none tabular-nums"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1E1B18] mb-1">
                  WhatsApp Number
                </label>
                <input
                  type="text"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  required
                  className="w-full px-3 py-2 text-sm bg-white border border-[#D5CCC0] focus:border-[#2A2622] focus:outline-none tabular-nums"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#1E1B18] mb-1">
                Location / Address
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
                className="w-full px-3 py-2 text-sm bg-white border border-[#D5CCC0] focus:border-[#2A2622] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#1E1B18] mb-1">
                Timings Text
              </label>
              <input
                type="text"
                value={formData.timingsText}
                onChange={(e) => setFormData({ ...formData, timingsText: e.target.value })}
                required
                className="w-full px-3 py-2 text-sm bg-white border border-[#D5CCC0] focus:border-[#2A2622] focus:outline-none"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-[#E6DFD5] flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#786E63] hover:text-[#1E1B18] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Defaults</span>
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-[#4A443C] bg-[#FAF8F5] border border-[#D5CCC0] hover:bg-[#F4EFEA] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 py-2.5 px-6 text-xs font-semibold uppercase tracking-wider text-[#FAF8F5] bg-[#2A2622] hover:bg-[#1E1B18] transition-colors cursor-pointer"
              >
                {savedFeedback && <Check className="w-3.5 h-3.5 text-[#C5A059]" />}
                <span>{savedFeedback ? 'Updated' : 'Apply Changes'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
