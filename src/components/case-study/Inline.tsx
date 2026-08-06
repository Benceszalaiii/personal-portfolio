import { Fragment, type ReactNode } from "react";

/*
  A deliberately tiny inline formatter for case-study body copy: `**strong**`
  and `` `code` ``, nothing else. Long-form prose needs emphasis, but pulling in
  a markdown pipeline for two constructs would cost more than it returns — and
  keeping the grammar this small means content files stay unambiguous.
*/

const TOKEN = /(\*\*[^*]+\*\*|`[^`]+`)/g;

export function Inline({ text }: { text: string }): ReactNode {
  return text.split(TOKEN).map((part, i) => {
    // Index keys are stable: the split of a constant string never reorders.
    const key = `${i}-${part}`;

    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return (
        <strong key={key} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
      return (
        <code
          key={key}
          className="rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return <Fragment key={key}>{part}</Fragment>;
  });
}
