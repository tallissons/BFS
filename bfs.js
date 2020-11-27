var Queue = function() {    // INICIA UMA FILA
    this.items = [];
};
Queue.prototype.enqueue = function(obj) {   // ENFILERA
    this.items.push(obj);
};
Queue.prototype.dequeue = function() {  // DESINFILERA
    return this.items.shift();
};
Queue.prototype.isEmpty = function() {  // VERIFICA SE A LISTA ESTÁ VAZIA
    return this.items.length === 0;
};

var doBFS = function(graph, source) {   // BFS
    var bfsInfo = [];

    for (var i = 0; i < graph.length; i++) {    // DEFINE A DISTACIA E O PAI DOS VÉRTICES COMO NULL
	    bfsInfo[i] = {
	        distance: null,
	        predecessor: null };
    }

    bfsInfo[source].distance = 0;   // DEFINE A DISTACIA DO VERTICE INICIAL COMO 0

    var queue = new Queue();
    queue.enqueue(source);  // COLOCA O VÉRTICE INICIAL NA FILA

    while (!queue.isEmpty()) {  // LOOP QUE VERIFICA SE A FILA ESTÁ VAZIA
		
		var vertex = queue.dequeue(); // TIRA O VÉRTICE DA FILA

		for (var i = 0; i < graph[vertex].length; i += 1) { // PERCORRE OS VIZINHOS DO VÉRTICE
			var neighbor = graph[vertex][i];

			if (bfsInfo[neighbor].distance === null) {  // VERIFICA SE O VÉRTICE NÃO FOI VISITADO
				bfsInfo[neighbor].distance = bfsInfo[vertex].distance + 1;  // ADICIONA A DISTANCIA
				bfsInfo[neighbor].predecessor = vertex; // ADICIONA O PAI

				queue.enqueue(neighbor);    // COLOCA O VÉRTICE NA FILA
			}
		}
	}
    
    return bfsInfo;
};

//CRIAR O GRAFO
var adjList = [
    [1],                //0 - UNIMONTES
    [2,3,8,10],         //1 - PRAÇA DE ESPORTES
    [5],                //2 - RODOVIARIA
    [2,4],              //3
    [2],                //4
    [6],                //5
    [1,7],              //6
    [8],                //7
    [1,9],              //8
    [0],                //9
    [0],                //10
    ];

var origin = 0;         // VERTICE DE ORIGEM
var destination = 2;    // VERTICE DE DESTINO

var bfsInfo = doBFS(adjList, origin);   // CHAMA A FUNÇÃO BFS

var distance = 0;

for (var i = 0; i < adjList.length; i++) {  // LISTAR DISTACIA DE TODOS OS VÉRTICES
    console.log("vertex " + i + ": distance = " + bfsInfo[i].distance +
     ", predecessor = " + bfsInfo[i].predecessor);
    
    if(i == destination){
        distance = bfsInfo[i].distance;
    }
}

console.log("\nVocê vai pegar no minimo "+ distance +" ônibus!");   // MOSTRA A QUANTIDADE MINIMA DE ÔNIBUS 