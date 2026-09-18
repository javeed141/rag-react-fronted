import { ExternalLink } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { ResearchResponse } from "@/types/research";

type ResearchResultsProps = {
  result: ResearchResponse;
};

export function ResearchResults({ result }: ResearchResultsProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <Card>
        <CardHeader>
          <CardTitle>Research summary</CardTitle>
          <CardDescription>
            Based on the latest available articles.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap leading-7 text-foreground/90">
            {result.answer}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sources</CardTitle>
          <CardDescription>
            {result.sources.length} article{result.sources.length === 1 ? "" : "s"} used
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {result.sources.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No sources were returned for this question.
            </p>
          ) : (
            result.sources.map((source) => (
              <a
                className="block rounded-lg border p-3 transition-colors hover:bg-muted"
                href={source.url}
                key={source.url}
                rel="noreferrer"
                target="_blank"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="line-clamp-2 text-sm font-medium">{source.title}</p>
                  <ExternalLink className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {source.source} · {source.published_at}
                </p>
              </a>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}

