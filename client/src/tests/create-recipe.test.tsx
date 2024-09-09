import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CreateRecipePage from "@/pages/create-recipe";
import { useRouter } from "next/router";
import api from "@/utils/fetcher";
import "@testing-library/jest-dom";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../utils/fetcher");

describe("CreateRecipePage", () => {
  const push = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push,
    });
  });

  it("renders the create recipe form", () => {
    render(<CreateRecipePage />);

    // Check if the form elements are rendered
    expect(screen.getByLabelText("Title")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Ingredients (comma-separated)")
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Instructions")).toBeInTheDocument();
    expect(screen.getByLabelText("Image")).toBeInTheDocument();
    expect(screen.getByText("Create Recipe")).toBeInTheDocument();
  });

  it("displays validation errors when form fields are empty", async () => {
    render(<CreateRecipePage />);

    // Submit form without filling fields
    const submitButton = screen.getByText("Create Recipe");
    fireEvent.click(submitButton);

    // Check if validation errors are displayed
    await waitFor(() => {
      expect(screen.getByText("Title is required")).toBeInTheDocument();
      expect(screen.getByText("Ingredients are required")).toBeInTheDocument();
      expect(screen.getByText("Instructions are required")).toBeInTheDocument();
    });
  });

  it("submits the form successfully and redirects", async () => {
    (api.post as jest.Mock).mockResolvedValueOnce({});

    render(<CreateRecipePage />);

    // Fill in the form
    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: "Tasty Pizza" },
    });
    fireEvent.change(screen.getByLabelText("Ingredients (comma-separated)"), {
      target: { value: "Flour, Cheese, Tomato" },
    });
    fireEvent.change(screen.getByLabelText("Instructions"), {
      target: { value: "Mix ingredients and bake." },
    });

    // Simulate submitting the form
    const submitButton = screen.getByText("Create Recipe");
    fireEvent.click(submitButton);

    // Check if the post request was made and user is redirected
    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith(
        "/api/recipes",
        expect.any(FormData),
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      expect(push).toHaveBeenCalledWith("/");
    });
  });
});
