/** Node class for graph. */

class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}


/** Graph class. */

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  /** add Node instance and add it to nodes property on graph. */
  addVertex(vertex) {

    this.nodes.add(vertex);

   }

  /** add array of new Node instances and adds to them to nodes property. */
  addVertices(vertexArray) {
    for ( let vertex of vertexArray){
      this.addVertex(vertex);
    }
  }

  /** add edge between vertices v1,v2 */
  addEdge(v1, v2) {

    v1.adjacent.add(v2);
    v2.adjacent.add(v1);

  }

  /** remove edge between vertices v1,v2 */
  removeEdge(v1, v2) {

    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);

   }

  /** remove vertex from graph:
   *
   * - remove it from nodes property of graph
   * - update any adjacency lists using that vertex
   */
  removeVertex(vertex) {

    for (let node of this.nodes){
      if (node.adjacent.has(vertex)){
        node.adjacent.delete(vertex);
      }
    }
    this.nodes.delete(vertex)

    //  if (this.nodes.has(vertex)){
    //   this.nodes.delete(vertex);
    //  }
    //  console.log("this.nodes", this.nodes)
  }

  /** traverse graph with DFS and returns array of Node values */
  depthFirstSearch(start) {
    const stack = [start];
    const visitedNodes = new Set(stack);
    const nodeValue = [];

    while (stack.length > 0){
      let currentNode = stack.pop();

      nodeValue.push(currentNode.value);

      for(let node of currentNode.adjacent) {
        if (!visitedNodes.has(node)){
          stack.push(node);
          visitedNodes.add(node);
        }
      }
    }

    return nodeValue;
  }

  /** traverse graph with BDS and returns array of Node values */
  breadthFirstSearch(start) {
    const queue = [start];
    const visitedNodes = new Set(queue);
    const nodeValue = [];

    while (queue.length > 0){
      let currentNode = queue.shift();

      nodeValue.push(currentNode.value);

      for(let node of currentNode.adjacent) {
        if (!visitedNodes.has(node)){
          queue.push(node);
          visitedNodes.add(node);
        }
      }
    }

    return nodeValue;
  }

  /** find the distance of the shortest path from the start vertex to the end vertex */
  distanceOfShortestPath(start, end) {
    let queue = [start];
    let visitedNodes = new Set(queue);
    let pathDistance = 0;

    if (start === end) return 0;

    debugger;
    while (queue.length > 0) {
      let currentNode = queue.shift();

      debugger;
      for (let node of currentNode.adjacent) {
        if (!visitedNodes.has(node)) {
          if (node === end) {
            return pathDistance++;
          } else {
            queue.push(node);
            visitedNodes.add(node);
          }
        }
      }
      pathDistance++;
    }
  }

}

module.exports = { Graph, Node }
