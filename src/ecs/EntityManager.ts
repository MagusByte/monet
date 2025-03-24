import { IEntityFactory } from "./IEntityFactory";

export interface IEntityManager<TEntity> {
  getEntities(): TEntity[];
  createEntity(): TEntity;
  destroyEntity(entity: TEntity): void;
}

export class EntityManager<TEntity> implements IEntityManager<TEntity> {
  private _entities: TEntity[] = [];

  constructor(private readonly entityFactory: IEntityFactory<TEntity>) { }

  getEntities() { return this._entities; }

  createEntity() {
    const entity = this.entityFactory.create();
    this._entities.push(entity);
    return entity;
  }

  destroyEntity(entity: TEntity) {
    this._entities = this._entities.filter(x => entity !== x);
  }
}
