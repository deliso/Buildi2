type BidT = {
  bidPrice: number;
  creatorId: string;
  creatorName: string;
  creatorPic: string;
  awarded: boolean;
  id?: number;
};

type RFI = {
  question: string;
  response: string;
  creatorId: string;
  creatorPic: string;
};

type ProjectT = {
  projectImage?: string;
  name: string;
  description: string;
  userId: string;
  specialties: string[];
  lifeCycle: string;
  bids: Bid[];
  rfis: RFI[];
};
export { BidT, RFI, ProjectT };
