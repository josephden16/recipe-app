import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useState } from "react";
import api from "@/utils/fetcher";
import Head from "next/head";

type CreateRecipeForm = {
  title: string;
  instructions: string;
  ingredients: string;
  image: File;
};

const CreateRecipePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateRecipeForm>();
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  const onSubmit = async (data: CreateRecipeForm) => {
    const ingredients = data.ingredients
      .split(",")
      .map((ingredient: string) => ingredient.trim());
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("instructions", data.instructions);
    for (const ingredient of ingredients) {
      formData.append("ingredients[]", ingredient);
    }
    if (file) formData.append("image", file);

    try {
      await api.post("/api/recipes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      router.push("/");
    } catch (err) {
      console.error("Failed to create recipe.");
    }
  };

  return (
    <>
      <Head>
        <title>Create New Recipe</title>
      </Head>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Create New Recipe</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title
            </label>
            <input
              id="title"
              type="text"
              {...register("title", { required: "Title is required" })}
              className="input"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="ingredients"
              className="block text-sm font-medium mb-1"
            >
              Ingredients (comma-separated)
            </label>
            <input
              id="ingredients"
              type="text"
              {...register("ingredients", {
                required: "Ingredients are required",
              })}
              className="input"
            />
            {errors.ingredients && (
              <p className="text-red-500 text-sm">
                {errors.ingredients.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="instructions"
              className="block text-sm font-medium mb-1"
            >
              Instructions
            </label>
            <textarea
              id="instructions"
              {...register("instructions", {
                required: "Instructions are required",
              })}
              className="input"
            />
            {errors.instructions && (
              <p className="text-red-500 text-sm">
                {errors.instructions.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="upload-image"
              className="block text-sm font-medium mb-1"
            >
              Image
            </label>
            <input
              id="upload-image"
              type="file"
              onChange={(e) =>
                setFile(e.target.files ? e.target.files[0] : null)
              }
              className="input"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Create Recipe
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateRecipePage;
