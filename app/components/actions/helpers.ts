export default function get_image_from_path(path: string): string {
    return `https://kanchenjunga-treks.com${path}`;
}
export const sectionBg = 'bg-green-100 bg-opacity-50';
function stripTags(html: string): string {
    return html.replace(/<[^>]*>/g, "");
}
export function splitContent(html: string, limit: number): string {
    // strip html tags from content
    let content = stripTags(html);
    // Check if content is less than or equal to 150 characters
    if (content.length <= limit) {
        return content;
    }

    // Split the content at the limit
    const firstPart: string = content.substring(0, limit);

    // Indicate truncation with "..." (optional)
    return firstPart + "...";
}