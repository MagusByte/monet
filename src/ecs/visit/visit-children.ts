
import { OldEntity } from "../OldEntity";

/**
 * Interface representing a visitor for children entities.
 */
export interface ChildrenVisitor {
  /**
   * Called when an entity is visited.
   * @param entity - The entity being visited.
   */
  onVisit(entity: OldEntity): void;

  /**
   * Optional method to determine if the visitor can enter the entity.
   * @param entity - The entity to check.
   * @returns A boolean indicating if the visitor can enter the entity.
   */
  canEnter?(entity: OldEntity): boolean;

  /**
   * Optional method called when entering an entity.
   * @param entity - The entity being entered.
   */
  onEnter?(entity: OldEntity): void;

  /**
   * Optional method called when leaving an entity.
   * @param entity - The entity being left.
   */
  onLeave?(entity: OldEntity): void;
}

/**
 * Visits each entity and its children using a depth-first search approach.
 * 
 * @param entities - The list of root entities to start the visit from.
 * @param visitor - The visitor object that defines the visit behavior.
 * 
 * The `visitor` object can have the following methods:
 * - `onVisit(entity: Entity): void` - Called when an entity is visited.
 * - `canEnter?(entity: Entity): boolean` - Optional. Determines if the children of the entity should be visited.
 * - `onEnter?(entity: Entity): void` - Optional. Called when entering an entity's children.
 * - `onLeave?(entity: Entity): void` - Optional. Called when leaving an entity's children.
 */
export function visitChildren(entities: OldEntity[], visitor: ChildrenVisitor) {
  const queue = entities.map(entity => createVisitNode(entity));
  while (queue.length) {
    const item = queue[0];
    if (!item.visited) {
      visitor.onVisit(item.entity);
      item.visited = true; // Mark it as visited
      const children = item.entity.getChildren();
      if (children.length) {
        let canEnter = visitor.canEnter ? visitor.canEnter(item.entity) : true;
        if (canEnter) {
          item.entered = true;
          if (visitor.onEnter) {
            visitor.onEnter(item.entity);
          }
          queue.unshift(...children.map(entity => createVisitNode(entity)));
        }
      }

    } else {
      if (visitor.onLeave && item.entered) {
        visitor.onLeave(item.entity);
      }
      queue.shift(); // Remove it from the list
    }
  }

  function createVisitNode(entity: OldEntity): { entity: OldEntity; visited: boolean; entered: boolean; } {
    return { entity: entity, visited: false, entered: false };
  }
}
