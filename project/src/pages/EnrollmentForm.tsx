import React, { useState } from 'react';
import { motion } from "framer-motion";
import { User, Mail, Phone, GraduationCap, CreditCard, Calendar, Clock, Star, CheckCircle, BookOpen } from 'lucide-react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  course: string;
  experience: string;
  paymentMethod: string;
  agreeTerms: boolean;
}

const EnrollmentForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    course: '',
    experience: '',
    paymentMethod: '',
    agreeTerms: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const courses = [
    {
      id: 'beginner-trading',
      name: 'Beginner Trading Fundamentals',
      duration: '8 weeks',
      price: '$299',
      rating: 4.9,
      students: 2847
    },
    {
      id: 'advanced-portfolio',
      name: 'Advanced Portfolio Management',
      duration: '12 weeks',
      price: '$599',
      rating: 4.8,
      students: 1523
    },
    {
      id: 'crypto-mastery',
      name: 'Cryptocurrency Investment Mastery',
      duration: '6 weeks',
      price: '$399',
      rating: 4.7,
      students: 3241
    },
    {
      id: 'real-estate',
      name: 'Real Estate Investment Strategy',
      duration: '10 weeks',
      price: '$499',
      rating: 4.9,
      students: 1876
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
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const selectedCourse = courses.find(course => course.id === formData.course);

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-red-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Enrollment Successful!</h2>
          <p className="text-gray-600 mb-6">
            Welcome to Investment Guru! You'll receive a confirmation email shortly with your course access details.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                course: '',
                experience: '',
                paymentMethod: '',
                agreeTerms: false
              });
            }}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Enroll Another Course
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
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                </div>

                {/* Course Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-green-600" />
                    Course & Experience
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
                    {/* <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Investment Experience *
                      </label>
                      <select
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      >
                        <option value="">Select your level</option>
                        <option value="beginner">Complete Beginner</option>
                        <option value="some">Some Experience</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </select>
                    </div> */}
                  </div>
                </div>

                {/* Payment Method */}
                {/* <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-green-600" />
                    Payment Method
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['credit-card', 'paypal', 'bank-transfer'].map((method) => (
                      <label
                        key={method}
                        className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          formData.paymentMethod === method
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-green-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method}
                          checked={formData.paymentMethod === method}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div className="text-center w-full">
                          <CreditCard className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                          <span className="text-sm font-medium capitalize">
                            {method.replace('-', ' ')}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div> */}

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

        {/* Trust Indicators */}
        {/* <div className="mt-12 bg-white rounded-2xl shadow-xl p-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Instructors</h3>
              <p className="text-gray-600">Learn from industry professionals with 20+ years of experience</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Lifetime Access</h3>
              <p className="text-gray-600">Access course materials and updates forever, at your own pace</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">4.8/5 Rating</h3>
              <p className="text-gray-600">Trusted by over 10,000 students worldwide</p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default EnrollmentForm;