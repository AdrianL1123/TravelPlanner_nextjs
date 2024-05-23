import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { log } from "console";

// setup database connection using Prisma
const db = new PrismaClient();

export default async function Home() {
  // get the trips data from db
  const trips = await db.trip.findMany();

  return (
    <div className="2xl:container mx-auto px-16 p-10 max-w-screen-xl">
      <h1 className="text-4xl pb-5 font-semibold">Upcoming Trips</h1>
      <div className="flex flex-col items-center">
        <div className="pt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {trips.length > 0 ? (
            trips.map((trip) => {
              return (
                <div
                  key={trip.id}
                  className="size-fit p-5 border`-2 shadow-md rounded-md"
                >
                  <div className="text-xl mb-2 pb-5">{trip.destination}</div>
                  <div className="">
                    Date: {trip.startDate.toISOString().split("T")[0]} -{" "}
                    {trip.endDate.toISOString().split("T")[0]}
                  </div>
                  <div className="mb-4">Budget: ${trip.budget}</div>
                  <Link
                    href={"/trips/" + trip.id}
                    className="flex items-center justify-center w-full p-2 rounded bg-blue-50 text-blue-700 hover:bg-blue-700 hover:text-white transition duration-300 ease-in-out"
                  >
                    View Details
                  </Link>
                </div>
              );
            })
          ) : (
            <p className="text-2xl text-center">No Upcoming Trips Yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
