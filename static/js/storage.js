// storage.js - Handles all API calls (Save, Publish, Load)

export function saveSite(siteId, elements, canvasProperties) {
    return new Promise(async (resolve, reject) => {
        // Update element positions from DOM
        document.querySelectorAll('.element-wrapper').forEach(w => {
            const el = elements.find(e => e.id === w.id);
            if (el) {
                el.position.left = parseInt(w.style.left);
                el.position.top = parseInt(w.style.top);
                el.position.width = parseInt(w.style.width);
                el.position.height = parseInt(w.style.height);
            }
        });
        const payload = { elements, canvas: canvasProperties };
        try {
            const res = await fetch(`/site/${siteId}/save`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (res.ok) resolve('Saved successfully!');
            else reject('Error saving site');
        } catch (err) {
            reject(err.message);
        }
    });
}

export async function publishSite(siteId, slug) {
    const res = await fetch(`/site/${siteId}/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug })
    });
    return await res.json(); // returns { success, slug, url, error }
}

export async function checkSlugAvailability(slug) {
    const res = await fetch(`/site/check-slug?slug=${encodeURIComponent(slug)}`);
    return await res.json(); // returns { available, message }
}
