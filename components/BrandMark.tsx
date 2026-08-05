export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="brand-mark" aria-label="solvia">
      <span className="brand-mark__dot" aria-hidden="true" />
      <span>solvia</span>
      {!compact && <small>LIVE STREAM GROWTH PARTNER</small>}
    </span>
  );
}
