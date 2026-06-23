export type PaymentMethod =
  | "qris"
  | "bca";

  export interface Payment {

  id: string;

  companyId: string;

  amount: number;

  method: PaymentMethod;

  status: string;

  transactionId?: string;

  createdAt: Date;

}