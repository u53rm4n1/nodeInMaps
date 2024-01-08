let map;

// let jsonData = {
//   "links": [
//     {
//       "srcNode": "N1",
//       "destNode": "N2"
//     },
//     {
//       "srcNode": "N2",
//       "destNode": "N3"
//     },
//     {
//       "srcNode": "N3",
//       "destNode": "N1"
//     }
//   ],
//   "nodes": [
//     {
//       "name": "N1",
//       "lat": 13.08,
//       "lng": 80.27
//     },
//     {
//       "name": "N2",
//       "lat": 12.52,
//       "lng": 78.21
//     },
//     {
//       "name": "N3",
//       "lat": 11.66,
//       "lng": 78.14
//     }
//   ]
// };

let icons = ["/router.png", "/building.png", "/wifi.png"]

async function fetchData() {
  const response = await fetch('data.json');
  const jsonData = await response.json();
  return jsonData;
}

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  const jsonData = await fetchData();

  map = new Map(document.getElementById("map"), {
    center: { lat: 12.91, lng: 79.13 },
    zoom: 8,
  });

  for (let i = 0; i < jsonData.nodes.length; i++) {
    new google.maps.Marker({
      position: { lat: jsonData.nodes[i].lat, lng: jsonData.nodes[i].lng },
      map: map,
      label: jsonData.nodes[i].name,
      title: jsonData.nodes[i].name,
      icon: icons[Math.floor(Math.random() * icons.length)],
      draggable: false
    });
  }

  enableLink();
}

function drawEdge(location1, location2) {
  var pathCoordinates = [
    { lat: location1.lat, lng: location1.lng },
    { lat: location2.lat, lng: location2.lng }
  ];

  var polyline = new google.maps.Polyline({
    path: pathCoordinates,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  polyline.setMap(map);
}

async function enableLink() {
  const jsonData = await fetchData();

  let srcNode;
  let destNode;
  let firstNode;
  let lastNode;

  for (let i = 0, j = 1; i < jsonData.nodes.length; i++, j++) {
    if (j > jsonData.nodes.length - 1) {
      j = jsonData.nodes.length - 1;
    }

    srcNode = { lat: jsonData.nodes[i].lat, lng: jsonData.nodes[i].lng };
    destNode = { lat: jsonData.nodes[j].lat, lng: jsonData.nodes[j].lng };
    firstNode = { lat: jsonData.nodes[0].lat, lng: jsonData.nodes[0].lng };
    lastNode = { lat: jsonData.nodes[j].lat, lng: jsonData.nodes[j].lng };

    if (i < jsonData.nodes.length - 1) {
      drawEdge(srcNode, destNode);
    } else {
      drawEdge(lastNode, firstNode);
    }
  }
}

async function nodeList(){
  const jsonData = await fetchData();

  let nodeInfoVar = document.getElementsByClassName("nodeInfos");
  for(let i=0; i < jsonData.nodes.length; i++){
    let elementCount = 'node'+i;
    console.log(elementCount);
    let nodeInfo = document.createElement('div');
    nodeInfo.setAttribute('id', elementCount);
    nodeInfoVar[0].appendChild(nodeInfo);
  }
  nodeInfoVar[0].innerHTML = "Hello";
}

initMap();
nodeList();