// Basic builder logic with minimal ELEMENT_LIBRARY
const ELEMENT_LIBRARY = {
    'Buttons': [
        { type: 'button', label: 'Primary Solid', html: '<button style="background:#232846; color:#fff; border:none; padding:12px 24px; border-radius:12px; font-weight:600;">Get Started</button>', defaultStyles: { width: '160px', height: '48px' } },
        { type: 'button', label: 'Secondary Outline', html: '<button style="background:transparent; color:#232846; border:2px solid #232846; padding:12px 24px; border-radius:12px; font-weight:600;">Learn More</button>', defaultStyles: { width: '160px', height: '48px' } },
        { type: 'button', label: 'Green CTA', html: '<button style="background:#2ECC71; color:#fff; border:none; padding:12px 24px; border-radius:12px; font-weight:600;">Sign Up</button>', defaultStyles: { width: '150px', height: '48px' } },
        { type: 'button', label: 'Ghost', html: '<button style="background:transparent; color:#232846; border:none; padding:12px 24px; font-weight:600;">Skip</button>', defaultStyles: { width: '100px', height: '48px' } },
        { type: 'button', label: 'Rounded Pill', html: '<button style="background:#232846; color:#fff; border:none; padding:12px 24px; border-radius:50px; font-weight:600;">Subscribe</button>', defaultStyles: { width: '140px', height: '48px' } },
    ],
    'Navbars': [
        { type: 'navbar', label: 'Minimal', html: '<nav style="display:flex; justify-content:space-between; padding:12px 20px; background:#fff; border-bottom:1px solid #eee;"><span style="font-weight:bold;">Brand</span><div><a href="#">Home</a> <a href="#">About</a></div></nav>', defaultStyles: { width: '100%', height: '60px' } },
        { type: 'navbar', label: 'Dark', html: '<nav style="display:flex; justify-content:space-between; padding:12px 20px; background:#161A30; color:#fff; border-bottom:1px solid #2a2f45;"><span style="font-weight:bold;">Brand</span><div><a href="#" style="color:#fff;">Home</a> <a href="#" style="color:#fff;">About</a></div></nav>', defaultStyles: { width: '100%', height: '60px' } },
        { type: 'navbar', label: 'With CTA', html: '<nav style="display:flex; justify-content:space-between; padding:12px 20px; background:#fff; border-bottom:1px solid #eee;"><span style="font-weight:bold;">Brand</span><div><a href="#">Home</a> <button style="background:#232846; color:#fff; border:none; padding:6px 16px; border-radius:12px;">Get Started</button></div></nav>', defaultStyles: { width: '100%', height: '60px' } },
    ],
    'Footers': [
        { type: 'footer', label: 'Dark Simple', html: '<footer style="background:#161A30; color:#fff; text-align:center; padding:20px;">&copy; 2026 Parrot Innovations</footer>', defaultStyles: { width: '100%', height: '80px' } },
        { type: 'footer', label: 'Light Simple', html: '<footer style="background:#F7F8FC; color:#232846; text-align:center; padding:20px; border-top:1px solid #eee;">&copy; 2026 Parrot Innovations</footer>', defaultStyles: { width: '100%', height: '80px' } },
        { type: 'footer', label: '3 Columns', html: '<footer style="background:#161A30; color:#fff; padding:20px; display:flex; justify-content:space-around;"><div><h4>Parrot</h4><p>About</p></div><div><h4>Links</h4><p>Home</p></div><div><h4>Contact</h4><p>Email</p></div></footer>', defaultStyles: { width: '100%', height: '140px' } },
    ],
    'Cards': [
        { type: 'card', label: 'Profile Card', html: '<div style="border:1px solid #eee; border-radius:16px; padding:20px; background:#fff; width:100%; text-align:center;"><div style="width:80px; height:80px; background:#3498DB; border-radius:50%; margin:0 auto;"></div><h3>Alex Morgan</h3><p style="color:#666;">Designer</p></div>', defaultStyles: { width: '260px', height: '220px' } },
        { type: 'card', label: 'Product Card', html: '<div style="border:1px solid #eee; border-radius:16px; padding:16px; background:#fff;"><div style="background:#f1f3f5; height:120px; border-radius:12px;"></div><h4>Headphones</h4><p>$89.99</p></div>', defaultStyles: { width: '240px', height: '260px' } },
        { type: 'card', label: 'Blog Post', html: '<div style="border:1px solid #eee; border-radius:16px; padding:16px; background:#fff;"><div style="background:#e9ecef; height:100px; border-radius:12px;"></div><h4>Blog Title</h4><p>Jan 15, 2026</p></div>', defaultStyles: { width: '240px', height: '240px' } },
    ],
    'Text': [
        { type: 'text', label: 'Heading', html: '<h1 style="font-family:Outfit; margin:0; font-size:36px;">Welcome</h1>', defaultStyles: { width: 'auto', height: 'auto', fontSize: '36px', color: '#232846' } },
        { type: 'text', label: 'Paragraph', html: '<p style="font-family:Inter; margin:0; font-size:16px; color:#3E466E;">Drag, drop, and customize.</p>', defaultStyles: { width: '300px', height: 'auto', fontSize: '16px', color: '#3E466E' } },
    ],
    'Inputs': [
        { type: 'input', label: 'Text Input', html: '<input type="text" placeholder="Enter name" style="width:100%; padding:12px; border:1px solid #ddd; border-radius:8px;">', defaultStyles: { width: '100%', height: '48px' } },
        { type: 'input', label: 'Email Input', html: '<input type="email" placeholder="Email" style="width:100%; padding:12px; border:1px solid #ddd; border-radius:8px;">', defaultStyles: { width: '100%', height: '48px' } },
    ],
    'Images': [
        { type: 'image', label: 'Placeholder', html: '<div style="width:100%; height:100%; background:#e9ecef; display:flex; align-items:center; justify-content:center;"><span class="material-icons" style="font-size:48px;">image</span></div>', defaultStyles: { width: '200px', height: '150px' } },
        { type: 'image', label: 'Square', html: '<div style="width:100%; height:100%; background:#e9ecef; display:flex; align-items:center; justify-content:center;"><span class="material-icons" style="font-size:48px;">crop_square</span></div>', defaultStyles: { width: '150px', height: '150px' } },
    ],
    'Shapes': [
        { type: 'shape', label: 'Rectangle', html: '<div style="width:100%; height:100%; background:#232846; border-radius:4px;"></div>', defaultStyles: { width: '120px', height: '80px' } },
        { type: 'shape', label: 'Circle', html: '<div style="width:100%; height:100%; background:#2ECC71; border-radius:50%;"></div>', defaultStyles: { width: '80px', height: '80px' } },
    ]
};

