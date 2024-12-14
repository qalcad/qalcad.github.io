import React from "react";

export interface ViewModelProps {
  duration: number;
  onSubmit: (code: string) => Promise<void>;
  onExpire: () => void;
}

export interface ViewModel {
  code: string[];
  inputsRef: HTMLInputElement[];
  handleChange: (index: number, value: string) => Promise<void>;
  handleKeyDown: (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => Promise<void>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handlePaste: (event: React.ClipboardEvent<HTMLInputElement>) => Promise<void>;
}

export default function useViewModel({
  onSubmit,
  duration,
  onExpire
}: ViewModelProps) {
  const [code, setCode] = React.useState<string[]>(Array(6).fill(""));
  const inputsRef = React.useRef<HTMLInputElement[]>([]);
  const [timeLeft, setTimeLeft] = React.useState<number>(duration);

  const handleChange = async (index: number, value: string) => {
    if (/^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value.slice(-1);
      setCode(newCode);

      if (value && index < inputsRef.current.length - 1) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = async (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace") {
      // Clear the current input
      const newCode = [...code];
      newCode[index] = "";
      setCode(newCode);

      // Focus the previous input if the current one is already empty
      if (index > 0 && !code[index]) {
        inputsRef.current[index - 1].focus();
      }
    }
  };

  const handlePaste = async (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault(); // Prevent the default paste behavior

    const paste = event.clipboardData.getData("text"); // Get the pasted data
    if (!/^\d+$/.test(paste)) return; // Validate: Allow only numeric values

    const pasteArray = paste.split(""); // Split the pasted string into an array
    const newCode = [...code];

    // Fill the inputs with the pasted values
    pasteArray.forEach((char, i) => {
      if (i < newCode.length) {
        newCode[i] = char;
      }
    });

    setCode(newCode);

    // Move focus to the last filled input
    const lastFilledIndex = Math.min(
      pasteArray.length - 1,
      inputsRef.current.length - 1
    );
    inputsRef.current[lastFilledIndex]?.focus();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fullCode = code.join("");
    if (fullCode.length === 6) {
      await onSubmit(fullCode);
    }
  };

  React.useEffect(() => {
    if (timeLeft <= 0) {
      onExpire();
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onExpire]);

  return {
    code,
    inputsRef,
    timeLeft,
    handleChange,
    handleKeyDown,
    handleSubmit,
    handlePaste
  };
}
