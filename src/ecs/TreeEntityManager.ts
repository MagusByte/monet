import { TreeNode } from '../graph/TreeNode';
import { query } from '../graph/query';
import { modify } from '../graph/modify';
import { EntityEventMap, EventHandler } from './EntityManagerEvents';
import { IEntityManager } from './IEntityManager';
import { ITreeEntityManager } from './ITreeEntityManager';

/**
 * A manager for handling tree-structured entities. This class wraps an `IEntityManager`
 * and provides additional functionality for managing entities organized in a tree structure.
 * 
 * @template TEntity - The type of the entity stored in the tree nodes.
 */
export class TreeEntityManager<TEntity> implements ITreeEntityManager<TEntity> {
  /**
   * Creates an instance of `TreeEntityManager`.
   * 
   * @param entityManager - The underlying entity manager that manages `TreeNode<TEntity>` instances.
   */
  constructor(
    public readonly entityManager: IEntityManager<TreeNode<TEntity>>
  ) {
  }

  /** @inheritdoc */
  getEntities(): TreeNode<TEntity>[] {
    return this.entityManager.getEntities();
  }

  /** @inheritdoc */
  createEntity(): TreeNode<TEntity> {
    return this.entityManager.createEntity();
  }

  /**
   * Destroys a given entity and its **descendants** in the tree.
   * 
   * @param node - The `TreeNode<TEntity>` to be destroyed.
   */
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

  /**
   * Retrieves all root nodes in the tree. Root nodes are nodes without a parent.
   * 
   * @returns An array of root `TreeNode<TEntity>` instances.
   */
  getRootNodes(): TreeNode<TEntity>[] {
    return this.getEntities().filter(node => query(node).getParent() === undefined);
  }

  /** @inheritdoc */
  addEventHandler<K extends keyof EntityEventMap<TEntity>>(event: K, listener: EventHandler<K, TreeNode<TEntity>>) {
    this.entityManager.addEventHandler(event, listener);
  }

  /** @inheritdoc */
  removeEventHandler<K extends keyof EntityEventMap<TEntity>>(event: K, listener: EventHandler<K, TreeNode<TEntity>>) {
    this.entityManager.removeEventHandler(event, listener);
  }
}