let siteId = window.SITE_ID;
let elements = [];
let currentView = 'pc';
let selectedId = null;
let nextId = 1000;

const VIEW_SIZES = { phone: { w: 390, h: 844 }, tablet: { w: 768, h: 1024 }, pc: { w: 1366, h: 768 }, tv: { w: 1920, h: 1080 }, landscape: { w: 844, h: 390 } };

function initBuilder() {
    const data = window.SITE_DATA || { elements: [] };
    elements = data.elements || [];
    elements.forEach(el => renderElement(el));
    setView('pc');
    populateDrawer();

    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            setView(this.dataset.view);
        });
    });
    document.getElementById('saveBtn').addEventListener('click', saveSite);
    document.getElementById('publishBtn').addEventListener('click', publishSite);
    document.getElementById('previewBtn').addEventListener('click', previewSite);
    document.getElementById('canvas').addEventListener('dragover', e => e.preventDefault());
    document.getElementById('canvas').addEventListener('drop', handleDrop);
    document.getElementById('cloudinaryInput').addEventListener('change', handleImageUpload);
    document.addEventListener('keydown', e => { if (e.key === 'Delete' && selectedId) deleteElement(selectedId); });
}

function setView(view) {
    currentView = view;
    const size = VIEW_SIZES[view];
    const c = document.getElementById('canvas');
    c.style.width = size.w + 'px'; c.style.height = size.h + 'px';
    renderAllElements();
}

function populateDrawer() {
    const container = document.getElementById('assets-panel');
    container.innerHTML = '';
    for (const [cat, items] of Object.entries(ELEMENT_LIBRARY)) {
        const div = document.createElement('div');
        div.className = 'category';
        div.innerHTML = `<div class="category-title">${cat}</div>`;
        items.forEach((item, idx) => {
            const el = document.createElement('div');
            el.className = 'asset-item';
            el.draggable = true;
            el.textContent = item.label;
            el.dataset.cat = cat;
            el.dataset.idx = idx;
            el.addEventListener('dragstart', e => {
                e.dataTransfer.setData('text/plain', JSON.stringify({ cat, idx }));
            });
            div.appendChild(el);
        });
        container.appendChild(div);
    }
}

