import { ExternalLink } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AnswerMarkdown } from "@/features/research/components/answer-markdown";
import type { ResearchResponse } from "@/types/research";

type ResearchResultsProps = {
  result: ResearchResponse;
};

export function ResearchResults({ result }: ResearchResultsProps) {
  return (
    <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(18rem,1fr)]">
      <Card className="min-w-0">
        <CardHeader>
          <CardTitle>Research summary</CardTitle>
          <CardDescription>
            Based on the latest available articles.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AnswerMarkdown content={result.answer} />
        </CardContent>
      </Card>

      <Card className="min-w-0">
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
                  <p className="line-clamp-2 break-words text-sm font-medium">{source.title}</p>
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
