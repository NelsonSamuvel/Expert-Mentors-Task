import { useEffect, useState } from "react";
import { getExperts } from "../services/apiExperts";
import ProfileCard, { BookedSlotType } from "./ProfileCard";
import { ExpertType } from "../types/experts";

const ProfileList = () => {
  const [experts, setExperts] = useState<ExpertType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState<null | string>(null);

  const [totalSlots, setTotalSlots] = useState<BookedSlotType[]>(() => {
    try {
      const data = localStorage.getItem("booked");
      return data ? JSON.parse(data) : [];
    } catch (err) {
      console.log(err);
      return [];
    }
  });

  const handleTotalSlots = (slot: BookedSlotType) => {
    const filteredSlots = totalSlots.filter(
      (totSlot) => totSlot.expertId !== slot.expertId
    );
    setTotalSlots([...filteredSlots, { ...slot }]);
  };

  const handleCancelBooking = (id: number) => {
    setTotalSlots((curSlots) => curSlots.filter((slot) => slot.id !== id));
  };

  useEffect(() => {
    if (totalSlots.length) {
      localStorage.setItem("booked", JSON.stringify(totalSlots));
    }
  }, [totalSlots]);
  console.log(totalSlots);

  useEffect(() => {
    setIsLoading(true);
    setErr(null);
    getExperts()
      .then((data) => setExperts(data))
      .catch((err) => setErr(err.message))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (err) return <p>{err}</p>;

  return (
    <section>
      <div className="mx-container padding-y">
        <div className="grid grid-cols-4 gap-4">
          {experts.map((expert) => (
            <ProfileCard
              key={expert.id}
              expert={expert}
              handleTotalSlots={handleTotalSlots}
              totalSlots={totalSlots}
              handleCancelBooking={handleCancelBooking}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfileList;
