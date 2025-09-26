export default function RootLayout ( {
  children,
}: Readonly<{
  children: React.ReactNode;
}> ) {
  return (
    <section className="section-wrapper">
      { children }
    </section>
  );
}