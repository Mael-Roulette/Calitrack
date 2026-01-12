import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function PublicLayout ( {
  children,
}: Readonly<{
  children: React.ReactNode;
}> ) {
  return (
    <>
        <Header />
      { children }
        <Footer />
    </>
  );
}
