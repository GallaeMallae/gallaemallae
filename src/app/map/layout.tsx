import LocationInitializer from "@/components/system/LocationInitializer";
import Header from "@/components/common/Header";

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <LocationInitializer />
      <Header />
      <main>{children}</main>
    </div>
  );
}
