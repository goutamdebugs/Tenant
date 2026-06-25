import { Model, ModelCtor } from "sequelize-typescript";

export abstract class BaseRepo<T extends Model> {
  protected model: ModelCtor<T>;

  constructor(model: ModelCtor<T>) {
    this.model = model;
  }

  async findAll(): Promise<T[]> {
    try {
      return await this.model.findAll({
        order: [['createdAt', 'DESC']]
      });
    } catch (error) {
      throw new Error("Failed to get roles in repo");
    }
  }

  async findById(id: number): Promise<T | null> {
    return await this.model.findByPk(id);
  }

  async create(data: any): Promise<T> {
    return await this.model.create(data);
  }

  async update(id: number, data: any): Promise<boolean> {
    const [affectedCount] = await this.model.update(data, { where: { id } as any });
    return affectedCount > 0;
  }

  async delete(id: number): Promise<boolean> {
    const affectedCount = await this.model.destroy({ where: { id } as any });
    return affectedCount > 0;
  }

}


 