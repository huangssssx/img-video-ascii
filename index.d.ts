declare module 'img-video-ascii' {
    /**
     * Converts an image to ASCII art and displays it in a specified container.
     *
     * @param {string} imageUrl - The URL of the image to convert.
     * @param {HTMLElement} container - The HTML element where the ASCII art will be displayed.
     * @param {Object} [options] - The optional parameters for rendering ASCII art.
     * @param {number} [options.fontSize=8] - The font size for ASCII characters.
     * @param {number} [options.lineHeight=14] - The line height for ASCII characters.
     */
    export function imageToAscii(
        imageUrl: string, // 图像的 URL，必须是字符串
        container: HTMLElement | null, // 用于显示 ASCII 图像的 HTML 元素
        options?: { // 可选参数，包含字体大小和行高
            fontSize?: number, // 字体大小，可选，默认为 8
            lineHeight?: number // 行高，可选，默认为 14
        }
    ): void;


    /**
     * Converts an video to ASCII art and displays it in a specified container.
     *
     * @param {string} videoUrl - The URL of the image to convert.
     * @param {HTMLElement} container - The HTML element where the ASCII art will be displayed.
     * @param {Object} [options] - The optional parameters for rendering ASCII art.
     * @param {number} [options.fontSize=8] - The font size for ASCII characters.
     * @param {number} [options.lineHeight=14] - The line height for ASCII characters.
     */
    export function videoToAscii(videoUrl: string, container: HTMLElement | null): void;
}
