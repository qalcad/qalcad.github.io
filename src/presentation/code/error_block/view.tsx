import useViewModel from "./viewModel";

interface ViewProps {
  disabled: boolean;
  onRetry: () => Promise<void>;
  errorDetail: string;
}

export default function View({ onRetry, disabled, errorDetail }: ViewProps) {
  const { handleRetry } = useViewModel({ onRetry });

  return (
    <div className="space-y-6">
      <div className="mt-4 mb-10">
        <p className="block text-sm/6 text-red-500 text-center">
          {errorDetail}
        </p>
      </div>
      <div>
        <button
          onClick={handleRetry}
          type="submit"
          disabled={disabled}
          className={`flex w-full justify-center rounded-md bg-slate-900 px-6 py-3 text-sm/6 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 ${
            disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-slate-800"
          }`}
        >
          {"Retry"}
        </button>
      </div>
    </div>
  );
}
