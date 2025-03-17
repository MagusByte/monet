import { Entity } from "./Entity";

export interface EntityVisitor {
  onVisit(entity: Entity): void;
  canEnter?(entity: Entity): boolean;
  onEnter?(entity: Entity): void;
  onLeave?(entity: Entity): void;
}

export class EntityWalker {
  walk(entities: Entity[], visitor: EntityVisitor) {
    const queue = entities.map(entity => createVisitNode(entity));
    while (queue.length) {
      const item = queue[0];
      if (!item.visited) {
        visitor.onVisit(item.entity);
        item.visited = true; // Mark it as visited
        const children = item.entity.getChildren();
        if(children.length){
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
        if(visitor.onLeave && item.entered) {
          visitor.onLeave(item.entity);
        }
        queue.shift(); // Remove it from the list
      }
    }

    function createVisitNode(entity: Entity): { entity: Entity; visited: boolean; entered: boolean; } {
      return { entity: entity, visited: false, entered: false };
    }
  }
}
