export interface Campaign {
  minimumContribution: string;
  deadline:string;
  name: string;
  description: string;
  imageUrl: string;
  targetAmount: string;
}
export interface Contributor{
  contributor: string;
    amount: string;
    timestamp: string;
}