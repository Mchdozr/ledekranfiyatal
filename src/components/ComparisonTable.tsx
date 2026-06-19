export function ComparisonTable({
  headers,
  rows,
  caption,
}: {
  headers: string[];
  rows: (string | { value: string; highlight?: boolean })[][];
  caption?: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 glass">
      {caption && (
        <p className="border-b border-white/10 px-5 py-3 text-sm font-semibold text-white">
          {caption}
        </p>
      )}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              {headers.map((h, i) => (
                <th
                  key={i}
                  className="whitespace-nowrap px-5 py-3.5 font-semibold text-white"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {rows.map((row, ri) => (
              <tr key={ri} className="transition-colors hover:bg-white/5">
                {row.map((cell, ci) => {
                  const obj = typeof cell === "string" ? { value: cell } : cell;
                  return (
                    <td
                      key={ci}
                      className={`px-5 py-3.5 ${
                        ci === 0 ? "font-medium text-white" : "text-muted"
                      } ${obj.highlight ? "font-semibold text-cyan-bright" : ""}`}
                    >
                      {obj.value}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
