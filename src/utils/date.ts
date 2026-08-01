import { TopBroadcast } from "@/types/top";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

type DayOfWeekString =
  | "Sundays"
  | "Mondays"
  | "Tuesdays"
  | "Wednesdays"
  | "Thursdays"
  | "Fridays"
  | "Saturdays";

export const convertBroadcastToDate = (broadcast: TopBroadcast) => {
  const days: Record<DayOfWeekString, number> = {
    Sundays: 0,
    Mondays: 1,
    Tuesdays: 2,
    Wednesdays: 3,
    Thursdays: 4,
    Fridays: 5,
    Saturdays: 6,
  };

  const [hour, minute] = broadcast.time.split(":").map(Number);

  const now = dayjs().tz(broadcast.timezone);

  let next = now
    .day(days[broadcast.day as DayOfWeekString])
    .hour(hour)
    .minute(minute)
    .second(0)
    .millisecond(0);

  if (next.isBefore(now)) {
    next = next.add(1, "week");
  }

  return next.toDate();
};

export const convertTZ = (
  date: string | Date,
  currentTZ: string,
  targetTZ: string,
) => {
  const dateCurrentTZ = dayjs.tz(date, currentTZ);
  const dateTargetTZ = dateCurrentTZ.tz(targetTZ);

  return dateTargetTZ.toDate();
};
