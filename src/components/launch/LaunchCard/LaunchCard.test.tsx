vi.mock("@/lib/utils", () => ({
  fontClamp: () => "1rem",
  cn: (...args: string[]) => args.join(" "),
}));
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), prefetch: vi.fn() }),
}));
import React from "react";
import { vi } from "vitest";

// Mock Next.js font import (Orbitron)
vi.mock("@/lib/utils/font", () => ({
  obitron: { variable: "--font-orbitron" },
}));
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { LaunchCard } from "./LaunchCard";

const mockLaunch = {
  id: "1",
  title: "FalconSat",
  date: "2006-03-24",
  time: "22:30",
  rocket: "Falcon 1",
  launchpad: "Kwajalein Atoll",
  status: "Failure" as const,
  favourited: false,
};

describe("LaunchCard", () => {
  it("renders mission name", () => {
    render(<LaunchCard {...mockLaunch} />);
    expect(screen.getAllByText("FalconSat").length).toBeGreaterThan(0);
  });

  it("renders rocket name", () => {
    render(<LaunchCard {...mockLaunch} />);
    expect(screen.getAllByText("Falcon 1").length).toBeGreaterThan(0);
  });

  it("shows failure badge if launch failed", () => {
    render(<LaunchCard {...mockLaunch} />);
    expect(screen.getAllByText(/failure/i).length).toBeGreaterThan(0);
  });

  it("renders launch date", () => {
    render(<LaunchCard {...mockLaunch} />);
    expect(screen.getAllByText(/2006-03-24/).length).toBeGreaterThan(0);
  });

  it("renders launch time", () => {
    render(<LaunchCard {...mockLaunch} />);
    expect(screen.getAllByText("22:30").length).toBeGreaterThan(0);
  });
});
