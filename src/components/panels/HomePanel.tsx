"use client";

export default function HomePanel() {
  return (
    <div className="relative flex h-full w-full flex-col justify-between p-6 md:p-12 lg:p-16 overflow-hidden">
      {/* Background Video Player */}
      <div className="absolute inset-0 overflow-hidden -z-10 bg-black">
        <iframe
          className="absolute top-1/2 left-1/2 w-[177.78vh] min-w-full h-[56.25vw] min-h-full -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
          src="https://www.youtube.com/embed/jEye9YVJ7q4?autoplay=1&mute=1&controls=1&rel=0&playsinline=1"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          title="Background Showreel"
        ></iframe>
        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/45 pointer-events-none" />
      </div>

      {/* Top Header */}
      <div className="relative z-10 flex justify-between items-start">
        <div>
          <h2 className="font-editorial text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground">
            ALEXANDRA CLARKE
          </h2>
          <p className="font-sans text-xs md:text-sm text-neutral-grey mt-2 tracking-wide">
            Creative Director, Filmmaker & Visual Storyteller
          </p>
        </div>
      </div>
    </div>
  );
}
