/*
http://localhost:3000/trips/1
http://localhost:3000/trips/1/edit
*/
import TripForm from "../../components/TripForm";

export default function NewTripPage() {
  return (
    <div className="xl:container mx-auto">
      <div className="flex flex-col items-center justify-center p-20">
        <p className="text-4xl pb-5 font-semibold">Add New Trip</p>
        <TripForm type="new" />
      </div>
    </div>
  );
}
