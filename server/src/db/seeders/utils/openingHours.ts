export type DaySchedule = {
    open: string | null;
    close: string | null;
    closed: boolean;
};

export type WeekSchedule = {
    monday: DaySchedule;
    tuesday: DaySchedule;
    wednesday: DaySchedule;
    thursday: DaySchedule;
    friday: DaySchedule;
    saturday: DaySchedule;
    sunday: DaySchedule;
};

export const STANDARD_HOURS: WeekSchedule = {
    monday: { open: "07:30", close: "22:00", closed: false },
    tuesday: { open: "07:30", close: "22:00", closed: false },
    wednesday: { open: "07:30", close: "22:00", closed: false },
    thursday: { open: "07:30", close: "22:00", closed: false },
    friday: { open: "07:30", close: "20:00", closed: false },
    saturday: { open: "09:00", close: "18:00", closed: false },
    sunday: { open: null, close: null, closed: true },
};

export const AQUATIC_HOURS: WeekSchedule = {
    monday: { open: "06:00", close: "21:00", closed: false },
    tuesday: { open: null, close: null, closed: true },
    wednesday: { open: "06:00", close: "21:00", closed: false },
    thursday: { open: null, close: null, closed: true },
    friday: { open: "06:00", close: "19:00", closed: false },
    saturday: { open: null, close: null, closed: true },
    sunday: { open: null, close: null, closed: true },
};

export const STADIUM_HOURS: WeekSchedule = {
    monday: { open: "08:00", close: "20:00", closed: false },
    tuesday: { open: "08:00", close: "20:00", closed: false },
    wednesday: { open: "08:00", close: "20:00", closed: false },
    thursday: { open: "08:00", close: "20:00", closed: false },
    friday: { open: "08:00", close: "18:00", closed: false },
    saturday: { open: "09:00", close: "17:00", closed: false },
    sunday: { open: null, close: null, closed: true },
};

export const EXTENDED_HOURS: WeekSchedule = {
    monday: { open: "07:00", close: "22:00", closed: false },
    tuesday: { open: "07:00", close: "22:00", closed: false },
    wednesday: { open: "07:00", close: "22:00", closed: false },
    thursday: { open: "07:00", close: "22:00", closed: false },
    friday: { open: "07:00", close: "20:00", closed: false },
    saturday: { open: "09:00", close: "18:00", closed: false },
    sunday: { open: "09:00", close: "17:00", closed: false },
};