import localFont from "next/font/local";

export const RobotoMono = localFont({
  src: [
    {
      path: "../../assets/fonts/RobotoMono-VariableFont_wght.ttf",
      weight: "100 900", // Variable font weight range
      style: "normal" // Normal style for the regular font
    },
    {
      path: "../../assets/fonts/RobotoMono-Italic-VariableFont_wght.ttf",
      weight: "100 900", // Variable font weight range for italic
      style: "italic" // Italic style for the italic font
    }
  ],
  variable: "--font-roboto-mono" // CSS variable name for this font
});
