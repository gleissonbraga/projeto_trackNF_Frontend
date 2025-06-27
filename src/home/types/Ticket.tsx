export type TypeTicket = {
  id_ticket: string;
  ticket_value: number;
  due_date: string;
  status: string;
  date_now: string;
  nf_received: {
    id_nf_received: string;
    id_nf: string;
    nf_value: number;
    type_nf: string;
    status: string;
    date_now: string;

    company: {
      id_company: string;
      fantasy_name: string;
      reason_name: string;
      cnpj: string;
      state_registration: string;
      date_now: string;
    };
    supplier: {
      id_supplier: string;
      fantasy_name: string;
      reason_name: string;
      cnpj: string;
      state_registration: string;
      email: string;
      phone_number: string;
      date_now: string;
    };

    user: {
      id_user: string;
      name: string;
      cpf: string;
      email: string;
      password: string;
      date_now: string;
    };
  };
};
