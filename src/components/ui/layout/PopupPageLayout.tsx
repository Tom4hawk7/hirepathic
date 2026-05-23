import HomeBackground from "./HomeBackground";

type PopupPageLayoutProps = {
  title: string;
  children: React.ReactNode;
  backgroundTitle?: string;
  backgroundDescription?: string;
};

export default function PopupPageLayout({
  title,
  children,
  backgroundTitle,
  backgroundDescription,
}: PopupPageLayoutProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
      <HomeBackground
        title={backgroundTitle}
        description={backgroundDescription}
      />

      <div className="fixed inset-0 bg-slate-950/55 backdrop-blur-[1px]" />

      <section className="fixed inset-0 flex items-center justify-center overflow-y-auto p-6">
        <div className="w-full max-w-5xl py-8">
          <h1 className="mb-6 text-center text-5xl font-bold text-white drop-shadow">
            {title}
          </h1>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-2xl">
            {children}
          </div>
        </div>
      </section>
    </main>
  );
}