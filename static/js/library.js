// library.js - Now loads data from the Database via API
window.ELEMENT_LIBRARY = {};

export async function loadLibraryData() {
    try {
        // Load elements (grouped by category)
        const elRes = await fetch('/api/public/elements');
        const elements = await elRes.json();
        window.ELEMENT_LIBRARY = elements; // Directly assign the grouped JSON

        // Load Colors
        const colRes = await fetch('/api/public/colors');
        const colors = await colRes.json();
        if (colors && colors.length > 0) {
            window.ELEMENT_LIBRARY['Colors'] = colors.map(c => ({
                type: 'color', label: c.name,
                html: `<div style="width:100%; height:100%; background:${c.hex}; border-radius:8px;"></div>`,
                defaultStyles: { width: '60px', height: '60px' }
            }));
        }

        // Load Fonts
        const fontRes = await fetch('/api/public/fonts');
        const fonts = await fontRes.json();
        if (fonts && fonts.length > 0) {
            window.ELEMENT_LIBRARY['Fonts'] = fonts.map(f => ({
                type: 'font', label: f.name,
                html: `<div style="font-family:'${f.name}', sans-serif; font-size:20px;">${f.name}</div>`,
                defaultStyles: { width: 'auto', height: 'auto' }
            }));
        }
        
        console.log('✅ Library loaded from DB:', window.ELEMENT_LIBRARY);
    } catch (err) {
        console.error('⚠️ Failed to load library from DB, falling back to default.', err);
        // Fallback to hardcoded default (optional)
        window.ELEMENT_LIBRARY = window.ELEMENT_LIBRARY || {};
    }
}

// Call this in builder.js before initBuilder()
