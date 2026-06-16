import React, { useState } from 'react';
import { 
  User, Mail, Phone, MapPin, Calendar, Award, 
  BookOpen, FileText, CheckCircle2, AlertCircle, ExternalLink 
} from 'lucide-react';

// Mock data payload simulating a typical University SIS database object
const STANDARD_STUDENT_DATA = {
  name: "Emily Rodriguez",
  studentId: "2024-88912",
  email: "emily.rodriguez@university.edu",
  phone: "(555) 382-9901",
  location: "Austin, TX",
  enrollmentDate: "Fall 2024",
  major: "Computer Science",
  minor: "Business Administration",
  classification: "Junior",
  academicStatus: "Good Standing",
  gpa: 3.68,
  creditsEarned: 74,
  totalCreditsRequired: 120,
  recentCourses: [
    { code: "CS 314", name: "Data Structures", grade: "A-", term: "Spring 2026" },
    { code: "CS 439", name: "Principles of Computer Systems", grade: "B+", term: "Spring 2026" },
    { code: "M 408M", name: "Multivariable Calculus", grade: "A", term: "Spring 2026" },
    { code: "MAN 320F", name: "Foundations of Management", grade: "A", term: "Fall 2025" }
  ]
};

export default function StandardStudentProfile() {
  const [student] = useState(STANDARD_STUDENT_DATA);

  // Math helper for degree progress percentage
  const progressPercentage = Math.min(
    100, 
    Math.round((student.creditsEarned / student.totalCreditsRequired) * 100)
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-4 md:p-8 font-sans antialiased">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* TOP COMPACT PROFILE CARD */}
        <header className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left w-full sm:w-auto">
            {/* Standard Profile Avatar Shell */}
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200 text-gray-400 flex-shrink-0">
              <User className="w-10 h-10" />
            </div>
            
            <div className="space-y-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="text-xl font-bold text-gray-900">{student.name}</h1>
                <span className="px-2.5 py-0.5 text-xs font-semibold bg-green-50 text-green-700 border border-green-200 rounded-full">
                  {student.academicStatus}
                </span>
              </div>
              <p className="text-sm font-medium text-gray-600">
                {student.classification} &bull; {student.major} 
                {student.minor && <span className="text-gray-500 font-normal"> (Minor in {student.minor})</span>}
              </p>
              
              {/* Contact Directory Grid */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 pt-1 text-xs text-gray-500">
                <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {student.email}</span>
                <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {student.phone}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {student.location}</span>
              </div>
            </div>
          </div>

          {/* Core Identification Metadata */}
          <div className="w-full md:w-auto flex md:flex-col justify-between items-end border-t md:border-t-0 pt-4 md:pt-0 border-gray-100 text-right text-xs text-gray-500 gap-y-1">
            <p><span className="font-semibold text-gray-700">Student ID:</span> {student.studentId}</p>
            <p><span className="font-semibold text-gray-700">Admitted:</span> {student.enrollmentDate}</p>
          </div>
        </header>

        {/* TWO-COLUMN CONTENT AREA */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT SIDEBAR: CORE STATS & PROGRESS */}
          <div className="space-y-6 lg:col-span-1">
            {/* Academic Standing KPIs */}
            <section className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-blue-500" /> Key Metrics
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <span className="text-xs text-gray-500 block">Cumulative GPA</span>
                  <span className="text-2xl font-bold text-gray-900">{student.gpa.toFixed(2)}</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <span className="text-xs text-gray-500 block">Credits Completed</span>
                  <span className="text-2xl font-bold text-gray-900">{student.creditsEarned}</span>
                </div>
              </div>

              {/* Progress Toward Graduation Slider */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-gray-600">Degree Progress</span>
                  <span className="text-gray-900">{progressPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <p className="text-[11px] text-gray-400 text-right">
                  {student.totalCreditsRequired - student.creditsEarned} credits remaining for graduation
                </p>
              </div>
            </section>

            {/* Quick Record Verification Links */}
            <section className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-gray-500" /> Actions & Documents
              </h3>
              <div className="space-y-1 text-sm text-blue-600 font-medium">
                <a href="#transcript" className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 group">
                  <span>Request Official Transcript</span>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-600" />
                </a>
                <a href="#degree-audit" className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 group">
                  <span>Run Interactive Degree Audit</span>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-600" />
                </a>
              </div>
            </section>
          </div>

          {/* RIGHT SIDEBAR: RECENT TERM HISTORIES */}
          <main className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-blue-500" /> Recent Academic Performance
              </h2>
              <span className="text-xs text-gray-500">Sorted by Term</span>
            </div>

            {/* Table layout for cleaner course history visibility */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead>
                  <tr className="text-xs text-gray-400 uppercase tracking-tight bg-gray-50 border-b border-gray-200">
                    <th className="py-2.5 px-3 font-semibold">Course Code</th>
                    <th className="py-2.5 px-3 font-semibold">Course Title</th>
                    <th className="py-2.5 px-3 font-semibold text-center">Grade</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Term</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {student.recentCourses.map((course, index) => (
                    <tr key={index} className="hover:bg-gray-50/60 transition-colors">
                      <td className="py-3 px-3 font-mono text-xs font-semibold text-gray-900">{course.code}</td>
                      <td className="py-3 px-3 font-medium text-gray-800">{course.name}</td>
                      <td className="py-3 px-3 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold font-mono ${
                          course.grade.startsWith('A') 
                            ? 'bg-emerald-50 text-emerald-700' 
                            : 'bg-blue-50 text-blue-700'
                        }`}>
                          {course.grade}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right text-xs text-gray-500">{course.term}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Advisor Note Footer Block */}
            <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-3.5 flex items-start gap-3 mt-4">
              <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-xs leading-relaxed text-blue-900">
                <span className="font-semibold">Advisor Registration Note:</span> Emily has met all general education milestones and prerequisites. Eligible for early senior elective registration starting next registration window.
              </div>
            </div>
          </main>

        </div>
      </div>
    </div>
  );
}