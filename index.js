function convertToASCII(imageData, columns, rows) {
    const { data, width, height } = imageData;
    let ascii = '';
    const character = '@';  // 可选择填充字符

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

export function imageToAscii(imageUrl, container) {
    const image = new Image();
    image.crossOrigin = "anonymous"; // 解决跨域问题
    image.src = imageUrl;

    image.onload = () => {
        const { width, height } = image;
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0);

        const imageData = ctx.getImageData(0, 0, width, height);

        // 选择合适的字体大小和行高比例实现填充
        const charCols = width / 8; // 可根据容器大小动态计算
        const charRows = height / 14;

        const ascii = convertToASCII(imageData, charCols, charRows);

        container.style.fontSize = `${width / charCols}px`;
        container.style.lineHeight = `${height / charRows}px`;
        container.style.whiteSpace = "pre"; // 保留空格和折行
        container.innerHTML = ascii;
    };

    image.onerror = (event) => {
        console.error("Failed to load image", event);
    };
}