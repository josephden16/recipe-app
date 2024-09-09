import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RecipeDetailsPage from "@/pages/recipes/[id]";
import api from "@/utils/fetcher";
import { useRouter } from "next/router";
import "@testing-library/jest-dom";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../utils/fetcher", () => ({
  delete: jest.fn(),
  get: jest.fn(),
}));

const mockRecipe = {
  _id: "1",
  title: "Delicious Pancakes",
  ingredients: ["Flour", "Milk", "Eggs"],
  instructions: "Mix all ingredients and cook.",
  imageUrl: "/pancakes.jpg",
};

describe("RecipeDetailsPage", () => {
  const push = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push,
    });
  });

  it("renders the recipe details", async () => {
    render(<RecipeDetailsPage recipe={mockRecipe} />);

    // Check if the title, ingredients, and instructions are rendered
    expect(screen.getByText("Delicious Pancakes")).toBeInTheDocument();
    expect(screen.getByText("Flour")).toBeInTheDocument();
    expect(screen.getByText("Milk")).toBeInTheDocument();
    expect(screen.getByText("Eggs")).toBeInTheDocument();
    expect(
      screen.getByText("Mix all ingredients and cook.")
    ).toBeInTheDocument();

    // Check if the image is rendered
    const img = screen.getByAltText("Delicious Pancakes");
    expect(img).toHaveAttribute("src", "/pancakes.jpg");
  });

  it('navigates to the edit page when "Edit" is clicked', async () => {
    render(<RecipeDetailsPage recipe={mockRecipe} />);

    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);

    // Check if the router push method is called with the correct route
    expect(push).toHaveBeenCalledWith(`/edit-recipe/${mockRecipe._id}`);
  });

  it("deletes the recipe and redirects to home page", async () => {
    (api.delete as jest.Mock).mockResolvedValueOnce({});

    render(<RecipeDetailsPage recipe={mockRecipe} />);

    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    // Check if the delete API was called
    expect(api.delete).toHaveBeenCalledWith(`/api/recipes/${mockRecipe._id}`);

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith("/");
    });
  });

  it('navigates back to home page when "Back to Home" is clicked', async () => {
    render(<RecipeDetailsPage recipe={mockRecipe} />);

    const backButton = screen.getByText("Back to Home");
    fireEvent.click(backButton);

    // Ensure that push was called to navigate back to the home page
    expect(push).toHaveBeenCalledWith("/");
  });
});
