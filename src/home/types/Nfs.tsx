export type TypeNfs = {
    cnpjSupplier: string
    date: string
    emailSupplier: string
    fantasyNameSupplier: string
    id_nf: string
    nf_value: number
    phoneNumberSupplier: string
    reasonNameSupplier: string
    receivedBy: string
    stateRegistrationSupplier: string
    id_nf_received:string
    status: string
    tickets: {
        due_date: string
        status: string
        ticket_value: number
    }[]
}