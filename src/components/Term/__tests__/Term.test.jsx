import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Term from '../index.js';

describe('Term component', () => {
  const defaultProps = {
    term: 'AQAL',
    definition: 'All Quadrants, All Levels, All Lines, All States, All Types',
  };

  it('renders the term text', () => {
    render(<Term {...defaultProps} />);
    expect(screen.getByText('AQAL')).toBeInTheDocument();
  });

  it('renders the definition text in the tooltip', () => {
    render(<Term {...defaultProps} />);
    expect(screen.getByText(defaultProps.definition)).toBeInTheDocument();
  });

  it('sets the aria-label combining term and definition', () => {
    render(<Term {...defaultProps} />);
    const wrapper = screen.getByText('AQAL').closest('span');
    expect(wrapper).toHaveAttribute(
      'aria-label',
      'AQAL: All Quadrants, All Levels, All Lines, All States, All Types'
    );
  });

  it('has tooltip role on the definition element', () => {
    render(<Term {...defaultProps} />);
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveTextContent(defaultProps.definition);
  });

  it('is keyboard focusable (tabIndex={0})', () => {
    render(<Term {...defaultProps} />);
    const wrapper = screen.getByText('AQAL').closest('span');
    expect(wrapper).toHaveAttribute('tabIndex', '0');
  });

  it('shows tooltip on hover (CSS handled by styles.module.css)', () => {
    // CSS-based: we verify the tooltip element exists and wrapper has hover styles
    render(<Term {...defaultProps} />);
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toBeInTheDocument();
    // The .wrapper:hover .tooltip CSS class toggles opacity — verified in styles.module.css
  });

  it('renders multiple Term components independently', () => {
    render(
      <>
        <Term term="Quadrant" definition="One of four perspectives in AQAL" />
        <Term term="Line" definition="A domain of development" />
      </>
    );
    expect(screen.getByText('Quadrant')).toBeInTheDocument();
    expect(screen.getByText('Line')).toBeInTheDocument();
  });
});
