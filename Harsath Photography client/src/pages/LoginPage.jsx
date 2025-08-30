import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { HiEye } from "@react-icons/all-files/hi/HiEye";
import { HiEyeOff } from "@react-icons/all-files/hi/HiEyeOff";
import { HiPhotograph } from "@react-icons/all-files/hi/HiPhotograph";
import { HiLockClosed } from "@react-icons/all-files/hi/HiLockClosed";

// Validation schema
const loginSchema = yup.object({
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const LoginPage = ({ setCurrentPage }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      setCurrentPage('home');
    }
  }, [user, setCurrentPage]);

  const onSubmit = async (data) => {
    try {
      await login(data);
      setCurrentPage('home');
    } catch (error) {
      // Error is handled in the auth context
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#111111] via-[#0f0f0f] to-[#111111]"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-[#D6A33E]/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-48 h-48 bg-[#D6A33E]/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-[#D6A33E]/8 rounded-full blur-xl animate-pulse delay-500"></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(214, 163, 62, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(214, 163, 62, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-md mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#D6A33E] rounded-full mb-6 shadow-lg shadow-[#D6A33E]/30">
            <HiLockClosed className="w-10 h-10 text-black" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">Welcome Back</h1>
          <p className="text-gray-400 text-lg">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  {...register('email')}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D6A33E] focus:border-transparent transition-all duration-300"
                  placeholder="Enter your email"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D6A33E] focus:border-transparent transition-all duration-300"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? (
                    <HiEyeOff className="h-5 w-5" />
                  ) : (
                    <HiEye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 bg-gray-800 border border-gray-600 rounded focus:ring-[#D6A33E] text-[#D6A33E]"
                />
                <span className="ml-2 text-sm text-gray-300">Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm text-[#D6A33E] hover:text-[#c1922f] transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#D6A33E] to-[#c1922f] text-black font-semibold py-3 px-4 rounded-lg hover:from-[#c1922f] hover:to-[#b8872b] focus:outline-none focus:ring-2 focus:ring-[#D6A33E] focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02]"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 h-px bg-gray-700"></div>
            <span className="px-4 text-sm text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-700"></div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <button
                onClick={() => setCurrentPage('register')}
                className="text-[#D6A33E] hover:text-[#c1922f] font-medium transition-colors"
              >
                Sign up here
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <button
            onClick={() => setCurrentPage('home')}
            className="text-gray-400 hover:text-white transition-colors flex items-center justify-center mx-auto"
          >
            <HiPhotograph className="w-5 h-5 mr-2" />
            Back to Gallery
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
