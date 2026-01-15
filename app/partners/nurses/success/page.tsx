"use client";

import { useEffect, useState } from "react";
import {
  Sun,
  Moon,
  Heart,
  CheckCircle2,
  Mail,
  Clock,
  ArrowRight,
  Home,
} from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  const [isDark, setIsDark] = useState(false);

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
        <section
          className="flex flex-col w-full max-w-7xl z-10 mt-16 md:mt-32 mx-auto px-6 relative min-h-[70vh] justify-center"
          id="hero"
        >
          <div className="w-full max-w-2xl mx-auto text-center">
            <div className="relative z-20 animate-on-scroll">
              {/* Success Icon */}
              <div className="flex justify-center mb-8">
                <div className="h-24 w-24 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center border-4 border-teal-200 dark:border-teal-800">
                  <CheckCircle2 className="text-teal-600 dark:text-teal-400 w-12 h-12" />
                </div>
              </div>

              <div className="flex flex-col gap-2 mb-8">
                <div className="flex text-xs text-zinc-500 dark:text-zinc-500 font-mono mb-4 gap-x-2 gap-y-2 items-center justify-center tracking-widest uppercase">
                  APPLICATION RECEIVED
                  <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></div>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tighter font-serif text-zinc-900 dark:text-white dark:mix-blend-screen transition-colors">
                  <span className="block word-mask">
                    <span
                      className="block word-reveal"
                      style={{ transitionDelay: "100ms" }}
                    >
                      Thank You!
                    </span>
                  </span>
                </h1>
              </div>

              <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-500 font-light leading-relaxed mb-12 max-w-xl mx-auto">
                Your application has been successfully submitted. Our team will review it and get back to you soon.
              </p>
            </div>

            {/* Information Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 animate-on-scroll" style={{ transitionDelay: "400ms" }}>
              <div className="rounded-xl bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-white/10 p-6 text-left">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center">
                    <Mail className="text-zinc-600 dark:text-zinc-400 w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                    Check Your Email
                  </h3>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                  We've sent a confirmation email to the address you provided. Please check your inbox (and spam folder) for updates.
                </p>
              </div>

              <div className="rounded-xl bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-white/10 p-6 text-left">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center">
                    <Clock className="text-zinc-600 dark:text-zinc-400 w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                    Review Process
                  </h3>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                  Our team typically reviews applications within 3-5 business days. We'll notify you once your application has been processed.
                </p>
              </div>
            </div>

            {/* Next Steps */}
            <div className="rounded-2xl bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-white/10 p-8 mb-12 text-left animate-on-scroll" style={{ transitionDelay: "600ms" }}>
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-6">
                What Happens Next?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="h-8 w-8 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm font-semibold text-teal-600 dark:text-teal-400">1</span>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-zinc-900 dark:text-white mb-1">
                      Document Verification
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 font-light">
                      We'll verify your credentials and review your submitted documents.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-8 w-8 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm font-semibold text-teal-600 dark:text-teal-400">2</span>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-zinc-900 dark:text-white mb-1">
                      Background Check
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 font-light">
                      We conduct a thorough background check to ensure patient safety.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-8 w-8 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm font-semibold text-teal-600 dark:text-teal-400">3</span>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-zinc-900 dark:text-white mb-1">
                      Approval & Onboarding
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 font-light">
                      Once approved, you'll receive access credentials and can start receiving patient requests.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-on-scroll" style={{ transitionDelay: "800ms" }}>
              <Link
                href="/"
                className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-teal-600 dark:bg-teal-400 px-8 font-medium text-white dark:text-zinc-950 transition-all duration-300 hover:bg-teal-700 dark:hover:bg-teal-300"
              >
                <Home className="mr-2 w-4 h-4" strokeWidth={1.5} />
                <span className="text-sm">Back to Home</span>
              </Link>
              <Link
                href="/partners"
                className="group inline-flex h-12 items-center justify-center rounded-full border border-zinc-200 dark:border-white/10 bg-transparent px-8 font-medium text-zinc-600 dark:text-zinc-400 transition-all hover:text-zinc-900 dark:hover:text-white hover:border-zinc-400 dark:hover:border-white/30"
              >
                <span className="text-sm">Partners Page</span>
                <ArrowRight
                  className="ml-2 text-zinc-400 dark:text-zinc-600 group-hover:translate-x-1 group-hover:text-zinc-900 dark:group-hover:text-white transition-all w-4 h-4"
                  strokeWidth={1.5}
                />
              </Link>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="w-full bg-zinc-100 dark:bg-black pt-12 pb-12 relative z-20 border-t border-zinc-200 dark:border-zinc-900 text-zinc-500 dark:text-zinc-400 transition-colors duration-500 mt-32">
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
