export default function dateSorter(events) {
  // var dates = [
  //   "09/may/2014 13:45:21",
  //   "31/dec/2012 13:45:21",
  //   "09/may/2014 1:46:21",
  //   "09/may/2013 22:45:21",
  //   "12/jan/2014 03:00:21"
  // ];

  //Then a sort function can be passed to the array.sort()
  const sortedDates = events.sort(function(a, b) {
    return a.timeStamp - b.timeStamp;
  });

  return sortedDates;
}
