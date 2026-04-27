import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/edit")({
  head: () => ({
    meta: [
      { title: "Editor — CRUDE 3D" },
      { name: "description", content: "Editor module placeholder." },
    ],
  }),
  component: EditorPlaceholder,
});

function EditorPlaceholder() {
  return (
    <main className="min-h-screen bg-background text-foreground grid place-items-center px-6">
      <section className="max-w-md text-center">
        <p className="text-xs font-mono uppercase tracking-widest text-primary">Editor module</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">Editor is handled in a separate project.</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          This menu build keeps the editor link in place without including the editor source code.
        </p>
        <Button asChild className="mt-6">
          <Link to="/">Back to menu</Link>
        </Button>
      </section>
    </main>
  );
}
