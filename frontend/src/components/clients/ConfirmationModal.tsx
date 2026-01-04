import { FiAlertTriangle } from "react-icons/fi";

export default function ConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Confirmer",
    cancelText = "Annuler",
}: {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string | React.ReactNode;
    confirmText?: string;
    cancelText?: string;
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 max-w-md w-full">
                <div className="mb-4 flex justify-center">
                    <div className="p-3 rounded-full bg-red-100 dark:bg-red-900">
                        <FiAlertTriangle
                            size={32}
                            className="text-red-600 dark:text-red-400"
                        />
                    </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">
                    {title}
                </h3>
                <div className="text-gray-600 dark:text-gray-400 mb-6 text-center">
                    {message}
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition">
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition">
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}
