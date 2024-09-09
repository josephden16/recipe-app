import { useForm } from "react-hook-form";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import api from "@/utils/fetcher";
import { Recipe } from "@/types";
import Head from "next/head";

type UpdateRecipeForm = {
  title: string;
  instructions: string;
  ingredients: string;
  image: File;
};

const EditRecipePage = ({ recipe }: { recipe: Recipe }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateRecipeForm>({
    defaultValues: {
      title: recipe.title,
      instructions: recipe.instructions,
      ingredients: recipe.ingredients.join(","),
    },
  });
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const router = useRouter();

  const onSubmit = async (data: UpdateRecipeForm) => {
    if (file && !file.type.startsWith("image/")) {
      setFileError("Only image files are allowed.");
      return;
    }

    const ingredients = data.ingredients
      .split(",")
      .map((ingredient: string) => ingredient.trim());
    const formData = new FormData();
    formData.append("title", data.title);
    for (const ingredient of ingredients) {
      formData.append("ingredients[]", ingredient);
    }
    formData.append("instructions", data.instructions);
    if (file) formData.append("image", file);

    try {
      await api.put(`/api/recipes/${recipe._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      router.push("/");
    } catch (err) {
      alert("Failed to update recipe");
      console.error("Failed to update recipe.");
    }
  };

  return (
    <>
      <Head>
        <title>Edit Recipe</title>
      </Head>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Edit Recipe</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className="input"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Ingredients (comma-separated)
            </label>
            <input
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
            <label className="block text-sm font-medium mb-1">
              Instructions
            </label>
            <textarea
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
            {fileError && <p className="text-red-500 text-sm">{fileError}</p>}
          </div>
          <button type="submit" className="btn btn-primary">
            Update Recipe
          </button>
        </form>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const { data } = await api.get(`/api/recipes/${id}`);
  return { props: { recipe: data.data } };
};

export default EditRecipePage;
