import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { LinuxersLogo } from "@/components/linuxers-logo";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="ambient-canvas flex min-h-screen items-center justify-center bg-background px-4 py-16">
      <div className="glass-card w-full max-w-lg p-8 text-center sm:p-12">
        <LinuxersLogo className="mx-auto size-14" />
        <p className="mt-8 font-display text-6xl font-semibold text-blue-ink sm:text-7xl">404</p>
        <h1 className="mt-4 font-display text-2xl font-semibold text-balance">
          This page left the whiteboard.
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved. The blog is still
          where you left it.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/blogs"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-gold px-4 text-sm font-semibold text-ink transition-colors hover:bg-gold-ink"
          >
            Browse the blog
          </Link>
          <Link
            to="/"
            className="inline-flex h-10 items-center justify-center rounded-md border border-border px-4 text-sm font-semibold text-foreground transition-colors hover:border-blue/50 hover:bg-card"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="ambient-canvas flex min-h-screen items-center justify-center bg-background px-4 py-16">
      <div className="glass-card w-full max-w-lg p-8 text-center sm:p-12">
        <LinuxersLogo className="mx-auto size-14" />
        <h1 className="mt-8 font-display text-2xl font-semibold text-balance">
          This page didn't load
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Something went wrong on our end. You can try again or head back home.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex h-10 items-center justify-center rounded-md bg-gold px-4 text-sm font-semibold text-ink transition-colors hover:bg-gold-ink"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-md border border-border px-4 text-sm font-semibold text-foreground transition-colors hover:border-blue/50 hover:bg-card"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "Linuxers E-Cell" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@Lovable" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Sora:wght@500;600;700;800&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      {/* The canvas is light-only, so pin sonner's theme rather than following the OS. */}
      <Toaster theme="light" position="top-right" richColors />
    </QueryClientProvider>
  );
}
