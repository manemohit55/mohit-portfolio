import Header from "./Header";
import ScrollProgress from "./ScrollProgress";

export default function Layout({ children }) {
  return (
    <div className="relative min-h-screen bg-[#f3f3f5] text-[#2f2f2f]">
      <ScrollProgress />
      <Header />
      {children}
    </div>
  );
}
