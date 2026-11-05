import HeroSlider from "@/components/shared/HeroSlider";
import HowBorrowingWorks from "@/components/shared/HowBorrowingWorks";
import NewArrivals from "@/components/shared/NewArrivals";

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <NewArrivals />
      <HowBorrowingWorks />
    </main>
  );
}
