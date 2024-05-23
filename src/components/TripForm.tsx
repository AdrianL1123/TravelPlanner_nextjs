// ? make the field optinal instead of required field
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// setup database connection using Prisma
const db = new PrismaClient();

interface TripFormProps {
  type?: string;
  destination?: string;
  startDate?: string;
  endDate?: string;
  budget?: number | null;
  id?: string;
}

// function to create trip in database
const createTrip = async (formData: FormData) => {
  // telling nextjs to perform this action at the backend
  "use server";
  try {
    const destination = formData.get("destination") as string;
    const startDate = formData.get("start_date") as string;
    const endDate = formData.get("end_date") as string;
    const budget = formData.get("budget") as string;

    // create new trip in your db
    await db.trip.create({
      data: {
        destination: destination,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        budget: parseInt(budget), // convert it to integer
      },
    });
  } catch (error) {
    console.log(error);
  }
  // redirect bac to homepage`
  redirect("/");
};

const updateTrip = async (formData: FormData) => {
  "use server";
  try {
    const destination = formData.get("destination") as string;
    const startDate = formData.get("start_date") as string;
    const endDate = formData.get("end_date") as string;
    const budget = formData.get("budget") as string;
    const id = formData.get("id") as string;

    await db.trip.update({
      where: {
        id,
      },
      data: {
        destination: destination,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        budget: parseInt(budget), // convert it to integer
      },
    });
  } catch (e) {
    console.log(e);
  }

  revalidatePath("/");
  // redirect bac to home page
  redirect("/");
};

export default function TripForm(props: TripFormProps) {
  const {
    type = "new",
    destination = "",
    startDate = new Date().toISOString().split("T")[0],
    endDate = new Date().toISOString().split("T")[0],
    budget = 0,
    id = "",
  } = props;

  return (
    // if else to run two functions
    <form action={type === "new" ? createTrip : updateTrip}>
      <div className="flex flex-col gap-4 border border-black p-10 rounded">
        <div>
          <label htmlFor="destination">Destination</label>
          <input
            id="destination"
            type="text"
            name="destination"
            defaultValue={destination}
            placeholder="Enter your destination here"
            className="w-full border border-black rounded p-4"
          />
        </div>
        <div className="flex gap-4">
          <div className="w-full">
            <label htmlFor="start_date">Start Date</label>
            <input
              id="start_date"
              type="date"
              name="start_date"
              defaultValue={startDate}
              className="w-full border border-black rounded p-4"
            />
          </div>
          <div className="w-full">
            <label htmlFor="end_date">End Date</label>
            <input
              id="end_date"
              type="date"
              name="end_date"
              defaultValue={endDate}
              className="w-full border border-black rounded p-4"
            />
          </div>
        </div>
        <div>
          <label htmlFor="budget">Budget</label>
          <input
            id="budget"
            type="number"
            name="budget"
            placeholder="1000"
            defaultValue={budget?.toString()}
            className="w-full border border-black rounded p-4"
          />
        </div>
        <input type="hidden" name="id" value={id} />
        <button
          type="submit"
          className="w-full bg-blue-700 text-white p-4 text-center rounded trasition duration-300 hover:bg-blue-200 hover:text-blue-500"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
