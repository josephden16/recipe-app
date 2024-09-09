import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EditRecipePage from "@/pages/edit-recipe/[id]";
import { useRouter } from "next/router";
import axios from "axios";
import "@testing-library/jest-dom";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("axios");

const mockRecipe = {
  _id: "1",
  title: "Delicious Pancakes",
  ingredients: ["Flour", "Milk", "Eggs"],
  instructions: "Mix all ingredients and cook.",
  imageUrl: "/pancakes.jpg",
};

describe("EditRecipePage", () => {
  const push = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push,
    });
  });

  it("renders the edit form with existing recipe data", () => {
    render(<EditRecipePage recipe={mockRecipe} />);

    // Check if form fields are populated with recipe data
    expect(screen.getByDisplayValue("Delicious Pancakes")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Flour,Milk,Eggs")).toBeInTheDocument();
    expect(
      screen.getByDisplayValue("Mix all ingredients and cook.")
    ).toBeInTheDocument();
  });

  it("displays validation errors when form fields are empty", async () => {
    render(<EditRecipePage recipe={mockRecipe} />);

    // Clear title input and submit the form
    const titleInput = screen.getByDisplayValue("Delicious Pancakes");
    fireEvent.change(titleInput, { target: { value: "" } });

    const submitButton = screen.getByText("Update Recipe");
    fireEvent.click(submitButton);

    // Check if the validation errors are displayed
    await waitFor(() => {
      expect(screen.getByText("Title is required")).toBeInTheDocument();
    });
  });

  it("submits the updated recipe successfully", async () => {
    (axios.put as jest.Mock).mockResolvedValueOnce({});

    render(<EditRecipePage recipe={mockRecipe} />);

    const titleInput = screen.getByDisplayValue("Delicious Pancakes");
    fireEvent.change(titleInput, { target: { value: "Tasty Pancakes" } });

    const ingredientsInput = screen.getByDisplayValue("Flour,Milk,Eggs");
    fireEvent.change(ingredientsInput, {
      target: { value: "Flour,Milk,Eggs,Sugar" },
    });

    const instructionsInput = screen.getByDisplayValue(
      "Mix all ingredients and cook."
    );
    fireEvent.change(instructionsInput, {
      target: { value: "Mix ingredients and fry." },
    });

    const submitButton = screen.getByText("Update Recipe");
    fireEvent.click(submitButton);

    // Check if the put request was made with the correct form data
    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith(
        `/api/recipes/${mockRecipe._id}`,
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
