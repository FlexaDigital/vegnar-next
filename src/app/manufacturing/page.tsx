import { Metadata } from 'next';
import ManufacturingSection from '@/components/ManufacturingSection';

export const metadata: Metadata = {
  title: 'Manufacturing Excellence | Vegnar Greens - Eco-Friendly Tableware Production',
  description: 'Discover Vegnar\'s state-of-the-art manufacturing facility producing biodegradable tableware from sugarcane bagasse. Export-ready quality with sustainable practices.',
  keywords: 'bagasse manufacturing, eco-friendly production, biodegradable tableware factory, sugarcane bagasse processing, sustainable manufacturing India',
};

export default function ManufacturingPage() {
  return <ManufacturingSection />;
}
