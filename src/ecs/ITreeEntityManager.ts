import { TreeNode } from '../graph/TreeNode';
import { IEntityManager } from './IEntityManager';

/**
 * Interface representing a tree-based entity manager.
 * Extends the functionality of `IEntityManager` to manage entities
 * organized in a tree structure.
 *
 * @template TEntity - The type of the entity managed by the tree.
 */
export interface ITreeEntityManager<TEntity> extends IEntityManager<TreeNode<TEntity>> {
  /**
   * Retrieves the root nodes of the tree structure managed by the entity manager.
   *
   * @returns An array of `TreeNode<TEntity>` objects representing the root nodes.
   */
  getRootNodes(): TreeNode<TEntity>[];
}
