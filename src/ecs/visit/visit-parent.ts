import type { OldEntity } from "../OldEntity";

/**
 * Interface representing a visitor that can visit parent entities.
 */
export interface ParentVisitor {
  onVisit(entity: OldEntity): boolean;
}

/**
 * Traverses up the hierarchy of entities starting from the given entity,
 * invoking the provided visitor's `onVisit` method on each entity.
 * The traversal stops if the visitor's `onVisit` method returns `false`
 * or if there are no more parent entities.
 *
 * @param entity - The starting entity for the traversal.
 * @param visitor - An object implementing the `ParentVisitor` interface,
 *                  which contains the `onVisit` method to be called on each entity.
 */
export function visitParent(entity: OldEntity, visitor: ParentVisitor) {
  let current: OldEntity | undefined = entity;
  while(current) {
    const shouldContinue = visitor.onVisit(current);
    if(!shouldContinue) break;
    current = current.getParent();
  }
}
