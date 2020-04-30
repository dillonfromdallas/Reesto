import processOpenDaily from "./processOpenDaily";
import processIrregularHours from "./processIrregularHours";

export default function(hours: string) {
  if (hours.includes("Daily")) {
    return processOpenDaily(hours);
  } else {
    return processIrregularHours(hours);
  }
}
