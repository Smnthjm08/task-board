import { Footer } from "@/components/global/footer";
import { NavBar } from "@/components/global/navbar";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full ">
      <NavBar />
      <main className="pt-40 pb-20">{children}</main>
      <Footer />
    </div>
  );
};

export default MarketingLayout;
