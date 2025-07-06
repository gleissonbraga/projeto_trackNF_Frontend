export type TypeUser = {
    id_user: string
    name: string
    email: string
    password: string
    cpf: string
    status: string
    date_now: string
    phone_number: string
    company: {
        id_company: string
        reason_name: string
        fantasy_name: string
        cnpj: string
        state_registration: string
        date_now: string
    }

}