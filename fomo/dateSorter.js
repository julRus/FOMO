export default function dateSorter(events) {
  const sortedDates = events.sort(function(a, b) {
    return a.timeStamp - b.timeStamp;
  });

  return sortedDates;
}
