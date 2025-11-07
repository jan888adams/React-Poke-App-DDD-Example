import { render, screen, fireEvent } from "@testing-library/react";
import { Form } from "../../../../../src/pokemon/presentation/components/search/Form";

describe("Form", () => {
  it("calls onSubmit with trimmed value when submitted", async () => {
    const handleSubmit = jest.fn();
    render(<Form onSubmit={handleSubmit} />);

    const input = screen.getByPlaceholderText("Find your pokemon..");
    const button = screen.getByRole("button", { name: /search/i });

    fireEvent.change(input, { target: { value: "  pikachu  " } });
    fireEvent.click(button);

    await screen.findByPlaceholderText("Find your pokemon..");

    expect(handleSubmit).toHaveBeenCalledWith("pikachu");
  });

  it("shows validation error for empty input", async () => {
    const handleSubmit = jest.fn();
    render(<Form onSubmit={handleSubmit} />);

    const button = screen.getByRole("button", { name: /search/i });
    fireEvent.click(button);

    expect(
      await screen.findByText("Please enter a Pokemon name or ID"),
    ).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it("shows validation error for special characters", async () => {
    const handleSubmit = jest.fn();
    render(<Form onSubmit={handleSubmit} />);

    const input = screen.getByPlaceholderText("Find your pokemon..");
    const button = screen.getByRole("button", { name: /search/i });

    fireEvent.change(input, { target: { value: "pikachu!" } });
    fireEvent.click(button);

    expect(
      await screen.findByText(
        "Only letters, numbers, spaces, and - are allowed",
      ),
    ).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });
});
