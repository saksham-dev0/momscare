"use client";

import { useEffect, useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import {
  Sun,
  Moon,
  Heart,
  Stethoscope,
  Users,
  CheckCircle2,
  Clock,
  XCircle,
  ArrowRight,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";

// Force dynamic rendering to prevent prerendering during build
export const dynamic = 'force-dynamic';

export default function AdminDashboard() {
  const [isDark, setIsDark] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authPassword, setAuthPassword] = useState("");
  const router = useRouter();
  
  const applicants = useQuery(api.adminQueries.getAllApplicants);
  const updateDoctorStatus = useMutation(api.adminMutations.updateDoctorStatus);
  const updateNurseStatus = useMutation(api.adminMutations.updateNurseStatus);

  useEffect(() => {
    // Check if already authenticated
    const adminAuth = localStorage.getItem("adminAuth");
    if (adminAuth === "authenticated") {
      setIsAuthenticated(true);
    }

    if (localStorage.theme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      setIsDark(false);
    }
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

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic password check - in production, use proper authentication
    if (authPassword === "admin123" || authPassword === "momscare") {
      setIsAuthenticated(true);
      localStorage.setItem("adminAuth", "authenticated");
    } else {
      alert("Invalid password");
    }
  };

  const handleStatusUpdate = async (
    type: "doctor" | "nurse",
    id: string,
    currentStatus: "pending" | "approved" | "rejected"
  ) => {
    try {
      const newStatus = currentStatus === "pending" ? "approved" : "pending";
      if (type === "doctor") {
        await updateDoctorStatus({ id: id as Id<"doctors">, status: newStatus });
      } else {
        await updateNurseStatus({ id: id as Id<"nurses">, status: newStatus });
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Failed to update status. Please try again.");
    }
  };

  const getStatusBadge = (status: "pending" | "approved" | "rejected") => {
    switch (status) {
      case "approved":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-3 h-3" />
            Verified
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
            <Clock className="w-3 h-3" />
            Pending
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800">
            <XCircle className="w-3 h-3" />
            Rejected
          </span>
        );
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-zinc-50 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 font-sans antialiased min-h-screen w-full overflow-x-hidden flex flex-col transition-colors duration-300">
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-gradient-to-b from-zinc-200/40 via-zinc-100/20 to-transparent dark:from-zinc-900/40 dark:via-zinc-950/20 dark:to-transparent -z-10 pointer-events-none transition-colors duration-500"></div>
        
        <main className="relative pt-32 pb-20 flex items-center justify-center min-h-screen">
          <div className="max-w-md w-full mx-auto px-6">
            <div className="rounded-2xl bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-white/10 p-8 space-y-6">
              <div className="flex items-center justify-center mb-6">
                <div className="h-16 w-16 bg-teal-100 dark:bg-teal-900/30 rounded-xl flex items-center justify-center">
                  <Shield className="text-teal-600 dark:text-teal-400 w-8 h-8" />
                </div>
              </div>
              <h1 className="text-2xl font-serif text-zinc-900 dark:text-white text-center mb-2">
                Admin Access
              </h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center mb-6">
                Please enter the admin password to continue
              </p>
              <form onSubmit={handleAuth} className="space-y-4">
                <input
                  type="password"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400"
                  autoFocus
                />
                <Button
                  type="submit"
                  className="w-full bg-teal-600 dark:bg-teal-400 text-white dark:text-zinc-950 hover:bg-teal-700 dark:hover:bg-teal-300"
                >
                  Access Dashboard
                </Button>
              </form>
            </div>
          </div>
        </main>
      </div>
    );
  }

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
              Admin Dashboard
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
      <main className="relative pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="mb-12">
            <div className="flex text-xs text-zinc-500 dark:text-zinc-500 font-mono mb-4 gap-x-2 gap-y-2 items-center tracking-widest uppercase">
              ADMIN DASHBOARD
              <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></div>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif text-zinc-900 dark:text-white tracking-tight mb-4">
              Applicant Management
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-500 font-light">
              Review and verify all onboarded applicants
            </p>
          </div>

          {/* Applicants Grid */}
          {applicants === undefined ? (
            <div className="text-center py-12">
              <p className="text-zinc-500 dark:text-zinc-400">Loading applicants...</p>
            </div>
          ) : applicants.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-zinc-500 dark:text-zinc-400">No applicants found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {applicants.map((applicant) => (
                <div
                  key={`${applicant.type}-${applicant.id}`}
                  className="group relative rounded-2xl bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-white/10 p-6 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 hover:border-zinc-300 dark:hover:border-white/20 transition-all duration-300 cursor-pointer"
                  onClick={() => router.push(`/admin/${applicant.type === "doctor" ? "doctors" : "nurses"}/${applicant.id}`)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 bg-teal-100 dark:bg-teal-900/30 rounded-xl flex items-center justify-center">
                        {applicant.type === "doctor" ? (
                          <Stethoscope className="text-teal-600 dark:text-teal-400 w-6 h-6" />
                        ) : (
                          <Users className="text-teal-600 dark:text-teal-400 w-6 h-6" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-1">
                          {applicant.name}
                        </h3>
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                          {applicant.type === "doctor" ? "Doctor" : "Nurse"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-zinc-200 dark:border-zinc-800">
                    <div>{getStatusBadge(applicant.status)}</div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStatusUpdate(applicant.type, applicant.id, applicant.status);
                      }}
                      className="text-xs text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium flex items-center gap-1"
                    >
                      {applicant.status === "pending" ? "Verify" : "Unverify"}
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
