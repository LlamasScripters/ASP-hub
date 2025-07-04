/**
 * Utilities for schedule and availability management
 */

export interface TimeSlot {
	open: string | null;
	close: string | null;
	closed?: boolean;
	available?: boolean;
}

export interface Schedule {
	monday: TimeSlot;
	tuesday: TimeSlot;
	wednesday: TimeSlot;
	thursday: TimeSlot;
	friday: TimeSlot;
	saturday: TimeSlot;
	sunday: TimeSlot;
}

/**
 * Converts a time in "HH:mm" format to minutes since midnight
 */
function timeToMinutes(time: string): number {
	const [hours, minutes] = time.split(":").map(Number);
	return hours * 60 + minutes;
}

/**
 * Gets the day name of the week in lowercase English
 */
function getDayName(date: Date): keyof Schedule {
	const days: (keyof Schedule)[] = [
		"sunday",
		"monday",
		"tuesday",
		"wednesday",
		"thursday",
		"friday",
		"saturday",
	];
	return days[date.getDay()];
}

/**
 * Checks if a reservation respects the opening hours of a room
 */
export function isWithinOpeningHours(
	startAt: Date,
	endAt: Date,
	openingHours: Schedule,
): { isValid: boolean; reason?: string } {
	const startDay = getDayName(startAt);
	const endDay = getDayName(endAt);

	// If the reservation spans multiple days
	if (startDay !== endDay) {
		return {
			isValid: false,
			reason: "The reservation cannot span multiple days",
		};
	}

	const daySchedule = openingHours[startDay];

	// Check if the place is closed that day
	if (daySchedule.closed || !daySchedule.open || !daySchedule.close) {
		return {
			isValid: false,
			reason: `The place is closed on ${startDay}`,
		};
	}

	// Convert hours to minutes
	const openMinutes = timeToMinutes(daySchedule.open);
	const closeMinutes = timeToMinutes(daySchedule.close);

	const startMinutes = startAt.getHours() * 60 + startAt.getMinutes();
	const endMinutes = endAt.getHours() * 60 + endAt.getMinutes();

	// Check if the start time is within opening hours
	if (startMinutes < openMinutes) {
		return {
			isValid: false,
			reason: `The start time (${startAt.toLocaleTimeString()}) is before opening time (${
				daySchedule.open
			})`,
		};
	}

	// Check if the end time is within opening hours
	if (endMinutes > closeMinutes) {
		return {
			isValid: false,
			reason: `The end time (${endAt.toLocaleTimeString()}) is after closing time (${
				daySchedule.close
			})`,
		};
	}

	return { isValid: true };
}

/**
 * Checks if a minibus is available according to its availability schedule
 */
export function isWithinAvailability(
	startAt: Date,
	endAt: Date,
	disponibility: Schedule,
): { isValid: boolean; reason?: string } {
	const startDay = getDayName(startAt);
	const endDay = getDayName(endAt);

	// If the reservation spans multiple days
	if (startDay !== endDay) {
		return {
			isValid: false,
			reason: "The reservation cannot span multiple days",
		};
	}

	const dayAvailability = disponibility[startDay];

	// Check if the minibus is available that day
	if (
		!dayAvailability.available ||
		!dayAvailability.open ||
		!dayAvailability.close
	) {
		return {
			isValid: false,
			reason: `The minibus is not available on ${startDay}`,
		};
	}

	// Convert hours to minutes
	const availableFromMinutes = timeToMinutes(dayAvailability.open);
	const availableToMinutes = timeToMinutes(dayAvailability.close);

	const startMinutes = startAt.getHours() * 60 + startAt.getMinutes();
	const endMinutes = endAt.getHours() * 60 + endAt.getMinutes();

	// Check if the start time is within the availability range
	if (startMinutes < availableFromMinutes) {
		return {
			isValid: false,
			reason: `The start time (${startAt.toLocaleTimeString()}) is before availability time (${
				dayAvailability.open
			})`,
		};
	}

	// Check if the end time is within the availability range
	if (endMinutes > availableToMinutes) {
		return {
			isValid: false,
			reason: `The end time (${endAt.toLocaleTimeString()}) is after availability time (${
				dayAvailability.close
			})`,
		};
	}

	return { isValid: true };
}
