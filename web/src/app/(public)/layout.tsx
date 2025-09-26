export default function RootLayout ( {
  children,
}: Readonly<{
  children: React.ReactNode;
}> ) {
  return (
    <section className="container mx-auto py-8 lg:pt-12 lg:pb-16 px-5 lg:px-0">
      { children }
    </section>
  );
}