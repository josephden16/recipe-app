import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import HomePage from "@/pages";
import api from "@/utils/fetcher";
import { Recipe } from "@/types";
import "@testing-library/jest-dom";

jest.mock("../utils/fetcher");

const mockRecipes: Recipe[] = [
  {
    _id: "1",
    title: "Jollof Spaghetti",
    ingredients: ["spaghetti", "beef", "tomato sauce"],
    instructions: "Cook spaghetti, make sauce, mix them together.",
    imageUrl: "https://example.com/spaghetti.jpg",
  },
  {
    _id: "2",
    title: "Fried chicken",
    ingredients: ["chicken", "curry powder", "salt", "pepper"],
    instructions: "Cook chicken, add fry in hot oil",
    imageUrl: "https://example.com/fried-chicken.jpg",
  },
];

describe("HomePage", () => {
  beforeEach(() => {
    (api.get as jest.Mock).mockResolvedValue({
      data: {
        data: {
          results: mockRecipes,
          hasNextPage: true,
        },
      },
    });
  });

  it("should display loading skeletons while fetching data", () => {
    render(<HomePage />);

    const skeletons = screen.getAllByTestId("loading-skeleton");
    expect(skeletons.length).toBe(6); // Ensure there are 6 skeletons displayed
  });

  it("should display recipes after data is fetched", async () => {
    render(<HomePage />);

    // Wait for the loading skeleton to disappear
    const recipeTitles = await screen.findAllByText(/View Details/i);
    expect(recipeTitles).toHaveLength(mockRecipes.length); // Ensure the number of recipes matches mock data

    const firstRecipe = screen.getByText(mockRecipes[0].title);
    await waitFor(() => {
      expect(firstRecipe).toBeInTheDocument(); // Ensure first recipe is rendered
    });
  });

  it("should display error message if fetching fails", async () => {
    (api.get as jest.Mock).mockRejectedValue(
      new Error("Failed to load recipes")
    );

    render(<HomePage />);

    const errorMessage = await screen.findByText(/Failed to load recipes/i);
    await waitFor(() => {
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it("should display a message when no recipes are available", async () => {
    (api.get as jest.Mock).mockResolvedValue({
      data: {
        data: {
          results: [],
          hasNextPage: false,
        },
      },
    });

    render(<HomePage />);

    const noRecipesMessage = await screen.findByText(
      /You don't have any recipes/i
    );
    await waitFor(() => {
      expect(noRecipesMessage).toBeInTheDocument();
    });
  });

  it("should paginate when 'Next' button is clicked", async () => {
    render(<HomePage />);

    const nextButton = await screen.findByText(/Next/i);
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith("/api/recipes?page=2");
    });
  });
});
