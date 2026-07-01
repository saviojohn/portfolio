import Link from 'next/link';
import styles from './IconLink.module.css';

export interface IconLinkProps {
  href: string;
  icon: React.ReactNode;
  label?: string;
  external?: boolean;
  'aria-label'?: string;
  className?: string;
}

export function IconLink({
  href,
  icon,
  label,
  external = false,
  'aria-label': ariaLabel,
  className = '',
}: IconLinkProps) {
  const isExternal = external || href.startsWith('http') || href.startsWith('mailto');
  const classNames = `${styles.iconLink} ${className}`.trim();
  
  // If there's no visible label, require aria-label or fallback to label prop if used visually
  const accessibleLabel = ariaLabel || label;

  const content = (
    <>
      {icon}
      {label && <span className={styles.label}>{label}</span>}
    </>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        className={classNames}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={accessibleLabel}
      >
        {content}
      </a>
    );
  }

  return (
    <Link 
      href={href} 
      className={classNames}
      aria-label={accessibleLabel}
    >
      {content}
    </Link>
  );
}
