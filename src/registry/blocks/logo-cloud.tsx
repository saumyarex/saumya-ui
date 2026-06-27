const logos = ["Northwind", "Cobalt", "Harbor", "Loop", "Vantage", "Meridian"];

export function LogoCloud() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-center text-sm font-medium uppercase tracking-wider text-muted">
          Trusted by fast-moving teams everywhere
        </p>
        <div className="mt-10 grid grid-cols-2 items-center gap-x-8 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
          {logos.map((name) => (
            <div
              key={name}
              className="text-center text-xl font-semibold tracking-tight text-muted opacity-70 transition-opacity hover:opacity-100"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
