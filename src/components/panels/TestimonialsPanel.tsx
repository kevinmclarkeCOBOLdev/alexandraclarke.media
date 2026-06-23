"use client";

import { useState } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export default function TestimonialsPanel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      quote:
        "Alexandra Clarke is a visionary director. She captured our brand's heritage with breathtaking aesthetic choices and a cinematic narrative that exceeded all key metrics.",
      author: "Eleanor Sterling",
      role: "Global Creative Director",
      company: "Vogue Creative Lab",
    },
    {
      quote:
        "Her collaborative process, attention to technical details, and editorial eye resulted in the most successful commercial film campaign in our brand's history.",
      author: "Marcus Vance",
      role: "VP of Brand Marketing",
      company: "Aether Lifestyle Group",
    },
    {
      quote:
        "Alexandra doesn't just shoot films; she structures light and emotion. A master class in filmmaking and design direction.",
      author: "Dr. Julian Croft",
      role: "Festival Curator",
      company: "London Independent Film Gala",
    },
  ];

  const brands = [
    "Vogue",
    "Stella McCartney",
    "BMW Group",
    "ARRI Media",
    "Sotheby's",
    "BFI",
  ];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex h-full w-full flex-col justify-between p-6 md:p-12 lg:p-16 overflow-y-auto no-scrollbar">
      {/* Top Header */}
      <div>
        <span className="font-sans text-[10px] font-bold tracking-widest text-accent uppercase">
          Endorsements
        </span>
        <h3 className="font-editorial text-2xl md:text-3xl font-bold mt-1 text-foreground">
          WHAT CLIENTS SAY
        </h3>
      </div>

      {/* Center Slideshow */}
      <div className="my-8 relative flex-1 flex flex-col justify-center max-w-4xl">
        <Quote className="h-12 w-12 text-accent/25 absolute -top-6 -left-4" />
        <div className="relative z-10 transition-all duration-500">
          <p className="font-editorial text-lg md:text-2xl lg:text-3xl leading-relaxed text-foreground tracking-wide">
            &ldquo;{testimonials[activeIndex].quote}&rdquo;
          </p>
          <div className="mt-6">
            <h4 className="font-sans text-xs md:text-sm font-bold text-foreground">
              {testimonials[activeIndex].author}
            </h4>
            <p className="font-sans text-[10px] text-accent font-semibold uppercase tracking-widest mt-1">
              {testimonials[activeIndex].role} &bull; {testimonials[activeIndex].company}
            </p>
          </div>
        </div>

        {/* Slide Controls */}
        <div className="flex gap-3 mt-8">
          <button
            data-cursor="pointer"
            onClick={handlePrev}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 hover:border-accent text-foreground transition-colors duration-300"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            data-cursor="pointer"
            onClick={handleNext}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 hover:border-accent text-foreground transition-colors duration-300"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Bottom Metrics and Client Logo Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/10 pt-8 items-center">
        {/* Metric stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-neutral-dark rounded border border-white/5">
            <p className="font-sans text-xl md:text-2xl font-bold text-accent">98%</p>
            <p className="font-sans text-[9px] text-neutral-grey uppercase tracking-widest mt-1">
              Client Satisfaction
            </p>
          </div>
          <div className="p-4 bg-neutral-dark rounded border border-white/5">
            <p className="font-sans text-xl md:text-2xl font-bold text-accent">250M+</p>
            <p className="font-sans text-[9px] text-neutral-grey uppercase tracking-widest mt-1">
              Digital Video Impressions
            </p>
          </div>
        </div>

        {/* Agency Logo Grid */}
        <div>
          <p className="font-sans text-[9px] font-bold text-neutral-grey uppercase tracking-widest mb-3">
            Collaborators & Brands
          </p>
          <div className="grid grid-cols-3 gap-2">
            {brands.map((brand, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center py-2 px-3 rounded bg-neutral-dark/50 border border-white/5"
              >
                <span className="font-editorial text-xs font-bold text-neutral-grey tracking-widest text-center hover:text-accent transition-colors duration-300">
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
