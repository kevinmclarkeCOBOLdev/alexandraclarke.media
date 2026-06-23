"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import { Send, MapPin, Mail, CheckCircle } from "lucide-react";

// Form validation schema
const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  projectType: z.string().min(1, { message: "Please select a project type." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPanel() {
  const [localTime, setLocalTime] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      projectType: "Commercial",
      message: "",
    },
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time in London/Europe timezone
      const timeString = now.toLocaleTimeString("en-GB", {
        timeZone: "Europe/London",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setLocalTime(timeString + " BST");
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const onSubmit = async (data: ContactFormValues) => {
    // Simulate API request
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Contact form submitted successfully:", data);
    setIsSubmitted(true);
    reset();
  };

  return (
    <div className="flex h-full w-full flex-col lg:flex-row overflow-y-auto no-scrollbar p-6 md:p-12 lg:p-16 gap-8 lg:gap-12">
      {/* Left Column: Details & Availability */}
      <div className="w-full lg:w-5/12 flex flex-col justify-between gap-8">
        <div>
          <span className="font-sans text-[10px] font-bold tracking-widest text-accent uppercase">
            Inquiries
          </span>
          <h3 className="font-editorial text-2xl md:text-3xl font-bold mt-1 text-foreground">
            START A CONVERSATION
          </h3>
          <p className="font-sans text-xs md:text-sm text-neutral-grey mt-4 leading-relaxed tracking-wide">
            Whether looking to execute a commercial campaign, document an intimate fashion narrative, or collaborate on a creative installation, feel free to reach out.
          </p>
        </div>

        {/* Info Grid */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-accent/10 text-accent">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <p className="font-sans text-[9px] text-neutral-grey uppercase tracking-widest font-semibold">
                Direct Email
              </p>
              <a
                href="mailto:studio@alexandraclarke.media"
                data-cursor="pointer"
                className="font-sans text-xs font-bold text-foreground hover:text-accent transition-colors"
              >
                studio@alexandraclarke.media
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-accent/10 text-accent">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <p className="font-sans text-[9px] text-neutral-grey uppercase tracking-widest font-semibold">
                Locations
              </p>
              <p className="font-sans text-xs font-bold text-foreground">
                London &bull; New York
              </p>
            </div>
          </div>

          {/* Time Zone details */}
          <div className="p-4 bg-neutral-dark rounded border border-white/5">
            <p className="font-sans text-[9px] text-neutral-grey uppercase tracking-widest">
              Local Studio Time (London)
            </p>
            <p className="font-sans text-lg font-bold text-accent mt-1">{localTime || "12:00:00 BST"}</p>
          </div>
        </div>

        {/* Availability Badge */}
        <div className="flex items-center gap-2 border border-accent/20 bg-accent/5 p-3 rounded">
          <span className="h-2 w-2 rounded-full bg-accent animate-ping" />
          <span className="font-sans text-[9px] font-bold text-accent tracking-widest uppercase">
            Available for commissions — Q3/Q4 2026
          </span>
        </div>
      </div>

      {/* Right Column: Contact Form */}
      <div className="flex-1 p-6 md:p-8 bg-neutral-dark border border-white/5 rounded-lg flex flex-col justify-center">
        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center text-center py-8">
            <CheckCircle className="h-16 w-16 text-accent animate-bounce" />
            <h4 className="font-editorial text-2xl font-bold text-foreground mt-4">
              MESSAGE SENT
            </h4>
            <p className="font-sans text-xs text-neutral-grey mt-2 max-w-sm">
              Thank you. Your enquiry has been received. Alexandra will get back to you within 24 hours.
            </p>
            <button
              data-cursor="pointer"
              onClick={() => setIsSubmitted(false)}
              className="mt-6 px-4 py-2 border border-white/10 text-foreground hover:border-accent font-sans text-[10px] font-bold tracking-widest uppercase transition-colors"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block font-sans text-[9px] font-bold text-neutral-grey uppercase tracking-widest mb-1.5">
                Your Name
              </label>
              <input
                type="text"
                {...register("name")}
                className="w-full bg-background border border-white/10 rounded px-3 py-2 text-xs text-foreground focus:outline-none focus:border-accent transition-colors"
                placeholder="e.g. Eleanor Sterling"
              />
              {errors.name && (
                <p className="font-sans text-[9px] text-red-400 font-bold mt-1 uppercase tracking-wider">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block font-sans text-[9px] font-bold text-neutral-grey uppercase tracking-widest mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                {...register("email")}
                className="w-full bg-background border border-white/10 rounded px-3 py-2 text-xs text-foreground focus:outline-none focus:border-accent transition-colors"
                placeholder="e.g. eleanor@vogue.com"
              />
              {errors.email && (
                <p className="font-sans text-[9px] text-red-400 font-bold mt-1 uppercase tracking-wider">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Project Type */}
            <div>
              <label className="block font-sans text-[9px] font-bold text-neutral-grey uppercase tracking-widest mb-1.5">
                Project Type
              </label>
              <select
                {...register("projectType")}
                className="w-full bg-background border border-white/10 rounded px-3 py-2 text-xs text-foreground focus:outline-none focus:border-accent transition-colors"
              >
                <option value="Commercial">Commercial / Branding</option>
                <option value="Fashion">Fashion / Editorial</option>
                <option value="Documentary">Documentary / Cinematic Film</option>
                <option value="Other">Other Creative Inquiry</option>
              </select>
              {errors.projectType && (
                <p className="font-sans text-[9px] text-red-400 font-bold mt-1 uppercase tracking-wider">
                  {errors.projectType.message}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label className="block font-sans text-[9px] font-bold text-neutral-grey uppercase tracking-widest mb-1.5">
                Brief / Narrative Details
              </label>
              <textarea
                {...register("message")}
                rows={4}
                className="w-full bg-background border border-white/10 rounded px-3 py-2 text-xs text-foreground focus:outline-none focus:border-accent transition-colors resize-none"
                placeholder="Describe your creative vision, timeline, and goals..."
              />
              {errors.message && (
                <p className="font-sans text-[9px] text-red-400 font-bold mt-1 uppercase tracking-wider">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              data-cursor="pointer"
              disabled={isSubmitting}
              className="w-full py-3 bg-accent hover:bg-accent-muted text-background font-sans text-xs font-bold tracking-widest uppercase transition-colors duration-300 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>SENDING...</span>
              ) : (
                <>
                  <span>SEND INQUIRY</span>
                  <Send className="h-3 w-3" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
