function timeStampConverter(dte = "2020-01-15", tme = "13:00") {
  // const date = dateString.split("-");
  // const time = timeSting.split(":");
  const revDate = dte
    .split("-")
    .reverse()
    .join("-");
  const dateTime = revDate + " " + tme;

  var dateString = dateTime,
    dateTimeParts = dateString.split(" "),
    timeParts = dateTimeParts[1].split(":"),
    dateParts = dateTimeParts[0].split("-"),
    date;

  date = new Date(
    dateParts[2],
    parseInt(dateParts[1], 10) - 1,
    dateParts[0],
    timeParts[0],
    timeParts[1]
  );

  // var datum = new Date(
  //   Date.UTC(date[0], date[1] - 1, date[2], time[0], time[1], "00")
  // );
  // const timeStamp = datum.getTime() / 1000;

  // const datum = new Date()
  return date.getTime();
  // console.log(date);
}

// var dateString = "17-09-2013 10:08",
//   dateTimeParts = dateString.split(" "),
//   timeParts = dateTimeParts[1].split(":"),
//   dateParts = dateTimeParts[0].split("-"),
//   date;

// date = new Date(
//   dateParts[2],
//   parseInt(dateParts[1], 10) - 1,
//   dateParts[0],
//   timeParts[0],
//   timeParts[1]
// );

// console.log(date.getTime()); //1379426880000
// console.log(date);
