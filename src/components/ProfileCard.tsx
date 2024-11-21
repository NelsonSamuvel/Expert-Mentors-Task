import { useState } from "react";
import { ExpertType } from "../types/experts";
import { toast } from "react-toastify";
import { formatDate } from "../utils/helper";

type SelectedSlotType = {
  expertId: number;
  time: string;
};

export type BookedSlotType = SelectedSlotType & {
  slotDate: Date;
  id: number;
};

type ProfileType = {
  expert: ExpertType;
  totalSlots: BookedSlotType[];
  handleTotalSlots: (data: BookedSlotType) => void;
  handleCancelBooking: (id: number) => void;
};

const ProfileCard = ({
  expert,
  handleTotalSlots,
  totalSlots,
  handleCancelBooking,
}: ProfileType) => {
  const [selectedSlot, setSelectedSlot] = useState<SelectedSlotType | null>(
    null
  );
  const [slotDate, setSlotDate] = useState("");

  const handleSlots = ({ expertId, time }: SelectedSlotType) => {
    setSelectedSlot((curSlot) =>
      curSlot?.time === time ? null : { expertId, time }
    );
  };

  const handleBooking = () => {
    if (!selectedSlot || !slotDate) {
      toast.error("Select a time slot and date");
      return;
    }

    if (new Date(slotDate).getTime() < new Date().getTime()) {
      toast.error("Select a correct date");
      return;
    }

    const bookingData = {
      expertId: selectedSlot?.expertId ?? 0,
      time: selectedSlot?.time ?? "",
      slotDate: new Date(slotDate),
      id: Date.now(),
    };
    handleTotalSlots(bookingData);
    toast.success(`Your Booking #${bookingData.id} confirmed Successfully`);
  };

  const isBooked = totalSlots.find((totSlot) => totSlot.expertId === expert.id);

  return (
    <div className="border rounded-md p-4 shadow-2xl shadow-stone-900 transform transition-all duration-150 hover:translate-y-2">
      <div className="flex items-center gap-4">
        <img
          src={`https://picsum.photos/id/${expert.id}/200`}
          alt={expert.name}
          className="w-[50px] rounded-full object-cover"
        />

        <div>
          <h2>{expert.name}</h2>
          <p className="text-sm text-stone-300">{expert.expertise}</p>
        </div>
      </div>
      <div className="mt-4 text-sm">
        <p className="w-[75%]">{expert.bio}</p>
        <div className="mt-4">
          <label htmlFor={expert.name} className="font-medium">
            Select Date
          </label>
          <input
            type="date"
            name="date"
            value={slotDate}
            onChange={(e) => setSlotDate(e.target.value)}
            id={expert.name}
            className="ml-4 text-stone-900 px-2 rounded-sm"
          />
        </div>
        <div className="pt-4">
          {isBooked ? (
            <>
              <h3 className="font-semibold text-[16px]">Booking Info</h3>
              <div className="mt-2 bg-stone-50 text-stone-900 px-2 py-1 rounded-md">
                <p>
                  Time : <span>{isBooked.time}</span>
                </p>
                <p>
                  Date :{" "}
                  <span>
                    {formatDate(
                      isBooked.slotDate
                        ? new Date(isBooked.slotDate)
                        : new Date()
                    )}
                  </span>
                </p>
              </div>
            </>
          ) : (
            <ul className="flex gap-2 flex-wrap">
              {expert.slots.map((slot, idx) => (
                <li key={idx}>
                  <button
                    disabled={!slot.available}
                    onClick={() =>
                      handleSlots({ expertId: expert.id, time: slot.time })
                    }
                    className={`border px-2 py-0.5 rounded-full ${
                      slot.available
                        ? ""
                        : "bg-stone-600 border-none line-through"
                    } ${
                      selectedSlot?.time === slot.time
                        ? "bg-stone-100 text-stone-700"
                        : ""
                    }`}
                  >
                    {slot.time}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {isBooked ? (
          <button
            onClick={() => handleCancelBooking(isBooked.id)}
            className="bg-stone-900 text-stone-50 px-2 py-2 rounded-md mt-4 hover:opacity-75"
          >
            Cancel Booking
          </button>
        ) : (
          <button
            onClick={handleBooking}
            className="bg-stone-900 text-stone-50 px-2 py-2 rounded-md mt-4 hover:opacity-75"
          >
            Book Now
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
