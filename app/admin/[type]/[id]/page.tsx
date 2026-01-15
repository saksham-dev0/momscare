"use client";

import { useEffect, useState } from "react";
import { useQuery, useMutation, useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter, useParams } from "next/navigation";
import {
  Sun,
  Moon,
  ArrowLeft,
  Heart,
  Download,
  FileText,
  CheckCircle2,
  Clock,
  XCircle,
  Mail,
  Phone,
  MapPin,
  Stethoscope,
  Users,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function AdminDetailPage() {
  const [isDark, setIsDark] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [documentUrl, setDocumentUrl] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();
  const type = params.type as "doctors" | "nurses";
  const id = params.id as string;

  // Validate type
  if (type !== "doctors" && type !== "nurses") {
    router.push("/admin");
    return null;
  }

  const doctorData = useQuery(
    api.adminQueries.getDoctorById,
    type === "doctors" ? { id: id as Id<"doctors"> } : "skip"
  );
  const nurseData = useQuery(
    api.adminQueries.getNurseById,
    type === "nurses" ? { id: id as Id<"nurses"> } : "skip"
  );
  const getDocumentUrl = useAction(api.adminQueries.getDocumentUrl);
  const updateDoctorStatus = useMutation(api.adminMutations.updateDoctorStatus);
  const updateNurseStatus = useMutation(api.adminMutations.updateNurseStatus);

  const data = type === "doctors" ? doctorData : nurseData;
  const documentId = data?.documentId;

  useEffect(() => {
    // Check if already authenticated
    const adminAuth = localStorage.getItem("adminAuth");
    if (adminAuth === "authenticated") {
      setIsAuthenticated(true);
    } else {
      router.push("/admin");
      return;
    }

    if (localStorage.theme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      setIsDark(false);
    }
  }, [router]);

  useEffect(() => {
    const fetchDocumentUrl = async () => {
      if (documentId) {
        try {
          const url = await getDocumentUrl({ documentId });
          setDocumentUrl(url || null);
        } catch (error) {
          console.error("Failed to fetch document URL:", error);
        }
      }
    };

    if (documentId) {
      fetchDocumentUrl();
    }
  }, [documentId, getDocumentUrl]);

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

  const handleStatusUpdate = async (newStatus: "pending" | "approved" | "rejected") => {
    try {
      if (type === "doctors" && data) {
        await updateDoctorStatus({ id: id as Id<"doctors">, status: newStatus });
      } else if (type === "nurses" && data) {
        await updateNurseStatus({ id: id as Id<"nurses">, status: newStatus });
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Failed to update status. Please try again.");
    }
  };

  const handleDownload = () => {
    if (documentUrl) {
      const link = document.createElement("a");
      link.href = documentUrl;
      link.download = `${type}-${id}-document.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-zinc-500 dark:text-zinc-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (data === null) {
    return (
      <div className="bg-zinc-50 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 font-sans antialiased min-h-screen w-full overflow-x-hidden flex flex-col transition-colors duration-300">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-zinc-500 dark:text-zinc-400 mb-4">Application not found</p>
            <Link href="/admin">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (data === undefined) {
    return (
      <div className="bg-zinc-50 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 font-sans antialiased min-h-screen w-full overflow-x-hidden flex flex-col transition-colors duration-300">
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-zinc-500 dark:text-zinc-400">Loading application...</p>
        </div>
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
          <Link href="/admin" className="flex items-center gap-2">
            <ArrowLeft className="text-zinc-900 dark:text-white w-4 h-4" strokeWidth={1.5} />
            <Heart className="text-zinc-900 dark:text-white w-5 h-5" strokeWidth={1.5} />
            <span className="text-sm font-medium tracking-tight text-zinc-900 dark:text-white">
              Back to Dashboard
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
        <div className="max-w-5xl mx-auto px-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex text-xs text-zinc-500 dark:text-zinc-500 font-mono mb-4 gap-x-2 gap-y-2 items-center tracking-widest uppercase">
              {type === "doctors" ? "DOCTOR" : "NURSE"} APPLICATION
              <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></div>
            </div>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-serif text-zinc-900 dark:text-white tracking-tight mb-2">
                  {data.name}
                </h1>
                <div className="flex items-center gap-3">
                  {getStatusBadge(data.status)}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                    {type === "doctors" ? "Doctor" : "Nurse"}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                {data.status === "pending" && (
                  <Button
                    onClick={() => handleStatusUpdate("approved")}
                    className="bg-teal-600 dark:bg-teal-400 text-white dark:text-zinc-950 hover:bg-teal-700 dark:hover:bg-teal-300"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Mark as Verified
                  </Button>
                )}
                {data.status === "approved" && (
                  <Button
                    onClick={() => handleStatusUpdate("pending")}
                    variant="outline"
                    className="border-zinc-300 dark:border-zinc-700"
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Mark as Pending
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="rounded-2xl bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-white/10 p-6 md:p-8 space-y-6 mb-6">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-6">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                  Full Name
                </label>
                <p className="text-sm text-zinc-900 dark:text-white font-medium">{data.name}</p>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                  Contact Number
                </label>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-zinc-400" />
                  <p className="text-sm text-zinc-900 dark:text-white">{data.contactNumber}</p>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                  Email Address
                </label>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-zinc-400" />
                  <p className="text-sm text-zinc-900 dark:text-white">{data.email}</p>
                </div>
              </div>

              {type === "nurses" && (
                <div className="space-y-1">
                  <label className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                    Gender
                  </label>
                  <p className="text-sm text-zinc-900 dark:text-white">{data.gender}</p>
                </div>
              )}
            </div>
          </div>

          {/* Professional Information */}
          <div className="rounded-2xl bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-white/10 p-6 md:p-8 space-y-6 mb-6">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-6">
              Professional Information
            </h2>

            {type === "doctors" ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                      Medical Qualification
                    </label>
                    <p className="text-sm text-zinc-900 dark:text-white">{data.medicalQualification}</p>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                      Specialization
                    </label>
                    <p className="text-sm text-zinc-900 dark:text-white">{data.specialization}</p>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                      License No.
                    </label>
                    <p className="text-sm text-zinc-900 dark:text-white">{data.licenseNo}</p>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                      Experience (Years)
                    </label>
                    <p className="text-sm text-zinc-900 dark:text-white">{data.experience} years</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                    Service Areas
                  </label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {data.serviceAreas.map((area) => (
                      <span
                        key={area}
                        className="px-3 py-1 rounded-lg text-xs font-medium bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-800"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                    Clinical Experience
                  </label>
                  <p className="text-sm text-zinc-900 dark:text-white leading-relaxed">
                    {data.clinicalExperience}
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                    Availability
                  </label>
                  {data.availability.is247 ? (
                    <p className="text-sm text-zinc-900 dark:text-white">24/7 Available</p>
                  ) : (
                    <div className="mt-2 space-y-2">
                      {data.availability.days.map((day) => (
                        <div key={day} className="flex items-center gap-3 text-sm">
                          <span className="text-zinc-900 dark:text-white font-medium min-w-[100px]">
                            {DAYS_OF_WEEK.find((d) => d.toLowerCase() === day) || day}
                          </span>
                          {data.availability.timeRanges?.[day] && (
                            <span className="text-zinc-600 dark:text-zinc-400">
                              {data.availability.timeRanges[day].start} - {data.availability.timeRanges[day].end}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                      Nursing Qualification
                    </label>
                    <p className="text-sm text-zinc-900 dark:text-white">{data.nursingQualification}</p>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                      Nursing Category
                    </label>
                    <p className="text-sm text-zinc-900 dark:text-white">{data.nursingCategory}</p>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                      License No.
                    </label>
                    <p className="text-sm text-zinc-900 dark:text-white">{data.licenseNo}</p>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                      Transport Mode
                    </label>
                    <p className="text-sm text-zinc-900 dark:text-white">{data.transportMode}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                    Service Areas
                  </label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {data.serviceAreas.map((area) => (
                      <span
                        key={area}
                        className="px-3 py-1 rounded-lg text-xs font-medium bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-800"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                    Specific Skills
                  </label>
                  <p className="text-sm text-zinc-900 dark:text-white leading-relaxed">
                    {data.specificSkills}
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                    Languages Known
                  </label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {data.languagesKnown.map((language) => (
                      <span
                        key={language}
                        className="px-3 py-1 rounded-lg text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Document Viewer */}
          <div className="rounded-2xl bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-white/10 p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
                Official Document
              </h2>
              {documentUrl && (
                <Button
                  onClick={handleDownload}
                  variant="outline"
                  className="border-zinc-300 dark:border-zinc-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              )}
            </div>

            {documentUrl ? (
              <div className="w-full border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
                <iframe
                  src={documentUrl}
                  className="w-full h-[600px] md:h-[800px]"
                  title="Document Viewer"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 border border-zinc-200 dark:border-zinc-800 rounded-lg">
                <FileText className="w-12 h-12 text-zinc-400 dark:text-zinc-600 mb-4" />
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Loading document...</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
