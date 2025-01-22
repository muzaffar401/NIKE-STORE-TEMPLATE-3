import BrowseStyles from "@/components/home/browser-styles";
import NewArrivals from "@/components/home/new-arrivals";
import Testimonials from "@/components/home/testimonials";
import TopSelling from "@/components/home/top-selling";
import { client } from '@/sanity/lib/client';
import { productQuery } from '@/sanity/lib/queries';
import HeroBanner from '@/components/home/Hero';
import Subscription from '@/components/home/Subscription';
import ShoesCarousel from "@/components/home/ProductSlider";
import Video from "@/components/home/Video";



export default async function Home() {

  return (
    <>
      <div>
        <HeroBanner />
        <ShoesCarousel/>
        <NewArrivals />
        <hr />
        <TopSelling />
        <Video/>
        <BrowseStyles />
        <Testimonials />
        <Subscription/>
      </div>
    </>
  );
}

