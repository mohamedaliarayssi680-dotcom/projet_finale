import { FiCheckCircle } from "react-icons/fi";

export default function SuccessModal({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 max-w-sm w-full text-center">
                <div className="mb-4 flex justify-center">
                    <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
                        <FiCheckCircle
                            size={40}
                            className="text-green-600 dark:text-green-400"
                        />
                    </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Succès !
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Le client a été enregistré avec succès.
                </p>
                <button
                    onClick={onClose}
                    className="w-full px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition">
                    Fermer
                </button>
            </div>
        </div>
    );
}
