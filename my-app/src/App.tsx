import { useState } from "react";
import type { FormEvent } from "react";
import { ExternalLink, Loader2, Search, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

type Source = {
  title: string;
  source: string;
  url: string;
  published_at: string;
};

type ResearchResponse = {
  answer: string;
  sources: Source[];
};

const API_URL = "https://webloader-maq2.onrender.com";

function App() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<ResearchResponse | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function research(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedQuery = query.trim();

    if (trimmedQuery.length < 3) {
      setError("Please enter at least 3 characters.");
      return;
    }

    setIsLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(`${API_URL}/news/research`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: trimmedQuery }),
      });

      const payload = (await response.json()) as
        | ResearchResponse
        | { detail?: string };

      if (!response.ok) {
        throw new Error(
          "detail" in payload && payload.detail
            ? payload.detail
            : "The research request failed.",
        );
      }

      setResult(payload as ResearchResponse);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Could not connect to the research API.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-muted/30 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="space-y-4 text-center">
          <Badge variant="secondary" className="gap-1.5 px-3 py-1">
            <Sparkles className="size-3.5" />
            GenAI News Research
          </Badge>
          <div className="space-y-2">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Ask the news.
            </h1>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Search recent stories and get a concise, source-backed answer
              from your research assistant.
            </p>
          </div>
        </header>

        <Card className="mx-auto max-w-3xl shadow-lg shadow-primary/5">
          <CardHeader>
            <CardTitle>What would you like to know?</CardTitle>
            <CardDescription>
              Try a question about AI, technology, business, or any recent
              event.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-3 sm:flex-row" onSubmit={research}>
              <Input
                aria-label="Research question"
                className="h-10 flex-1"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="What are the latest developments in AI agents?"
                value={query}
              />
              <Button className="h-10 gap-2" disabled={isLoading} type="submit">
                {isLoading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Search className="size-4" />
                )}
                {isLoading ? "Researching..." : "Research"}
              </Button>
            </form>
            {error && (
              <p className="mt-3 text-sm text-destructive" role="alert">
                {error}
              </p>
            )}
          </CardContent>
        </Card>

        {isLoading && (
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-11/12" />
                <Skeleton className="h-4 w-4/5" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-24" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </CardContent>
            </Card>
          </div>
        )}

        {result && !isLoading && (
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <Card>
              <CardHeader>
                <CardTitle>Research summary</CardTitle>
                <CardDescription>Based on the latest available articles.</CardDescription>
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
                  {result.sources.length} article
                  {result.sources.length === 1 ? "" : "s"} used
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
                        <p className="line-clamp-2 text-sm font-medium">
                          {source.title}
                        </p>
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
        )}

        {!result && !isLoading && !error && (
          <p className="text-center text-sm text-muted-foreground">
            Your answer will appear here with links to the original reporting.
          </p>
        )}
      </div>
    </main>
  );
}

export default App;