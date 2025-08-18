import Image from 'next/image';
import { cn } from '@/lib/cn';

interface HeroSectionProps {
  imageURL: string;
  ctaComponent?: React.ReactNode;
  className?: string;
}
export default function HeroSection({imageURL, ctaComponent, className}: HeroSectionProps) {
    return (
      <section className={cn(`container mx-auto px-4 py-16 md:py-24 grid grid-cols-1 gap-12 items-center overflow-hidden ${className}`)}>
        {/* Text Content Column */}
        <div className="text-center md:text-left animate-duration-[1000ms] animate-delay-200 animate-fadeInLeft">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            Welcome to DeDevs Docs
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Your central hub for component documentation and API specifications. Dive in and build something great!
          </p>
        </div>
        {/* Image Column */}
        <div className="flex justify-center items-center animate-duration-[1000ms] animate-delay-500 animate-fadeInRight">
          <Image
            src={imageURL} // <-- Replace with your actual image path (e.g., /hero-image.png)
            alt="DeDevs Documentation Hero Image"
            width={500} // Adjust width as needed
            height={400} // Adjust height as needed
            className="rounded-lg shadow-lg object-cover" // Style the image
            priority // Prioritize loading for LCP
          />
        </div>
        {ctaComponent}
      </section>
    );
  }