import HeroSlider from "@/components/shared/HeroSlider";
import HowBorrowingWorks from "@/components/shared/HowBorrowingWorks";
import NewArrivals from "@/components/shared/NewArrivals";
import TopCategories from "@/components/shared/TopCategories";

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <NewArrivals />
      <HowBorrowingWorks />
      <TopCategories />
    </main>
  );
}
