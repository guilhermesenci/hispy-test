import { useRouter } from 'next/navigation';
import { FC, MouseEvent } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const router = useRouter();

  if (!isOpen) return null;

  const handleClose = (e: MouseEvent<HTMLDivElement> | MouseEvent<HTMLButtonElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
      if (typeof window !== 'undefined' && window.location.pathname !== '/') {
        router.push('/');
      }
    }
  };

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 flex items-center justify-center z-40 bg-black bg-opacity-50"
    >
      <div className="bg-[#020204] p-10 rounded-2xl shadow-lg max-w-2xl border z-50 border-custom-border">
        {children}
        <div className="flex flex-row-reverse">
          <button
            onClick={handleClose}
            className="bg-[#0F1629] py-3 px-4 mt-9 rounded-md shadow-lg border border-custom-border hover:bg-[#7F8EA3] transition-all"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
