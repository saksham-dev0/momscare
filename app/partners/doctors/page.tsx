"use client";

import { useEffect, useState } from "react";
import { useMutation, useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import {
  Sun,
  Moon,
  ArrowLeft,
  Heart,
  Upload,
  X,
  CheckCircle2,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const BENGALURU_AREAS = [
  "Koramangala",
  "Indiranagar",
  "Whitefield",
  "HSR Layout",
  "Marathahalli",
  "Electronic City",
  "Jayanagar",
  "Basavanagudi",
  "Malleshwaram",
  "Rajajinagar",
  "Vijayanagar",
  "BTM Layout",
  "Bannerghatta Road",
  "JP Nagar",
  "Banashankari",
  "Yelahanka",
  "Hebbal",
  "Yeshwanthpur",
  "Peenya",
  "Other",
];

const DAYS_OF_WEEK = [
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
  { value: "saturday", label: "Saturday" },
  { value: "sunday", label: "Sunday" },
];

export default function DoctorOnboardingPage() {
  const [isDark, setIsDark] = useState(false);
  const router = useRouter();
  const submitApplication = useMutation(api.doctorsMutations.submitDoctorApplication);
  const generateUploadUrl = useAction(api.doctors.generateUploadUrl);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    email: "",
    medicalQualification: "",
    specialization: "",
    serviceAreas: [] as string[],
    licenseNo: "",
    experience: "",
    clinicalExperience: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [availability, setAvailability] = useState({
    days: [] as string[],
    timeRanges: {} as Record<string, { start: string; end: string }>,
    is247: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = "Contact number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.contactNumber.replace(/\D/g, ""))) {
      newErrors.contactNumber = "Please enter a valid 10-digit Indian mobile number";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.medicalQualification.trim()) {
      newErrors.medicalQualification = "Medical qualification is required";
    }
    if (!formData.specialization.trim()) {
      newErrors.specialization = "Specialization is required";
    }
    if (formData.serviceAreas.length === 0) {
      newErrors.serviceAreas = "Please select at least one service area";
    }
    if (!formData.licenseNo.trim()) {
      newErrors.licenseNo = "License number is required";
    }
    if (!selectedFile) {
      newErrors.document = "Please upload your official document";
    }
    if (!formData.experience.trim()) {
      newErrors.experience = "Experience is required";
    } else if (isNaN(Number(formData.experience)) || Number(formData.experience) < 0) {
      newErrors.experience = "Please enter a valid number of years";
    }
    if (!formData.clinicalExperience.trim()) {
      newErrors.clinicalExperience = "Clinical experience is required";
    }
    if (availability.days.length === 0 && !availability.is247) {
      newErrors.availability = "Please select your availability";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setFileError("Please upload a PDF file only");
      setSelectedFile(null);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFileError("File size must be less than 5MB");
      setSelectedFile(null);
      return;
    }

    setFileError("");
    setSelectedFile(file);
  };

  const handleServiceAreaToggle = (area: string) => {
    setFormData((prev) => ({
      ...prev,
      serviceAreas: prev.serviceAreas.includes(area)
        ? prev.serviceAreas.filter((a) => a !== area)
        : [...prev.serviceAreas, area],
    }));
    if (errors.serviceAreas) {
      setErrors((prev) => ({ ...prev, serviceAreas: "" }));
    }
  };

  const handleDayToggle = (day: string) => {
    setAvailability((prev) => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter((d) => d !== day)
        : [...prev.days, day],
    }));
    if (errors.availability) {
      setErrors((prev) => ({ ...prev, availability: "" }));
    }
  };

  const handleTimeRangeChange = (day: string, field: "start" | "end", value: string) => {
    setAvailability((prev) => ({
      ...prev,
      timeRanges: {
        ...prev.timeRanges,
        [day]: {
          ...prev.timeRanges[day],
          [field]: value,
        },
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload document first
      if (!selectedFile) {
        throw new Error("No file selected");
      }

      // Generate upload URL
      const uploadUrl = await generateUploadUrl();
      
      // Upload file directly to Convex storage
      const uploadResult = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": selectedFile.type },
        body: selectedFile,
      });
      
      if (!uploadResult.ok) {
        throw new Error("Failed to upload file");
      }
      
      const { storageId } = await uploadResult.json();
      const documentId = storageId;

      // Submit application
      await submitApplication({
        name: formData.name.trim(),
        contactNumber: formData.contactNumber.trim(),
        email: formData.email.trim().toLowerCase(),
        medicalQualification: formData.medicalQualification.trim(),
        specialization: formData.specialization.trim(),
        serviceAreas: formData.serviceAreas,
        licenseNo: formData.licenseNo.trim(),
        documentId,
        experience: Number(formData.experience),
        clinicalExperience: formData.clinicalExperience.trim(),
        availability: {
          days: availability.days,
          timeRanges: availability.is247 ? undefined : availability.timeRanges,
          is247: availability.is247,
        },
      });

      router.push("/partners/doctors/success");
    } catch (error: any) {
      console.error("Submission error:", error);
      setErrors({
        submit: error.message || "Failed to submit application. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
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
          <Link href="/partners" className="flex items-center gap-2">
            <ArrowLeft className="text-zinc-900 dark:text-white w-4 h-4" strokeWidth={1.5} />
            <Heart className="text-zinc-900 dark:text-white w-5 h-5" strokeWidth={1.5} />
            <span className="text-sm font-medium tracking-tight text-zinc-900 dark:text-white">
              Back to Partners
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
        <div className="max-w-3xl mx-auto px-6">
          {/* Header */}
          <div className="mb-12">
            <div className="flex text-xs text-zinc-500 dark:text-zinc-500 font-mono mb-4 gap-x-2 gap-y-2 items-center tracking-widest uppercase">
              DOCTOR ONBOARDING
              <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></div>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif text-zinc-900 dark:text-white tracking-tight mb-4">
              Complete Your Application
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-500 font-light">
              Please fill out all the fields below to join our network of healthcare professionals.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="rounded-2xl bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-white/10 p-6 md:p-8 space-y-6">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-6">
                Personal Information
              </h2>

              <div className="space-y-1">
                <label className="text-xs text-zinc-500 dark:text-zinc-400 font-medium ml-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="Dr. John Doe"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, name: e.target.value }));
                    if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                  }}
                  className={`w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-sm ${
                    errors.name ? "border-red-500 dark:border-red-500" : ""
                  }`}
                />
                {errors.name && (
                  <p className="text-xs text-red-500 ml-1">{errors.name}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xs text-zinc-500 dark:text-zinc-400 font-medium ml-1">
                    Contact Number <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="tel"
                    placeholder="9876543210"
                    value={formData.contactNumber}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, contactNumber: e.target.value }));
                      if (errors.contactNumber) setErrors((prev) => ({ ...prev, contactNumber: "" }));
                    }}
                    className={`w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-sm ${
                      errors.contactNumber ? "border-red-500 dark:border-red-500" : ""
                    }`}
                  />
                  {errors.contactNumber && (
                    <p className="text-xs text-red-500 ml-1">{errors.contactNumber}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-zinc-500 dark:text-zinc-400 font-medium ml-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="email"
                    placeholder="doctor@example.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, email: e.target.value }));
                      if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                    }}
                    className={`w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-sm ${
                      errors.email ? "border-red-500 dark:border-red-500" : ""
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 ml-1">{errors.email}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="rounded-2xl bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-white/10 p-6 md:p-8 space-y-6">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-6">
                Professional Information
              </h2>

              <div className="space-y-1">
                <label className="text-xs text-zinc-500 dark:text-zinc-400 font-medium ml-1">
                  Medical Qualification <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="MBBS, MD, etc."
                  value={formData.medicalQualification}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, medicalQualification: e.target.value }));
                    if (errors.medicalQualification) setErrors((prev) => ({ ...prev, medicalQualification: "" }));
                  }}
                  className={`w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-sm ${
                    errors.medicalQualification ? "border-red-500 dark:border-red-500" : ""
                  }`}
                />
                {errors.medicalQualification && (
                  <p className="text-xs text-red-500 ml-1">{errors.medicalQualification}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs text-zinc-500 dark:text-zinc-400 font-medium ml-1">
                  Specialization <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="Obstetrics & Gynecology, etc."
                  value={formData.specialization}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, specialization: e.target.value }));
                    if (errors.specialization) setErrors((prev) => ({ ...prev, specialization: "" }));
                  }}
                  className={`w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-sm ${
                    errors.specialization ? "border-red-500 dark:border-red-500" : ""
                  }`}
                />
                {errors.specialization && (
                  <p className="text-xs text-red-500 ml-1">{errors.specialization}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs text-zinc-500 dark:text-zinc-400 font-medium ml-1">
                  Service Area Selection <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {BENGALURU_AREAS.map((area) => (
                    <button
                      key={area}
                      type="button"
                      onClick={() => handleServiceAreaToggle(area)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        formData.serviceAreas.includes(area)
                          ? "bg-teal-600 dark:bg-teal-400 text-white dark:text-zinc-950"
                          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:border-teal-300 dark:hover:border-teal-600"
                      }`}
                    >
                      {area}
                    </button>
                  ))}
                </div>
                {errors.serviceAreas && (
                  <p className="text-xs text-red-500 ml-1 mt-2">{errors.serviceAreas}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs text-zinc-500 dark:text-zinc-400 font-medium ml-1">
                  License No. <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="Enter your medical license number"
                  value={formData.licenseNo}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, licenseNo: e.target.value }));
                    if (errors.licenseNo) setErrors((prev) => ({ ...prev, licenseNo: "" }));
                  }}
                  className={`w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-sm ${
                    errors.licenseNo ? "border-red-500 dark:border-red-500" : ""
                  }`}
                />
                {errors.licenseNo && (
                  <p className="text-xs text-red-500 ml-1">{errors.licenseNo}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs text-zinc-500 dark:text-zinc-400 font-medium ml-1">
                  Official Document (PDF) <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  {!selectedFile ? (
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-2 text-zinc-400 dark:text-zinc-500" />
                        <p className="mb-2 text-sm text-zinc-500 dark:text-zinc-400">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-zinc-400 dark:text-zinc-500">PDF only (MAX. 5MB)</p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,application/pdf"
                        onChange={handleFileChange}
                      />
                    </label>
                  ) : (
                    <div className="flex items-center justify-between p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-teal-100 dark:bg-teal-900/30 rounded-lg flex items-center justify-center">
                          <Upload className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-zinc-900 dark:text-white">
                            {selectedFile.name}
                          </p>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedFile(null);
                          setFileError("");
                        }}
                        className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                      </button>
                    </div>
                  )}
                </div>
                {(errors.document || fileError) && (
                  <p className="text-xs text-red-500 ml-1 mt-2">{errors.document || fileError}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xs text-zinc-500 dark:text-zinc-400 font-medium ml-1">
                    Experience (Years) <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="number"
                    placeholder="5"
                    min="0"
                    value={formData.experience}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, experience: e.target.value }));
                      if (errors.experience) setErrors((prev) => ({ ...prev, experience: "" }));
                    }}
                    className={`w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-sm ${
                      errors.experience ? "border-red-500 dark:border-red-500" : ""
                    }`}
                  />
                  {errors.experience && (
                    <p className="text-xs text-red-500 ml-1">{errors.experience}</p>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-zinc-500 dark:text-zinc-400 font-medium ml-1">
                  Clinical Experience <span className="text-red-500">*</span>
                </label>
                <Textarea
                  placeholder="Describe your clinical experience, areas of expertise, and any notable achievements..."
                  rows={5}
                  value={formData.clinicalExperience}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, clinicalExperience: e.target.value }));
                    if (errors.clinicalExperience) setErrors((prev) => ({ ...prev, clinicalExperience: "" }));
                  }}
                  className={`w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-sm ${
                    errors.clinicalExperience ? "border-red-500 dark:border-red-500" : ""
                  }`}
                />
                {errors.clinicalExperience && (
                  <p className="text-xs text-red-500 ml-1">{errors.clinicalExperience}</p>
                )}
              </div>
            </div>

            {/* Availability Schedule */}
            <div className="rounded-2xl bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-white/10 p-6 md:p-8 space-y-6">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-6">
                Availability / On-Call Schedule <span className="text-red-500">*</span>
              </h2>

              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={availability.is247}
                    onChange={(e) => {
                      setAvailability((prev) => ({
                        ...prev,
                        is247: e.target.checked,
                        days: e.target.checked ? [] : prev.days,
                        timeRanges: e.target.checked ? {} : prev.timeRanges,
                      }));
                      if (errors.availability) setErrors((prev) => ({ ...prev, availability: "" }));
                    }}
                    className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-teal-600 dark:text-teal-400 focus:ring-teal-500"
                  />
                  <span className="text-sm font-medium text-zinc-900 dark:text-white">
                    24/7 Available
                  </span>
                </label>

                {!availability.is247 && (
                  <div className="space-y-4 pl-7 border-l-2 border-zinc-200 dark:border-zinc-800">
                    {DAYS_OF_WEEK.map((day) => (
                      <div key={day.value} className="space-y-3">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={availability.days.includes(day.value)}
                            onChange={() => handleDayToggle(day.value)}
                            className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-teal-600 dark:text-teal-400 focus:ring-teal-500"
                          />
                          <span className="text-sm font-medium text-zinc-900 dark:text-white min-w-[100px]">
                            {day.label}
                          </span>
                        </label>
                        {availability.days.includes(day.value) && (
                          <div className="flex items-center gap-3 ml-7">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
                              <Input
                                type="time"
                                value={availability.timeRanges[day.value]?.start || ""}
                                onChange={(e) =>
                                  handleTimeRangeChange(day.value, "start", e.target.value)
                                }
                                className="w-32 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm"
                              />
                            </div>
                            <span className="text-zinc-400 dark:text-zinc-500">to</span>
                            <div className="flex items-center gap-2">
                              <Input
                                type="time"
                                value={availability.timeRanges[day.value]?.end || ""}
                                onChange={(e) =>
                                  handleTimeRangeChange(day.value, "end", e.target.value)
                                }
                                className="w-32 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {errors.availability && (
                <p className="text-xs text-red-500 ml-1">{errors.availability}</p>
              )}
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4">
                <p className="text-sm text-red-600 dark:text-red-400">{errors.submit}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-4">
              <Link href="/partners">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full md:w-auto"
                >
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto bg-teal-600 dark:bg-teal-400 text-white dark:text-zinc-950 hover:bg-teal-700 dark:hover:bg-teal-300"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
