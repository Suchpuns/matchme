from app.graph import Graph

def generate_assignments(roles: list, preferences: list):
    print(preferences)
    n_people = len(preferences)
    n_roles = len(roles)
    num_nodes = n_people + n_roles + 2
    source = 0
    sink = num_nodes - 1

    graph = Graph(num_nodes)

    graph.print()

    # Node 0 Super Sink -> People
    for p in range(1,n_people+1):
        graph.addEdge(source,p,1,1)
        # print(f"source -> {p}")

    # Nodes 1..n People
    for p in range(0, n_people):
        preference = preferences[p]['preference']
        p_node = p + 1
        for r in range(0, n_roles):
            r_node = r + n_people + 1
            graph.addEdge(p_node, r_node, 1, preference[r])
            # print(f"{p_node} -> {r_node} (1, {preference[r]})")

    # Nodes 2 n+1 .. n+r 
    for r in range(0, n_roles):
        r_node = r + n_people + 1
        graph.addEdge(r_node, sink, roles[r][1], 1)
        # print(f"{r_node} -> {sink} ({roles[r][1]}, 1)")

    graph.print()

    resultGraph = graph.cycleCancel(source, sink)
    resultGraph.print()

    rtn_roles = []
    for role in roles:
        info = {
            "role": role[0],
            "people": []
        }
        rtn_roles.append(info)
    print(roles)
    assignments = []
    for r in range(0, n_roles):
        r_node = r + n_people + 1
        row = resultGraph.graph[r_node]
        #print(row)
        for i, tup in enumerate(row):
            flow, cost = tup
            if flow == 1:
                person = preferences[i-1]['name']
                choice = preferences[i-1]['preference'][r]
                rtn_roles[r]['people'].append({"name": person, "choice": choice})

    return rtn_roles

    # Sink on n+r+1
        