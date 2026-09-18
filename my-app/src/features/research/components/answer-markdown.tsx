import type { ReactNode } from "react";

function renderInline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>;
    }

    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          className="rounded bg-muted px-1.5 py-0.5 text-[0.9em]"
          key={`${part}-${index}`}
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    return part;
  });
}

function tableCells(line: string) {
  return line
    .trim()
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((cell) => cell.trim());
}

function isTableSeparator(line: string) {
  return tableCells(line).every((cell) => /^:?-{3,}:?$/.test(cell));
}

export function AnswerMarkdown({ content }: { content: string }) {
  const lines = content.split(/\r?\n/);
  const blocks: ReactNode[] = [];
  let paragraph: string[] = [];
  let blockKey = 0;

  function flushParagraph() {
    if (paragraph.length === 0) return;
    blocks.push(
      <p className="leading-7 text-foreground/90" key={`paragraph-${blockKey++}`}>
        {renderInline(paragraph.join(" "))}
      </p>,
    );
    paragraph = [];
  }

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index].trim();

    if (!line) {
      flushParagraph();
      continue;
    }

    if (line.startsWith("|") && index + 1 < lines.length && isTableSeparator(lines[index + 1])) {
      flushParagraph();
      const headers = tableCells(line);
      const rows: string[][] = [];
      index += 2;

      while (index < lines.length && lines[index].trim().startsWith("|")) {
        rows.push(tableCells(lines[index]));
        index += 1;
      }
      index -= 1;

      blocks.push(
        <div className="overflow-x-auto rounded-lg border" key={`table-${blockKey++}`}>
          <table className="w-full min-w-[34rem] text-left text-sm">
            <thead className="bg-muted/60">
              <tr>
                {headers.map((header) => (
                  <th className="px-4 py-3 font-semibold" key={header}>
                    {renderInline(header)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {rows.map((row, rowIndex) => (
                <tr className="align-top" key={`row-${rowIndex}`}>
                  {headers.map((_, cellIndex) => (
                    <td className="px-4 py-3 leading-6" key={`cell-${cellIndex}`}>
                      {renderInline(row[cellIndex] ?? "")}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }

    if (/^(#{1,3})\s+/.test(line) || /^\*\*.+\*\*$/.test(line)) {
      flushParagraph();
      const heading = line.replace(/^#{1,3}\s+/, "");
      blocks.push(
        <h3 className="pt-2 text-base font-semibold tracking-tight" key={`heading-${blockKey++}`}>
          {renderInline(heading)}
        </h3>,
      );
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      flushParagraph();
      blocks.push(
        <div className="flex gap-3 leading-7 text-foreground/90" key={`bullet-${blockKey++}`}>
          <span className="mt-3 size-1.5 shrink-0 rounded-full bg-primary" />
          <span>{renderInline(line.replace(/^[-*]\s+/, ""))}</span>
        </div>,
      );
      continue;
    }

    paragraph.push(line);
  }

  flushParagraph();

  return <div className="space-y-4">{blocks}</div>;
}

