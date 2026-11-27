import type { Metadata } from "next";
import { DetailsForm } from "@/components/DetailsForm";

export const metadata: Metadata = {
  title: "Your business details",
  robots: { index: false, follow: false },
};

export default function DetailsPage() {
  return <DetailsForm />;
}
