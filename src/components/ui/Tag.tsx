import styles from './Tag.module.css';

export interface TagProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Tag({
  label,
  active = false,
  onClick,
  className = '',
}: TagProps) {
  const isInteractive = typeof onClick === 'function';
  
  const classNames = [
    styles.tag,
    isInteractive ? styles.interactive : '',
    active ? styles.active : '',
    className,
  ].filter(Boolean).join(' ');

  if (isInteractive) {
    return (
      <button
        type="button"
        className={classNames}
        onClick={onClick}
        aria-pressed={active}
      >
        {label}
      </button>
    );
  }

  return (
    <span className={classNames}>
      {label}
    </span>
  );
}
