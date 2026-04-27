import { createFileRoute } from "@tanstack/react-router";
import AuthLayout from "@/components/auth/AuthLayout";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Sign up — CRUDE 3D" },
      { name: "description", content: "Create your CRUDE 3D account." },
    ],
  }),
  component: () => <AuthLayout mode="signup" />,
});
