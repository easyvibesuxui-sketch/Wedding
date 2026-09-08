export function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: number | string;
  hint?: string;
}) {
  return (
    <div className="rounded-xl border border-ivory-300 bg-white p-6 shadow-sm">
      <p className="text-xs uppercase tracking-wider text-sage-400">{label}</p>
      <p className="mt-2 font-serif text-4xl text-sage-800">{value}</p>
      {hint ? <p className="mt-1 text-xs text-sage-400">{hint}</p> : null}
    </div>
  );
}
