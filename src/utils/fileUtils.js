/**
 * Extract text content from various file types
 * @param {File} file - The uploaded file
 * @returns {Promise<string>} - Extracted text content
 */
export async function extractTextFromFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const content = e.target.result;

            // For text files, return directly
            if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
                resolve(content);
            }
            // For other types, we'll use a simple text extraction
            // In production, you'd want to use libraries like pdf.js or mammoth.js
            else {
                // Simple extraction - in production use proper parsers
                resolve(content);
            }
        };

        reader.onerror = () => {
            reject(new Error('Failed to read file'));
        };

        // Read as text for now (works for .txt, .rtf, basic .doc)
        reader.readAsText(file);
    });
}

/**
 * Format file size in human-readable format
 * @param {number} bytes - File size in bytes
 * @returns {string} - Formatted file size
 */
export function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Validate file type for resume upload
 * @param {File} file - The uploaded file
 * @returns {boolean} - Whether file type is valid
 */
export function isValidResumeFile(file) {
    const validExtensions = ['.doc', '.docx', '.pdf', '.txt', '.rtf', '.html'];
    const fileName = file.name.toLowerCase();

    return validExtensions.some(ext => fileName.endsWith(ext));
}
