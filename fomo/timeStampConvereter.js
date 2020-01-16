export default function timeStampConverter(events) {
  const convertedDates = events.map(event => {
    const revDate = event.date
      .split("-")
      .reverse()
      .join("-");
    const dateTime = revDate + " " + event.openingtimes.doorsopen;

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
    return { ...event, timeStamp: date.getTime() };
  });

  return convertedDates;
}
