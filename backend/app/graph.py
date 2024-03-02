from copy import deepcopy

class Graph:

    def __init__(self, vertices: int):
        self.V = vertices
        self.graph = [[(0, 0) for col in range(vertices)] for row in range(vertices)]

    def print(self):
        print("\nAdjacency Matrix:")
        for i in range(self.V):
            for j in range(self.V):
                print(self.graph[i][j], end = " ")
            print()
    
    def addEdge(self, v: int, w: int, capacity: int, cost: int):
        print(f"Adding an edge between {v} and {w} - ({capacity}, {cost})")
        self.graph[v][w] = (capacity, cost)
        self.print()

    def BFS(self, s: int, t: int, parent: list):
        visited = [False]*self.V

        queue = []
        queue.append(s)
        visited[s] = True

        while queue:
            u = queue.pop(0)
            for i, val in enumerate(self.graph[u]):
                if visited[i] == False and val[0] != None and val[0] > 0:
                    queue.append(i)
                    visited[i] = True
                    parent[i] = u
                    if i == t:
                        return True

        return False
    
    def bellman_ford(self, source: int):
        n = self.V

        # Convert to list of edges
        edges = []

        for u, row in enumerate(self.graph):
            for v, col in enumerate(row):
                flow, cost = col
                if flow != 0:
                    edges.append((u,v,cost))
        
        dist = [float("Inf")] * self.V
        prev = [-1 for i in range(0,n)]
        dist[source] = 0
        prev[source] = source

        for i in range(1, self.V):
            for edge in edges:
                u, v, cost = edge
                tempdist = float("Inf")
                if dist[u] != float("Inf"):
                    tempdist = dist[u] + cost
                if dist[v] > tempdist:
                    dist[v] = tempdist
                    prev[v] = u

        # print("Edges:", edges)
        # print("Dist:",dist)
        # print("Prev:",prev)
        cycle = []
        for edge in edges:
            u, v, cost = edge
            if (dist[u] != float("Inf") and dist[u] + cost < dist[v]):
                temp = (u,v)
                # print(f"Temp = {temp}")

                while temp not in cycle:
                    cycle.append(temp)
                    temp = (prev[temp[0]], temp[0])
                    #print(temp)
                    if self.graph[prev[temp[0]]][temp[0]][0] == 0:
                        #print("Error case")
                        return None

                # There exists some cycle starting at temp, repeat to get only the cycle
                # !! easy improvement to be made here
                cycle = []
                while temp not in cycle:
                    cycle.append(temp)
                    temp = (prev[temp[0]], temp[0])

                return cycle
        return None


    
    def edmondsKarp(self, source, sink):
        predecessor = [-1] * self.V
        max_flow = 0

        while self.BFS(source, sink, predecessor):
            path_flow = float("Inf")
            s = sink

            while (s != source):
                path_flow = min(path_flow, self.graph[predecessor[s]][s][0])
                s = predecessor[s]
            
            max_flow += path_flow

            v = sink
            while (v != source):
                u = predecessor[v]
                self.graph[u][v] = (self.graph[u][v][0] - path_flow, self.graph[u][v][1])
                self.graph[v][u] = (self.graph[v][u][0] + path_flow, -self.graph[u][v][1])
                v = predecessor[v]
        return max_flow
    
    def ensureCorrectCosts(self, originalGraph):
        costs = originalGraph.graph
        for i, row in enumerate(self.graph):
            for j, col in enumerate(row):
                # Locating backwards edges i.e. did not exist in the original graph
                if col[0] != 0 and costs[i][j][0] == 0:
                    self.graph[i][j] = (self.graph[i][j][0], -costs[j][i][1])
                else:
                    self.graph[i][j] = (self.graph[i][j][0], costs[i][j][1])


    def cycleCancel(self, source, sink):
        G = deepcopy(self)
        max_flow = G.edmondsKarp(source, sink)

        # TODO: Fix the need for deepcopy and complete costs
        G.ensureCorrectCosts(self)
        cycle = G.bellman_ford(sink)

        while cycle != None:
            # Find the minimum flow
            flow = min(G.graph[u][v][0] for u,v in cycle)

            for u,v in cycle:
                G.graph[u][v] = (G.graph[u][v][0] - flow, self.graph[u][v][1])
                G.graph[v][u] = (G.graph[v][u][0] + flow, self.graph[v][u][1])
            G.ensureCorrectCosts(self)

            cycle = G.bellman_ford(sink)
        
        return G