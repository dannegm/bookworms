export const checkPixel = async url => {
    const img = document.createElement('img');
    img.src = url;

    return new Promise(resolve => {
        img.onload = () => {
            img.width = img.width;
            img.height = img.height;
            const isOnePixel = img.width === 1 && img.height === 1;
            resolve(isOnePixel);
        };

        img.onerror = () => resolve(true);
    });
};
