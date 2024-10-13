function convertToASCII(imageData, columns, rows) {
    const { data, width, height } = imageData;
    let ascii = '';
    const character = '@';  // 用于填充的字符

    const colStep = width / columns;
    const rowStep = height / rows;

    for (let y = 0; y < height; y += rowStep) {
        for (let x = 0; x < width; x += colStep) {
            const index = (Math.floor(y) * width + Math.floor(x)) * 4;
            const r = data[index];
            const g = data[index + 1];
            const b = data[index + 2];
            const color = `rgb(${r}, ${g}, ${b})`;

            // 根据颜色值显示字符
            ascii += `<span style="color:${color};">${character}</span>`;
        }
        ascii += '<br/>';
    }
    return ascii;
}

function setupASCIIContainer(container, fontSize, lineHeight) {
    container.style.fontSize = `${fontSize}px`;
    container.style.lineHeight = `${lineHeight}px`;
    container.style.whiteSpace = "pre"; // 保留空格和折行
}

/**
 * Converts an image to ASCII art and displays it in a specified container.
 *
 * @param {string} imageUrl - The URL of the image to convert.
 * @param {HTMLElement} container - The HTML element where the ASCII art will be displayed.
 * @param {Object} [options] - The optional parameters for rendering ASCII art.
 * @param {number} [options.fontSize=8] - The font size for ASCII characters.
 * @param {number} [options.lineHeight=14] - The line height for ASCII characters.
 */
export function imageToAscii(imageUrl, container, options = {
    fontSize: 8,
    lineHeight: 14
}) {
    const image = new Image();
    image.crossOrigin = "anonymous";

    image.onload = () => {
        const { fontSize, lineHeight } = options || {};
        const { width, height } = image;
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0);

        const imageData = ctx.getImageData(0, 0, width, height);
        const charCols = width / fontSize;
        const charRows = height / lineHeight;
        const ascii = convertToASCII(imageData, charCols, charRows);

        setupASCIIContainer(container, fontSize, lineHeight);
        container.innerHTML = ascii;
    };

    image.src = imageUrl;
    image.onerror = (event) => {
        console.error("Failed to load image", event);
    };
}

function drawVideoFrame(ctx, canvas, video, container, charCols, charRows) {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const ascii = convertToASCII(imageData, charCols, charRows);
    container.innerHTML = ascii;

    requestAnimationFrame(() => drawVideoFrame(ctx, canvas, video, container, charCols, charRows));
}


/**
 * Converts an video to ASCII art and displays it in a specified container.
 *
 * @param {string} videoUrl - The URL of the image to convert.
 * @param {HTMLElement} container - The HTML element where the ASCII art will be displayed.
 * @param {Object} [options] - The optional parameters for rendering ASCII art.
 * @param {number} [options.fontSize=8] - The font size for ASCII characters.
 * @param {number} [options.lineHeight=14] - The line height for ASCII characters.
 */
export function videoToAscii(videoUrl, container,options = {
    fontSize: 8,
    lineHeight: 14
}) {

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const video = document.createElement("video");

    video.crossOrigin = "anonymous";
    video.src = videoUrl;
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.play();

    video.oncanplay = () => {
        const { videoWidth, videoHeight } = video;
        canvas.width = videoWidth;
        canvas.height = videoHeight;

        const charCols = videoWidth / fontSize;
        const charRows = videoHeight / lineHeight;

        setupASCIIContainer(container, fontSize, lineHeight);
        requestAnimationFrame(() => drawVideoFrame(ctx, canvas, video, container, charCols, charRows));
    };

    video.onerror = (error) => {
        console.error("Error loading video", error);
    };
}
