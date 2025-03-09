import React from 'react';
import './Footer.css';
import { Facebook, Linkedin, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      {/* Footer Links */}
      <div className="footer-links">
        <a href="/about">About Us</a>
        <a href="/contact">Contact</a>
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/terms">Terms of Service</a>
      </div>
      
      {/* Social Media Icons */}
      <div className="social-media">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon facebook">
          <Facebook size={24} />
        </a>
        <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="social-icon x">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor" />
          </svg>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon instagram">
          <Instagram size={24} />
        </a>
      </div>
      
      {/* Copyright Notice */}
      <div className="copyright">
        &copy; {new Date().getFullYear()} InTurn. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;