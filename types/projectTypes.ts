type Bid = {
  bidPrice: number;
  creatorId: string;
  creatorName: string;
  creatorPic: string;
  awarded: boolean;
  id?: number;
} | null;

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
} | null;
export { Bid, RFI, ProjectT };
