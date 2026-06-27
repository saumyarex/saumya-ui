import { type PropDef } from "@/registry/registry";

export function PropsTable({ props }: { props: PropDef[] }) {
  return (
    <div className="overflow-x-auto rounded-base border border-border">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-surface-2/50 text-xs uppercase tracking-wide text-muted">
            <th className="px-4 py-2.5 font-medium">Prop</th>
            <th className="px-4 py-2.5 font-medium">Type</th>
            <th className="px-4 py-2.5 font-medium">Default</th>
            <th className="px-4 py-2.5 font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((p) => (
            <tr key={p.name} className="border-b border-border last:border-0 align-top">
              <td className="px-4 py-3">
                <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-xs text-foreground">
                  {p.name}
                </code>
              </td>
              <td className="px-4 py-3">
                <code className="font-mono text-xs text-accent">{p.type}</code>
              </td>
              <td className="px-4 py-3">
                {p.default ? (
                  <code className="font-mono text-xs text-muted">{p.default}</code>
                ) : (
                  <span className="text-muted">—</span>
                )}
              </td>
              <td className="px-4 py-3 text-muted">{p.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
