export function shuffle<T = unknown>(data: T[]): T[] {
    // uses Fishery Yates shuffle to make sure its truelly random
    // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
    for (let i = data.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = data[i];
        data[i] = data[j];
        data[j] = temp;
    }

    return data;
}