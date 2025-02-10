"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertDurationToNumbers = exports.convertUTCTimestampToDurationString = exports.convertDurationToUTCTimestamp = void 0;
/**
 * Converts a duration string (e.g. "1y 2mo 3w 4d 5h 6m 7s 250ms" or with negatives/fractions)
 * into a UTC timestamp (in milliseconds). The duration is added to the provided base date
 * (or the current date/time if none is provided).
 *
 * Supported units (case-insensitive):
 *  - y: years
 *  - mo: months
 *  - w: weeks (7 days)
 *  - d: days
 *  - h: hours
 *  - m: minutes
 *  - s: seconds
 *  - ms: milliseconds
 *
 * Examples:
 *    "1y -2d 3.5h" or "1y2mo3w4d5h6m7s250ms"
 *
 * @param durationStr - The duration string to parse.
 * @param baseDate - (Optional) A base Date to which the duration is added.
 * @returns An object containing:
 *    - utcTimestamp: The resulting timestamp (milliseconds since Unix epoch)
 *    - durationMs: The total milliseconds added to the base date.
 */
function convertDurationToUTCTimestamp(durationStr, baseDate) {
    // Use the provided base date or default to the current date/time.
    const base = baseDate ? new Date(baseDate) : new Date();
    // Create a working copy so we do not mutate the original.
    const date = new Date(base);
    // Define a mapping of units to functions that add the corresponding value to a Date.
    // Note: For weeks we multiply the value by 7 days.
    const unitAdders = {
        y: (d, value) => d.setUTCFullYear(d.getUTCFullYear() + value),
        mo: (d, value) => d.setUTCMonth(d.getUTCMonth() + value),
        w: (d, value) => d.setUTCDate(d.getUTCDate() + value * 7),
        d: (d, value) => d.setUTCDate(d.getUTCDate() + value),
        h: (d, value) => d.setUTCHours(d.getUTCHours() + value),
        m: (d, value) => d.setUTCMinutes(d.getUTCMinutes() + value),
        s: (d, value) => d.setUTCSeconds(d.getUTCSeconds() + value),
        ms: (d, value) => d.setUTCMilliseconds(d.getUTCMilliseconds() + value),
    };
    // Initialize durations for each unit.
    const durations = {
        y: 0,
        mo: 0,
        w: 0,
        d: 0,
        h: 0,
        m: 0,
        s: 0,
        ms: 0,
    };
    // Regular expression to capture groups: a (possibly negative and/or fractional) number and a unit.
    // The order in the alternation matters: multi-character units ("ms" and "mo") must come first.
    const regex = /(-?\d+(?:\.\d+)?)(ms|mo|[ywdhms])/gi;
    let match;
    while ((match = regex.exec(durationStr)) !== null) {
        const value = parseFloat(match[1]);
        const unit = match[2].toLowerCase();
        durations[unit] += value;
    }
    // Apply the additions in a fixed order:
    const order = [
        'y',
        'mo',
        'w',
        'd',
        'h',
        'm',
        's',
        'ms',
    ];
    for (const unit of order) {
        if (durations[unit] !== 0) {
            unitAdders[unit](date, durations[unit]);
        }
    }
    const finalTimestamp = date.getTime();
    const durationMs = finalTimestamp - base.getTime();
    return { utcTimestamp: finalTimestamp, durationMs };
}
exports.convertDurationToUTCTimestamp = convertDurationToUTCTimestamp;
/* ----------------------------------------------------------------------------
   Reverse Function: Convert UTC Timestamp to a Duration String
   ----------------------------------------------------------------------------
   This function computes (in the same order as additions: years, months, weeks,
   days, hours, minutes, seconds, milliseconds) the difference between a base date
   (defaults to now) and a target UTC timestamp. It supports negative durations.
---------------------------------------------------------------------------- */
/**
 * Converts a UTC timestamp (in milliseconds) to a duration string relative to a base
 * date (or the current date/time if none is provided). The output string is in the format:
 *    "1y 2mo 3w 4d 5h 6m 7s 250ms"
 * Units with a value of zero are omitted (unless all are zero, in which case "0ms" is returned).
 * If the target timestamp is before the base date, the resulting string is prefixed with "-".
 *
 * @param utcTimestamp - The target UTC timestamp (milliseconds since Unix epoch).
 * @param baseDate - (Optional) The base Date from which the duration is calculated.
 * @returns A duration string representing the difference.
 */
