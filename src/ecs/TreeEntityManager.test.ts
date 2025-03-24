import { ITreeEntityManager, TreeEntityManager } from './TreeEntityManager';
import { TreeNode } from '../graph/TreeNode';
import { IEntityManager } from './EntityManager';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { modify } from '../graph/modify';

describe('TreeEntityManager', () => {
  let internalEntityManager: IEntityManager<TreeNode<number>>;
  let sut: ITreeEntityManager<number>;

  beforeEach(() => {
    internalEntityManager = {
      getEntities: () => { throw new Error("Invoking non-faked method"); },
      createEntity: () => { throw new Error("Invoking non-faked method"); },
      destroyEntity: () => { throw new Error("Invoking non-faked method"); },
      addEventHandler: () => { throw new Error("Invoking non-faked method"); },
      removeEventHandler: () => { throw new Error("Invoking non-faked method"); },
    };

    sut = new TreeEntityManager(internalEntityManager);
  });

  test('should return all entities', () => {
    const entities = [new TreeNode(1), new TreeNode(2)];
    vi.spyOn(internalEntityManager, 'getEntities').mockReturnValue(entities);

    const result = sut.getEntities();

    expect(result).toEqual(entities);
    expect(internalEntityManager.getEntities).toHaveBeenCalled();
  });

  test('should create a new entity', () => {
    const newEntity = new TreeNode(1);
    vi.spyOn(internalEntityManager, 'createEntity').mockReturnValue(newEntity);

    const result = sut.createEntity();

    expect(result).toBe(newEntity);
    expect(internalEntityManager.createEntity).toHaveBeenCalled();
  });

  test('should destroy an entity and its descendants', () => {
    const root = new TreeNode(1);
    const child = new TreeNode(2);
    const grandchild = new TreeNode(3);
    modify(root).addChild(child);
    modify(child).addChild(grandchild);

    vi.spyOn(internalEntityManager, 'getEntities').mockReturnValue([root, child, grandchild]);
    vi.spyOn(internalEntityManager, 'destroyEntity').mockImplementation(() => { });

    sut.destroyEntity(child);

    expect(internalEntityManager.destroyEntity).toHaveBeenCalledWith(child);
    expect(internalEntityManager.destroyEntity).toHaveBeenCalledWith(grandchild);
  });

  test('should return root nodes', () => {
    const root1 = new TreeNode(1);
    const root2 = new TreeNode(2);
    const child = new TreeNode(3);
    modify(root1).addChild(child);

    vi.spyOn(internalEntityManager, "getEntities").mockReturnValue([root1, root2, child]);

    const result = sut.getRootNodes();

    expect(result).toEqual([root1, root2]);
  });


  test('should add an event handler', () => {
    const mockHandler = vi.fn();
    vi.spyOn(internalEntityManager, 'addEventHandler').mockImplementation(() => { });

    sut.addEventHandler('onDestroy', mockHandler);

    expect(internalEntityManager.addEventHandler).toHaveBeenCalledWith('onDestroy', mockHandler);
  });

  test('should remove an event handler', () => {
    const mockHandler = vi.fn();
    vi.spyOn(internalEntityManager, 'removeEventHandler').mockImplementation(() => { });
    sut.removeEventHandler('onDestroy', mockHandler);

    expect(internalEntityManager.removeEventHandler).toHaveBeenCalledWith('onDestroy', mockHandler);
  });
});
