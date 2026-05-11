import { useStore } from '@nanostores/react';
import { toasts } from '../store/cart';

export default function Toast() {
  const $toasts = useStore(toasts);
  
  return (
    <div className="toast-container" role="status" aria-live="polite">
      {$toasts.map(t => (
        <div key={t.id} className="toast">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          {t.message}
        </div>
      ))}
    </div>
  );
}
