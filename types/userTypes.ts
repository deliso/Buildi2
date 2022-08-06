type Review = {
  rating: number;
  review: string;
  creatorFirstName: string;
  creatorLastName: string;
  creatorPic: string;
};
type UserT = {
  profilePic: string;
  email: string;
  password: string;
  userType: string;
  firstName: string;
  lastName: string;
  location: string;
  specialties: string[];
  reviews: Review[];
  id: string;
};
export { Review, UserT };
