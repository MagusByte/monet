import { IEntityManager } from './EntityManager';
import { TreeNode } from '../graph/TreeNode';
import { query } from '../graph/query';
import { modify } from '../graph/modify';

export class TreeEntityManager<TEntity> implements IEntityManager<TreeNode<TEntity>> {
  private readonly entityManager: IEntityManager<TreeNode<TEntity>>;

  constructor(entityManager: IEntityManager<TreeNode<TEntity>>) {
    this.entityManager = entityManager;
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
}
