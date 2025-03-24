import { Entity } from './Entity';
import { IEntityManager } from './EntityManager';
import { TreeNode } from '../graph/TreeNode';
import { query } from '../graph/query';
import { modify } from '../graph/modify';

export class TreeEntityManager implements IEntityManager<TreeNode<Entity>> {
  private readonly entityManager: IEntityManager<TreeNode<Entity>>;

  constructor(entityManager: IEntityManager<TreeNode<Entity>>) {
    this.entityManager = entityManager;
  }

  getEntities(): TreeNode<Entity>[] {
    return this.entityManager.getEntities();
  }

  createEntity(): TreeNode<Entity> {
    return this.entityManager.createEntity();
  }

  destroyEntity(node: TreeNode<Entity>): void {
    const parent = query(node).getParent();
    if (parent) {
      modify(parent).removeChild(node); // Update the parent child relationship
    }
    
    const nodesToRemove = [node, ...query(node).getDescendents("depth-first")];
    nodesToRemove.forEach(e => {
      this.entityManager.destroyEntity(e);
    });
  }

  getRootNodes(): TreeNode<Entity>[] {
    return this.getEntities().filter(node => query(node).getParent() === undefined);
  }
}
