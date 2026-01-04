export default function EmptyState() {
    return (
        <tr>
            <td colSpan={8} className="px-6 py-12 text-center">
                <p className="text-gray-500 dark:text-gray-400">
                    Aucun client trouvé.
                </p>
            </td>
        </tr>
    );
}
