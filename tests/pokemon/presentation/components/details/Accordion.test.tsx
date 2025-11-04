import { render, screen, fireEvent } from "@testing-library/react";
import { Accordion } from "../../../../../src/pokemon/presentation/components/details/Accordion";

describe("Accordion", () => {
  const defaultProps = {
    title: "Abilities",
    isOpen: false,
    onToggle: jest.fn(),
    items: [
      ["Overgrow", "Generation III", "Boosts Grass moves."],
      ["Chlorophyll", "Generation III", "Boosts Speed in sunshine."],
    ],
    columns: ["Name", "Generation", "Effect"],
    onFetch: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders closed accordion with correct button text", () => {
    render(<Accordion {...defaultProps} />);
    expect(screen.getByText("Show Abilities")).toBeInTheDocument();
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });

  it("renders open accordion with table and items", () => {
    render(<Accordion {...defaultProps} isOpen={true} />);
    expect(screen.getByText("Hide Abilities")).toBeInTheDocument();
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(3); // 1 header + 2 items
    expect(screen.getByText("Overgrow")).toBeInTheDocument();
    expect(screen.getByText("Chlorophyll")).toBeInTheDocument();
  });

  it("calls onToggle and onFetch when opening", () => {
    render(<Accordion {...defaultProps} />);
    fireEvent.click(screen.getByRole("button"));
    expect(defaultProps.onFetch).toHaveBeenCalled();
    expect(defaultProps.onToggle).toHaveBeenCalled();
  });

  it("calls only onToggle when closing", () => {
    render(<Accordion {...defaultProps} isOpen={true} />);
    fireEvent.click(screen.getByRole("button"));
    expect(defaultProps.onFetch).not.toHaveBeenCalled();
    expect(defaultProps.onToggle).toHaveBeenCalled();
  });
});
