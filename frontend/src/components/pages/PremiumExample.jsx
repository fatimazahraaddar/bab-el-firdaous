import React from 'react';
import './PremiumExample.css';

export default function PremiumExample() {
  return (
    <div className="premium-page">
      {/* Left Side - Gradient Background */}
      <div className="premium-left">
        <div className="premium-left-content">
          {/* Logo */}
          <div className="premium-logo">
            <div className="premium-logo-icon">🎯</div>
            <h1>PremiumApp</h1>
          </div>

          {/* Hero Text */}
          <div className="premium-hero">
            <h2>Welcome to the future of productivity</h2>
            <p>
              Experience the next generation of tools designed to streamline your workflow
              and boost your team's performance.
            </p>
          </div>

          {/* Features */}
          <div className="premium-features">
            <div className="premium-feature">
              <span className="premium-feature-icon">⚡</span>
              <div className="premium-feature-text">
                <h4>Lightning Fast</h4>
                <p>Built for speed with modern architecture</p>
              </div>
            </div>
            <div className="premium-feature">
              <span className="premium-feature-icon">🔒</span>
              <div className="premium-feature-text">
                <h4>Enterprise Security</h4>
                <p>Bank-level security for your peace of mind</p>
              </div>
            </div>
            <div className="premium-feature">
              <span className="premium-feature-icon">🤝</span>
              <div className="premium-feature-text">
                <h4>Team Collaboration</h4>
                <p>Work together seamlessly from anywhere</p>
              </div>
            </div>
          </div>

          {/* Illustration */}
          <div className="premium-illustration">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="100" r="80" fill="rgba(255,255,255,0.1)"/>
              <circle cx="100" cy="100" r="60" fill="rgba(255,255,255,0.05)"/>
              <path d="M60,100 Q100,60 140,100 Q100,140 60,100" fill="rgba(255,255,255,0.2)"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Right Side - Content Card */}
      <div className="premium-right">
        <div className="premium-card">
          {/* Card Header */}
          <div className="premium-card-header">
            <h2>Get Started</h2>
            <p>Create your account to begin your journey</p>
          </div>

          {/* Form */}
          <form className="premium-form">
            <div className="premium-form-group">
              <label htmlFor="email">Email Address</label>
              <div className="premium-input-wrapper">
                <span className="premium-input-icon">📧</span>
                <input
                  type="email"
                  id="email"
                  className="premium-input"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="premium-form-group">
              <label htmlFor="password">Password</label>
              <div className="premium-input-wrapper">
                <span className="premium-input-icon">🔒</span>
                <input
                  type="password"
                  id="password"
                  className="premium-input"
                  placeholder="Create a password"
                />
              </div>
            </div>

            <button type="submit" className="premium-btn">
              Create Account
              <span>→</span>
            </button>
          </form>

          {/* Divider */}
          <div className="premium-divider">
            <span>or continue with</span>
          </div>

          {/* Social Login */}
          <div className="premium-social">
            <button className="premium-social-btn">
              <span>🌐</span>
              Google
            </button>
            <button className="premium-social-btn">
              <span>💙</span>
              Facebook
            </button>
          </div>

          {/* Footer */}
          <div className="premium-footer">
            <p>Already have an account? <a href="#" className="premium-link">Sign In</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}