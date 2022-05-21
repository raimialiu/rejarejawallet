export class TransferDTO {
    
    senderAccountNumber: string
    data: Array<_TransferDTO>
}

export class _TransferDTO {
    AccountNumber: String
    Amount: number
    PhoneNumber: string
}