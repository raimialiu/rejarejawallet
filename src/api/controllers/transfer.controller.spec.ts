import { resolve } from "path";
import { TransferDTO } from "../dto/transfer.dto";
import { TransferService } from "../transfer.service";
import { TransferController } from "./transfer.controller";


describe('TransferController', () => {
  let transferController: TransferController;
  let transferService: TransferService;

  beforeEach(() => {
    transferService = new TransferService()
    transferController = new TransferController(transferService)
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result = {status:true, message: 'successfull'}
     
      const obj = new TransferDTO();
      obj.data = [{Amount:200.00, AccountNumber:"90659689", "PhoneNumber":"98439854398"}]
      const serviceResul = await transferService.Transfer("8734587478", obj)

      jest.spyOn(transferService, 'Transfer').mockImplementation().mockReturnValue(
            new Promise((resolve, reject)=>{
              resolve( {status:true, message: 'successfull'})
          })
      );
         
    

    // const serviceResul = await transferService.Transfer("8734587478", obj)
    // expect(await (await transferService.Transfer("8734587478", obj)).status).toBe(result.status);
  //  const expectedResult = result.status
    expect(await (await transferService.Transfer("8734587478", obj)).status).toBe(result.status);
    });
  });
});