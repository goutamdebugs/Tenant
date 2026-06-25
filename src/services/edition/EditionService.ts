// import { EditionRepo } from "../../repository/edition/EditionRepo";
// import { CreateEditionDto } from "../../dtos/edition/CreateEditionDto";
// import { UpdateEditionDto } from "../../dtos/edition/UpdateEditionDto";
// import { UserFriendlyException } from "../../dtos/common/UserFriendlyException";





// export class EditionService {
//   constructor(private editionRepo = new EditionRepo()) {}

//   // Create
//   public async createEdition(data: CreateEditionDto) {
//     const existingEdition = await this.editionRepo.findByName(data.name);

//     if (existingEdition) {
//       throw new UserFriendlyException("Edition already exists");
//     }

//     return await this.editionRepo.create(data);
//   }

//   // Get All
//   public async getAllEditions() {
//     return await this.editionRepo.findAll();
//   }

//   // Get By Id
//   public async getEditionById(id: number) {
//     const edition = await this.editionRepo.findById(id);

//     if (!edition) {
//       throw new UserFriendlyException("Edition not found",401);
//     }

//     return edition;
//   }

//   // Update
//   public async updateEdition(
//     id: number,
//     data: UpdateEditionDto
//   ) {
//     const edition = await this.editionRepo.findById(id);

//     if (!edition) {
//       throw new Error("Edition not found");
//     }

//     await this.editionRepo.update(id, data);

//     return await this.editionRepo.findById(id);
//   }

//   // Delete
//   public async deleteEdition(id: number) {
//     const edition = await this.editionRepo.findById(id);

//     if (!edition) {
//       throw new Error("Edition not found");
//     }

//     await this.editionRepo.delete(id);

//     return {
//       success: true,
//       message: "Edition deleted successfully",
//     };
//   }
// }

//  ============================================================

import { EditionRepo } from "../../repository/edition/EditionRepo";
import { CreateEditionDto } from "../../dtos/edition/CreateEditionDto";
import { UpdateEditionDto } from "../../dtos/edition/UpdateEditionDto";
import { UserFriendlyException } from "../../dtos/common/UserFriendlyException";

import { mapper } from "../../mapper";
import Edition from "../../db/models/Edition";
import { ResponceEdition } from "../../dtos/edition/ResponceEdition";

export class EditionService {
  constructor(private editionRepo = new EditionRepo()) {}
  public async createEdition(data: CreateEditionDto): Promise<ResponceEdition> {
    const existingEdition = await this.editionRepo.create(data.name);

    if (existingEdition) {
      throw new UserFriendlyException("Edition already exists", 400); 
    }

    const newEdition = await this.editionRepo.create(data);
    
    
    return mapper.map(newEdition, Edition, ResponceEdition) as ResponceEdition;
  }

  // Get All
  public async getAllEditions(): Promise<ResponceEdition[]> {
    const rawEditions = await this.editionRepo.findAll();
    return mapper.mapArray(rawEditions, Edition, ResponceEdition);
  }

  // Get By Id
  public async getEditionById(id: number): Promise<ResponceEdition> {
    const edition = await this.editionRepo.findById(id);

    if (!edition) {
      throw new UserFriendlyException("Edition not found", 404);
    }

    return mapper.map(edition, Edition, ResponceEdition);
  }

  // Update
  public async updateEdition(
    id: number,
    data: UpdateEditionDto
  ): Promise<ResponceEdition> {
    const edition = await this.editionRepo.findById(id);

    if (!edition) {
      
      throw new UserFriendlyException("Edition not found", 404);
    }

    await this.editionRepo.update(id, data);

    const updatedEdition = await this.editionRepo.findById(id);
    return mapper.map(updatedEdition, Edition, ResponceEdition) as ResponceEdition;
  }

  // Delete
  public async deleteEdition(id: number) {
    const edition = await this.editionRepo.findById(id);

    if (!edition) {
      throw new UserFriendlyException("Edition not found", 404);
    }

    await this.editionRepo.delete(id);

    return {
      success: true,
      message: "Edition deleted successfully",
    };
  }
}