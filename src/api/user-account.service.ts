import { Injectable } from "@nestjs/common";
import { UserAccount } from "./dto/user-account.dto";

@Injectable()
export class UserAccountService {
    constructor() {
       
    }
    
    private user: Array<UserAccount> = [
        {
            AccountNumber: "784678466743",
            Name: "Abass Yags",
            Balance: 200000.00,
            Email:" abas.yugus@gmail.com",
            PhoneNumber:"09089786789"
        },
        {
            AccountNumber: "43335124354353",
            Name: "Aigee Olsevn",
            Balance: 500.00,
            Email: "aigee.olsevn@gmail.com",
            PhoneNumber:"054634569786789"
        }
    ]

    GetUserAccount() {
        return this.user
    }

    async updateBalance(accountNumber, newBalance): Promise<boolean> {
        let user: UserAccount = this.user.find(x=>x.AccountNumber == accountNumber);
        if(user) {
            user.Balance = newBalance;
            const IndexOfUser = this.user.findIndex(x=>x.AccountNumber == accountNumber);

            if(IndexOfUser > -1) {
                this.user.splice(IndexOfUser, 1, user)
            }

            return true
        }
        return false;

    }
}