import { TreeEntityManager } from './TreeEntityManager';
import { TreeNode } from '../graph/TreeNode';
import { IEntityManager } from './EntityManager';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { modify } from '../graph/modify';

describe('TreeEntityManager', () => {
  let mockEntityManager: IEntityManager<TreeNode<number>>;
  let treeEntityManager: TreeEntityManager<number>;

  beforeEach(() => {
    mockEntityManager = {
      getEntities: () => { throw new Error("Invoking non-faked method"); },
      createEntity: () => { throw new Error("Invoking non-faked method"); },
      destroyEntity: () => { throw new Error("Invoking non-faked method"); },
    };

    treeEntityManager = new TreeEntityManager(mockEntityManager);
  });

  test('should return all entities', () => {
    const entities = [new TreeNode(1), new TreeNode(2)];
    vi.spyOn(mockEntityManager, 'getEntities').mockReturnValue(entities);

    const result = treeEntityManager.getEntities();

    expect(result).toEqual(entities);
    expect(mockEntityManager.getEntities).toHaveBeenCalled();
  });

  test('should create a new entity', () => {
    const newEntity = new TreeNode(1);
    vi.spyOn(mockEntityManager, 'createEntity').mockReturnValue(newEntity);

    const result = treeEntityManager.createEntity();

    expect(result).toBe(newEntity);
    expect(mockEntityManager.createEntity).toHaveBeenCalled();
  });

  test('should destroy an entity and its descendants', () => {
    const root = new TreeNode(1);
    const child = new TreeNode(2);
    const grandchild = new TreeNode(3);
    modify(root).addChild(child);
    modify(child).addChild(grandchild);

    vi.spyOn(mockEntityManager, 'getEntities').mockReturnValue([root, child, grandchild]);
    vi.spyOn(mockEntityManager, 'destroyEntity').mockImplementation(() => { });

    treeEntityManager.destroyEntity(child);

    expect(mockEntityManager.destroyEntity).toHaveBeenCalledWith(child);
    expect(mockEntityManager.destroyEntity).toHaveBeenCalledWith(grandchild);
  });

  test('should return root nodes', () => {
    const root1 = new TreeNode(1);
    const root2 = new TreeNode(2);
    const child = new TreeNode(3);
    modify(root1).addChild(child);

    vi.spyOn(mockEntityManager, "getEntities").mockReturnValue([root1, root2, child]);

    const result = treeEntityManager.getRootNodes();

    expect(result).toEqual([root1, root2]);
  });
});
