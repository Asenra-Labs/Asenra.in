"use client";

import { useEffect, useRef, useState } from "react";
import { Users, Building, Banknote } from "lucide-react";

interface CounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

function AnimatedCounter({ end, suffix = "", prefix = "", duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0);
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // easeOutExpo
      const easing = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easing * end));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    // Simple Intersection Observer to start animation when in view
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          window.requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (nodeRef.current) observer.observe(nodeRef.current);

    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={nodeRef} className="font-tabular-nums">
      {prefix}{count}{suffix}
    </span>
  );
}

export function StatsSection() {
  const stats = [
    { label: "Clients Served", prefix: "", value: 50, suffix: "+", icon: <Users className="w-6 h-6" /> },
    { label: "Successful Projects", prefix: "", value: 100, suffix: "+", icon: <Building className="w-6 h-6" /> },
    { label: "MRR Generated", prefix: "₹", value: 2, suffix: "L+", icon: <Banknote className="w-6 h-6" /> }
  ];

  return (
    <section className="py-20 bg-black border-y border-zinc-800 relative z-10 overflow-hidden text-zinc-100">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/10 via-black to-black" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-zinc-800">
          
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center p-6 space-y-4">
              <div className="p-4 bg-neutral-950 text-indigo-400 rounded-full shadow-inner ring-1 ring-white/10">
                {stat.icon}
              </div>
              <h3 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-zinc-500">
                <AnimatedCounter end={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </h3>
              <p className="text-zinc-400 font-medium tracking-wide uppercase text-sm">
                {stat.label}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
