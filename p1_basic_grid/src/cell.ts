export type Linking = 'BiDirectional' | 'Directional';

/**
 * A cell represents a single traversable unit of a maze grid. Cells can be
 * connected to other cells and have an integer coordinate location within a
 * 2-d grid.
 */
export class Cell {
  public readonly row: number;
  public readonly column: number;

  /** The neighbor to the north */
  public north: Cell | null = null;

  /** The neighbor to the south */
  public south: Cell | null = null;

  /** the neighbor to the east */
  public east: Cell | null = null;

  /** the neighbor to the west */
  public west: Cell | null = null;

  /** the set of cells which are traversable from this cell */
  private links: Set<Cell> = new Set();

  /**
   * Create a new Cell instance with no linked neighbors and a defined row and
   * column.
   */
  constructor(column: number, row: number) {
    this.row = row;
    this.column = column;
  }

  /**
   * Link a target cell to this one, allowing travel between.
   *
   * @param target the cell to connect
   * @param linking
   *   when bidirectional the linking is two-way, when directional the linking
   *   is only one-way
   */
  link(target: Cell, linking: Linking = 'BiDirectional'): void {
    this.links.add(target);
    if (linking === 'BiDirectional') {
      target.links.add(this);
    }
  }

  /**
   * Break a link between this cell and a target cell.
   *
   * @param target the cell to disconnect from
   * @param linking
   *   when bidirectional the link is broken from both directions, when
   *   directional the linking is only broken in one direction
   */
  unlink(target: Cell, linking: Linking = 'BiDirectional'): void {
    this.links.delete(target);
    if (linking === 'BiDirectional') {
      target.links.delete(this);
    }
  }

  /**
   * Returns true when it's possible to travel from this cell to the target
   * cell.
   */
  is_linked(target: Cell): boolean {
    return this.links.has(target);
  }

  /** The set of all non-null adjacent cells. */
  neighbors(): Array<Cell> {
    const neighbors = [];
    if (this.north) neighbors.push(this.north);
    if (this.south) neighbors.push(this.south);
    if (this.east) neighbors.push(this.east);
    if (this.west) neighbors.push(this.west);
    return neighbors;
  }
}
