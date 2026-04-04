"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface YouFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  formId: string;
}

export function YouFormModal({ isOpen, onClose, formId }: YouFormModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div className={cn(
      "fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 lg:p-8 transition-all duration-300",
      isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
    )}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-xl transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className={cn(
        "relative w-full max-w-4xl h-[85vh] bg-[#0A0A0A] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col transition-all duration-500",
        isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-12"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-[#0D0D0D]">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-[0.3em] text-neutral-400">Secure Consultation Portal</span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden bg-black relative">
          {/* Iframe is used instead of embed script for stability when switching between forms */}
          <iframe 
            src={`https://app.youform.com/forms/${formId}`}
            className="w-full h-full border-none"
            title="Application Form"
          />
        </div>
        
        {/* Footer info (optional) */}
        <div className="p-4 border-t border-white/5 text-center bg-[#0D0D0D]">
          <p className="text-[10px] text-neutral-600 font-black uppercase tracking-widest leading-none">
            Asenra Infrastructure · encrypted & private
          </p>
        </div>
      </div>
    </div>
  );
}
