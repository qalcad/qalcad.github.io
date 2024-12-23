import { ServicePpo } from "@/core/models";

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
export const OPENNING_DATE = new Date("2025-03-01T00:00:00");

export const SLOGAN_SHORT = "Classifieds Fortress.";
export const SLOGAN = "Classifieds Fortress. The Marketplace You Can Trust.";
export const DESCRIPTION_SHORT =
  "Qalcad is a trusted, community-driven marketplace where youth and businesses can buy, sell, and connect securely.";
export const INTRODUCTION =
  "More Than a Platform—A Gateway to Growth; Qalcad empowers communities and fuels vibrant digital trade. By fostering secure, digital transactions, it enables youth and businesses to unlock endless opportunities. With a user-friendly interface and robust tools, Qalcad makes buying, selling, and advertising simple and rewarding for everyone.";
export const SERVICES: ServicePpo[] = [
  {
    icons: ["📦", "🔍", "🛍️"],
    title: "Classifieds",
    content:
      "List, discover, and trade goods and services in a secure, trusted marketplace."
  },
  {
    icons: ["🏢", "📇", "📍"],
    title: "Business Directory & Collections",
    content:
      "Explore and connect with local businesses and their services in one seamless platform."
  },
  {
    icons: ["🖥️", "📣", "🌐"],
    title: "Digital Out-of-Home (DOOH) Advertising",
    content:
      "Amplify your reach with impactful, location-based digital advertising."
  }
];

export const SALES_NOTE =
  "Whether you're buying, selling, or advertising, Qalcad is the ultimate tool to connect, trade, and thrive in today's competitive marketplace.";
export const CLOSING_NOTE_HEADER = "No digital infrastructure? No problem.";
export const CLOSING_NOTE =
  "Qalcad is your partner in digital transformation. From creating an online presence to showcasing collections and generating QR codes for customer engagement, we make going digital effortless. Empower your business to grow, connect, and succeed in today’s fast-paced world—all with Qalcad.";

export const ABOUT_US_PARAGRAPH_01 =
  "We are a passionate team of innovators, led by Somali visionaries, dedicated to driving digital transformation in Somalia.";
export const ABOUT_US_PARAGRAPH_02 =
  " Trade—both locally and internationally—is the cornerstone of thriving communities, and we are here to empower those connections. By delivering cutting-edge digital solutions, we aim to bridge gaps, create opportunities, and revolutionize commerce. At Qalcad, we’re not just building a platform; we’re shaping the future of trade and prosperity for all. ✨";

export const ABOUT_US_PARAGRAPH_03 =
  "Looking ahead to 2025, we also plan to provide cutting-edge digital solutions tailored specifically for Somali organizations and businesses, empowering them to excel in a rapidly evolving digital landscape. 🚀";

export const CTA_NOTE =
  "Grow your business with us, connect locally, reach globally, and achieve more.";
