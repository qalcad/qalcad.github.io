import React from "react";

export interface ViewModelProps {
  onRetry: () => Promise<void>;
}

export interface ViewModel {
  handleRetry: (event: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
}

export default function useViewModel({ onRetry }: ViewModelProps): ViewModel {
  const handleRetry = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await onRetry();
  };

  return {
    handleRetry
  };
}
