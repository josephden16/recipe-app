import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import api from "@/utils/fetcher";
import { Recipe } from "@/types";
import Head from "next/head";

const RecipeDetailsPage = ({ recipe }: { recipe: Recipe }) => {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await api.delete(`/api/recipes/${recipe._id}`);
      router.push("/");
    } catch (err) {
      alert("Failed to delete recipe");
      console.error("Failed to delete recipe.");
    }
  };

  const goToEditPage = (): void => {
    router.push(`/edit-recipe/${recipe._id}`);
  };

  return (
    <>
      <Head>
        <title>{recipe.title}</title>
      </Head>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
        {recipe.imageUrl && (
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-64 object-cover mb-4"
          />
        )}
        <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
        <ul className="list-disc ml-4">
          {recipe.ingredients.map((ing: string, index: number) => (
            <li key={index}>{ing}</li>
          ))}
        </ul>
        <h2 className="text-xl font-semibold mt-4 mb-2">Instructions</h2>
        <p>{recipe.instructions}</p>
        <div className="mt-4 space-y-2">
          <button className="btn btn-primary" onClick={() => goToEditPage()}>
            Edit
          </button>
          <button onClick={handleDelete} className="btn btn-danger ml-4">
            Delete
          </button>
        </div>
        <Link className="btn btn-secondary mt-4 inline-block" href="/">
          Back to Home
        </Link>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const { data } = await api.get(`/api/recipes/${id}`);
  return { props: { recipe: data.data } };
};

export default RecipeDetailsPage;
