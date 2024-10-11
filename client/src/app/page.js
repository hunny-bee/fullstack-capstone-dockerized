import Hero from '@/components/ui/Hero';
import FeaturedListings from '@/components/ui/FeaturedListings';
import ExperienceCategories from '@/components/ui/ExperienceCategories';
import Auth from '@/components/ui/Auth';
import AIChat from '@/components/ui/AIChat';
import TrendingListings from '@/components/ui/TrendingListing';


export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <Hero />
      <FeaturedListings />
      <ExperienceCategories />
      <TrendingListings/>
      <AIChat/>
      <Auth/>
    </div>
  );
}