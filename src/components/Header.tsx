import Link from "next/link";

export default function Header() {
  return (
    <div className="bg-blue-400 flex justify-between items-center p-3 px-10 text-white">
      <Link href="/" className="font-base text-lg">
        Travel Planner App
      </Link>
      <div className="flex gap-2">
        <Link
          href="/"
          className="px-2 transition duration-300 ease-in-out hover:text-gray-700"
        >
          Home
        </Link>
        <Link
          href="/new"
          className="px-2 transition duration-300 ease-in-out hover:text-gray-700"
        >
          New Trip
        </Link>
      </div>
    </div>
  );
}
