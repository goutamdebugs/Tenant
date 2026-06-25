import Edition from "../../db/models/Edition";
import { BaseRepo } from "../BaseRepo";

export class EditionRepo extends BaseRepo<Edition> {
  constructor () {
    super(Edition)
  }

  
}