import { Hours } from "../Models/Hours";

export default function processOpenDaily(hours: string): Hours {
  const unprocessed = hours.slice(11).split("-");

  // Process Open time.
  const opensInPm = unprocessed[0].includes("PM");
  const rawOpen = unprocessed[0].slice(0, -3);
  const [rawOpenHour, rawOpenMinute] = rawOpen.split(":");
  const processedOpen = parseInt(
    `${opensInPm ? rawOpenHour + 12 : rawOpenHour}${rawOpenMinute}`
  );

  // Process Close time.
  const closesInPm = unprocessed[1].includes("PM");
  const rawClose = unprocessed[1].slice(0, -3);
  const [rawCloseHour, rawCloseMinute] = rawClose.split(":");
  const processedClose = parseInt(
    `${closesInPm ? rawCloseHour + 12 : rawCloseHour}${rawCloseMinute}`
  );

  const timeslot = {
    open: processedOpen,
    close: processedClose
  };

  return {
    Mon: timeslot,
    Tue: timeslot,
    Wed: timeslot,
    Thu: timeslot,
    Fri: timeslot,
    Sat: timeslot,
    Sun: timeslot
  };
}
