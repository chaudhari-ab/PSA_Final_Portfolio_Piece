export const initialState = {
    selectedAlgorithm: {
        type: null, //kruskal, kosaraju, huffman
        sortMethod: "merge", //bubble, quick, selection
        cycleSearchMethod: "unionFind" //depthFirstSearch
    },

    phase: "notStarted", //addingEdges, choosingSort, sorting, choosingCycleSearchMethod, solving, completed
                                //readyToReverse, depthFirstSearch, readyToUnreverse, solving, completed
                                //heapifying, solving, completed

    input: null,

    editGraph: {
        dragVertex: true,
        addVertex: false,
        deleteVertex: false,
        deleteEdge: false
    },

    formInput: {
        kruskal: {
            vertex1: "",
            vertex2: "",
            cost: ""
        },
        kosaraju: {
            startVertex: "",
            endVertex: ""
        },
    },

    data: {
        kruskal: {
            edges: [],
            vertices: [],
            input: ""
        },
        kosaraju: {
            edges: [],
            vertices: [],
            vertexIndex: [],
            input: ""
        },
        huffman: {
            frequencies: [],
            encodingTree: null,
            heapTree: null,
            chart: [],
            input: ""
        }
    },

    algorithmProgress: {
        kruskal: {
            addEdges: {
                count: 0
            },
            mergeSort: {
                partitions: [],
                currentPartition: 0,
                currentSection: 0,
                loopIndex: 0,
                numInvisible: 0
            },
            quickSort: {
                unsortedRanges: [],
                pivotIndex: 0,
                swapIndex: 0
            },
            bubbleSort: {
                iIndex: 0,
                jIndex: 0
            },
            selectionSort: {
                iIndex: 0,
                jIndex: 0,
                minIndex: 0
            },
            searchCycles: {
                testing: false,
                vertexCache: {},
                edgeCache: {},
                vertexStack: [],
                edgesChecked: 0,
                edgesAdded: 0
            },
            unionFind: {
                edgesChecked: 0,
                edgesAdded: 0,
            }
        },
        kosaraju: {
            depthFirstSearch: {
                vertexStack: []
            },
            algorithm: {
                vertexStack: []
            }
        },
        huffman: {
            heapify: {
                heapStack: [],
                nodeToBubble: null
            },
            algorithm: {
                extractedMins: [],
                nodeToRemove: null,
                nodeToInsert: null
            }
        }
    }
}