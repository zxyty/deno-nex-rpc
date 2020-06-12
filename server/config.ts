// remote source refresh time
let RefreshInterval = 1000 * 60 * 15;
let timer: number | null = null;
let date = Date.now();

export const getRemoteSourceRefreshTime = () => {
    return date;
};

export const setRemoteSourceRefreshTime = (time = RefreshInterval) => {
    if (timer) {
        clearTimeout(timer);
        timer = null;
    }
    date = Date.now();
    RefreshInterval = time;
    setTimeout(setRemoteSourceRefreshTime, time);
};