function handleDrop(e) {
    e.preventDefault();
    const raw = e.dataTransfer.getData('text/plain');
    if (!raw) return;
    const { cat, idx } = JSON.parse(raw);
    const item = ELEMENT_LIBRARY[cat]?.[idx];
    if (!item) return;
    const canvas = document.getElementById('canvas');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const el = {
        id: 'el-' + (nextId++),
        type: item.type,
        html: item.html,
        defaultStyles: { ...item.defaultStyles },
        overrides: {},
        position: { left: x, top: y, width: parseInt(item.defaultStyles.width) || 200, height: parseInt(item.defaultStyles.height) || 50 }
    };
    elements.push(el);
    renderElement(el);
}

function getStylesAndPositionForView(el) {
    // Return { styles, position } for current view
    const ov = el.overrides && el.overrides[currentView];
    if (ov) {
        return { styles: ov.styles || el.defaultStyles, position: ov.position || el.position };
    }
    return { styles: el.defaultStyles, position: el.position };
}

function renderElement(el) {
    const canvas = document.getElementById('canvas');
    const w = document.createElement('div');
    w.className = 'element-wrapper';
    w.id = el.id;
    
    // Get view-specific styles and position
    const { styles, position } = getStylesAndPositionForView(el);
    
    w.style.left = position.left + 'px'; w.style.top = position.top + 'px';
    w.style.width = position.width + 'px'; w.style.height = position.height + 'px';
    w.style.background = styles.background || ''; w.style.color = styles.color || '';
    w.style.fontSize = styles.fontSize || ''; w.style.borderRadius = styles.borderRadius || '';
    w.style.padding = styles.padding || '';
    w.innerHTML = el.html;
    
    w.addEventListener('click', function(e) {
        e.stopPropagation();
        document.querySelectorAll('.element-wrapper').forEach(el => el.classList.remove('selected'));
        this.classList.add('selected');
        selectedId = this.id;
        openProperties(el);
    });
    w.addEventListener('dblclick', function() { openProperties(el); });
    makeDraggable(w, el);
    canvas.appendChild(w);
}

function renderAllElements() {
    document.getElementById('canvas').innerHTML = '';
    elements.forEach(el => renderElement(el));
}

function makeDraggable(w, el) {
    let sx, sy, ox, oy;
    w.addEventListener('mousedown', function(e) {
        if (e.target.closest('.element-wrapper')) {
            sx = e.clientX; sy = e.clientY;
            ox = parseInt(w.style.left); oy = parseInt(w.style.top);
            w.style.zIndex = 1000;
            const onMove = (e) => {
                w.style.left = (ox + (e.clientX - sx)) + 'px';
                w.style.top = (oy + (e.clientY - sy)) + 'px';
            };
            const onUp = () => {
                document.removeEventListener('mousemove', onMove);
                document.removeEventListener('mouseup', onUp);
                w.style.zIndex = 1;
                // Update default position, not override (we'll keep it in default)
                el.position.left = parseInt(w.style.left);
                el.position.top = parseInt(w.style.top);
            };
            document.addEventListener('mousemove', onMove);
            document.addEventListener('mouseup', onUp);
        }
    });
}

function openProperties(el) {
    const panel = document.getElementById('properties-panel');
    panel.style.display = 'block';
    panel.dataset.id = el.id;
    
    // Get current view's styles and position
    const { styles, position } = getStylesAndPositionForView(el);
    
    document.getElementById('propText').value = styles.text || '';
    document.getElementById('propLink').value = styles.link || '';
    document.getElementById('propBgColor').value = styles.background || '#ffffff';
    document.getElementById('propTextColor').value = styles.color || '#000000';
    document.getElementById('propFontSize').value = styles.fontSize || '16px';
    document.getElementById('propPadding').value = styles.padding || '4px';
    document.getElementById('propRadius').value = styles.borderRadius || '8px';
    document.getElementById('propWidth').value = position.width + 'px';
    document.getElementById('propHeight').value = position.height + 'px';
    
    // Set view dropdown to current view (or default if no override)
    const viewDropdown = document.getElementById('propView');
    // Check if current view has override
    const ov = el.overrides && el.overrides[currentView];
    viewDropdown.value = ov ? currentView : 'default';
}

