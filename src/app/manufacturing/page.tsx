import { Metadata } from "next";
import ManufacturingSection from "@/components/ManufacturingSection";

export const metadata: Metadata = {
  title:
    "Sugarcane Bagasse Manufacturer in India | Vegnar Green Manufacturing Unit",
  description:
    "Vegnar Green is a leading sugarcane bagasse manufacturer in India with in-house manufacturing facilities producing eco-friendly biodegradable tableware for domestic and export markets.",
  keywords: [
    "sugarcane bagasse manufacturer in India",
    "bagasse tableware manufacturer",
    "biodegradable tableware factory India",
    "eco friendly disposable manufacturer",
    "bagasse plates bowls manufacturer",
    "bagasse products exporter India",
  ],
  alternates: {
    canonical: "https://www.vegnar.com/manufacturing",
  },
};

export default function ManufacturingPage() {
  return <ManufacturingSection />;
}
