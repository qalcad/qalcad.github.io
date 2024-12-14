import React from "react";

export interface ViewModelProps {
  onSubmit: (email: string) => Promise<void>;
}

export interface ViewModel {
  email: string;
  handleEmailChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => Promise<void>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export default function useViewModel({ onSubmit }: ViewModelProps): ViewModel {
  const [email, setEmail] = React.useState("");

  const handleEmailChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEmail(event.target.value.trim());
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit(email);
  };

  return {
    email,
    handleEmailChange,
    handleSubmit
  };
}
