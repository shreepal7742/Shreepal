
// Service to upload images and data to GitHub Repository via API

// Helper to handle UTF-8 strings (Hindi) for Base64
function utf8_to_b64(str: string) {
    return window.btoa(unescape(encodeURIComponent(str)));
}

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

    // Using raw.githubusercontent.com is faster for direct hotlinking than the API download_url
    return `https://raw.githubusercontent.com/${owner}/${repo}/main/${path}`;
};

export const saveJsonToGitHub = async (
    data: any,
    token: string,
    owner: string,
    repo: string,
    path: string = 'public/data.json'
): Promise<boolean> => {
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

    // 1. Get SHA of existing file (if any) to allow update
    let sha = '';
    try {
        const getRes = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/vnd.github.v3+json',
            }
        });
        if (getRes.ok) {
            const json = await getRes.json();
            sha = json.sha;
        }
    } catch (e) {
        console.warn('File not found or error fetching SHA', e);
    }

    // 2. Encode Content (UTF-8 safe for Hindi characters)
    const jsonString = JSON.stringify(data, null, 2);
    const base64Content = utf8_to_b64(jsonString);

    // 3. Update File
    const putRes = await fetch(url, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3+json',
        },
        body: JSON.stringify({
            message: `Update site data: ${new Date().toLocaleString()}`,
            content: base64Content,
            sha: sha || undefined
        })
    });

    if (!putRes.ok) {
        const err = await putRes.json();
        throw new Error(err.message || 'Failed to save JSON to GitHub');
    }

    return true;
};
