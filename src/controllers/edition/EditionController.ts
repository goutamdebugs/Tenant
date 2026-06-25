import { Body, Controller, Delete, Get, Path, Post, Put, Route, Tags } from "tsoa";
import { EditionService } from "../../services/edition/EditionService";
import { CreateEditionDto } from "../../dtos/edition/CreateEditionDto";
import { UpdateEditionDto } from "../../dtos/edition/UpdateEditionDto";
import { ResponceEdition } from "../../dtos/edition/ResponceEdition";
import { ResponseDto } from "../../dtos/common/ResponseDto";

@Route("editions")
@Tags("Edition")
export class EditionController extends Controller {
  constructor(private editionService: EditionService = new EditionService()) {
    super();
  }

  @Post()
  public async createEdition(@Body() requestBody: CreateEditionDto): Promise<ResponseDto<ResponceEdition | null>> {
    return await ResponseDto.ReturnResult(() => this.editionService.createEdition(requestBody));
  }

  // ---------------------------------------------------------
  @Get()
  public async getAllEditions(): Promise<ResponseDto<ResponceEdition[] | null>> {
    return await ResponseDto.ReturnResult(() => this.editionService.getAllEditions());
  }
  // -----------------------------------------------------------

  // ----------------------------------------------------------
  @Get("{id}")
  public async getEditionById(@Path() id: number): Promise<ResponseDto<ResponceEdition | null>> {
    return await ResponseDto.ReturnResult(() => this.editionService.getEditionById(id));
  }

  @Put("{id}")
  public async updateEdition(
    @Path() id: number,
    @Body() requestBody: UpdateEditionDto
  ): Promise<ResponseDto<ResponceEdition | null>> {
    return await ResponseDto.ReturnResult(() => this.editionService.updateEdition(id, requestBody));
  }

  @Delete("{id}")
  public async deleteEdition(@Path() id: number): Promise<ResponseDto<{ success: boolean; message: string } | null>> {
    return await ResponseDto.ReturnResult(() => this.editionService.deleteEdition(id));
  }
}


// =========================================================================================




// import { Body, Controller, Delete, Get, Path, Post, Put, Route, Tags } from "tsoa";
// import { mapper } from "../../mapper";
// import Edition from "../../db/models/Edition";
// import { EditionService } from "../../services/edition/EditionService";
// import { CreateEditionDto } from "../../dtos/edition/CreateEditionDto";
// import { UpdateEditionDto } from "../../dtos/edition/UpdateEditionDto";
// import { ResponceEdition } from "../../dtos/edition/ResponceEdition";
// import { ResponseDto } from "../../dtos/common/ResponseDto";

// @Route("editions")
// @Tags("Edition")
// export class EditionController extends Controller {
//   constructor(private editionService: EditionService = new EditionService()) {
//   super();
// }

//   @Post()
//   public async createEdition(@Body() requestBody: CreateEditionDto): Promise<ResponceEdition> {
    
//     const newEdition = await this.editionService.createEdition(requestBody);
//     return mapper.map(newEdition, Edition, ResponceEdition);
//   }
// // ---------------------------------------------------------
//   @Get()
//   public async getAllEditions(): Promise<ResponceEdition[]> {
//     const rawEditions = await this.editionService.getAllEditions();
//     return mapper.mapArray(rawEditions, Edition, ResponceEdition);
//   }
// // -----------------------------------------------------------

// // ----------------------------------------------------------
//   @Get("{id}")
//   public async getEditionById(@Path() id: number): Promise<ResponseDto<Edition|null>> {


//     return await ResponseDto.ReturnResult(()=> this.editionService.getEditionById(id));
//   }

//   @Put("{id}")
//   public async updateEdition(
//     @Path() id: number,
//     @Body() requestBody: UpdateEditionDto
//   ): Promise<ResponceEdition | null> {
    
//     const updatedEdition = await this.editionService.updateEdition(id, requestBody);

//     if (!updatedEdition) {
//       return null;
//     }

    
//     return mapper.map(updatedEdition, Edition, ResponceEdition);
//   }

//   @Delete("{id}")
//   public async deleteEdition(@Path() id: number): Promise<{ message: string }> {
  
//     await this.editionService.deleteEdition(id);
//     return {
//       message: "Edition deleted successfully"
//     };
//   }
// }



// ========

