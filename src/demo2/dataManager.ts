import { IEdge, INode } from "../type";

export const createDataManager = (obj: { edges: IEdge[]; nodes: INode[] }) => {
  const nodesMap = new Map<string, INode>();
  const edgesMap = new Map<string, IEdge>();
  const sourceMap = new Map<string, IEdge>();

  const data = reactive(obj);
  const getNodeById = (id: string) => {
    return nodesMap.get(id);
  };
  const getEdgeById = (id: string) => {
    return edgesMap.get(id);
  };
  data.nodes.forEach((it) => {
    nodesMap.set(it.id, it);
  });
  data.edges.forEach((it) => {
    edgesMap.set(it.id, it);
    sourceMap.set(it.source, it);
  });

  const formatEdge = (edges: IEdge[]) => {
    const map = new Map<string, IEdge>();
    edges.forEach((edge) => {
      const source = nodesMap.get(edge.source);
      const target = nodesMap.get(edge.source);
      if (!source || !target) return;

      if (map.has(edge.target + "-" + edge.source)) {
        const edge1 = map.get(edge.target + "-" + edge.source)!;
        edge1.type = "q";
        edge.type = "q";
      } else {
        edge.type = "l";
      }
      map.set(edge.id, edge);
    });
  };
  formatEdge(data.edges);

  const res = {
    data,
    getNodeById,
    getEdgeById,
  };
  provideDataManager(res);
  window.manager = res
  return res;
};

export const provideDataManager = (v: ReturnType<typeof createDataManager>) => {
  provide("dataManager", v);
};

export const injectDataManager = () => {
  return inject("dataManager") as ReturnType<typeof createDataManager>;
};
