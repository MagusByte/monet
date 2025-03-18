import type { Entity } from "./Entity";

export interface EntityVisitor {
  onVisit(entity: Entity): void;
  canEnter?(entity: Entity): boolean;
  onEnter?(entity: Entity): void;
  onLeave?(entity: Entity): void;
}
