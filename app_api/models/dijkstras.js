
function getBestId(queue) {
    var min = 1/0;
    var finalId = -1;
    for(var id in queue){
        if(min > queue[id]){
            min = queue[id];
            finalId = id;
        }
    }
    return finalId;
}

function findPath(prev, dist, start, target, vertices) {
	
    var path = [];
    path.unshift({id: target, dist: dist[target], name: vertices[target]['name'],
					lat: vertices[target]['lat'], lng: vertices[target]['lng']});
    var isPrev = -1;
    var current = target;

    while(isPrev != start){
        isPrev = prev[current];
        path.unshift({id: isPrev, dist: dist[isPrev], name: vertices[isPrev]['name'],
						lat: vertices[isPrev]['lat'], lng: vertices[isPrev]['lng']});
        current = isPrev;
    }
    return path;
}

export function MyGraph() {

    var INFINITY = 1/0;
    var vertices = {};

    this.setGraph = function (graph) {
        for(var i = 0; i < graph.length; i++) {
            vertices[graph[i].id] = graph[i];
        }
    }

    this.getGraph = function () {
        return vertices;
    }

    // startPoint, targetPoint: id, name, lat, lng
    this.getShortestPath = function (startPoint, targetPoint) {

        var dist = {};
        var isVisited = {}; // 0 is false, 1 is true
        var prev = {};
        var priorityQueue = {};

        for(var id in vertices){
            if(id != startPoint){
                dist[id] = INFINITY;
                isVisited[id] = 0;
                prev[id] = -1;
                priorityQueue[id] = INFINITY;
            }
            else {
                dist[id] = 0;
                isVisited[id] = 0;
                prev[id] = -1;
                priorityQueue[id] = 0;
            }
        }

        var path = [];
        while(Object.keys(priorityQueue).length > 0){

            // Lấy ra id có distance nhỏ nhất, sau đó remove khỏi priority
            var bestId = getBestId(priorityQueue);
            isVisited[bestId] = 1;
            delete priorityQueue[bestId];

            // Nếu tìm thấy thì kết thúc vòng lặp
            if(bestId == targetPoint){
                break;
            }
            else {
                // Lấy ra các đỉnh liền kề của đỉnh đang xét.
                var nextStation = vertices[bestId]['nextStation'];
                var distance = vertices[bestId]['distance'];
                for(var i = 0; i < nextStation.length; i++){
                    if(isVisited[nextStation[i]] == 0){
                        var alt = dist[bestId] + distance[i];
                        if(alt < dist[nextStation[i]]){
                            dist[nextStation[i]] = alt;
                            prev[nextStation[i]] = bestId;
                            priorityQueue[nextStation[i]] = alt;

                        }
                    }
                }
            }
        }
        path = findPath(prev, dist, startPoint, targetPoint, vertices);
        return path;
    }
}