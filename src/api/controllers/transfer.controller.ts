import { Body, Controller, Post, Res, ValidationPipe } from "@nestjs/common";
import { Response } from "express";
import { TransferDTO } from "../dto/transfer.dto";
import { TransferService } from "../transfer.service";

@Controller("transer")
export class TransferController {
    constructor(private service: TransferService){}
    @Post()
    async MakeTransfer(@Body(new ValidationPipe()) body: TransferDTO, @Res() res: Response) 
    {
        console.log("transfer from " + body.senderAccountNumber + " payload " + JSON.stringify(body))
        const serviceResult = await this.service.Transfer(body.senderAccountNumber, body)
        return res.status(200).send(serviceResult)
    }

}