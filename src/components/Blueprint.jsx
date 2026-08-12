// A surface card. Kept under the original name so every screen's imports keep
// working; in the Modern Minimal system this is a plain rounded card with a
// hairline border — no corner registration marks.
//
// Stat cards style themselves (sunken fill, no border) via the .stat-card
// class, so this component steps out of the way for those.
export default function Blueprint({ as: As = 'div', className = '', style, children, ...rest }) {
  const selfStyled = className.split(' ').includes('stat-card');
  const base = selfStyled ? {} : {
    background: 'var(--color-surface)',
    border: '1px solid var(--color-divider)',
    borderRadius: 'var(--radius-lg)',
  };
  return (
    <As className={className} style={{ ...base, ...style }} {...rest}>
      {children}
    </As>
  );
}
