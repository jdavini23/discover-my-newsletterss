import React from 'react';
import styled from 'styled-components';
import { DefaultTheme } from 'styled-components';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
}

const StyledButton = styled.button<{ theme: DefaultTheme } & ButtonProps>`
  font-family: ${props => props.theme.typography.fontFamily};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.theme.borderRadius.md};

  // Variant Styles
  background-color: ${props => {
    switch (props.variant) {
      case 'primary':
        return props.theme.colors.primary;
      case 'secondary':
        return props.theme.colors.secondary;
      case 'accent':
        return props.theme.colors.accent;
      default:
        return props.theme.colors.primary;
    }
  }};

  color: ${props => props.theme.colors.background};

  // Size Styles
  padding: ${props => {
    switch (props.size) {
      case 'sm':
        return `${props.theme.spacing.sm} ${props.theme.spacing.md}`;
      case 'lg':
        return `${props.theme.spacing.lg} ${props.theme.spacing.xl}`;
      default:
        return `${props.theme.spacing.md} ${props.theme.spacing.lg}`;
    }
  }};

  font-size: ${props => {
    switch (props.size) {
      case 'sm':
        return props.theme.typography.fontSize.small;
      case 'lg':
        return props.theme.typography.fontSize.large;
      default:
        return props.theme.typography.fontSize.base;
    }
  }};

  &:hover {
    opacity: 0.85;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  ...props
}) => {
  return (
    <StyledButton variant={variant} size={size} {...props}>
      {children}
    </StyledButton>
  );
};
