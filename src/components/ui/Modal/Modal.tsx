import { ReactNode, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import clsx from 'clsx';
import styles from './Modal.module.scss';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  variant?: 'small' | 'large'| 'med'; 
}

export default function Modal({ children, onClose, variant = 'large' }: ModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (backdropRef.current && e.target === backdropRef.current) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div ref={backdropRef} className={styles.backdrop}>
      <div
        className={clsx(styles.modal, {
          [styles.small]: variant === 'small',
          [styles.large]: variant === 'large',
          [styles.med]: variant === 'med'
          
        })}
      >
        <button className={styles.closeButton} onClick={onClose}>
          <X size={35} />
        </button>
        {children}
      </div>
    </div>
  );
}
