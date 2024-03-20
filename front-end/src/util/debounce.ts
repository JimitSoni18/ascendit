export const debounce = function(func: Function, wait: number) {
    let timeout: ReturnType<typeof setTimeout>;
    return function(...args: any[]) {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
};
