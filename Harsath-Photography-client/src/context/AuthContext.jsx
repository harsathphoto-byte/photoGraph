import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'react-toastify';

// Initial state
const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isLoading: false,
  isAuthenticated: false,
};

// Action types
const authActions = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  SET_USER: 'SET_USER',
  UPDATE_USER: 'UPDATE_USER',
  CLEAR_ERROR: 'CLEAR_ERROR',
};

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case authActions.LOGIN_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case authActions.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };

    case authActions.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload,
      };

    case authActions.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        error: null,
      };

    case authActions.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };

    case authActions.UPDATE_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };

    case authActions.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// Context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check if user is authenticated on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token and get user data
      fetchUserProfile();
    }
  }, []);

  // API base URL
  const API_BASE_URL = 'http://localhost:3001/api';

  // Helper function to make API calls
  const apiCall = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(state.token && { Authorization: `Bearer ${state.token}` }),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'An error occurred');
    }

    return data;
  };

  // Login function
  const login = async (credentials) => {
    try {
      dispatch({ type: authActions.LOGIN_START });

      const data = await apiCall('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });

      localStorage.setItem('token', data.token);
      dispatch({
        type: authActions.LOGIN_SUCCESS,
        payload: { user: data.user, token: data.token },
      });

      toast.success('Login successful!');
      return data;
    } catch (error) {
      dispatch({
        type: authActions.LOGIN_FAILURE,
        payload: error.message,
      });
      toast.error(error.message);
      throw error;
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      dispatch({ type: authActions.LOGIN_START });

      const data = await apiCall('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      });

      localStorage.setItem('token', data.token);
      dispatch({
        type: authActions.LOGIN_SUCCESS,
        payload: { user: data.user, token: data.token },
      });

      toast.success('Registration successful!');
      return data;
    } catch (error) {
      dispatch({
        type: authActions.LOGIN_FAILURE,
        payload: error.message,
      });
      toast.error(error.message);
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: authActions.LOGOUT });
    toast.success('Logged out successfully');
  };

  // Fetch user profile
  const fetchUserProfile = async () => {
    try {
      const data = await apiCall('/auth/me');
      dispatch({ type: authActions.SET_USER, payload: data.user });
    } catch (error) {
      // Token might be invalid, clear it
      localStorage.removeItem('token');
      dispatch({ type: authActions.LOGOUT });
    }
  };

  // Update user profile
  const updateProfile = async (updates) => {
    try {
      const data = await apiCall('/auth/profile', {
        method: 'PUT',
        body: JSON.stringify(updates),
      });

      dispatch({ type: authActions.UPDATE_USER, payload: data.user });
      toast.success('Profile updated successfully!');
      return data;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  // Change password
  const changePassword = async (passwordData) => {
    try {
      await apiCall('/auth/change-password', {
        method: 'POST',
        body: JSON.stringify(passwordData),
      });

      toast.success('Password changed successfully!');
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    fetchUserProfile,
    apiCall,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
