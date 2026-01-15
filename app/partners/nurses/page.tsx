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

const LANGUAGES = [
  "English",
  "Hindi",
  "Kannada",
  "Tamil",
  "Telugu",
  "Malayalam",
  "Other",
];

export default function NurseOnboardingPage() {
  const [isDark, setIsDark] = useState(false);
  const router = useRouter();
  const submitApplication = useMutation(api.nursesMutations.submitNurseApplication);
  const generateUploadUrl = useAction(api.nurses.generateUploadUrl);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    email: "",
    gender: "",
    nursingQualification: "",
    nursingCategory: "",
    serviceAreas: [] as string[],
    licenseNo: "",
    specificSkills: "",
    transportMode: "",
    languagesKnown: [] as string[],
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
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
    if (!formData.gender.trim()) {
      newErrors.gender = "Gender is required";
    }
    if (!formData.nursingQualification.trim()) {
      newErrors.nursingQualification = "Nursing qualification is required";
    }
    if (!formData.nursingCategory.trim()) {
      newErrors.nursingCategory = "Nursing category is required";
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
    if (!formData.specificSkills.trim()) {
      newErrors.specificSkills = "Specific skills are required";
    }
    if (!formData.transportMode.trim()) {
      newErrors.transportMode = "Transport mode is required";
    }
    if (formData.languagesKnown.length === 0) {
      newErrors.languagesKnown = "Please select at least one language";
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

  const handleLanguageToggle = (language: string) => {
    setFormData((prev) => ({
      ...prev,
      languagesKnown: prev.languagesKnown.includes(language)
        ? prev.languagesKnown.filter((l) => l !== language)
        : [...prev.languagesKnown, language],
    }));
    if (errors.languagesKnown) {
      setErrors((prev) => ({ ...prev, languagesKnown: "" }));
    }
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
        gender: formData.gender.trim(),
        nursingQualification: formData.nursingQualification.trim(),
        nursingCategory: formData.nursingCategory.trim(),
        serviceAreas: formData.serviceAreas,
        licenseNo: formData.licenseNo.trim(),
        documentId,
        specificSkills: formData.specificSkills.trim(),
        transportMode: formData.transportMode.trim(),
        languagesKnown: formData.languagesKnown,
      });

      router.push("/partners/nurses/success");
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
              NURSE ONBOARDING
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
                  placeholder="Jane Doe"
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
                    placeholder="nurse@example.com"
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

              <div className="space-y-1">
                <label className="text-xs text-zinc-500 dark:text-zinc-400 font-medium ml-1">
                  Gender <span className="text-red-500">*</span>
                </label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => {
                    setFormData((prev) => ({ ...prev, gender: value }));
                    if (errors.gender) setErrors((prev) => ({ ...prev, gender: "" }));
                  }}
                >
                  <SelectTrigger
                    className={`w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-sm ${
                      errors.gender ? "border-red-500 dark:border-red-500" : ""
                    }`}
                  >
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                    <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
                {errors.gender && (
                  <p className="text-xs text-red-500 ml-1">{errors.gender}</p>
                )}
              </div>
            </div>

            {/* Professional Information */}
            <div className="rounded-2xl bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-white/10 p-6 md:p-8 space-y-6">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-6">
                Professional Information
              </h2>

              <div className="space-y-1">
                <label className="text-xs text-zinc-500 dark:text-zinc-400 font-medium ml-1">
                  Nursing Qualification <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="GNM, B.Sc Nursing, M.Sc Nursing, ANM, etc."
                  value={formData.nursingQualification}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, nursingQualification: e.target.value }));
                    if (errors.nursingQualification) setErrors((prev) => ({ ...prev, nursingQualification: "" }));
                  }}
                  className={`w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-sm ${
                    errors.nursingQualification ? "border-red-500 dark:border-red-500" : ""
                  }`}
                />
                {errors.nursingQualification && (
                  <p className="text-xs text-red-500 ml-1">{errors.nursingQualification}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs text-zinc-500 dark:text-zinc-400 font-medium ml-1">
                  Nursing Category <span className="text-red-500">*</span>
                </label>
                <Select
                  value={formData.nursingCategory}
                  onValueChange={(value) => {
                    setFormData((prev) => ({ ...prev, nursingCategory: value }));
                    if (errors.nursingCategory) setErrors((prev) => ({ ...prev, nursingCategory: "" }));
                  }}
                >
                  <SelectTrigger
                    className={`w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-sm ${
                      errors.nursingCategory ? "border-red-500 dark:border-red-500" : ""
                    }`}
                  >
                    <SelectValue placeholder="Select nursing category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Registered Nurse (RN)">Registered Nurse (RN)</SelectItem>
                    <SelectItem value="Licensed Practical Nurse (LPN)">Licensed Practical Nurse (LPN)</SelectItem>
                    <SelectItem value="Certified Nursing Assistant (CNA)">Certified Nursing Assistant (CNA)</SelectItem>
                    <SelectItem value="Nurse Practitioner (NP)">Nurse Practitioner (NP)</SelectItem>
                    <SelectItem value="Clinical Nurse Specialist">Clinical Nurse Specialist</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.nursingCategory && (
                  <p className="text-xs text-red-500 ml-1">{errors.nursingCategory}</p>
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
                  placeholder="Enter your nursing license number"
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
            </div>

            {/* Additional Details */}
            <div className="rounded-2xl bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-white/10 p-6 md:p-8 space-y-6">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-6">
                Additional Details
              </h2>

              <div className="space-y-1">
                <label className="text-xs text-zinc-500 dark:text-zinc-400 font-medium ml-1">
                  Specific Skills <span className="text-red-500">*</span>
                </label>
                <Textarea
                  placeholder="Describe your specific nursing skills, specializations, and areas of expertise..."
                  rows={5}
                  value={formData.specificSkills}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, specificSkills: e.target.value }));
                    if (errors.specificSkills) setErrors((prev) => ({ ...prev, specificSkills: "" }));
                  }}
                  className={`w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-sm ${
                    errors.specificSkills ? "border-red-500 dark:border-red-500" : ""
                  }`}
                />
                {errors.specificSkills && (
                  <p className="text-xs text-red-500 ml-1">{errors.specificSkills}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs text-zinc-500 dark:text-zinc-400 font-medium ml-1">
                  Transport Mode <span className="text-red-500">*</span>
                </label>
                <Select
                  value={formData.transportMode}
                  onValueChange={(value) => {
                    setFormData((prev) => ({ ...prev, transportMode: value }));
                    if (errors.transportMode) setErrors((prev) => ({ ...prev, transportMode: "" }));
                  }}
                >
                  <SelectTrigger
                    className={`w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-sm ${
                      errors.transportMode ? "border-red-500 dark:border-red-500" : ""
                    }`}
                  >
                    <SelectValue placeholder="Select transport mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Own Vehicle">Own Vehicle</SelectItem>
                    <SelectItem value="Public Transport">Public Transport</SelectItem>
                    <SelectItem value="Two-Wheeler">Two-Wheeler</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.transportMode && (
                  <p className="text-xs text-red-500 ml-1">{errors.transportMode}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs text-zinc-500 dark:text-zinc-400 font-medium ml-1">
                  Languages Known <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {LANGUAGES.map((language) => (
                    <button
                      key={language}
                      type="button"
                      onClick={() => handleLanguageToggle(language)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        formData.languagesKnown.includes(language)
                          ? "bg-teal-600 dark:bg-teal-400 text-white dark:text-zinc-950"
                          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:border-teal-300 dark:hover:border-teal-600"
                      }`}
                    >
                      {language}
                    </button>
                  ))}
                </div>
                {errors.languagesKnown && (
                  <p className="text-xs text-red-500 ml-1 mt-2">{errors.languagesKnown}</p>
                )}
              </div>
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
