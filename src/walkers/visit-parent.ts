import type { Entity } from "../Entity";

export interface ParentVisitor {
  onVisit(entity: Entity): boolean;
}

/**
 * Moves up through the graph (visiting each parent)
 */
export function visitParent(entity: Entity, visitor: ParentVisitor) {
  let current: Entity | undefined = entity;
  while(current) {
    const shouldContinue = visitor.onVisit(current);
    if(!shouldContinue) break;
    current = current.getParent();
  }
}
