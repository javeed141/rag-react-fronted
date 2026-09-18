import { useState } from "react";
import type { FormEvent } from "react";
import { Loader2, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type ResearchFormProps = {
  error: string | null;
  isLoading: boolean;
  onSubmit: (query: string) => void;
};

export function ResearchForm({
  error,
  isLoading,
  onSubmit,
}: ResearchFormProps) {
  const [query, setQuery] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedQuery = query.trim();

    if (trimmedQuery.length < 3) {
      setValidationError("Please enter at least 3 characters.");
      return;
    }

    setValidationError(null);
    onSubmit(trimmedQuery);
  }

  const displayedError = validationError ?? error;

  return (
    <Card className="mx-auto max-w-3xl shadow-lg shadow-primary/5">
      <CardHeader>
        <CardTitle>What would you like to know?</CardTitle>
        <CardDescription>
          Try a question about AI, technology, business, or any recent event.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
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
        {displayedError && (
          <p className="mt-3 text-sm text-destructive" role="alert">
            {displayedError}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

