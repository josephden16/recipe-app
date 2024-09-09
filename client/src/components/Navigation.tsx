import Link from "next/link";

const Navigation = () => (
  <nav className="bg-gray-800 p-4">
    <div className="container mx-auto flex justify-between items-center">
      <Link className="text-white text-lg font-semibold" href="/">
        Home
      </Link>
      <Link className="text-white text-lg font-semibold" href="/create-recipe">
        Create Recipe
      </Link>
    </div>
  </nav>
);

export default Navigation;
