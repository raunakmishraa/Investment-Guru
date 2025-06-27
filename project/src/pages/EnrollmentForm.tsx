import React, { useState } from 'react';
import { motion } from "framer-motion";
import { User, Mail, Phone, GraduationCap, Calendar, Clock, Star, CheckCircle, BookOpen } from 'lucide-react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  course: string;
  agreeTerms: boolean;
}

const EnrollmentForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    course: '',
    agreeTerms: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [isError, setIsError] = useState(false);

  // !!! IMPORTANT: Replace with your Google Apps Script Web App URL !!!
  const APPS_SCRIPT_WEB_APP_URL = "https://script.google.com/macros/s/AKfycby7SDuXj8vf-hOJEsIKo9DdFQlQO2FQWtVI3OGNctpbjQGeFUdgpH9AbxwOJ68j-jIh/exec";

  const courses = [
    {
      id: 'beginner-trading',
      name: 'Stock Market 101: Decode the Basics',
      duration: '8 weeks',
      price: 'NRs. 3000',
      rating: 4.9,
      students: 280
    },
    {
      id: 'advanced-course',
      name: 'Advance Course: Technical Analysis Mastery',
      duration: '12 weeks',
      price: 'NRs. 5000',
      rating: 4.8,
      students: 152
    },
    {
      id: 'transformation-course',
      name: 'Basic to Advance course: Complete Transformation Program',
      duration: '6 weeks',
      price: 'NRs. 10,000',
      rating: 4.7,
      students: 41
    },
    {
      id: 'pro-course',
      name: 'Pro Trader: Mastering the Market Moves',
      duration: '10 weeks',
      price: 'NRs. 12,000',
      rating: 4.9,
      students: 76
    },
    {
      id: 'recovery-course',
      name: 'From Loss to Profit: The Recovery Course',
      duration: '10 weeks',
      price: 'NRs. 15,000',
      rating: 4.9,
      students: 87
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionMessage('');
    setIsError(false);

    try {
      // Find the selected course name to send to Apps Script
      const selectedCourseName = courses.find(c => c.id === formData.course)?.name || 'N/A';

      // Create a FormData object for URLSearchParams (as Apps Script expects form-encoded data)
      const formUrlEncodedData = new URLSearchParams();
      formUrlEncodedData.append('firstName', formData.firstName);
      formUrlEncodedData.append('lastName', formData.lastName);
      formUrlEncodedData.append('email', formData.email);
      formUrlEncodedData.append('phone', formData.phone);
      formUrlEncodedData.append('course', selectedCourseName); // Send the full course name
      formUrlEncodedData.append('agreeTerms', String(formData.agreeTerms)); // Convert boolean to string

      // Also append the full name as 'name' for the Apps Script side if needed for email/sheet
      formUrlEncodedData.append('name', `${formData.firstName} ${formData.lastName}`);

      // If your Apps Script expects 'subject' and 'message' for the email, you can add them:
      formUrlEncodedData.append('subject', `New Enrollment for ${selectedCourseName}`);
      formUrlEncodedData.append('message', `Enrollment details for ${formData.firstName} ${formData.lastName}:\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCourse: ${selectedCourseName}`);

      const response = await fetch(APPS_SCRIPT_WEB_APP_URL, {
        method: 'POST',
        mode: 'cors', // Crucial for cross-origin requests to Apps Script
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // Important for Apps Script doPost
        },
        body: formUrlEncodedData.toString(),
      });

      const result = await response.json(); // Apps Script returns JSON

      if (result.success) {
        setSubmitted(true);
        setSubmissionMessage(result.message || "Enrollment successful!");
        setIsError(false);
      } else {
        setSubmissionMessage(result.error || "Enrollment failed. Please try again.");
        setIsError(true);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmissionMessage("An unexpected error occurred. Please try again later.");
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedCourse = courses.find(course => course.id === formData.course);

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-red-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            {isError ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <CheckCircle className="w-10 h-10 text-green-600" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {isError ? "Enrollment Failed!" : "Enrollment Successful!"}
          </h2>
          <p className={`mb-6 ${isError ? 'text-red-600' : 'text-gray-600'}`}>
            {submissionMessage}
            {!isError && " Welcome to Investment Guru! You'll receive a confirmation email shortly with your course access details."}
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setIsError(false); // Reset error state
              setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                course: '',
                agreeTerms: false
              });
            }}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            {isError ? "Try Again" : "Enroll Another Course"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-red-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6"
          >
            <BookOpen size={16} className="mr-2" />
            Enroll Now
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-accent-900 mb-6">
            Enroll in Our
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              {" "}
              Premium Courses
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of successful investors who have transformed their financial future with our expert-led courses.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Course Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Available Courses</h3>
              <div className="space-y-4">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      formData.course === course.id
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, course: course.id }))}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-900 text-sm">{course.name}</h4>
                      <span className="text-green-600 font-bold">{course.price}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {course.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        {course.rating}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {course.students}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Enrollment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Initiate Your Enrollment</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-green-600" />
                    Personal Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-green-600" />
                    Contact Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        placeholder="+977 (980) 123-4567"
                      />
                    </div>
                  </div>
                </div>

                {/* Course Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-green-600" />
                    Select Course
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Course *
                      </label>
                      <select
                        name="course"
                        value={formData.course}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      >
                        <option value="">Choose a course</option>
                        {courses.map((course) => (
                          <option key={course.id} value={course.id}>
                            {course.name} - {course.price}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Course Summary */}
                {selectedCourse && (
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Summary</h3>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-900">{selectedCourse.name}</p>
                        <p className="text-sm text-gray-600">{selectedCourse.duration} • {selectedCourse.students} students</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">{selectedCourse.price}</p>
                        <p className="text-sm text-gray-600">One-time payment</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Terms and Conditions */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleInputChange}
                    required
                    className="mt-1 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <label className="text-sm text-gray-600">
                    I agree to the{' '}
                    <a href="#" className="text-green-600 hover:underline">Terms of Service</a>
                    {' '}and{' '}
                    <a href="#" className="text-green-600 hover:underline">Privacy Policy</a>
                    . I understand that this course purchase is non-refundable after 7 days.
                  </label>
                </div>

                {/* Submission Message Display */}
                {submissionMessage && (
                  <div className={`p-3 rounded-lg text-center font-medium ${isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {submissionMessage}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.agreeTerms}
                  className="w-full bg-gradient-to-r from-green-600 to-red-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-green-700 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing Enrollment...
                    </div>
                  ) : (
                    `Enroll Now ${selectedCourse ? `- ${selectedCourse.price}` : ''}`
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentForm;