interface SlotType {
  time: string;
  available: boolean;
}

interface ExpertType {
  id: number;
  name: string;
  photo: string;
  bio: string;
  expertise: string;
  slots: SlotType[];
}

export { type ExpertType };
