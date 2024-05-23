import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// setup database connection using Prisma
const db = new PrismaClient();

interface TripDetailsProps {
  params: {
    id: string;
  };
}

const deleteTrip = async (formData: FormData) => {
  "use server";
  try {
    const id = formData.get("id") as string;
    // delete the trip
    await db.trip.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
  }

  // revalidate and redirect
  revalidatePath("/");
  redirect("/");
};

export default async function TripDetailsPage(props: TripDetailsProps) {
  // get the trip id first
  const id = props.params.id;

  // then load the trip data using the id
  const trip = await db.trip.findUnique({
    where: {
      id: id,
    },
  });

  if (!trip) return "Trip not found";

  return (
    <>
      <div className="flex items-center justify-center flex-col pt-10">
        <h3 className="text-4xl font-semibold mb-2 pb-5">
          {trip?.destination}
        </h3>
        <div className="border border-black p-5">
          <p className="text-md mb-2">
            Date: {trip?.startDate.toISOString().split("T")[0]} -{" "}
            {trip?.endDate.toISOString().split("T")[0]}
          </p>
          <p className="text-md mb-6">Budget: ${trip?.budget}</p>
          <div className="flex justify-center gap-4">
            <Link
              href={"/trips/" + trip.id + "/edit"}
              className="rounded p-2 bg-blue-50 text-blue-700 hover:bg-blue-700 hover:text-white transition duration-300 ease-in-out"
            >
              Edit Details
            </Link>
            <form action={deleteTrip}>
              <input type="hidden" name="id" value={id} />
              <button className="rounded p-2 bg-red-50 text-red-700 hover:bg-red-700 hover:text-white transition duration-300 ease-in-out">
                Remove Trip
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
