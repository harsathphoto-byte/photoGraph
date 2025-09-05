import React, { createContext, useContext, useRef } from 'react';

const GalleryContext = createContext();

export const useGallery = () => {
  const context = useContext(GalleryContext);
  if (!context) {
    throw new Error('useGallery must be used within a GalleryProvider');
  }
  return context;
};

export const GalleryProvider = ({ children }) => {
  const photoGalleryRef = useRef(null);
  const videoGalleryRef = useRef(null);

  const refreshPhotoGallery = () => {
    console.log('🔄 Refreshing photo gallery...');
    if (photoGalleryRef.current && photoGalleryRef.current.refresh) {
      photoGalleryRef.current.refresh();
    }
  };

  const refreshVideoGallery = () => {
    console.log('🔄 Refreshing video gallery...');
    if (videoGalleryRef.current && videoGalleryRef.current.refresh) {
      videoGalleryRef.current.refresh();
    }
  };

  const value = {
    photoGalleryRef,
    videoGalleryRef,
    refreshPhotoGallery,
    refreshVideoGallery,
  };

  return (
    <GalleryContext.Provider value={value}>
      {children}
    </GalleryContext.Provider>
  );
};
