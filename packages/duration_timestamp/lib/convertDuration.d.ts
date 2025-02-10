/**
 * The result of converting a duration string into a UTC timestamp.
 */
export interface DurationResult {
    /** The computed UTC timestamp (in milliseconds) after adding the duration. */
    utcTimestamp: number;
    /** The total milliseconds that were added to the base date. */
    durationMs: number;
}
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
export declare function convertDurationToUTCTimestamp(durationStr: string, baseDate?: Date): DurationResult;
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
export declare function convertUTCTimestampToDurationString(utcTimestamp: number, baseDate?: Date): string;
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
export declare function convertDurationToNumbers(durationStr: string): {
    totalSeconds: number;
    totalMilliseconds: number;
};
