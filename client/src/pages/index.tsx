import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/utils/fetcher";
import { Recipe } from "@/types";
import Head from "next/head";

const SkeletonCard = () => (
  <div
    data-testid="loading-skeleton"
    className="loading-skeleton border p-4 rounded shadow-md animate-pulse"
  >
    <div className="w-full h-32 bg-gray-300 rounded mb-2"></div>
    <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
    <div className="h-6 bg-gray-300 rounded w-1/4"></div>
  </div>
);

const HomePage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await api.get(`/api/recipes?page=${page}`);
        const responseData = response.data.data;
        setRecipes(responseData.results);
        setHasNextPage(responseData.hasNextPage);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError("Failed to load recipes.");
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [page]);

  return (
    <>
      <Head>
        <title>Recipe App</title>
      </Head>
      <div className="container mx-auto p-4 relative">
        <h1 className="text-3xl font-bold mb-4">Recipes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : recipes.length > 1 ? (
            recipes.map((recipe) => (
              <div key={recipe._id} className="border p-4 rounded shadow-md">
                {recipe.imageUrl && (
                  <img
                    src={recipe.imageUrl}
                    alt={recipe.title}
                    className="w-full h-32 object-cover mb-2"
                  />
                )}
                <h2 className="text-xl font-semibold">{recipe.title}</h2>
                <Link
                  className="text-blue-500 hover:underline"
                  href={`/recipes/${recipe._id}`}
                >
                  View Details
                </Link>
              </div>
            ))
          ) : (
            <div className="absolute text-center w-full mt-10">
              {`You don't have any recipes`}
              <div>
                <Link
                  className="text-blue-500 hover:underline"
                  href="/create-recipe"
                >
                  Create one now
                </Link>
              </div>
            </div>
          )}
        </div>
        <div className="mt-4 flex justify-between">
          {page > 1 && (
            <button
              onClick={() => setPage(page - 1)}
              className="btn btn-primary"
            >
              Previous
            </button>
          )}
          {hasNextPage && (
            <button
              onClick={() => setPage(page + 1)}
              className="btn btn-primary"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
