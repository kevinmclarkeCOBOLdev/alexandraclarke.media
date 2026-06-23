"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  year: string;
  size: "large" | "medium" | "small";
}

export default function PortfolioPanel() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Commercial",
    "Fashion",
    "Documentary",
    "Events",
    "Social Media",
    "Music Videos",
  ];

  const projects: Project[] = [
    {
      id: 1,
      title: "VANGUARD COUTURE",
      category: "Fashion",
      image: "/portfolio-fashion.png",
      year: "2024",
      size: "large",
    },
    {
      id: 2,
      title: "THE SCULPTOR'S HANDS",
      category: "Documentary",
      image: "/portfolio-commercial.png",
      year: "2023",
      size: "medium",
    },
    {
      id: 3,
      title: "AURORA AUTOMOTIVE",
      category: "Commercial",
      image: "/portfolio-commercial.png",
      year: "2024",
      size: "medium",
    },
    {
      id: 4,
      title: "SILENT NOIR",
      category: "Fashion",
      image: "/portfolio-fashion.png",
      year: "2023",
      size: "large",
    },
    {
      id: 5,
      title: "METROPOLIS BEATS",
      category: "Music Videos",
      image: "/portfolio-fashion.png",
      year: "2024",
      size: "small",
    },
    {
      id: 6,
      title: "ECHOES OF SILENCE",
      category: "Events",
      image: "/portfolio-commercial.png",
      year: "2023",
      size: "small",
    },
  ];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="flex h-full w-full flex-col p-6 md:p-12 lg:p-16 overflow-y-auto no-scrollbar">
      {/* Top Bar / Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="font-sans text-[10px] font-bold tracking-widest text-accent uppercase">
            Exhibition
          </span>
          <h3 className="font-editorial text-2xl md:text-3xl font-bold mt-1 text-foreground">
            SELECTED CREATIVE WORKS
          </h3>
        </div>
        
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              data-cursor="pointer"
              onClick={() => setSelectedCategory(cat)}
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

      {/* Grid Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            data-cursor="badge"
            data-cursor-text="VIEW"
            className={`group relative overflow-hidden rounded-lg bg-neutral-dark border border-white/5 cursor-pointer ${
              project.size === "large"
                ? "md:row-span-2 lg:col-span-2 aspect-[16/10]"
                : "aspect-square"
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0 bg-neutral-dark">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-90 filter grayscale group-hover:grayscale-0"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            
            {/* Shading overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

            {/* Content overlay */}
            <div className="absolute bottom-0 inset-x-0 p-6 flex items-end justify-between translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <div>
                <p className="font-sans text-[9px] font-bold text-accent tracking-widest uppercase">
                  {project.category} &bull; {project.year}
                </p>
                <h4 className="font-editorial text-lg md:text-xl font-bold text-foreground mt-1 tracking-wide">
                  {project.title}
                </h4>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-foreground group-hover:bg-accent group-hover:text-background group-hover:border-accent transition-all duration-300">
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
