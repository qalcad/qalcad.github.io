import useViewModel from "./viewModel";

interface ViewProps {
  disabled: boolean;
  onSubmit: (username: string) => Promise<void>;
  onReset: () => void;
  errorDetail: string | null;
}

export default function View({
  onSubmit,
  onReset,
  disabled,
  errorDetail
}: ViewProps) {
  const { username, handleUsernameChange, handleSubmit } = useViewModel({
    onSubmit,
    onReset
  });

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <div className="mt-2">
          <input
            disabled={disabled}
            type="text"
            name="username"
            id="username"
            autoComplete="username"
            placeholder="Enter a username"
            value={username}
            onChange={handleUsernameChange}
            aria-label="Username"
            required
            pattern="^[a-zA-Z0-9_]{3,30}$"
            className="block w-full rounded-md bg-white px-6 py-3 text-base text-slate-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-amber-600 sm:text-sm/6"
          />
        </div>
        <div className="mt-2 mx-4">
          <p className="block text-sm/6 font-normal text-gray-600">
            {"3–30 characters: letters, numbers, or underscores (_)."}
          </p>
        </div>
        {errorDetail && (
          <div className="mt-2 mx-4">
            <p className="block text-sm/6 text-red-500">{errorDetail}</p>
          </div>
        )}
      </div>
      <div>
        <button
          type="submit"
          disabled={disabled}
          className={`flex w-full justify-center rounded-md bg-slate-900 px-6 py-3 text-sm/6 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 ${
            disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-slate-800"
          }`}
        >
          {"Submit"}
        </button>
      </div>
      {/* <div className="px-2">
          {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
          {successMessage && (
            <p className="text-sm text-green-500">{successMessage}</p>
          )}
        </div> */}
    </form>
  );
}
