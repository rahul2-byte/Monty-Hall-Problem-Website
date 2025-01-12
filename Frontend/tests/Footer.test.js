import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Footer from './Footer';

describe('Footer Component', () => {
  beforeEach(() => {
    render(<Footer />);
  });

  test('renders all sections', () => {
    expect(screen.getByText('Quick Links')).toBeInTheDocument();
    expect(screen.getByText('Connect With Us')).toBeInTheDocument();
    expect(screen.getByText('Newsletter')).toBeInTheDocument();
  });

  test('renders all quick links', () => {
    const links = ['Home', 'About', 'Contact'];
    links.forEach(link => {
      expect(screen.getByText(link)).toBeInTheDocument();
    });
  });

  test('renders social media links', () => {
    const socialLinks = ['Facebook', 'Twitter', 'Instagram'];
    socialLinks.forEach(link => {
      expect(screen.getByText(link)).toBeInTheDocument();
    });
  });

  test('renders newsletter input', () => {
    const input = screen.getByPlaceholderText('Enter email');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'email');
  });

  test('renders copyright text', () => {
    expect(screen.getByText(/© 2025 Card Game. All rights reserved./)).toBeInTheDocument();
  });
});