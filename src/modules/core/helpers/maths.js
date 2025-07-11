export const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export const getPercent = (partial, total) => Math.floor((partial / total) * 100);
