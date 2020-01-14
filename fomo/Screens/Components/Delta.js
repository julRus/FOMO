export default function Delta(points) {
  let minLat, maxLat, minLng, maxLng;

  (point => {
    minLat = point.latitude;
    maxLat = point.latitude;
    minLng = point.longitude;
    maxLng = point.longitude;
  })(points[0]);

  points.forEach(point => {
    minLat = Math.min(minLat, point.latitude);
    maxLat = Math.max(maxLat, point.latitude);
    minLng = Math.min(minLng, point.longitude);
    maxLng = Math.max(maxLng, point.longitude);
  });

  const midLat = (minLat + maxLat) / 2;
  const midLng = (minLng + maxLng) / 2;

  const deltaLat = maxLat - minLat;
  const deltaLng = maxLng - minLng;

  return {
    latitude: midLat,
    longitude: midLng,
    latitudeDelta: deltaLat,
    longitudeDelta: deltaLng
  };
}
