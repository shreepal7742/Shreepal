
// Service to upload images to GitHub Repository via API

export const uploadToGitHub = async (
    file: File,
    token: string,
    owner: string,
    repo: string
): Promise<string> => {
    // 1. Convert File to Base64 (Pure string, no data URI prefix)
    const base64Content = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = reader.result as string;
            // Remove "data:image/jpeg;base64," prefix
            const base64 = result.split(',')[1]; 
            resolve(base64);
        };
        reader.onerror = reject;
    });

    // 2. Generate Unique Filename
    const timestamp = Date.now();
    const cleanName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
    const path = `public/uploads/${timestamp}_${cleanName}`;

    // 3. API Request
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3+json',
        },
        body: JSON.stringify({
            message: `Upload image: ${cleanName}`,
            content: base64Content,
        })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'GitHub Upload Failed');
    }

    const data = await response.json();
    // Return the download_url or construct raw url
    // Using raw.githubusercontent.com is often faster for direct hotlinking than the API download_url
    return `https://raw.githubusercontent.com/${owner}/${repo}/main/${path}`;
};
