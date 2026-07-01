import Link from 'next/link';
import styles from './Button.module.css';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  href?: string;
  className?: string;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  href,
  className = '',
}: ButtonProps) {
  const classNames = [
    styles.button,
    styles[variant],
    styles[size],
    className,
  ].filter(Boolean).join(' ');

  if (href) {
    // If it's an external link
    if (href.startsWith('http') || href.startsWith('mailto')) {
      return (
        <a 
          href={href} 
          className={classNames}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }
    
    // Internal link
    return (
      <Link href={href} className={classNames}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={classNames}
      disabled={disabled}
      onClick={onClick}
      aria-disabled={disabled}
    >
      {children}
    </button>
  );
}
