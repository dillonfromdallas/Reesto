export interface Hours {
  Mon: HoursDetail;
  Tue: HoursDetail;
  Wed: HoursDetail;
  Thu: HoursDetail;
  Fri: HoursDetail;
  Sat: HoursDetail;
  Sun: HoursDetail;
}

interface HoursDetail {
  open: number;
  close: number;
}
