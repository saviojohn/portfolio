import styles from './Badge.module.css';

export interface BadgeProps {
  label: string;
  color?: 'accent' | 'neutral' | 'success' | 'warning';
  className?: string;
}

export function Badge({ 
  label, 
  color = 'neutral',
  className = ''
}: BadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[color]} ${className}`}>
      {(color === 'success' || color === 'warning') && (
        <span style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', borderWidth: 0 }}>
          {color}: 
        </span>
      )}
      {label}
    </span>
  );
}
