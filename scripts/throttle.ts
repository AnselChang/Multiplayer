export function throttle<T>(callback: (this: T, ...args: any[]) => void, limit: number): (...args: any[]) => void {
    let isThrottled = false;

    return function (this: T, ...args: any[]) {
        if (!isThrottled) {
            callback.apply(this, args);
            isThrottled = true;
            setTimeout(() => {
                isThrottled = false;
            }, limit);
        }
    }
}
