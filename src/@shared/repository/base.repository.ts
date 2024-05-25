import { InputListaPaginada } from "../dto/input/input.dto";
import OutputListaPaginada from "../dto/output/OutputListaPaginada";
import {
  EntityTarget,
  FindOptionsOrder,
  FindOptionsWhere,
  Repository,
} from "typeorm";
import { injectable } from "inversify";
import dataSource from "../../infra/config/db/data-source";

export interface BaseRepositoryInterface<T> {
  create(entity: T): Promise<T>;

  update(entity: T): Promise<T>;

  findOneByIdWithRelations(id: string, relations: string[]): Promise<T>;

  exists(id: string): Promise<boolean>;

  findBy(filter: FindOptionsWhere<T>): Promise<T[]>;

  findByOne(filter: FindOptionsWhere<T>, relations: string[]): Promise<T>;

  findOneById(id: string): Promise<T>;

  delete(entity: T): Promise<void>;

  paginate(
    data: InputListaPaginada,
    relations?: string[]
  ): Promise<OutputListaPaginada<T>>;
}

// @ts-ignore
@injectable()
export abstract class BaseRepository<T> implements BaseRepositoryInterface<T> {
  protected repository: Repository<T>;

  constructor(entity: EntityTarget<T>) {
    this.repository = dataSource.manager.getRepository(entity);
  }

  async create(entity: T): Promise<T> {
    return await this.repository.save(entity);
  }

  async delete(entity: T): Promise<void> {
    await this.repository.remove(entity);
  }

  async findBy(filter: FindOptionsWhere<T>): Promise<T[]> {
    return await this.repository.find(filter);
  }

  async findByOne(
    filter: FindOptionsWhere<T>,
    relations: string[]
  ): Promise<T> {
    return await this.repository.findOne({
      where: filter as unknown as FindOptionsWhere<T>,
      relations,
    });
  }

  async findOneById(id: string, relations: string[] = []): Promise<T> {
    return await this.repository.findOne({
      where: { id } as unknown as FindOptionsWhere<T>,
      relations,
    });
  }

  async findOneByIdWithRelations(
    id: string,
    relations: string[] = []
  ): Promise<T> {
    return await this.repository.findOne({
      where: { id } as unknown as FindOptionsWhere<T>,
      relations,
    });
  }

  async paginate(
    data: InputListaPaginada,
    relations: string[] = []
  ): Promise<OutputListaPaginada<T>> {
    const [result, total] = await this.repository.findAndCount({
      where:
        data.filter != "" && data.filterColumn != ""
          ? ({
              [data.filterColumn]: data.filter,
            } as unknown as FindOptionsWhere<T>)
          : ({} as unknown as FindOptionsWhere<T>),
      order:
        data.orderby.length > 0
          ? ({
              [data.orderby]: data.direction,
            } as unknown as FindOptionsOrder<T>)
          : ({} as unknown as FindOptionsOrder<T>),
      take: data.limit,
      skip: data.limit * (data.page - 1),
      relations: relations ?? [],
    });

    return {
      items: result.map((item) => item),
      currentPage: data.page,
      totalPages: Math.ceil(total / data.limit),
      total,
    };
  }
  async update(entity: T): Promise<T> {
    return await this.repository.save(entity);
  }

  async exists(id: string): Promise<boolean> {
    return (
      (await this.repository.count({
        where: { id } as unknown as FindOptionsWhere<T>,
      })) > 0
    );
  }
}
