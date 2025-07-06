export type TypeNf = {
  id_nf_received: string
  id_nf: string;
  id_supplier: string;
  nf_value: number;
  type_nf: string;
  id_user: string;
  status: string;
  date_now: string
  supplier: string
  receivedBy: string
  tickets: {
    id_ticket: string
    ticket_value: number;
    due_date: string;
    status: string;
  }[];
};
