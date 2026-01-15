"use client";

import { useEffect, useState } from "react";
import {
  Sun,
  Moon,
  ArrowRight,
  ArrowDown,
  Zap,
  Home,
  User,
  MapPin,
  Mail,
  Phone,
  Heart,
  Baby,
  Clock,
  Shield,
  Smartphone,
  Stethoscope,
  Users,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";

export default function Page() {
  const [isDark, setIsDark] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    // Theme initialization
    // Default to light theme, regardless of system setting.
    // Only switch to dark if the user has explicitly chosen it before.
    if (localStorage.theme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      setIsDark(false);
    }

    // Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -10% 0px" }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    // Trigger hero animations immediately
    setTimeout(() => {
      document.querySelectorAll("#hero .animate-on-scroll").forEach((el) => {
        el.classList.add("animate");
      });
    }, 100);

    // Trigger word reveal animations
    setTimeout(() => {
      const hero = document.getElementById("hero");
      if (hero) {
        hero.classList.add("animate");
      }
    }, 200);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      document.documentElement.style.setProperty("--mouse-x", `${x}px`);
      document.documentElement.style.setProperty("--mouse-y", `${y}px`);

      document.querySelectorAll(".spotlight-group").forEach((group) => {
        const rect = group.getBoundingClientRect();
        const relX = x - rect.left;
        const relY = y - rect.top;
        (group as HTMLElement).style.setProperty(
          "--mouse-x-rel",
          `${relX}px`
        );
        (group as HTMLElement).style.setProperty(
          "--mouse-y-rel",
          `${relY}px`
        );
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      observer.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const toggleTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      setIsDark(true);
    }
  };

  return (
    <div
      id="main-body"
      className="bg-zinc-50 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 font-sans antialiased min-h-screen w-full overflow-x-hidden flex flex-col transition-colors duration-300"
    >
      {/* Subtle Background Glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-gradient-to-b from-zinc-200/40 via-zinc-100/20 to-transparent dark:from-zinc-900/40 dark:via-zinc-950/20 dark:to-transparent -z-10 pointer-events-none transition-colors duration-500"></div>
      <div className="fixed top-[-200px] right-[-100px] w-[600px] h-[600px] bg-zinc-200/50 dark:bg-zinc-800/20 rounded-full blur-[120px] -z-10 pointer-events-none transition-colors duration-500"></div>

      {/* Mouse Spotlight */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-spotlight transition-opacity duration-300"></div>

      {/* Top Gradient Line */}
      <div className="fixed top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent z-50 opacity-50"></div>

      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none z-0 grid grid-cols-6 md:grid-cols-12 max-w-7xl mx-auto border-x border-zinc-200 dark:border-white/5 h-[3200px] transition-colors duration-500">
        <div className="border-r border-zinc-200 dark:border-white/5 h-full hidden md:block animate-line relative overflow-hidden delay-100">
          <div
            className="absolute -top-40 -right-[1px] w-[1px] h-40 bg-gradient-to-b from-transparent via-zinc-900/10 dark:via-white/20 to-transparent animate-beam"
            style={{ animationDuration: "7s" }}
          ></div>
        </div>
        <div className="border-r border-zinc-200 dark:border-white/5 h-full hidden md:block animate-line delay-300"></div>
        <div className="border-r border-zinc-200 dark:border-white/5 h-full hidden md:block animate-line delay-150 relative overflow-hidden">
          <div
            className="absolute -top-52 -right-[1px] w-[1px] h-52 bg-gradient-to-b from-transparent via-zinc-900/5 dark:via-white/10 to-transparent animate-beam"
            style={{ animationDuration: "11s", animationDelay: "2s" }}
          ></div>
        </div>
        <div className="border-r border-zinc-200 dark:border-white/5 h-full hidden md:block animate-line delay-200"></div>
        <div className="border-r border-zinc-200 dark:border-white/5 h-full hidden md:block animate-line delay-75"></div>
        <div className="border-r border-zinc-200 dark:border-white/5 h-full hidden md:block animate-line delay-300"></div>
        <div className="border-r border-zinc-200 dark:border-white/5 h-full hidden md:block animate-line delay-100 relative overflow-hidden">
          <div
            className="absolute -top-64 -right-[1px] w-[1px] h-64 bg-gradient-to-b from-transparent via-zinc-900/10 dark:via-white/20 to-transparent animate-beam"
            style={{ animationDuration: "9s", animationDelay: "1.5s" }}
          ></div>
        </div>
        <div className="border-r border-zinc-200 dark:border-white/5 h-full hidden md:block animate-line delay-200"></div>
        <div className="border-r border-zinc-200 dark:border-white/5 h-full hidden md:block animate-line delay-400"></div>
        <div className="border-r border-zinc-200 dark:border-white/5 h-full hidden md:block animate-line delay-150"></div>
        <div className="border-r border-zinc-200 dark:border-white/5 h-full hidden md:block animate-line delay-300"></div>
      </div>

      {/* Pill Navigation */}
      <nav className="fixed top-6 z-50 left-1/2 -translate-x-1/2 w-[90%] md:w-auto max-w-5xl shrink-0">
        <div className="rounded-full border border-zinc-200 dark:border-white/10 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/50 px-4 md:px-5 h-14 flex items-center justify-between gap-4 md:gap-12 transition-all duration-300">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Heart className="text-zinc-900 dark:text-white w-5 h-5" strokeWidth={1.5} />
            <span className="text-sm font-medium tracking-tight text-zinc-900 dark:text-white">
              Mom Care<span className="text-zinc-400 dark:text-zinc-500"> On Call</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="#about"
              className="text-xs font-medium text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors"
            >
              Why
            </a>
            <a
              href="#focus"
              className="text-xs font-medium text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors"
            >
              How It Works
            </a>
            <a
              href="#services"
              className="text-xs font-medium text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#leadership"
              className="text-xs font-medium text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors"
            >
              Safety
            </a>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="rounded-full w-8 h-8 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Toggle Theme"
            >
              {isDark ? (
                <Sun className="w-4 h-4" strokeWidth={1.5} />
              ) : (
                <Moon className="w-4 h-4" strokeWidth={1.5} />
              )}
            </button>

            {/* Primary CTA (hidden on very small screens when menu open) */}
            <a
              href="#contact"
              className="hidden sm:inline-flex rounded-full bg-teal-600 dark:bg-teal-400 px-5 py-2 text-xs font-semibold text-white dark:text-zinc-950 hover:bg-teal-700 dark:hover:bg-teal-300 transition-all overflow-hidden group"
            >
              <span className="relative z-10">Get Care Now</span>
            </a>

            {/* Mobile Hamburger */}
            <button
              className="inline-flex md:hidden w-9 h-9 rounded-full items-center justify-center border border-zinc-200 dark:border-zinc-700 bg-white/80 dark:bg-zinc-900/80 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Toggle navigation menu"
              onClick={() => setIsMobileNavOpen((open) => !open)}
            >
              {isMobileNavOpen ? (
                <X className="w-4 h-4" strokeWidth={1.5} />
              ) : (
                <Menu className="w-4 h-4" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav Menu */}
        {isMobileNavOpen && (
          <div className="mt-3 md:hidden px-2">
            <div className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl shadow-lg py-2 flex flex-col text-sm text-zinc-700 dark:text-zinc-200">
              <a
                href="#about"
                className="px-4 py-2 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                onClick={() => setIsMobileNavOpen(false)}
              >
                <span>Why</span>
                <ArrowRight className="w-3 h-3" strokeWidth={1.5} />
              </a>
              <a
                href="#focus"
                className="px-4 py-2 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                onClick={() => setIsMobileNavOpen(false)}
              >
                <span>How It Works</span>
                <ArrowRight className="w-3 h-3" strokeWidth={1.5} />
              </a>
              <a
                href="#services"
                className="px-4 py-2 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                onClick={() => setIsMobileNavOpen(false)}
              >
                <span>Features</span>
                <ArrowRight className="w-3 h-3" strokeWidth={1.5} />
              </a>
              <a
                href="#leadership"
                className="px-4 py-2 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                onClick={() => setIsMobileNavOpen(false)}
              >
                <span>Safety</span>
                <ArrowRight className="w-3 h-3" strokeWidth={1.5} />
              </a>
              <div className="border-t border-zinc-200 dark:border-zinc-800 mt-1 pt-1">
                <a
                  href="#contact"
                  className="mx-2 mb-2 mt-1 inline-flex items-center justify-center rounded-full bg-teal-600 dark:bg-teal-400 px-4 py-2 text-xs font-semibold text-white dark:text-zinc-950 hover:bg-teal-700 dark:hover:bg-teal-300 transition-colors"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  Get Care Now
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="relative pt-24">
        {/* HERO SECTION */}
        <section
          className="flex flex-col w-full max-w-7xl z-10 mt-16 md:mt-32 mx-auto px-6 relative min-h-[80vh] justify-center"
          id="hero"
        >
          {/* Top Badge */}
          <div className="w-full flex justify-start mb-10 spotlight-group relative animate-on-scroll">
            <a
              href="#about"
              className="relative z-10 group flex items-center gap-3 rounded-full border border-zinc-200 dark:border-white/10 bg-white/50 dark:bg-zinc-900/50 pr-4 pl-1.5 py-1.5 hover:border-zinc-300 dark:hover:border-white/20 transition-all overflow-hidden"
            >
              <span className="rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-white/5 px-2.5 py-0.5 text-[10px] font-bold text-zinc-900 dark:text-white tracking-wide uppercase">
                10 Min
              </span>
              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-300">
                Professional Care at Your Doorstep
              </span>
              <ArrowRight
                className="text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white group-hover:translate-x-0.5 transition-all w-3.5 h-3.5"
                strokeWidth={1.5}
              />
            </a>
          </div>

          {/* Headline */}
          <div className="w-full max-w-5xl">
            <div className="relative z-20 animate-on-scroll">
              <div className="flex flex-col gap-2">
                <div className="flex text-xs text-zinc-500 dark:text-zinc-500 font-mono mb-4 gap-x-2 gap-y-2 items-center tracking-widest uppercase">
                  MOMS CARE{" "}
                  <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></div>
                </div>

                <h1 className="text-5xl md:text-8xl lg:text-[100px] leading-[0.95] tracking-tighter font-serif text-zinc-900 dark:text-white dark:mix-blend-screen transition-colors">
                  <span className="block word-mask">
                    <span
                      className="block word-reveal"
                      style={{ transitionDelay: "100ms" }}
                    >
                      You're never alone,
                    </span>
                  </span>
                  <span className="block word-mask">
                    <span
                      className="block word-reveal font-light text-zinc-400 dark:text-zinc-500 font-sans"
                      style={{ transitionDelay: "250ms" }}
                    >
                      even when he's at work.
                    </span>
                  </span>
                </h1>
              </div>
            </div>
          </div>

          {/* CTA & Description */}
          <div
            className="mt-20 md:mt-32 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-end animate-on-scroll"
            style={{ transitionDelay: "400ms" }}
          >
            {/* Description Card */}
            <div className="group relative rounded-2xl bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-white/10 p-6 md:p-8 spotlight-group overflow-hidden hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-all duration-500 backdrop-blur-sm shadow-sm dark:shadow-none">
              <div className="absolute inset-0 pointer-events-none opacity-0 spotlight-border transition-opacity duration-300"></div>

              <div className="absolute left-0 top-8 w-0.5 h-12 bg-zinc-900 dark:bg-white rounded-r-full"></div>
              <p className="text-lg md:text-xl text-zinc-700 dark:text-zinc-300 font-serif italic leading-relaxed z-10 relative max-w-lg">
                "Professional maternal care at your doorstep in 10 minutes. Designed for Bengaluru's nuclear families, providing peace of mind for both of you."
              </p>
              <div className="mt-8 flex gap-3 items-center">
                {/* Abstract representation of care */}
                <div className="flex -space-x-3">
                  <div className="h-8 w-8 rounded-full ring-2 ring-zinc-50 dark:ring-zinc-900 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-white/10">
                    <Heart className="text-zinc-500 dark:text-zinc-400 w-3.5 h-3.5" />
                  </div>
                  <div className="h-8 w-8 rounded-full ring-2 ring-zinc-50 dark:ring-zinc-900 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-white/10">
                    <Baby className="text-zinc-500 dark:text-zinc-400 w-3.5 h-3.5" />
                  </div>
                  <div className="h-8 w-8 rounded-full ring-2 ring-zinc-50 dark:ring-zinc-900 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-white/10">
                    <Clock className="text-zinc-500 dark:text-zinc-400 w-3.5 h-3.5" />
                  </div>
                </div>
                <span className="text-[10px] text-zinc-500 font-mono tracking-wider font-semibold uppercase">
                  Serving Bengaluru
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row md:items-center gap-4 z-10 lg:justify-end pb-4">
              <a
                href="/partners"
                className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-teal-600 dark:bg-teal-400 px-8 font-medium text-white dark:text-zinc-950 transition-all duration-300 hover:bg-teal-700 dark:hover:bg-teal-300"
              >
                <span className="mr-2 text-sm">Partner With Us</span>
                <ArrowDown
                  className="text-zinc-200 dark:text-zinc-600 group-hover:text-white dark:group-hover:text-zinc-900 transition-colors w-4 h-4"
                  strokeWidth={1.5}
                />
              </a>

              <a
                href="#contact"
                className="group inline-flex h-12 items-center justify-center rounded-full border border-zinc-200 dark:border-white/10 bg-transparent px-8 font-medium text-zinc-600 dark:text-zinc-400 transition-all hover:text-zinc-900 dark:hover:text-white hover:border-zinc-400 dark:hover:border-white/30"
              >
                <span className="text-sm">Get Care Now</span>
                <ArrowRight
                  className="ml-2 text-zinc-400 dark:text-zinc-600 group-hover:translate-x-1 group-hover:text-zinc-900 dark:group-hover:text-white transition-all w-4 h-4"
                  strokeWidth={1.5}
                />
              </a>
            </div>
          </div>

          {/* Marquee */}
          <div
            className="z-20 w-full mt-24 relative animate-on-scroll"
            style={{ transitionDelay: "600ms" }}
          >
            <p className="uppercase text-xs font-bold text-zinc-400 dark:text-zinc-600 tracking-widest font-mono text-center mb-10">
              Trusted by Families Across Bengaluru
            </p>

            <div className="relative flex overflow-hidden marquee-mask">
              <div className="flex animate-marquee whitespace-nowrap min-w-full gap-x-24 items-center opacity-30 hover:opacity-50 transition-opacity dark:text-white text-zinc-900">
                {/* Custom Care Icons */}
                <div className="flex items-center gap-2">
                  <Heart className="w-8 h-8" />
                  <span className="font-mono text-sm tracking-widest">
                    MATERNAL CARE
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Stethoscope className="w-8 h-8" />
                  <span className="font-mono text-sm tracking-widest">NURSING</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-8 h-8" />
                  <span className="font-mono text-sm tracking-widest">10 MIN RESPONSE</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-8 h-8" />
                  <span className="font-mono text-sm tracking-widest">
                    VERIFIED PROFESSIONALS
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-8 h-8" />
                  <span className="font-mono text-sm tracking-widest">24/7 SUPPORT</span>
                </div>

                {/* Duplicate */}
                <div className="flex items-center gap-2">
                  <Heart className="w-8 h-8" />
                  <span className="font-mono text-sm tracking-widest">
                    MATERNAL CARE
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Stethoscope className="w-8 h-8" />
                  <span className="font-mono text-sm tracking-widest">NURSING</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-8 h-8" />
                  <span className="font-mono text-sm tracking-widest">10 MIN RESPONSE</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-8 h-8" />
                  <span className="font-mono text-sm tracking-widest">
                    VERIFIED PROFESSIONALS
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-8 h-8" />
                  <span className="font-mono text-sm tracking-widest">24/7 SUPPORT</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section
          className="flex flex-col w-full max-w-7xl z-20 mt-32 md:mt-40 mx-auto px-6 relative"
          id="about"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 w-full">
            {/* Text Content */}
            <div className="flex flex-col justify-center animate-on-scroll">
              <div className="flex items-center gap-2 mb-6">
                <Heart
                  className="text-zinc-900 dark:text-white text-xl"
                  strokeWidth={1.5}
                />
                <span className="text-xs font-mono tracking-widest uppercase text-zinc-900 dark:text-white font-bold">
                  The Problem
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-serif text-zinc-900 dark:text-white tracking-tight mb-6 leading-none transition-colors">
                <span className="italic block text-zinc-500 dark:text-zinc-600 font-light">
                  Because pregnancy doesn't
                </span>
                <span className="font-medium">follow a 9-to-5 schedule.</span>
              </h2>

              <p className="text-lg text-zinc-600 dark:text-zinc-500 font-light leading-relaxed mb-10 max-w-lg">
                Living in a nuclear family means that when the husband is at the office, the wife is often home alone. If discomfort, anxiety, or a need for assistance arises, the last thing you want to do is navigate Bengaluru traffic or wait for hours.
              </p>

              <div className="grid grid-cols-2 gap-y-8 gap-x-4 mb-12">
                <div className="flex items-start gap-3 group">
                  <div className="mt-0.5 text-white dark:text-zinc-950 bg-zinc-900 dark:bg-white p-1 rounded-md transition-colors">
                    <Heart className="w-[18px] h-[18px]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-zinc-900 dark:text-white mb-0.5">
                      Mothers feel supported
                    </div>
                    <div className="text-xs text-zinc-500 font-light">
                      Safe and secure at home
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 group">
                  <div className="mt-0.5 text-white dark:text-zinc-950 bg-zinc-900 dark:bg-white p-1 rounded-md transition-colors">
                    <Shield className="w-[18px] h-[18px]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-zinc-900 dark:text-white mb-0.5">
                      Husbands can focus
                    </div>
                    <div className="text-xs text-zinc-500 font-light">
                      Expert help just a tap away
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Content */}
            <div
              className="flex flex-col gap-10 animate-on-scroll"
              style={{ transitionDelay: "200ms" }}
            >
              {/* Visual Card */}
              <div className="w-full rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 p-1 relative shadow-xl dark:shadow-2xl shadow-black/5 dark:shadow-black/50 transition-colors duration-500">
                <div className="flex overflow-hidden bg-zinc-100 dark:bg-black w-full h-[400px] rounded-lg relative group">
                  {/* Image Background */}
                  <Image
                    src="/problem.jpg"
                    alt="Maternal Care"
                    fill
                    className="object-cover opacity-60 dark:opacity-40 grayscale group-hover:scale-105 transition-transform duration-1000 ease-out"
                  />

                  {/* Overlay UI Elements */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-200 via-transparent to-transparent dark:from-zinc-950 dark:via-transparent dark:to-zinc-950/50"></div>

                  <div className="absolute bottom-6 left-6 right-6 z-10">
                    <div className="p-4 rounded-lg bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200 dark:border-white/10 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                          <span className="text-xs font-semibold text-zinc-900 dark:text-white">
                            Mom Care On Call
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
                          24/7 AVAILABLE
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded text-[10px] text-zinc-600 dark:text-zinc-300">
                          Bengaluru
                        </span>
                        <span className="px-2 py-1 bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded text-[10px] text-zinc-600 dark:text-zinc-300">
                          10 Min Response
                        </span>
                        <span className="px-2 py-1 bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded text-[10px] text-zinc-600 dark:text-zinc-300">
                          Verified Nurses
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOCUS AREAS SECTION */}
        <section
          className="flex flex-col w-full z-20 mt-32 md:mt-44 relative py-32 border-t border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-500"
          id="focus"
        >
          <div className="absolute inset-0 bg-[radial-gradient(#a1a1aa_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:100px_50px] opacity-20 pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-6 w-full relative">
            <div className="text-center max-w-2xl mx-auto mb-20 animate-on-scroll">
              <h2 className="text-4xl md:text-5xl font-serif italic text-zinc-900 dark:text-white tracking-tight mb-4 transition-colors">
                Support in <span className="not-italic text-zinc-500 dark:text-zinc-500 font-normal font-sans">3 Simple Steps</span>
              </h2>
              <p className="text-zinc-600 dark:text-zinc-500 text-lg font-light leading-relaxed">
                Getting professional care has never been easier. Request help in seconds, get matched instantly, and receive care at your doorstep within 10 minutes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              {/* Step 1: Quick Request */}
              <div className="group relative rounded-xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/5 p-6 spotlight-group overflow-hidden hover:border-zinc-300 dark:hover:border-white/20 transition-all duration-300 flex flex-col h-full animate-on-scroll shadow-sm dark:shadow-none">
                <div className="absolute inset-0 pointer-events-none opacity-0 spotlight-border transition-opacity duration-300"></div>

                <div className="h-56 w-full mb-8 rounded-lg bg-zinc-100 dark:bg-black border border-zinc-200 dark:border-white/5 relative overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2670&auto=format&fit=crop"
                    alt="Quick Request"
                    fill
                    className="object-cover opacity-60 dark:opacity-50 grayscale group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-200/90 dark:from-zinc-900/90 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <div className="px-2 py-1 bg-white/80 dark:bg-zinc-800/80 border border-zinc-200 dark:border-white/10 rounded flex items-center gap-2 w-fit">
                      <Smartphone className="text-emerald-500 w-3 h-3" />
                      <span className="text-[10px] font-mono text-zinc-600 dark:text-zinc-300">
                        STEP 1
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-auto relative z-10">
                  <h3 className="text-lg text-zinc-900 dark:text-white font-medium mb-2 tracking-tight">
                    Quick Request
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed font-light">
                    Open the app and fill out a 30-second form (Name, Month, and Address).
                  </p>
                </div>
              </div>

              {/* Step 2: Instant Matching */}
              <div
                className="group relative rounded-xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/5 p-6 spotlight-group overflow-hidden hover:border-zinc-300 dark:hover:border-white/20 transition-all duration-300 flex flex-col h-full animate-on-scroll shadow-sm dark:shadow-none"
                style={{ transitionDelay: "100ms" }}
              >
                <div className="absolute inset-0 pointer-events-none opacity-0 spotlight-border transition-opacity duration-300"></div>

                <div className="h-56 w-full mb-8 rounded-lg bg-zinc-100 dark:bg-black border border-zinc-200 dark:border-white/5 relative overflow-hidden">
                  <Image
                    src="/instant_match.jpg"
                    alt="Instant Matching"
                    fill
                    className="object-cover opacity-60 dark:opacity-50 grayscale group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-200/90 dark:from-zinc-900/90 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <div className="px-2 py-1 bg-white/80 dark:bg-zinc-800/80 border border-zinc-200 dark:border-white/10 rounded flex items-center gap-2 w-fit">
                      <Zap className="text-emerald-500 w-3 h-3" />
                      <span className="text-[10px] font-mono text-zinc-600 dark:text-zinc-300">
                        STEP 2
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-auto relative z-10">
                  <h3 className="text-lg text-zinc-900 dark:text-white font-medium mb-2 tracking-tight">
                    Instant Matching
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed font-light">
                    We assign the nearest qualified nurse to your location immediately.
                  </p>
                </div>
              </div>

              {/* Step 3: Doorstep Care */}
              <div
                className="group relative rounded-xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/5 p-6 spotlight-group overflow-hidden hover:border-zinc-300 dark:hover:border-white/20 transition-all duration-300 flex flex-col h-full animate-on-scroll shadow-sm dark:shadow-none"
                style={{ transitionDelay: "200ms" }}
              >
                <div className="absolute inset-0 pointer-events-none opacity-0 spotlight-border transition-opacity duration-300"></div>

                <div className="h-56 w-full mb-8 rounded-lg bg-zinc-100 dark:bg-black border border-zinc-200 dark:border-white/5 relative overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=2670&auto=format&fit=crop"
                    alt="Doorstep Care"
                    fill
                    className="object-cover opacity-60 dark:opacity-50 grayscale group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-200/90 dark:from-zinc-900/90 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <div className="px-2 py-1 bg-white/80 dark:bg-zinc-800/80 border border-zinc-200 dark:border-white/10 rounded flex items-center gap-2 w-fit">
                      <Home className="text-emerald-500 w-3 h-3" />
                      <span className="text-[10px] font-mono text-zinc-600 dark:text-zinc-300">
                        STEP 3
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-auto relative z-10">
                  <h3 className="text-lg text-zinc-900 dark:text-white font-medium mb-2 tracking-tight">
                    Doorstep Care
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed font-light">
                    A professional arrives at your home within 10 minutes to provide the help you need.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECT CONTROLS SECTION */}
        <section
          className="flex flex-col w-full z-20 relative py-32 border-t border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-500"
          id="services"
        >
          <div className="max-w-7xl mx-auto px-6 w-full relative">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 animate-on-scroll">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-serif text-zinc-900 dark:text-white tracking-tight mb-4 leading-none transition-colors">
                  <span className="italic block text-zinc-500 dark:text-zinc-500 font-light">
                    Key
                  </span>
                  <span className="font-medium">Features.</span>
                </h2>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 font-light">
                  Everything you need for peace of mind during your pregnancy journey. Professional care, verified professionals, and instant support when you need it most.
                </p>
              </div>
              <div className="hidden md:block">
                <a
                  href="#contact"
                  className="text-sm font-medium text-zinc-900 dark:text-white border-b border-zinc-300 dark:border-white/20 pb-1 hover:border-zinc-900 dark:hover:border-white transition-all"
                >
                  Download App
                </a>
              </div>
            </div>

            {/* Bento Grid for Services */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(200px,auto)]">
              {/* On-Call Nursing Support */}
              <div className="group relative rounded-2xl bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-white/5 p-6 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 hover:border-zinc-300 dark:hover:border-white/10 transition-all duration-300 spotlight-group overflow-hidden animate-on-scroll shadow-sm dark:shadow-none">
                <div className="absolute inset-0 pointer-events-none opacity-0 spotlight-border transition-opacity duration-300"></div>
                <div className="h-10 w-10 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center mb-4 text-zinc-900 dark:text-white group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-colors">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
                  On-Call Nursing Support
                </h3>
                <p className="text-sm text-zinc-500 font-light leading-relaxed">
                  Whether it's physical discomfort, help with movement, or just a professional check-in, our certified nurses come to you when your partner can't.
                </p>
              </div>

              {/* Verified Doctor Directory */}
              <div
                className="group relative rounded-2xl bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-white/5 p-6 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 hover:border-zinc-300 dark:hover:border-white/10 transition-all duration-300 spotlight-group overflow-hidden animate-on-scroll shadow-sm dark:shadow-none"
                style={{ transitionDelay: "100ms" }}
              >
                <div className="absolute inset-0 pointer-events-none opacity-0 spotlight-border transition-opacity duration-300"></div>
                <div className="h-10 w-10 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center mb-4 text-zinc-900 dark:text-white group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-colors">
                  <User className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
                  Verified Doctor Directory
                </h3>
                <p className="text-sm text-zinc-500 font-light leading-relaxed">
                  Access a curated list of Bengaluru's top obstetricians and specialists. Browse their profiles and contact them directly through the app for consultations.
                </p>
              </div>

              {/* 10-Minute Response Commitment */}
              <div
                className="group relative rounded-2xl bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-white/5 p-6 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 hover:border-zinc-300 dark:hover:border-white/10 transition-all duration-300 spotlight-group overflow-hidden animate-on-scroll shadow-sm dark:shadow-none"
                style={{ transitionDelay: "200ms" }}
              >
                <div className="absolute inset-0 pointer-events-none opacity-0 spotlight-border transition-opacity duration-300"></div>
                <div className="h-10 w-10 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center mb-4 text-zinc-900 dark:text-white group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-colors">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
                  10-Minute Response Commitment
                </h3>
                <p className="text-sm text-zinc-500 font-light leading-relaxed">
                  We understand that in maternal care, every minute counts. Our coordination team works 24/7 to ensure help reaches you faster than a food delivery.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* LEADERSHIP SECTION */}
        <section
          className="flex flex-col w-full z-20 relative pt-32 pb-32 border-t border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-500"
          id="leadership"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#a1a1aa12_1px,transparent_1px),linear-gradient(to_bottom,#a1a1aa12_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:100px_50px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-6 w-full relative">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 animate-on-scroll">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-serif text-zinc-900 dark:text-white tracking-tight mb-4 leading-none transition-colors">
                  <span className="italic block text-zinc-500 dark:text-zinc-500 font-light">
                    Your Safety is
                  </span>
                  <span className="font-medium">Our Priority.</span>
                </h2>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 font-light">
                  We take every measure to ensure your safety and peace of mind. Every professional is verified, every visit is monitored, and every promise is kept.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-on-scroll">
              {/* Verified Professionals */}
              <div className="relative group rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all shadow-sm dark:shadow-none">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-white/5">
                    <Shield className="text-zinc-500 dark:text-zinc-400 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
                      Verified Professionals
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 font-light">
                  Every nurse and doctor is background-checked and highly qualified. We verify credentials, experience, and references before they join our network.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700 text-[10px] text-zinc-600 dark:text-zinc-400">
                    Background Checked
                  </span>
                  <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700 text-[10px] text-zinc-600 dark:text-zinc-400">
                    Certified
                  </span>
                </div>
              </div>

              {/* 24/7 Coordination */}
              <div className="relative group rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all shadow-sm dark:shadow-none">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-white/5">
                    <Users className="text-zinc-500 dark:text-zinc-400 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
                      24/7 Coordination
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 font-light">
                  Our support team monitors every visit from start to finish. You're never alone—we're always watching, always ready to help.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700 text-[10px] text-zinc-600 dark:text-zinc-400">
                    Always Available
                  </span>
                  <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700 text-[10px] text-zinc-600 dark:text-zinc-400">
                    Monitored Visits
                  </span>
                </div>
              </div>

              {/* Built for Bengaluru */}
              <div className="relative group rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all shadow-sm dark:shadow-none">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-white/5">
                    <MapPin className="text-zinc-500 dark:text-zinc-400 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
                      Built for Bengaluru
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 font-light">
                  We understand the local geography and traffic, ensuring we meet our 10-minute promise. Our network is optimized for Bengaluru's unique challenges.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700 text-[10px] text-zinc-600 dark:text-zinc-400">
                    Local Expertise
                  </span>
                  <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700 text-[10px] text-zinc-600 dark:text-zinc-400">
                    10 Min Promise
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT / CTA SECTION */}
        <section
          className="w-full relative py-32 overflow-hidden bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-white/10 transition-colors duration-500"
          id="contact"
        >
          <div className="relative max-w-7xl mx-auto px-6 flex flex-col items-center text-center z-10 animate-on-scroll">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 text-zinc-500 dark:text-zinc-400 text-xs font-mono mb-8 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Available Now
            </div>

            <h2 className="text-5xl md:text-[64px] font-serif text-zinc-900 dark:text-white tracking-tight leading-none mb-6 transition-colors">
              Give your family the gift of <span className="italic text-zinc-500">peace of mind.</span>
            </h2>

            <p className="text-xl text-zinc-600 dark:text-zinc-500 font-light max-w-2xl mb-10">
              Join hundreds of families in Bengaluru who trust Mom Care On Call to be their "extended family" during these precious nine months.
            </p>

            {/* Quick Nurse Request Form */}
            <div className="w-full max-w-md bg-white dark:bg-zinc-900/50 p-6 rounded-2xl border border-zinc-200 dark:border-white/10 backdrop-blur-sm mb-12 text-left shadow-lg dark:shadow-none transition-colors">
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs text-zinc-500 font-medium ml-1">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600 placeholder:text-zinc-400 dark:placeholder:text-zinc-700 transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-zinc-500 font-medium ml-1">
                    Month of Pregnancy
                  </label>
                  <select
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600 transition-all"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select month
                    </option>
                    <option value="1">1st month</option>
                    <option value="2">2nd month</option>
                    <option value="3">3rd month</option>
                    <option value="4">4th month</option>
                    <option value="5">5th month</option>
                    <option value="6">6th month</option>
                    <option value="7">7th month</option>
                    <option value="8">8th month</option>
                    <option value="9">9th month</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-zinc-500 font-medium ml-1">
                    Urgency Type
                  </label>
                  <select
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600 transition-all"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select urgency
                    </option>
                    <option value="urgent">Urgent</option>
                    <option value="regular-checkup">Regular checkup</option>
                    <option value="medication-help">Medication help</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-zinc-500 font-medium ml-1">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    placeholder="Your phone number"
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600 placeholder:text-zinc-400 dark:placeholder:text-zinc-700 transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-zinc-500 font-medium ml-1">
                    Address
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Flat / House number, street, area, landmark"
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600 placeholder:text-zinc-400 dark:placeholder:text-zinc-700 transition-all resize-none"
                  ></textarea>
                </div>

                <button className="w-full py-3 rounded-lg bg-teal-600 dark:bg-teal-400 text-white dark:text-zinc-950 font-semibold hover:bg-teal-700 dark:hover:bg-teal-300 transition-colors shadow-lg shadow-teal-600/10 dark:shadow-teal-400/10">
                  Request Nurse Now
                </button>
              </div>
            </div>

            {/* App Store Buttons */}
            {/* <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a
                href="#"
                className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-xl bg-teal-600 dark:bg-teal-400 px-8 font-medium text-white dark:text-zinc-950 transition-all duration-300 hover:bg-teal-700 dark:hover:bg-teal-300"
              >
                <span className="mr-2 text-sm">Get the App on PlayStore</span>
                <ArrowRight
                  className="text-zinc-400 dark:text-zinc-600 group-hover:text-white dark:group-hover:text-zinc-900 transition-colors w-4 h-4"
                  strokeWidth={1.5}
                />
              </a>

              <a
                href="#"
                className="group inline-flex h-14 items-center justify-center rounded-xl border border-zinc-200 dark:border-white/10 bg-transparent px-8 font-medium text-zinc-600 dark:text-zinc-400 transition-all hover:text-zinc-900 dark:hover:text-white hover:border-zinc-400 dark:hover:border-white/30"
              >
                <span className="text-sm">Get the App on AppStore</span>
                <ArrowRight
                  className="ml-2 text-zinc-400 dark:text-zinc-600 group-hover:translate-x-1 group-hover:text-zinc-900 dark:group-hover:text-white transition-all w-4 h-4"
                  strokeWidth={1.5}
                />
              </a>
            </div> */}

            <div className="flex flex-col gap-4 text-sm text-zinc-500">
              <div className="flex items-center justify-center gap-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>
                  Serving Bengaluru, India
                </span>
              </div>
              <div className="flex items-center justify-center gap-6">
                <a
                  href="mailto:support@momcareoncall.com"
                  className="flex items-center gap-2 hover:text-zinc-900 dark:hover:text-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  support@momcareoncall.com
                </a>
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-2 hover:text-zinc-900 dark:hover:text-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  +91 98765 43210
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="w-full bg-zinc-100 dark:bg-black pt-12 pb-12 relative z-20 border-t border-zinc-200 dark:border-zinc-900 text-zinc-500 dark:text-zinc-400 transition-colors duration-500">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Heart className="text-zinc-900 dark:text-white w-4 h-4" />
                  <span className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-white">
                    Mom Care On Call
                  </span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-600 font-mono">
                  © 2026 Mom Care On Call. All rights reserved.
                </p>
              </div>

              <div className="flex gap-6 text-xs text-zinc-500">
                <a
                  href="#"
                  className="hover:text-zinc-900 dark:hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="hover:text-zinc-900 dark:hover:text-white transition-colors"
                >
                  Terms & Conditions
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
