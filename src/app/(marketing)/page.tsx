import type { Metadata } from "next";
import HomePreviewPage from "./home-preview/page";

export const metadata: Metadata = {
  title: "MenuQrLab — Custom Print & Digital Marketing for Restaurants",
  description:
    "Custom wet wipes, fridge magnets, QR menus and practical digital marketing for local restaurants. Production-level pricing, agency-quality service.",
};

export const revalidate = 30;

export default HomePreviewPage;
