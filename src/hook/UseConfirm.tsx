import { useState } from "react";

type ConfirmOptions = {
  title?: string;
  message?: string;
};

export function useConfirm() {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions>({});
  const [onConfirm, setOnConfirm] = useState<() => void>(() => () => {});

  function confirm(action: () => void, opts?: ConfirmOptions) {
    setOptions(opts || {});
    setOnConfirm(() => action);
    setIsOpen(true);
  }

  function handleConfirm() {
    onConfirm();
    setIsOpen(false);
  }

  function handleCancel() {
    setIsOpen(false);
  }

  const ConfirmDialog = () =>
    isOpen ? (
      <div className="fixed inset-0 bg-[#00000054] backdrop-blur-[1.6px] bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-md w-[350px] text-center">
          <h2 className="text-xl font-bold text-gray-800">{options.title || "Tem certeza?"}</h2>
          <p className="text-gray-600 my-4">{options.message || "Essa ação não poderá ser desfeita."}</p>
          <div className="flex justify-around mt-6">
            <button onClick={handleCancel} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Cancelar</button>
            <button onClick={handleConfirm} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Confirmar</button>
          </div>
        </div>
      </div>
    ) : null;

  return { confirm, ConfirmDialog };
}