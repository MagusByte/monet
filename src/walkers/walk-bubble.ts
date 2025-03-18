import type { Entity } from "../Entity";

export interface BubbleVisitor {
  onVisit(entity: Entity): boolean;
}

/**
 * Moves up through the graph (visiting each parent)
 */
export function walkBubble(entity: Entity, visitor: BubbleVisitor) {
  let current: Entity | undefined = entity;
  while(current) {
    const shouldContinue = visitor.onVisit(current);
    if(!shouldContinue) break;
    current = current.getParent();
  }
}
