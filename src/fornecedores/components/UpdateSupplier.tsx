interface UpdateProps {
  onClose: () => void;
}

export default function UpdateSupplier({ onClose }: UpdateProps) {
  return (
    <div className="fixed inset-0 bg-black backdrop-blur-[1.6px] bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-[70%] h-[670px] relative bg-white rounded-lg">
        <div className="absolut w-full bg-black flex justify-end rounded-t-lg ">
          <button
            className="relative bg-black text-center text-white hover:bg-red-600 text-xl font-bold w-[50px] h-[30px] rounded-tr-lg justify-center flex"
            onClick={onClose}
          >
            x
          </button>
        </div>
      </div>
    </div>
  );
}
