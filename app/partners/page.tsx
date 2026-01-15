"use client";

import { useEffect, useState } from "react";
import {
  Sun,
  Moon,
  ArrowRight,
  Stethoscope,
  Users,
  Shield,
  Clock,
  Heart,
  CheckCircle2,
  FileText,
  UserCheck,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PartnersPage() {
  const [isDark, setIsDark] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.theme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      setIsDark(false);
    }

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

    setTimeout(() => {
      document.querySelectorAll("#hero .animate-on-scroll").forEach((el) => {
        el.classList.add("animate");
      });
    }, 100);

    return () => {
      observer.disconnect();
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
    <div className="bg-zinc-50 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 font-sans antialiased min-h-screen w-full overflow-x-hidden flex flex-col transition-colors duration-300">
      {/* Subtle Background Glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-gradient-to-b from-zinc-200/40 via-zinc-100/20 to-transparent dark:from-zinc-900/40 dark:via-zinc-950/20 dark:to-transparent -z-10 pointer-events-none transition-colors duration-500"></div>
      <div className="fixed top-[-200px] right-[-100px] w-[600px] h-[600px] bg-zinc-200/50 dark:bg-zinc-800/20 rounded-full blur-[120px] -z-10 pointer-events-none transition-colors duration-500"></div>

      {/* Mouse Spotlight */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-spotlight transition-opacity duration-300"></div>

      {/* Top Gradient Line */}
      <div className="fixed top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent z-50 opacity-50"></div>

      {/* Navigation */}
      <nav className="fixed top-6 z-50 left-1/2 -translate-x-1/2 w-[90%] md:w-auto max-w-5xl shrink-0">
        <div className="rounded-full border border-zinc-200 dark:border-white/10 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/50 px-4 md:px-5 h-14 flex items-center justify-between gap-4 md:gap-12 transition-all duration-300">
          <Link href="/" className="flex items-center gap-2">
            <Heart className="text-zinc-900 dark:text-white w-5 h-5" strokeWidth={1.5} />
            <span className="text-sm font-medium tracking-tight text-zinc-900 dark:text-white">
              Mom Care<span className="text-zinc-400 dark:text-zinc-500"> On Call</span>
            </span>
          </Link>

          <div className="flex items-center gap-2 md:gap-4">
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
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative pt-24">
        {/* HERO SECTION */}
        <section
          className="flex flex-col w-full max-w-7xl z-10 mt-16 md:mt-32 mx-auto px-6 relative min-h-[60vh] justify-center"
          id="hero"
        >
          <div className="w-full max-w-5xl mx-auto">
            <div className="relative z-20 animate-on-scroll">
              <div className="flex flex-col gap-2 mb-8">
                <div className="flex text-xs text-zinc-500 dark:text-zinc-500 font-mono mb-4 gap-x-2 gap-y-2 items-center tracking-widest uppercase">
                  PARTNER WITH US
                  <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></div>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tighter font-serif text-zinc-900 dark:text-white dark:mix-blend-screen transition-colors">
                  <span className="block word-mask">
                    <span
                      className="block word-reveal"
                      style={{ transitionDelay: "100ms" }}
                    >
                      What is your
                    </span>
                  </span>
                  <span className="block word-mask">
                    <span
                      className="block word-reveal font-light text-zinc-400 dark:text-zinc-500 font-sans"
                      style={{ transitionDelay: "250ms" }}
                    >
                      profession?
                    </span>
                  </span>
                </h1>
              </div>
            </div>

            {/* Profession Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 animate-on-scroll" style={{ transitionDelay: "400ms" }}>
              {/* Doctor Card */}
              <button
                onClick={() => router.push("/partners/doctors")}
                className="group relative rounded-2xl bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-white/10 p-8 spotlight-group overflow-hidden hover:bg-zinc-50 dark:hover:bg-zinc-900/50 hover:border-zinc-300 dark:hover:border-white/20 transition-all duration-500 backdrop-blur-sm shadow-sm dark:shadow-none text-left"
              >
                <div className="absolute inset-0 pointer-events-none opacity-0 spotlight-border transition-opacity duration-300"></div>
                <div className="h-16 w-16 bg-teal-100 dark:bg-teal-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:bg-teal-200 dark:group-hover:bg-teal-900/50 transition-colors">
                  <Stethoscope className="text-teal-600 dark:text-teal-400 w-8 h-8" />
                </div>
                <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-3">
                  Doctor
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 font-light leading-relaxed mb-6">
                  Join our network of verified doctors and provide expert maternal care to families across Bengaluru.
                </p>
                <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-medium text-sm group-hover:gap-3 transition-all">
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </div>
              </button>

              {/* Nurse Card */}
              <button
                onClick={() => router.push("/partners/nurses")}
                className="group relative rounded-2xl bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-white/10 p-8 spotlight-group overflow-hidden hover:bg-zinc-50 dark:hover:bg-zinc-900/50 hover:border-zinc-300 dark:hover:border-white/20 transition-all duration-500 backdrop-blur-sm shadow-sm dark:shadow-none text-left"
              >
                <div className="absolute inset-0 pointer-events-none opacity-0 spotlight-border transition-opacity duration-300"></div>
                <div className="h-16 w-16 bg-teal-100 dark:bg-teal-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:bg-teal-200 dark:group-hover:bg-teal-900/50 transition-colors">
                  <Users className="text-teal-600 dark:text-teal-400 w-8 h-8" />
                </div>
                <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-3">
                  Nurse
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 font-light leading-relaxed mb-6">
                  Join our network of verified nurses and provide expert maternal care to families across Bengaluru.
                </p>
                <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-medium text-sm group-hover:gap-3 transition-all">
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* WHY PARTNER SECTION */}
        <section
          className="flex flex-col w-full max-w-7xl z-20 mt-32 md:mt-40 mx-auto px-6 relative"
          id="why-partner"
        >
          <div className="text-center max-w-2xl mx-auto mb-16 animate-on-scroll">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Heart
                className="text-zinc-900 dark:text-white text-xl"
                strokeWidth={1.5}
              />
              <span className="text-xs font-mono tracking-widest uppercase text-zinc-900 dark:text-white font-bold">
                Why Partner With Us
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-zinc-900 dark:text-white tracking-tight mb-6 leading-none transition-colors">
              <span className="italic block text-zinc-500 dark:text-zinc-600 font-light">
                Join a mission to
              </span>
              <span className="font-medium">transform maternal care.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative rounded-xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/5 p-6 spotlight-group overflow-hidden hover:border-zinc-300 dark:hover:border-white/20 transition-all duration-300 flex flex-col h-full animate-on-scroll shadow-sm dark:shadow-none">
              <div className="absolute inset-0 pointer-events-none opacity-0 spotlight-border transition-opacity duration-300"></div>
              <div className="h-12 w-12 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center mb-4 text-zinc-900 dark:text-white group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-colors">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
                Reach More Families
              </h3>
              <p className="text-sm text-zinc-500 font-light leading-relaxed">
                Connect with families who need your expertise. Our platform ensures you're matched with patients in your service area.
              </p>
            </div>

            <div
              className="group relative rounded-xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/5 p-6 spotlight-group overflow-hidden hover:border-zinc-300 dark:hover:border-white/20 transition-all duration-300 flex flex-col h-full animate-on-scroll shadow-sm dark:shadow-none"
              style={{ transitionDelay: "100ms" }}
            >
              <div className="absolute inset-0 pointer-events-none opacity-0 spotlight-border transition-opacity duration-300"></div>
              <div className="h-12 w-12 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center mb-4 text-zinc-900 dark:text-white group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-colors">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
                Verified Network
              </h3>
              <p className="text-sm text-zinc-500 font-light leading-relaxed">
                Be part of a trusted network. We verify all professionals and maintain the highest standards of care.
              </p>
            </div>

            <div
              className="group relative rounded-xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/5 p-6 spotlight-group overflow-hidden hover:border-zinc-300 dark:hover:border-white/20 transition-all duration-300 flex flex-col h-full animate-on-scroll shadow-sm dark:shadow-none"
              style={{ transitionDelay: "200ms" }}
            >
              <div className="absolute inset-0 pointer-events-none opacity-0 spotlight-border transition-opacity duration-300"></div>
              <div className="h-12 w-12 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center mb-4 text-zinc-900 dark:text-white group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-colors">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
                Flexible Schedule
              </h3>
              <p className="text-sm text-zinc-500 font-light leading-relaxed">
                Set your own availability. Work when it suits you, and we'll match you with patients accordingly.
              </p>
            </div>
          </div>
        </section>

        {/* PROCEDURE SECTION */}
        <section
          className="flex flex-col w-full z-20 mt-32 md:mt-44 relative py-32 border-t border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-500"
          id="procedure"
        >
          <div className="max-w-7xl mx-auto px-6 w-full relative">
            <div className="text-center max-w-2xl mx-auto mb-20 animate-on-scroll">
              <div className="flex items-center justify-center gap-2 mb-6">
                <FileText
                  className="text-zinc-900 dark:text-white text-xl"
                  strokeWidth={1.5}
                />
                <span className="text-xs font-mono tracking-widest uppercase text-zinc-900 dark:text-white font-bold">
                  Our Procedure
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif italic text-zinc-900 dark:text-white tracking-tight mb-4 transition-colors">
                Simple <span className="not-italic text-zinc-500 dark:text-zinc-500 font-normal font-sans">Onboarding Process</span>
              </h2>
              <p className="text-zinc-600 dark:text-zinc-500 text-lg font-light leading-relaxed">
                Getting started is easy. Follow these simple steps to join our network.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="flex flex-col items-center text-center animate-on-scroll">
                <div className="h-16 w-16 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center mb-6 border-2 border-teal-200 dark:border-teal-800">
                  <FileText className="text-teal-600 dark:text-teal-400 w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-3">
                  Step 1: Fill Application
                </h3>
                <p className="text-sm text-zinc-500 font-light leading-relaxed">
                  Complete our comprehensive onboarding form with your details, qualifications, and availability.
                </p>
              </div>

              <div
                className="flex flex-col items-center text-center animate-on-scroll"
                style={{ transitionDelay: "100ms" }}
              >
                <div className="h-16 w-16 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center mb-6 border-2 border-teal-200 dark:border-teal-800">
                  <UserCheck className="text-teal-600 dark:text-teal-400 w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-3">
                  Step 2: Verification
                </h3>
                <p className="text-sm text-zinc-500 font-light leading-relaxed">
                  Our team reviews your application and verifies your credentials and documents.
                </p>
              </div>

              <div
                className="flex flex-col items-center text-center animate-on-scroll"
                style={{ transitionDelay: "200ms" }}
              >
                <div className="h-16 w-16 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center mb-6 border-2 border-teal-200 dark:border-teal-800">
                  <CheckCircle2 className="text-teal-600 dark:text-teal-400 w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-3">
                  Step 3: Get Started
                </h3>
                <p className="text-sm text-zinc-500 font-light leading-relaxed">
                  Once approved, you'll receive access to our platform and can start receiving patient requests.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="w-full relative py-32 overflow-hidden bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-white/10 transition-colors duration-500">
          <div className="relative max-w-7xl mx-auto px-6 flex flex-col items-center text-center z-10 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-serif text-zinc-900 dark:text-white tracking-tight leading-none mb-6 transition-colors">
              Ready to make a difference?
            </h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-500 font-light max-w-2xl mb-10">
              Join hundreds of healthcare professionals making maternal care accessible across Bengaluru.
            </p>
            <button
              onClick={() => router.push("/partners/doctors")}
              className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-teal-600 dark:bg-teal-400 px-8 font-medium text-white dark:text-zinc-950 transition-all duration-300 hover:bg-teal-700 dark:hover:bg-teal-300"
            >
              <span className="mr-2 text-sm">Start Your Application</span>
              <ArrowRight
                className="text-zinc-200 dark:text-zinc-600 group-hover:text-white dark:group-hover:text-zinc-900 transition-colors w-4 h-4"
                strokeWidth={1.5}
              />
            </button>
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
                <Link
                  href="/"
                  className="hover:text-zinc-900 dark:hover:text-white transition-colors"
                >
                  Home
                </Link>
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