document.getElementById('properties-panel').addEventListener('input', function(e) {
    const panel = document.getElementById('properties-panel');
    const el = elements.find(e => e.id === panel.dataset.id);
    if (!el) return;
    const view = document.getElementById('propView').value;
    const styles = {
        text: document.getElementById('propText').value,
        link: document.getElementById('propLink').value,
        background: document.getElementById('propBgColor').value,
        color: document.getElementById('propTextColor').value,
        fontSize: document.getElementById('propFontSize').value,
        padding: document.getElementById('propPadding').value,
        borderRadius: document.getElementById('propRadius').value
    };
    const w = parseInt(document.getElementById('propWidth').value) || 200;
    const h = parseInt(document.getElementById('propHeight').value) || 50;

    if (view === 'default') {
        // Update default styles and position
        Object.assign(el.defaultStyles, styles);
        el.position.width = w; el.position.height = h;
        // Remove any override for this view if exists
        if (el.overrides && el.overrides[currentView]) {
            delete el.overrides[currentView];
        }
    } else {
        // Update override for this view
        if (!el.overrides) el.overrides = {};
        el.overrides[view] = {
            styles: { ...styles },
            position: { left: el.position.left, top: el.position.top, width: w, height: h }
        };
    }
    // Update inner HTML content as well
    // We need to update el.html to reflect new content (text, link, etc.)
    // For simplicity, we reconstruct el.html based on type and styles
    // But we'll use a helper function to generate HTML from type + styles
    el.html = generateHtmlFromType(el.type, styles);
    renderAllElements();
    document.getElementById(el.id).classList.add('selected');
});

// Helper to generate HTML based on element type and styles
function generateHtmlFromType(type, styles) {
    // For MVP, we handle basic types
    if (type === 'button') {
        const bg = styles.background || '#232846';
        const color = styles.color || '#fff';
        const text = styles.text || 'Button';
        const padding = styles.padding || '12px 24px';
        const borderRadius = styles.borderRadius || '12px';
        const fontSize = styles.fontSize || '16px';
        return `<button style="background:${bg}; color:${color}; border:none; padding:${padding}; border-radius:${borderRadius}; font-size:${fontSize}; font-weight:600;">${text}</button>`;
    } else if (type === 'text') {
        const fontSize = styles.fontSize || '36px';
        const color = styles.color || '#232846';
        const text = styles.text || 'Heading';
        return `<h1 style="font-family:Outfit; margin:0; font-size:${fontSize}; color:${color};">${text}</h1>`;
    } else if (type === 'image') {
        // For image, we preserve the html as is, but if there's a url, we can replace
        return `<div style="width:100%; height:100%; background:#e9ecef; display:flex; align-items:center; justify-content:center;"><span class="material-icons" style="font-size:48px;">image</span></div>`;
    } else if (type === 'input') {
        const placeholder = styles.placeholder || 'Input...';
        const padding = styles.padding || '12px';
        const borderRadius = styles.borderRadius || '8px';
        return `<input type="text" placeholder="${placeholder}" style="width:100%; padding:${padding}; border:1px solid #ddd; border-radius:${borderRadius};">`;
    } else {
        // Default: just return the original html
        return el.html;
    }
}

async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', window.UPLOAD_PRESET);
    try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/${window.CLOUD_NAME}/image/upload`, {
            method: 'POST',
            body: formData
        });
        const data = await res.json();
        if (data.secure_url) {
            const panel = document.getElementById('properties-panel');
            const el = elements.find(e => e.id === panel.dataset.id);
            if (el && el.type === 'image') {
                // Update html with image
                el.html = `<img src="${data.secure_url}" style="width:100%; height:100%; object-fit:cover;">`;
                renderAllElements();
                document.getElementById(el.id).classList.add('selected');
            }
        }
    } catch (err) { alert('Upload failed'); }
}

async function saveSite() {
    document.querySelectorAll('.element-wrapper').forEach(w => {
        const el = elements.find(e => e.id === w.id);
        if (el) {
            // Update default position from current DOM
            // Note: we only update default position; overrides are kept separately
            el.position.left = parseInt(w.style.left);
            el.position.top = parseInt(w.style.top);
            el.position.width = parseInt(w.style.width);
            el.position.height = parseInt(w.style.height);
        }
    });
    const res = await fetch(`/site/${siteId}/save`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ elements })
    });
    if (res.ok) alert('Saved!'); else alert('Error saving');
}

async function publishSite() {
    await saveSite();
    const res = await fetch(`/site/${siteId}/publish`, { method: 'POST' });
    if (res.ok) {
        const data = await res.json();
        alert(`Published: ${data.url}`);
    } else alert('Publish failed');
}

async function previewSite() {
    // Check if site already published
    const res = await fetch(`/site/${siteId}/publish`, { method: 'POST' });
    if (res.ok) {
        const data = await res.json();
        window.open(data.url, '_blank');
    } else {
        alert('Could not preview. Please publish first.');
    }
}

function deleteElement(id) {
    elements = elements.filter(e => e.id !== id);
    renderAllElements();
}
