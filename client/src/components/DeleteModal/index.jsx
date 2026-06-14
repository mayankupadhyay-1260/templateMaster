export default function DeleteModal({
    open,
    onClose,
    onConfirm,
}) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl">

                <h2 className="font-bold mb-4">
                    Delete Product?
                </h2>

                <div className="flex gap-3">
                    <button
                        onClick={
                            onClose
                        }
                        className="border px-4 py-2 rounded"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={
                            onConfirm
                        }
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Delete
                    </button>
                </div>

            </div>
        </div>
    );
}   