import { Injectable } from "@nestjs/common";
import { TransferDTO, _TransferDTO } from "./dto/transfer.dto";
import * as os from 'os'
import { UserAccountService } from "./user-account.service";
import { UserAccount } from "./dto/user-account.dto";

@Injectable()
export class TransferService {
    constructor() { 
        this.userAccount = new UserAccountService();
    }

    private userAccount: UserAccountService
    async Transfer(sender: string, body: TransferDTO): Promise<{ status: boolean, message: string }> {

        if (body.data && body.data.length > 10) {
            return { status: false, message: 'can not do more than 10 simultaneous transfer' }
        }

        const cpuCount: number = os.cpus().length

        if (cpuCount > 1) {
            const tasks:any[] = this.AllTasks(sender, body.data)
            await Promise.all([...this.MakeTranser(tasks)])
            return;
        }

        for(let item of body.data) {
            await this._transfer(sender, item.Amount, String(item.AccountNumber))
        }
    }

    private AllTasks(sender, items):any[] {
        let objects =[]
        for(let item of items) {
            objects.push({
                sender,
                amount: item.Amount,
                accountNumber: items.AccountNumber
            })
        }

        return objects
    }

    private MakeTranser(inputs:any[]): any[]
    {
        let func = []
        for(let input of inputs) {
             func.push(this._transfer(input.sender, input.amount, input.accountNumber))
        }

        return func
    }

    private async _transfer(from: string, amounts: number, receivers: string) {
        let running: boolean = false;

        if(!running) {
            return new Promise(async (resolve, reject) => {
                let counter = 0;
                //for (let receiver of receivers) {
                    const amount = amounts
                    const user: UserAccount = this.userAccount.GetUserAccount().find(x => x.AccountNumber == from)
                    if (user) {
                        let balance: number = Number(user.Balance)
                        if (amount > balance) {
                            reject("insufficient balance")
                        }
    
                        balance = balance - amount
    
                        user.Balance = balance;
    
                        let _receiver: UserAccount = this.userAccount.GetUserAccount().find(x => x.AccountNumber == String(receivers))
                        _receiver.Balance = _receiver.Balance + amount
                        await this.userAccount.updateBalance(receivers, _receiver.Balance)
                        resolve(await this.userAccount.updateBalance(from, user.Balance))
                    }
    
                    reject("no match found")
    
               // }
                running = true;
            })
        }
       

    }

}