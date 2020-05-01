import hasKey from "./hasKey";
import { Hours } from "../Models/Hours";

export default function processIrregularHours(hours: string): Hours {
  let processed = getUnprocessed;
  let brackets: string[] = [];

  if (hours.includes(";")) {
    brackets = hours.split(";").map(e => e.trim());
  } else {
    brackets.push(hours);
  }

  brackets.map((timeslot: string) => {
    const days: string[] = processDays(timeslot);
    const times: number[] = processTimes(timeslot);

    days.forEach((day: string) => {
      if (hasKey(processed, day)) {
        processed[day].open = times[0];
        processed[day].close = times[1];
      }
    });
  });

  return processed as Hours;
}

function processDays(timeslot: string): string[] {
  const re: RegExp = new RegExp(/\w{3}(-\w{3})?/);
  let res: string[] = [];
  const output = re.exec(timeslot);

  if (output && output[0] != null) {
    if (output[0].includes("-")) {
      const [dayOne, dayTwo]: string[] = output[0].split("-");
      const daysList = Object.keys(getUnprocessed);

      for (
        let i = daysList.indexOf(dayOne);
        i <= daysList.indexOf(dayTwo);
        i++
      ) {
        res.push(daysList[i]);
      }
    } else {
      res.push(output[0]);
    }
  }
  return res;
}

function processTimes(timeslot: string): number[] {
  let res: number[] = [];
  const re = new RegExp(/((\d{1,2}:\d{2}) (AM|PM))-((\d{1,2}:\d{2}) (AM|PM))/);
  const output = re.exec(timeslot);
  const [rawOpen, rawClose] =
    output != null && output[0] ? output[0].split("-") : ["", ""];
  res[0] = processDaypart(rawOpen);
  res[1] = processDaypart(rawClose);

  return res;
}

function processDaypart(daypart: string): number {
  let res: number = 0;
  let split = daypart.split(" ");
  res = parseInt(split[0].split(":").join(""));
  if (split[1] == "PM" && !split[0].startsWith("12")) {
    res += 1200;
  }

  return res;
}

var getUnprocessed = {
  Mon: {
    open: 0,
    close: 0
  },
  Tue: {
    open: 0,
    close: 0
  },
  Wed: {
    open: 0,
    close: 0
  },
  Thu: {
    open: 0,
    close: 0
  },
  Fri: {
    open: 0,
    close: 0
  },
  Sat: {
    open: 0,
    close: 0
  },
  Sun: {
    open: 0,
    close: 0
  }
};

// "Mon-Thu 11:00 AM-10:00 PM; Fri 11:00 AM-11:00 PM; Sat 5:00 PM-11:00 PM; Sun 5:00 PM-9:00 PM"
// "Tue-Sun 5:30 PM-10:00 PM"

// for (let each in timeslots) {
//   let _days: string = "";
//   const output = re.exec(each);
//   _days = output && output[0] != null ? output[0] : "";

//   if (_days.length) {
//     // const daysList = Object.keys(processed);

//     const dayOne = _days.includes("-") ? _days.split("-")[0] : _days;
//     const dayTwo = _days.includes("-") ? _days.split("-")[1] : "";

//     // if (dayTwo) {
//     //   for (let i = daysList.indexOf(dayOne); i = daysList.indexOf(dayTwo); i++) {

//     //   }
//     // }
//   }
// }