function convertUTCTimestampToDurationString(utcTimestamp, baseDate) {
    // Use provided base date or default to current date/time.
    let base = baseDate ? new Date(baseDate) : new Date();
    let target = new Date(utcTimestamp);
    // Determine if the duration is negative.
    let negative = false;
    if (target.getTime() < base.getTime()) {
        negative = true;
        // Swap the dates to compute a positive difference.
        [base, target] = [target, base];
    }
    // Define pure functions to add one unit to a date and return a new Date.
    const addUnitFunctions = {
        y: (d, amount) => {
            const newDate = new Date(d);
            newDate.setUTCFullYear(newDate.getUTCFullYear() + amount);
            return newDate;
        },
        mo: (d, amount) => {
            const newDate = new Date(d);
            newDate.setUTCMonth(newDate.getUTCMonth() + amount);
            return newDate;
        },
        w: (d, amount) => {
            const newDate = new Date(d);
            newDate.setUTCDate(newDate.getUTCDate() + amount * 7);
            return newDate;
        },
        d: (d, amount) => {
            const newDate = new Date(d);
            newDate.setUTCDate(newDate.getUTCDate() + amount);
            return newDate;
        },
        h: (d, amount) => {
            const newDate = new Date(d);
            newDate.setUTCHours(newDate.getUTCHours() + amount);
            return newDate;
        },
        m: (d, amount) => {
            const newDate = new Date(d);
            newDate.setUTCMinutes(newDate.getUTCMinutes() + amount);
            return newDate;
        },
        s: (d, amount) => {
            const newDate = new Date(d);
            newDate.setUTCSeconds(newDate.getUTCSeconds() + amount);
            return newDate;
        },
        ms: (d, amount) => {
            const newDate = new Date(d);
            newDate.setUTCMilliseconds(newDate.getUTCMilliseconds() + amount);
            return newDate;
        },
    };
    // Helper: Count how many increments of a given unit can be added to start without surpassing target.
    function countUnits(start, target, unit) {
        let count = 0;
        let current = new Date(start);
        // For milliseconds, we can compute directly.
        if (unit === 'ms') {
            const diff = target.getTime() - current.getTime();
            count = diff;
            current = addUnitFunctions[unit](current, count);
            return { count, newDate: current };
        }
        while (true) {
            const next = addUnitFunctions[unit](current, 1);
            if (next.getTime() <= target.getTime()) {
                count++;
                current = next;
            }
            else {
                break;
            }
        }
        return { count, newDate: current };
    }
    // Define the order for computing differences.
    const order = [
        'y',
        'mo',
        'w',
        'd',
        'h',
        'm',
        's',
        'ms',
    ];
    let tempDate = new Date(base);
    const results = {};
    for (const unit of order) {
        const { count, newDate } = countUnits(tempDate, target, unit);
        results[unit] = count;
        tempDate = newDate;
    }
    // Build the duration string from nonzero parts.
    const parts = [];
    for (const unit of order) {
        const count = results[unit] || 0;
        if (count !== 0) {
            parts.push(`${count}${unit}`);
        }
    }
    if (parts.length === 0) {
        parts.push('0ms');
    }
    const durationStr = parts.join(' ');
    return negative ? '-' + durationStr : durationStr;
}
exports.convertUTCTimestampToDurationString = convertUTCTimestampToDurationString;
/**
 * Converts a duration string (e.g. "1y 2mo 3w 4d 5h 6m 7s 250ms") into its total numeric value,
 * expressed in seconds and milliseconds. Note that for years and months, fixed conversion
 * factors are used (1 year = 365 days, 1 month = 30 days).
 *
 * Supported units (case-insensitive):
 *   - y: years (365 days)
 *   - mo: months (30 days)
 *   - w: weeks (7 days)
 *   - d: days
 *   - h: hours
 *   - m: minutes
 *   - s: seconds
 *   - ms: milliseconds
 *
 * Fractional and negative values are supported.
 *
 * @param durationStr - The duration string to parse.
 * @returns An object containing:
 *    - totalSeconds: The total duration in seconds.
 *    - totalMilliseconds: The total duration in milliseconds.
 */
function convertDurationToNumbers(durationStr) {
    // Define conversion factors (using common approximations)
    const factorsInSeconds = {
        y: 365 * 24 * 3600,
        mo: 30 * 24 * 3600,
        w: 7 * 24 * 3600,
        d: 24 * 3600,
        h: 3600,
        m: 60,
        s: 1,
        ms: 0.001, // 1 millisecond = 0.001 seconds
    };
    // Regular expression to capture a (possibly negative and/or fractional) number and a unit.
    // Multi-character units ("ms" and "mo") are placed first in the alternation.
    const regex = /(-?\d+(?:\.\d+)?)(ms|mo|[ywdhms])/gi;
    let totalSeconds = 0;
    let match;
    while ((match = regex.exec(durationStr)) !== null) {
        const value = parseFloat(match[1]);
        const unit = match[2].toLowerCase();
        // Add the converted value to the total seconds.
        totalSeconds += value * (factorsInSeconds[unit] || 0);
    }
    const totalMilliseconds = totalSeconds * 1000;
    return { totalSeconds, totalMilliseconds };
}
exports.convertDurationToNumbers = convertDurationToNumbers;
