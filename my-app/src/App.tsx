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

function App() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <Badge>shadcn/ui working</Badge>

          <h1 className="text-4xl font-bold tracking-tight">
            React + Vite + shadcn/ui
          </h1>

          <p className="text-muted-foreground">
            If you can see this properly, your setup is working.
          </p>
        </div>

        {/* Card */}
        <Card>
          <CardHeader>
            <CardTitle>Setup Test</CardTitle>
            <CardDescription>
              Testing shadcn components, Tailwind CSS and the @ alias.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <Input placeholder="Type something..." />

            <div className="flex gap-3">
              <Button>Primary Button</Button>

              <Button variant="outline">Outline Button</Button>

              <Button variant="destructive">Delete</Button>
            </div>
          </CardContent>
        </Card>

        {/* Grid */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>React</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-muted-foreground">
                React + Vite is running.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tailwind</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-muted-foreground">
                Tailwind CSS classes are working.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>shadcn</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-muted-foreground">
                shadcn components are working.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;