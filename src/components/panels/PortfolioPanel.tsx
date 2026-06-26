"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PortfolioItem {
  id: number;
  title: string;
  category: "short films" | "3d animations" | "social media marketing";
  image: string;
  year: string;
  videoUrl?: string;
}

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 1,
    title: "JUST ANOTHER ASEXUAL FILM",
    category: "short films",
    image: "/just-another-asexual-film-thumb.webp",
    year: "17:58",
    videoUrl: "oJklZVMczpg",
  },
  {
    id: 2,
    title: "THE CASUAL LIVES OF YOUR EVERYDAY TRANSGENDERS - A SHORT TRANS DOCUMENTARY",
    category: "short films",
    image: "/casual-lives-trans-documentary-thumb.webp",
    year: "11:42",
    videoUrl: "V_BiZEc6YSo",
  },
  {
    id: 3,
    title: "CYBERNETIC PULSE",
    category: "3d animations",
    image: "/portfolio-cybernetic.png",
    year: "2024",
  },
  {
    id: 4,
    title: "FLUID DYNAMICS",
    category: "3d animations",
    image: "/portfolio-fluid.png",
    year: "2025",
  },
  {
    id: 5,
    title: "VANGUARD COUTURE",
    category: "social media marketing",
    image: "/portfolio-vanguard.png",
    year: "2024",
  },
  {
    id: 6,
    title: "MODERN MINIMALISM",
    category: "social media marketing",
    image: "/portfolio-minimalism.png",
    year: "2025",
  },
];

export default function PortfolioPanel() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalVideoId, setModalVideoId] = useState<string>("");

  const categories = [
    "all",
    "short films",
    "3d animations",
    "social media marketing",
  ];

  const filteredItems = selectedCategory === "all"
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => item.category === selectedCategory);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setActiveIndex(0);
  };

  const handlePrev = () => {
    if (filteredItems.length <= 1) return;
    setActiveIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  const handleNext = () => {
    if (filteredItems.length <= 1) return;
    setActiveIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const getPositionClass = (index: number, active: number, length: number) => {
    if (index === active) return "flow-slide-active";
    if (length === 2) {
      if (active === 0 && index === 1) return "flow-slide-next";
      if (active === 1 && index === 0) return "flow-slide-prev";
    }
    if (length > 2) {
      if (index === (active - 1 + length) % length) return "flow-slide-prev";
      if (index === (active + 1) % length) return "flow-slide-next";
    }
    return "flow-slide-hidden";
  };

  const handleSlideClick = (item: PortfolioItem, index: number, isActive: boolean) => {
    if (!isActive) {
      setActiveIndex(index);
    } else if (item.videoUrl) {
      setModalVideoId(item.videoUrl);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="flex h-full w-full flex-col p-6 md:p-12 lg:p-16 overflow-y-auto no-scrollbar">
      {/* Top Bar / Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
        <div>
          <h3 className="font-editorial text-5xl md:text-6xl font-bold mt-1 stroked-title">
            PORTFOLIO
          </h3>
        </div>
        
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              data-cursor="pointer"
              onClick={() => handleCategoryChange(cat)}
              className={`px-3 py-1.5 font-sans text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 border ${
                selectedCategory === cat
                  ? "bg-accent text-background border-accent"
                  : "bg-transparent text-foreground/75 border-white/10 hover:border-accent"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Flow Gallery Area */}
      <div className="flex-1 flex flex-col justify-center items-center py-8 min-h-[500px]">
        {filteredItems.length > 0 ? (
          <div className="relative w-full max-w-[850px] flex flex-col items-center">
            {/* Slider 3D Box */}
            <div className="relative w-full h-[300px] md:h-[420px] flex items-center justify-center overflow-visible flow-perspective">
              {/* Left Navigation Arrow */}
              {filteredItems.length > 1 && (
                <button
                  onClick={handlePrev}
                  data-cursor="pointer"
                  className="absolute left-2 md:left-6 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 hover:bg-black/90 text-accent border border-white/10 transition-all duration-300 hover:scale-115 active:scale-95"
                  aria-label="Previous Project"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              )}

              {/* Slides */}
              {filteredItems.map((item, index) => {
                const positionClass = getPositionClass(index, activeIndex, filteredItems.length);
                const isActive = index === activeIndex;
                
                return (
                  <div
                    key={item.id}
                    onClick={() => handleSlideClick(item, index, isActive)}
                    className={`absolute w-[80%] md:w-[75%] max-w-[650px] aspect-[16/10] flow-slide rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-neutral-dark ${positionClass} ${
                      isActive && !item.videoUrl ? "cursor-default" : "cursor-pointer"
                    }`}
                  >
                    {/* Slide Image */}
                    <div className="absolute inset-0 w-full h-full">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 85vw, 650px"
                        priority={isActive}
                      />
                    </div>
                    
                    {/* Shadow overlay gradient at bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                    {/* Play Button Overlay for Active Slide with Video */}
                    {isActive && item.videoUrl && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/35 group-hover:bg-black/45 transition-colors duration-300">
                        <div className="flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-[#FBAB3C] text-black shadow-lg hover:scale-110 active:scale-95 transition-transform duration-300">
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-6 md:h-6 ml-1">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Right Navigation Arrow */}
              {filteredItems.length > 1 && (
                <button
                  onClick={handleNext}
                  data-cursor="pointer"
                  className="absolute right-2 md:right-6 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 hover:bg-black/90 text-accent border border-white/10 transition-all duration-300 hover:scale-115 active:scale-95"
                  aria-label="Next Project"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Active Item Details */}
            <div className="text-center mt-6 min-h-[70px]">
              <span className="font-sans text-[11px] font-bold tracking-[2px] text-accent uppercase">
                {filteredItems[activeIndex]?.category} &bull; {filteredItems[activeIndex]?.year}
              </span>
              <h4 className="font-editorial text-2xl md:text-3xl font-bold text-foreground mt-1 uppercase tracking-wide">
                {filteredItems[activeIndex]?.title}
              </h4>
            </div>

            {/* Thumbnail Preview Icons */}
            <div className="flex justify-center flex-wrap gap-3 mt-4">
              {filteredItems.map((item, index) => (
                <button
                  key={item.id}
                  data-cursor="pointer"
                  onClick={() => setActiveIndex(index)}
                  className={`relative w-28 md:w-36 aspect-[16/10] rounded-lg overflow-hidden border transition-all duration-300 ${
                    activeIndex === index
                      ? "border-accent scale-110 shadow-lg shadow-accent/10 opacity-100"
                      : "border-white/10 opacity-40 hover:opacity-70 hover:scale-105"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="160px"
                  />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-foreground/50 font-sans text-sm">
            No projects found in this category.
          </div>
        )}
      </div>

      {/* Immersive Video Modal Popup (90% of screen dimensions) */}
      {isModalOpen && modalVideoId && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-[90vw] h-[90vh] bg-black border border-white/10 rounded-xl relative overflow-hidden flex items-center justify-center shadow-2xl">
            {/* Close Button 'X' at top right */}
            <button
              onClick={() => {
                setIsModalOpen(false);
                setModalVideoId("");
              }}
              className="absolute top-4 right-4 z-10 flex items-center justify-center bg-black/60 hover:bg-black/90 text-white rounded-full p-2 border border-white/10 transition-all duration-300 hover:scale-110 cursor-pointer"
              title="Close Modal"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Video Iframe */}
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${modalVideoId}?autoplay=1&controls=1&rel=0&playsinline=1`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Portfolio Video Player"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
