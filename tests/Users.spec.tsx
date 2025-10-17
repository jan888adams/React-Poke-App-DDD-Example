import { render } from "@testing-library/react";
import Users from "../src/Users";

describe("User", () => {
  test("renders heading", async () => {
    const { getByRole } = render(<Users />);
    expect(getByRole("heading", { name: "Users" })).toBeInTheDocument();
  });

  test("renders a list of users", async () => {
    const { findAllByRole } = render(<Users />);
    const users = await findAllByRole("listitem");
    expect(users).toHaveLength(2);
  });
});