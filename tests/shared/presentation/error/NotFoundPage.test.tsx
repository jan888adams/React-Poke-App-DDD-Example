import { render, screen } from "@testing-library/react";
import { NotFoundPage } from "../../../../src/shared/presentation/components/error/NotFoundPage";

describe("NotFoundPage Component", () => {
  it("renders the 404 message", () => {
    render(<NotFoundPage />);

    expect(screen.getByText("404 - Page Not Found")).toBeInTheDocument();

    expect(
      screen.getByText("The page you are looking for does not exist."),
    ).toBeInTheDocument();

    const container = screen
      .getByRole("heading", { name: /404 - Page Not Found/i })
      .closest("div");
    expect(container).toHaveClass("not-found-page");
  });
});
