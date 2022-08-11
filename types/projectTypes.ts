type BidT = {
  bidPrice: number;
  creatorId: string;
  creatorName: string;
  creatorPic: string;
  awarded: boolean;
  id?: number;
};

type RFIT = {
  question: string;
  response: string;
  creatorId: string;
  creatorPic: string;
  _id: string;
};

type ProjectT = {
  projectImage?: string;
  name: string;
  description: string;
  userId: string;
  specialties: string[];
  lifeCycle: string;
  bids: BidT[];
  rfis: RFIT[];
  _id: string;

};
export { BidT, RFIT, ProjectT };
