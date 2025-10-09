'use client';

import Link from 'next/link';
import { getImageUrl } from "../../lib/utils";

export default function Navigation() {
  const handleContactClick = (e) => {
    e.preventDefault();
    document.getElementById('contact-form')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-background border-b border-dashed border-foreground z-50 w-full" style={{ position: 'fixed', top: 0, left: 0, right: 0, width: '100%', zIndex: 1001 }}>
      {/* Mobile: Solo logo centrado */}
      <div className="md:hidden max-w-[100vw] flex items-center justify-center h-full">
        <Link 
          className="flex items-center text-foreground gap-2 uppercase cursor-pointer text-sm font-syncopate font-regular tracking-[4.5px] whitespace-nowrap"
          href="/"
        >
          <img src={getImageUrl("/unmanned-logo.png")} alt="Unmanned united" className="w-10 h-10 flex-shrink-0" />
          <span className="hidden sm:inline">Unmanned united</span>
        </Link>
      </div>

      {/* Desktop: Logo + Contact */}
      <div className="h-full hidden md:flex items-center justify-center w-full max-w-[1200px] mx-auto">
        <div className="items-center flex justify-between gap-4 uppercase tracking-[3px] font-regular w-full">
          <Link 
            className="flex items-center text-foreground gap-2 uppercase cursor-pointer text-xs font-syncopate font-regular tracking-[4.5px] whitespace-nowrap"
            href="/"
          >
            <img src={getImageUrl("/unmanned-logo.png")} alt="Unmanned united" className="w-8 h-8 flex-shrink-0" />
            Unmanned united
          </Link>
          <div className="flex items-center gap-12">
            <Link 
            className="flex items-center text-darkblue gap-2 uppercase cursor-pointer text-xs font-syncopate font-regular tracking-[4.5px] whitespace-nowrap"
            href="/about"
            >
              About us
            </Link>
            <Link 
              className="flex items-center text-darkblue gap-2 uppercase cursor-pointer text-xs font-syncopate font-regular tracking-[4.5px] whitespace-nowrap"
              href="/overwatchlr"
            >
              Overwatch-LR™
            </Link>
          </div>
          
          <a 
            className="uppercase text-xs text-foreground font-syncopate font-regular tracking-[4.5px] cursor-pointer whitespace-nowrap"
            href="#contact-form"
            onClick={handleContactClick}
          >
            Contact us
          </a>
        </div>
      </div>
    </nav>
  );
}
