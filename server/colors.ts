function hsvToRgb(h: number, s: number, v: number) {
    let r, g, b;

    let i = Math.floor(h / 60);
    let f = h / 60 - i;
    let p = v * (1 - s);
    let q = v * (1 - s * f);
    let t = v * (1 - s * (1 - f));

    switch (i % 6) {
        case 0: [r, g, b] = [v, t, p]; break;
        case 1: [r, g, b] = [q, v, p]; break;
        case 2: [r, g, b] = [p, v, t]; break;
        case 3: [r, g, b] = [p, q, v]; break;
        case 4: [r, g, b] = [t, p, v]; break;
        default: [r, g, b] = [v, p, q]; break;
    }

    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

function rgbToString(rgb: {r: number, g: number, b: number}) {
    return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}

// generate fill and stroke colors for players
export function generateRandomPlayerColors(): [string, string] {
    const FILL_SATURATION = 0.5;
    const FILL_VALUE = 1;
    const STROKE_SATURATION = 1;
    const STROKE_VALUE = 0.4;

    const hue = Math.random() * 360;
    const fill = rgbToString(hsvToRgb(hue, FILL_SATURATION, FILL_VALUE));
    const stroke = rgbToString(hsvToRgb(hue, STROKE_SATURATION, STROKE_VALUE));

    return [fill, stroke];
}