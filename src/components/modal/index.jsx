import { useRouter } from 'next/navigation';

const Modal = ({ isOpen, onClose, children }) => {
  const router = useRouter();

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
      if (router.pathname !== '/') {
        router.push('/');
      }
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 flex items-center justify-center z-40 bg-black bg-opacity-50"
    >
      <div className="bg-[#020204] p-10 rounded-md shadow-lg max-w-2xl border z-50 border-custom-border">
        {children}
        <div className="flex flex-row-reverse">
          <button
            onClick={handleOverlayClick}
            className="bg-[#0F1629] py-3 px-4 mt-9 rounded-md shadow-lg border border-custom-border">Fechar</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
