import { Restaurant } from "../Models/Restaurant";
import hasKey from "./hasKey";

export default function(unchecked: Restaurant): boolean {
  const timeParts: string[] = new Date()
    .toLocaleString("en-US", {
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "GMT"
    })
    .split(" ");

  let stringDay = timeParts[0];
  let [hour, minute] = timeParts[1].split(":");
  let dayPart = timeParts[2];

  const queryTime = parseInt(
    `${dayPart == "PM" && hour != "12" ? hour + 12 : hour}${minute}`
  );

  const timeFilter = (
    restaurant: Restaurant,
    day: string,
    currentTime: number
  ) => {
    return (
      hasKey(restaurant.hours, day) &&
      restaurant.hours[day].open <= currentTime &&
      (restaurant.hours[day].close > restaurant.hours[day].open
        ? restaurant.hours[day].close > currentTime
        : restaurant.hours[day].close < currentTime)
    );
  };
  let res: boolean = timeFilter(unchecked, stringDay, queryTime);
  return res;
}
