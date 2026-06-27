const stats = [
  { value: "99.99%", label: "Uptime over the last year" },
  { value: "120k+", label: "Developers building with us" },
  { value: "8B", label: "Requests served per day" },
  { value: "<40ms", label: "Median global response time" },
];

export function Stats() {
  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-surface p-8 text-center">
              <div className="text-4xl font-semibold tracking-tight">{s.value}</div>
              <div className="mt-2 text-sm text-muted">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
