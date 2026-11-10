import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import { profile } from './data/profile';

function ResumeRedirect() {
  useEffect(() => { window.location.href = profile.resumeUrl; }, []);
  return null;
}

export default function App() {
  return (
    <div className="min-h-screen overflow-x-clip bg-black">
      <a href="#content" className="skip-link">Skip to main content</a>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resume" element={<ResumeRedirect />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
