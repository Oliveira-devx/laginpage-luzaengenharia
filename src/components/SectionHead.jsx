import { SplitLines, Side } from "./SplitText";

/* Cabeçalho padrão das seções: eyebrow + título em duas partes + apoio */
export default function SectionHead({
  eyebrow,
  title,
  accent,
  text,
  align = "center",
  as = "h2",
  children,
}) {
  return (
    <header className={`sh sh-${align}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}

      <SplitLines
        as={as}
        className="sh-title"
        lines={[
          { text: title },
          ...(accent ? [{ text: accent, accent: true }] : []),
        ]}
      />

      {text && (
        <Side className="sh-text" from="right" delay={0.4}>
          {text}
        </Side>
      )}

      {children}
    </header>
  );
}
