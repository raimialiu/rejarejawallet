import { Module } from '@nestjs/common';
import { TransferModule } from './api/transfer.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [TransferModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
