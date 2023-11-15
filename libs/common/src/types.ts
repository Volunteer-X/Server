export type IPing = {
  id: string;
  title: string;
  description?: string;
  picks: string[];
  userID: string;
  geometry: {
    type: string;
    coordinates: number[]; // [latitude, longitude]
  };
  radius?: number;
  createdAt: Date;
  updatedAt?: Date;
};
