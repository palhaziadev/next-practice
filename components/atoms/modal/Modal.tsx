'use client';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';
import cn from 'classnames';
import Button, { ButtonSize, ButtonType } from '../button/Button';
import { useTranslations } from 'next-intl';
import { BaseComponent } from '@/types';

type ModalProps = {
  show: boolean;
  title?: string;
  children: ReactNode;
  parentRef?: string;
  onClose: () => void;
  footerRenderer?: () => ReactNode;
};

const Modal: React.FC<ModalProps & BaseComponent> = ({
  show,
  title,
  children,
  parentRef,
  className,
  onClose,
  footerRenderer,
}) => {
  const showTimer = useRef<ReturnType<typeof setTimeout>>();
  const t = useTranslations('Modal');
  const portalRef = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const closeOnEscapeKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  // TODO
  // fix closing when multiple modals are open
  useEffect(() => {
    portalRef.current = document.querySelector<HTMLElement>(
      parentRef ?? '#modal-portal'
    );
    document.body.addEventListener('keydown', closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener('keydown', closeOnEscapeKeyDown);
    };
  }, []);

  useEffect(() => {
    clearTimeout(showTimer.current);

    if (!show && isVisible) {
      showTimer.current = setTimeout(() => setMounted(false), 300);
    }
    if (show && !mounted) {
      setMounted(true);
    }
    showTimer.current = setTimeout(() => setIsVisible(show), 50);

    return function cleanup() {
      clearTimeout(showTimer.current);
    };
  }, [show, isVisible, mounted]);

  return mounted && portalRef.current
    ? createPortal(
        <div
          className={cn(styles.modal, className, {
            [styles['modal--visible']]: isVisible,
          })}
          onClick={onClose}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h4 className={styles.modalTitle}>{title}</h4>
              <Button
                onClick={onClose}
                text={t('close')}
                type={ButtonType.Secondary}
                size={ButtonSize.Small}
              />
            </div>
            <div className={styles.modalBody}>{children}</div>
            {footerRenderer?.() && (
              <div className={styles.modalFooter}>{footerRenderer()}</div>
            )}
          </div>
        </div>,
        portalRef.current
      )
    : null;
};

export default Modal;
