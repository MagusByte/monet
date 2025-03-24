import { EntityEventMap, EventHandler, IEntityManager } from './EntityManager';
import { TreeNode } from '../graph/TreeNode';
import { query } from '../graph/query';
import { modify } from '../graph/modify';

export interface ITreeEntityManager<TEntity> extends IEntityManager<TreeNode<TEntity>> {
  getRootNodes(): TreeNode<TEntity>[];
}

export class TreeEntityManager<TEntity> implements ITreeEntityManager<TEntity> {
  constructor(
    public readonly entityManager: IEntityManager<TreeNode<TEntity>>
  ) {
  }

  getEntities(): TreeNode<TEntity>[] {
    return this.entityManager.getEntities();
  }

  createEntity(): TreeNode<TEntity> {
    return this.entityManager.createEntity();
  }

  destroyEntity(node: TreeNode<TEntity>): void {
    const parent = query(node).getParent();
    if (parent) {
      modify(parent).removeChild(node); // Update the parent child relationship
    }

    const nodesToRemove = [node, ...query(node).getDescendents("depth-first")];
    nodesToRemove.forEach(e => {
      this.entityManager.destroyEntity(e);
    });
  }

  getRootNodes(): TreeNode<TEntity>[] {
    return this.getEntities().filter(node => query(node).getParent() === undefined);
  }

  addEventHandler<K extends keyof EntityEventMap<TEntity>>(event: K, listener: EventHandler<K, TreeNode<TEntity>>) {
    this.entityManager.addEventHandler(event, listener);
  }

  removeEventHandler<K extends keyof EntityEventMap<TEntity>>(event: K, listener: EventHandler<K, TreeNode<TEntity>>) {
    this.entityManager.removeEventHandler(event, listener);
  }
}
