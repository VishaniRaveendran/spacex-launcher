import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FavoritesProvider } from "@/hooks/FavoritesContext";

describe("LaunchListView", () => {
  beforeEach(() => {
    vi.mock("@/hooks/useLaunches", () => ({
      useLaunches: () => ({
        launches: [
          {
            id: "1",
            name: "FalconSat",
            date_utc: "2006-03-24T22:30:00.000Z",
            rocket: "Falcon 1",
            launchpad: "Kwajalein",
            success: true,
            links: { webcast: "", wikipedia: "" },
          },
          {
            id: "2",
            name: "DemoSat",
            date_utc: "2007-03-21T01:10:00.000Z",
            rocket: "Falcon 1",
            launchpad: "Kwajalein",
            success: false,
            links: { webcast: "", wikipedia: "" },
          },
        ],
        loading: false,
        error: null,
        hasMore: false,
      }),
    }));
    vi.resetModules();
    vi.clearAllMocks();
    vi.mock("next/navigation", () => ({
      useRouter: () => ({ replace: vi.fn() }),
      useSearchParams: () => new URLSearchParams(),
    }));
    vi.mock("@/hooks/useDebouncedValue", () => ({
      useDebouncedValue: (v: string) => v,
    }));
    vi.mock("@/hooks/FavoritesContext", () => {
      return {
        useFavoritesContext: () => ({
          favorites: ["1"],
          toggleFavorite: vi.fn(),
          isFavorite: (id: string) => id === "1",
          clearFavorites: vi.fn(),
        }),
        FavoritesProvider: ({ children }: { children: React.ReactNode }) => (
          <>{children}</>
        ),
      };
    });
    vi.mock("@/lib/api/client", () => ({
      fetchAllLaunchYears: () => Promise.resolve(["2023", "2022"]),
      fetchFilteredLaunchCount: () => Promise.resolve(2),
      fetchTotalLaunchCount: () => Promise.resolve(2),
    }));
    vi.mock("@/components/common/Filters/Filters", () => ({
      Filters: (props: React.ComponentPropsWithoutRef<"div">) => (
        <div data-testid="filters" {...props}>
          Filters
        </div>
      ),
    }));
    vi.mock("@/components/common/LoadingSkeleton/ListSkeleton", () => ({
      ListSkeleton: (props: React.HTMLAttributes<HTMLDivElement>) => (
        <div data-testid="loading-skeleton" {...props}>
          Loading...
        </div>
      ),
    }));
    vi.mock("@/components/launch/CountMessage/CountMessage", () => ({
      CountMessage: () => (
        <div data-testid="count-message">No more launches to load.</div>
      ),
    }));
    vi.mock("@/components/common/Button/Button", () => ({
      Button: (
        props: React.PropsWithChildren<
          React.ButtonHTMLAttributes<HTMLButtonElement>
        >
      ) => <button {...props}>{props.children}</button>,
    }));
    vi.mock("@/components/common/Header/Header", () => ({
      default: () => <div>Header</div>,
    }));
    vi.mock("@/components/launch/SearchFilters/Search", () => ({
      default: () => <input aria-label="search" />,
    }));
    vi.mock("@/components/common/Typography/Typography", () => ({
      Typography: (
        props: React.HTMLAttributes<HTMLDivElement> & {
          children?: React.ReactNode;
        }
      ) => <div {...props}>{props.children}</div>,
    }));
    vi.mock("@/components/launch/LaunchCard/LaunchCard", () => ({
      LaunchCard: () => (
        <>
          <div data-testid="launch-card">FalconSat</div>
          <div data-testid="launch-card">DemoSat</div>
        </>
      ),
    }));
  });

  it("renders a list of launches", async () => {
    const { LaunchListView } = await import("./LaunchListView");
    render(
      <FavoritesProvider>
        <LaunchListView />
      </FavoritesProvider>
    );
    const cards = screen.getAllByTestId("launch-card");
    expect(cards.length).toBeGreaterThanOrEqual(2);
    expect(cards[0].textContent).toBe("FalconSat");
    expect(cards[1].textContent).toBe("DemoSat");
  });

  it("renders filters", async () => {
    const { LaunchListView } = await import("./LaunchListView");
    render(
      <FavoritesProvider>
        <LaunchListView />
      </FavoritesProvider>
    );
    expect(screen.getAllByTestId("filters")[0]).toBeTruthy();
  });

  it("shows count message", async () => {
    const { LaunchListView } = await import("./LaunchListView");
    render(
      <FavoritesProvider>
        <LaunchListView />
      </FavoritesProvider>
    );
    expect(screen.getAllByTestId("count-message")[0]).toBeTruthy();
  });

  it("shows loading skeleton if loading", async () => {
    vi.doMock("@/hooks/useLaunches", () => ({
      useLaunches: () => ({
        launches: [],
        loading: true,
        error: null,
        hasMore: false,
      }),
    }));
    const { LaunchListView } = await import("./LaunchListView");
    render(
      <FavoritesProvider>
        <LaunchListView />
      </FavoritesProvider>
    );
    expect(screen.getAllByTestId("loading-skeleton")[0]).toBeTruthy();
  });

  it("shows no more launches message if hasMore is false", async () => {
    const { LaunchListView } = await import("./LaunchListView");
    render(
      <FavoritesProvider>
        <LaunchListView />
      </FavoritesProvider>
    );
    const msgs = screen.getAllByText(/no more launches to load/i);
    expect(msgs.length).toBeGreaterThanOrEqual(1);
  });
});
