import { Module } from "@nestjs/common";
import { TransferController } from "./controllers/transfer.controller";
import { TransferService } from "./transfer.service";

@Module({
    providers: [TransferService],
    controllers:[TransferController]
})
export class TransferModule {

}