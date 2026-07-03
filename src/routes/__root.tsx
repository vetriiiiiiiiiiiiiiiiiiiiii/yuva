import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";

import { Navbar } from "@/components/yuva/Navbar";
import { Footer, Loader, NeonCursor } from "@/components/yuva/Extras";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
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

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
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
      { title: "YUVA 2026" },
      {
        name: "description",
        content:
          "YUVA 2026 is the national techno-management fest of SRM IST Trichy, featuring events, workshops, Launchpad and FOSS Trichy.",
      },
      { name: "author", content: "YUVA 2026" },
      { property: "og:title", content: "YUVA 2026" },
      {
        property: "og:description",
        content: "National techno-management fest by SRM IST Trichy. Sep 7-10, 2026.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "YUVA 2026" },
      {
        name: "twitter:description",
        content: "National techno-management fest by SRM IST Trichy. Sep 7-10, 2026.",
      },
      {
        property: "og:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/9f86b85e-e8a6-4da0-bb02-45094ad950e8/id-preview-05dfe0af--cf6d59f9-5fde-4386-9b5d-f0a97cd4d24d.lovable.app-1779870690045.png",
      },
      {
        name: "twitter:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/9f86b85e-e8a6-4da0-bb02-45094ad950e8/id-preview-05dfe0af--cf6d59f9-5fde-4386-9b5d-f0a97cd4d24d.lovable.app-1779870690045.png",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
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

function HashScrollHandler() {
  const routerState = useRouterState();
  const hash = routerState.location.hash;
  const pathname = routerState.location.pathname;

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    const cleanId = hash.replace(/^#/, "");
    // Wait a brief moment to ensure elements are mounted
    const t = setTimeout(() => {
      const element = document.getElementById(cleanId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 150);

    return () => clearTimeout(t);
  }, [hash, pathname]);

  return null;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <HashScrollHandler />
      <div className="page-3d-scene relative min-h-screen flex flex-col overflow-x-hidden">
        <SiteAmbientBackground />
        <div className="relative z-10 flex min-h-screen flex-col">
          <Loader />
          <Navbar />
          <main className="flex-grow">
            {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </QueryClientProvider>
  );
}

function SiteAmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-background">
      <div className="site-cinematic-bg" />
      <div className="site-cinematic-grid" />
    </div>
  );
}
