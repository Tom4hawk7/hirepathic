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
    <main className="relative min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
      <HomeBackground
        title={backgroundTitle}
        description={backgroundDescription}
      />

      <div className="fixed inset-0 z-10 bg-slate-950/55 backdrop-blur-[1px]" />

      <section className="fixed inset-0 z-20 overflow-y-auto p-6">
        <div className="mx-auto flex min-h-full w-full max-w-5xl items-start justify-center py-8">
          <div className="w-full">
            <h1 className="mb-6 text-center text-4xl font-bold text-white drop-shadow sm:text-5xl">
              {title}
            </h1>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl sm:p-8">
              {children}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}