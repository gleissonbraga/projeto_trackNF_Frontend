
export type TypeSupplier = {
    cnpj: string
    fantasy_name: string
    reason_name: string
    date_now: string
    email: string
    phone_number: string
    id_supplier: string
    state_registration: string
    status: string
    company: {
        cnpj: string
        date_now: string
        fantasy_name: string
        id_company: string
        reason_name: string
        state_registration: string
    }
}