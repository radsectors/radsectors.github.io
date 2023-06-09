/**
 * stopDefault
 *
 * @param e Event obj
 * @returns boolean
 */
export function stopDefault(e) {
    if (e && e.preventDefault) {
        e.preventDefault();
    } else {
        window.event.returnValue = false;
    }

    return false;
}
