type ReviewT = {
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
  reviews: ReviewT[];
  _id: string;
};
export { ReviewT, UserT };
