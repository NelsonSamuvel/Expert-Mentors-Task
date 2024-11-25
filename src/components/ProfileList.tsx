import { useEffect, useState } from "react";
// import { getExperts } from "../services/apiExperts";
import ProfileCard, { BookedSlotType } from "./ProfileCard";
import { ExpertType } from "../types/experts";

//for deployment purpose
const profiles = [
  {
    id: 1,
    name: "Dr. Jane Doe",
    photo: "path-to-photo1.jpg",
    bio: "Experienced therapist specializing in mental health and wellness.",
    expertise: "Mental Health",
    slots: [
      { time: "10:00 AM", available: true },
      { time: "11:00 AM", available: true },
      { time: "1:00 PM", available: false },
      { time: "2:00 PM", available: true },
    ],
  },
  {
    id: 2,
    name: "Dr. John Smith",
    photo: "path-to-photo2.jpg",
    bio: "Pediatrician with over 15 years of experience.",
    expertise: "Pediatrics",
    slots: [
      { time: "9:00 AM", available: false },
      { time: "10:30 AM", available: true },
      { time: "12:00 PM", available: true },
      { time: "3:00 PM", available: true },
    ],
  },
  {
    id: 3,
    name: "Prof. Emily Clarke",
    photo: "path-to-photo3.jpg",
    bio: "Nutritionist focused on sustainable eating habits.",
    expertise: "Nutrition",
    slots: [
      { time: "9:30 AM", available: true },
      { time: "11:00 AM", available: false },
      { time: "1:30 PM", available: true },
      { time: "4:00 PM", available: true },
    ],
  },
  {
    id: 4,
    name: "Mr. Michael Brown",
    photo: "path-to-photo4.jpg",
    bio: "Fitness coach helping clients achieve their goals.",
    expertise: "Fitness",
    slots: [
      { time: "8:00 AM", available: true },
      { time: "10:00 AM", available: true },
      { time: "2:00 PM", available: false },
      { time: "5:00 PM", available: true },
    ],
  },
  {
    id: 5,
    name: "Dr. Sarah Williams",
    photo: "path-to-photo5.jpg",
    bio: "Dermatologist with a passion for skincare.",
    expertise: "Dermatology",
    slots: [
      { time: "9:00 AM", available: true },
      { time: "11:00 AM", available: true },
      { time: "1:00 PM", available: true },
      { time: "3:00 PM", available: false },
    ],
  },
  {
    id: 6,
    name: "Mr. Kevin Lee",
    photo: "path-to-photo6.jpg",
    bio: "Career counselor helping students and professionals.",
    expertise: "Career Counseling",
    slots: [
      { time: "10:00 AM", available: true },
      { time: "12:00 PM", available: true },
      { time: "2:00 PM", available: false },
      { time: "4:00 PM", available: true },
    ],
  },
  {
    id: 7,
    name: "Dr. Rachel Green",
    photo: "path-to-photo7.jpg",
    bio: "Cardiologist focusing on preventive care.",
    expertise: "Cardiology",
    slots: [
      { time: "9:00 AM", available: true },
      { time: "11:00 AM", available: false },
      { time: "1:00 PM", available: true },
      { time: "3:00 PM", available: true },
    ],
  },
  {
    id: 8,
    name: "Dr. David Miller",
    photo: "path-to-photo8.jpg",
    bio: "Orthopedic surgeon specializing in sports injuries.",
    expertise: "Orthopedics",
    slots: [
      { time: "8:00 AM", available: true },
      { time: "10:00 AM", available: true },
      { time: "12:00 PM", available: false },
      { time: "2:00 PM", available: true },
    ],
  },
  {
    id: 9,
    name: "Ms. Laura Scott",
    photo: "path-to-photo9.jpg",
    bio: "Psychologist helping clients overcome challenges.",
    expertise: "Psychology",
    slots: [
      { time: "9:30 AM", available: true },
      { time: "11:30 AM", available: true },
      { time: "1:30 PM", available: false },
      { time: "3:30 PM", available: true },
    ],
  },
  {
    id: 10,
    name: "Dr. Daniel Carter",
    photo: "path-to-photo10.jpg",
    bio: "Oncologist with over 20 years of experience.",
    expertise: "Oncology",
    slots: [
      { time: "10:00 AM", available: true },
      { time: "12:00 PM", available: false },
      { time: "2:00 PM", available: true },
      { time: "4:00 PM", available: true },
    ],
  },
];

const ProfileList = () => {
  const [experts] = useState<ExpertType[]>(profiles);
  // const [isLoading, setIsLoading] = useState(false);
  // const [err, setErr] = useState<null | string>(null);

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

  //fetching data from json-server

  // useEffect(() => {
  //   setIsLoading(true);
  //   setErr(null);
  //   getExperts()
  //     .then((data) => setExperts(data))
  //     .catch((err) => setErr(err.message))
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }, []);

  // if (isLoading) return <p>Loading...</p>;
  // if (err) return <p>{err}</p>;

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
