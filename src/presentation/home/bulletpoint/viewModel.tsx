"use client";
import React from "react";

export interface ViewModelProps {
  icons: string[];
}

export interface ViewModel {
  icon: string;
}

export default function useViewModel({ icons }: ViewModelProps): ViewModel {
  const [currentIconIndex, setCurrentIconIndex] = React.useState<number>(0);

  React.useEffect(() => {
    const updateIcon = () => {
      setCurrentIconIndex((prevIndex) => (prevIndex + 1) % icons.length);
    };

    // Randomize the next interval (between 500ms and 3000ms)
    const randomInterval = Math.floor(Math.random() * 1500) + 500;

    // Set a timeout to update the icon
    const timeoutId = setTimeout(updateIcon, randomInterval);

    // Cleanup the timeout on unmount or dependency change
    return () => clearTimeout(timeoutId);
  }, [currentIconIndex, icons.length]);

  return {
    icon: icons[currentIconIndex]
  };
}
