import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App'; 


describe('App Component', () => {
  
  it('should render without errors', () => {
    render(<App />);
    
    
    const randomApiHeader = screen.getByText('Here is a random API you can use for your project:');
    const apiComponent = screen.getByText('APIs');
    const securityComponent = screen.getByText('Security');
    const ratingHistogramComponent = screen.getByText('Rating Histogram');
    
    expect(randomApiHeader).toBeInTheDocument();
    expect(apiComponent).toBeInTheDocument();
    expect(securityComponent).toBeInTheDocument();
    expect(ratingHistogramComponent).toBeInTheDocument();
  });
  
});
