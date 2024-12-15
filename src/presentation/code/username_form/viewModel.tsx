import React from "react";

export interface ViewModelProps {
  onSubmit: (username: string) => Promise<void>;
  onReset: () => void;
}

export interface ViewModel {
  username: string;
  handleUsernameChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => Promise<void>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export default function useViewModel({
  onSubmit,
  onReset
}: ViewModelProps): ViewModel {
  const [username, setUsername] = React.useState("");

  const handleUsernameChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUsername(event.target.value.trim());
    onReset();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit(username);
  };

  return {
    username,
    handleUsernameChange,
    handleSubmit
  };
}
