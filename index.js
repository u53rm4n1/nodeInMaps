let map;

var jsonData = {
    "links": [
      {
        "srcNode": "N1",
        "destNode": "N2"
      },
      {
        "srcNode": "N2",
        "destNode": "N3"
      },
      {
        "srcNode": "N3",
        "destNode": "N1"
      }
    ],
    "nodes": [
      {
        "name": "N1",
        "lat": 13.08,
        "lng": 80.27
      },
      {
        "name": "N2",
        "lat": 12.52,
        "lng": 78.21
      },
      {
        "name": "N3",
        "lat": 11.66,
        "lng": 78.14
      }
    ]
  };
  
  console.log(jsonData);

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: 12.91, lng: 79.13 },
    zoom: 8,
  });
  new google.maps.Marker({
    position: { lat: jsonData.nodes[0].lat, lng: jsonData.nodes[0].lng },
    map: map,
    label: jsonData.nodes[0].name,
    title: jsonData.nodes[0].name,
    draggable: false
  })
  new google.maps.Marker({
    position: { lat: jsonData.nodes[1].lat, lng: jsonData.nodes[1].lng },
    map: map,
    label: jsonData.nodes[1].name,
    title: jsonData.nodes[1].name,
    draggable: false
  })
  new google.maps.Marker({
    position: { lat: jsonData.nodes[2].lat, lng: jsonData.nodes[2].lng },
    map: map,
    label: jsonData.nodes[2].name,
    title: jsonData.nodes[2].name,
    draggable: false
  })

  var node1 = {lat: jsonData.nodes[0].lat, lng: jsonData.nodes[0].lng};
  var node2 = {lat: jsonData.nodes[1].lat, lng: jsonData.nodes[1].lng};
  var node3 = {lat: jsonData.nodes[2].lat, lng: jsonData.nodes[2].lng};

  drawEdge(node1, node2);
  drawEdge(node2, node3);
  drawEdge(node3, node1);
}

function drawEdge(location1, location2) {
    var pathCoordinates = [
        {lat: location1.lat, lng: location1.lng},
        {lat: location2.lat, lng: location2.lng}
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

initMap();