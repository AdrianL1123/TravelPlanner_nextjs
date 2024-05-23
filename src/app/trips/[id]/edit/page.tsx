import TripForm from "@/components/TripForm";
import { PrismaClient } from "@prisma/client";
// setup database connection using Prisma
const db = new PrismaClient();

interface EditTripProps {
  params: {
    id: string;
  };
}

export default async function EditTripPage(props: EditTripProps) {
  // get the trip id
  const id = props.params.id;
  // load the trip data using the id
  const trip = await db.trip.findUnique({
    where: {
      id: id,
    },
  });

  if (!trip) return "Trip not found";

  return (
    <div className="xl:container mx-auto">
      <div className="flex flex-col items-center justify-center p-20">
        <p className="text-4xl pb-5 font-semibold">Edit Trip</p>
        <TripForm
          type="edit"
          id={id}
          destination={trip.destination}
          startDate={trip.startDate.toISOString().split("T")[0]}
          endDate={trip.endDate.toISOString().split("T")[0]}
          budget={trip.budget}
        />
      </div>
    </div>
  );
}
