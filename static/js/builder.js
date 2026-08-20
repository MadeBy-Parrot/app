const ELEMENT_LIBRARY = {
    'Layout': [
        { type: 'container', label: 'Container', html: '<div style="padding:20px; border:1px dashed #ccc; width:100%;">Container</div>', defaultStyles: { width: '100%', height: '100px' } },
    ],
    'Buttons': [
        { type: 'button', label: 'Primary', html: '<button style="background:#232846; color:#fff; border:none; padding:12px 24px; border-radius:12px;">Get Started</button>', defaultStyles: { width: '160px', height: '48px' } },
        { type: 'button', label: 'Secondary', html: '<button style="background:transparent; color:#232846; border:2px solid #232846; padding:12px 24px; border-radius:12px;">Learn More</button>', defaultStyles: { width: '160px', height: '48px' } },
    ],
    'Cards': [
        { type: 'card', label: 'Profile', html: '<div style="border:1px solid #eee; border-radius:16px; padding:20px; background:#fff; text-align:center;"><h3>Alex Morgan</h3><p style="color:#666;">Designer</p></div>', defaultStyles: { width: '260px', height: '180px' } },
    ],
    'Text': [
        { type: 'text', label: 'Heading', html: '<h1 style="font-family:Outfit; margin:0;">Heading</h1>', defaultStyles: { width: 'auto', height: 'auto' } },
    ],
    'Inputs': [
        { type: 'input', label: 'Text Input', html: '<input type="text" placeholder="Type here..." style="width:100%; padding:12px; border:1px solid #ddd; border-radius:8px;">', defaultStyles: { width: '100%', height: '48px' } },
    ],
    'Images': [
        { type: 'image', label: 'Placeholder', html: '<div style="width:100%; height:100%; background:#e9ecef; display:flex; align-items:center; justify-content:center;"><span class="material-icons" style="font-size:48px;">image</span></div>', defaultStyles: { width: '200px', height: '150px' } },
    ],
    'Shapes': [
        { type: 'shape', label: 'Rectangle', html: '<div style="width:100%; height:100%; background:#232846; border-radius:4px;"></div>', defaultStyles: { width: '120px', height: '80px' } },
    ]
};

let siteId = window.SITE_ID;
let elements = [];
let currentDevice = 'pc';
let currentOrientation = 'portrait';
let selectedId = null;
let nextId = 1000;

const VIEW_SIZES = {
    pc: { portrait: { w: 1366, h: 768 }, landscape: { w: 1024, h: 768 } },
    phone: { portrait: { w: 390, h: 844 }, landscape: { w: 844, h: 390 } },
    tablet: { portrait: { w: 768, h: 1024 }, landscape: { w: 1024, h: 768 } },
    tv: { portrait: { w: 1920, h: 1080 }, landscape: { w: 1080, h: 1920 } }
};

function initBuilder() {
    const data = window.SITE_DATA || { elements: [] };
    elements = data.elements || [];
    elements.forEach(el => renderElement(el));
    setView('pc', 'portrait');
    populateDrawer();
    bindEvents();
}

function bindEvents() {
    // Device & Orientation toggles
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentDevice = this.dataset.device;
            setView(currentDevice, currentOrientation);
        });
    });
    document.querySelectorAll('.orient-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.orient-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentOrientation = this.dataset.orientation;
            setView(currentDevice, currentOrientation);
        });
    });

    document.getElementById('saveBtn').addEventListener('click', saveSite);
    document.getElementById('previewBtn').addEventListener('click', previewSite);
    document.getElementById('publishBtn').addEventListener('click', openPublishModal);
    
    const canvas = document.getElementById('canvas');
    canvas.addEventListener('dragover', e => e.preventDefault());
    canvas.addEventListener('drop', handleDrop);
    document.getElementById('cloudinaryInput').addEventListener('change', handleImageUpload);
    document.addEventListener('keydown', e => { if (e.key === 'Delete' && selectedId) deleteElement(selectedId); });

    // Mobile Drawer Toggle
    const toggleBtn = document.getElementById('toggleMobileDrawer');
    const closeBtn = document.getElementById('closeMobileDrawer');
    const drawer = document.getElementById('mobile-drawer');
    if(toggleBtn) {
        toggleBtn.addEventListener('click', () => drawer.classList.add('open'));
        closeBtn.addEventListener('click', () => drawer.classList.remove('open'));
        drawer.addEventListener('click', (e) => { if(e.target === drawer) drawer.classList.remove('open'); });
    }

    // Publish Modal events
    document.getElementById('closePublishModal').addEventListener('click', closePublishModal);
    document.getElementById('publishModal').addEventListener('click', function(e) {
        if(e.target === this) closePublishModal();
    });
    document.getElementById('slugInput').addEventListener('input', debounce(checkSlug, 300));
    document.getElementById('modalPublishBtn').addEventListener('click', performPublish);
}

function setView(device, orientation) {
    const size = VIEW_SIZES[device]?.[orientation] || VIEW_SIZES.pc.portrait;
    const c = document.getElementById('canvas');
    c.style.width = size.w + 'px'; c.style.height = size.h + 'px';
    renderAllElements();
}

function populateDrawer() {
    const container = document.getElementById('component-list');
    const mobileContainer = document.getElementById('mobile-component-list');
    if(!container) return;
    container.innerHTML = ''; mobileContainer.innerHTML = '';

    for (const [cat, items] of Object.entries(ELEMENT_LIBRARY)) {
        const details = document.createElement('details');
        const summary = document.createElement('summary');
        summary.textContent = cat;
        details.appendChild(summary);

        items.forEach((item, idx) => {
            const el = document.createElement('div');
            el.className = 'asset-item'; el.draggable = true; el.textContent = item.label;
            el.dataset.cat = cat; el.dataset.idx = idx;
            el.addEventListener('dragstart', e => {
                e.dataTransfer.setData('text/plain', JSON.stringify({ cat, idx }));
            });
            details.appendChild(el);
        });
        container.appendChild(details);
        mobileContainer.appendChild(details.cloneNode(true));
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
        id: 'el-' + (nextId++), type: item.type, html: item.html,
        defaultStyles: { ...item.defaultStyles }, overrides: {},
        position: { left: x, top: y, width: parseInt(item.defaultStyles.width) || 200, height: parseInt(item.defaultStyles.height) || 50 }
    };
    elements.push(el); renderElement(el);
}

function renderElement(el) {
    const canvas = document.getElementById('canvas');
    const w = document.createElement('div');
    w.className = 'element-wrapper'; w.id = el.id;
    const styles = getStylesForView(el);
    w.style.left = el.position.left + 'px'; w.style.top = el.position.top + 'px';
    w.style.width = el.position.width + 'px'; w.style.height = el.position.height + 'px';
    w.style.background = styles.background || ''; w.style.color = styles.color || '';
    w.style.fontSize = styles.fontSize || ''; w.style.borderRadius = styles.borderRadius || '';
    w.style.padding = styles.padding || ''; w.innerHTML = el.html;
    
    w.addEventListener('click', function(e) {
        e.stopPropagation();
        document.querySelectorAll('.element-wrapper').forEach(el => el.classList.remove('selected'));
        this.classList.add('selected'); selectedId = this.id; openProperties(el);
    });
    w.addEventListener('dblclick', function() { openProperties(el); });
    makeDraggable(w, el); canvas.appendChild(w);
}

function renderAllElements() {
    document.getElementById('canvas').innerHTML = '';
    elements.forEach(el => renderElement(el));
}

function getStylesForView(el) {
    const viewKey = currentDevice === 'pc' ? currentDevice : (currentOrientation === 'landscape' ? 'landscape' : currentDevice);
    const ov = el.overrides && el.overrides[viewKey] ? el.overrides[viewKey] : null;
    return ov || el.defaultStyles;
}

function makeDraggable(w, el) {
    let sx, sy, ox, oy;
    w.addEventListener('mousedown', function(e) {
        if (e.target.closest('.element-wrapper')) {
            sx = e.clientX; sy = e.clientY;
            ox = parseInt(w.style.left); oy = parseInt(w.style.top);
            w.style.zIndex = 1000;
            const onMove = (e) => { w.style.left = (ox + (e.clientX - sx)) + 'px'; w.style.top = (oy + (e.clientY - sy)) + 'px'; };
            const onUp = () => {
                document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp);
                w.style.zIndex = 1; el.position.left = parseInt(w.style.left); el.position.top = parseInt(w.style.top);
            };
            document.addEventListener('mousemove', onMove); document.addEventListener('mouseup', onUp);
        }
    });
}

function openProperties(el) {
    const panel = document.getElementById('properties-panel');
    panel.style.display = 'block'; panel.dataset.id = el.id;
    const s = getStylesForView(el);
    document.getElementById('propText').value = s.text || '';
    document.getElementById('propLink').value = s.link || '';
    document.getElementById('propBgColor').value = s.background || '#ffffff';
    document.getElementById('propTextColor').value = s.color || '#000000';
    document.getElementById('propFontSize').value = s.fontSize || '16px';
    document.getElementById('propPadding').value = s.padding || '4px';
    document.getElementById('propRadius').value = s.borderRadius || '8px';
    document.getElementById('propWidth').value = el.position.width + 'px';
    document.getElementById('propHeight').value = el.position.height + 'px';
}

document.getElementById('properties-panel').addEventListener('input', function(e) {
    const panel = document.getElementById('properties-panel');
    const el = elements.find(e => e.id === panel.dataset.id);
    if (!el) return;
    const view = document.getElementById('propView').value;
    const styles = {
        text: document.getElementById('propText').value, link: document.getElementById('propLink').value,
        background: document.getElementById('propBgColor').value, color: document.getElementById('propTextColor').value,
        fontSize: document.getElementById('propFontSize').value, padding: document.getElementById('propPadding').value,
        borderRadius: document.getElementById('propRadius').value
    };
    const w = parseInt(document.getElementById('propWidth').value) || 200;
    const h = parseInt(document.getElementById('propHeight').value) || 50;

    const viewKey = view === 'default' ? null : view;
    if (!viewKey) {
        Object.assign(el.defaultStyles, styles); el.position.width = w; el.position.height = h;
    } else {
        if (!el.overrides) el.overrides = {};
        el.overrides[viewKey] = { ...styles, position: { left: el.position.left, top: el.position.top, width: w, height: h } };
    }
    renderAllElements(); document.getElementById(el.id).classList.add('selected');
});

async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file); formData.append('upload_preset', window.UPLOAD_PRESET);
    try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/${window.CLOUD_NAME}/image/upload`, { method: 'POST', body: formData });
        const data = await res.json();
        if (data.secure_url) {
            const panel = document.getElementById('properties-panel');
            const el = elements.find(e => e.id === panel.dataset.id);
            if (el && el.type === 'image') {
                el.html = `<img src="${data.secure_url}" style="width:100%; height:100%; object-fit:cover;">`;
                renderAllElements(); document.getElementById(el.id).classList.add('selected');
            }
        }
    } catch (err) { alert('Upload failed'); }
}

async function saveSite() {
    document.querySelectorAll('.element-wrapper').forEach(w => {
        const el = elements.find(e => e.id === w.id);
        if (el) { el.position.left = parseInt(w.style.left); el.position.top = parseInt(w.style.top); }
    });
    const res = await fetch(`/site/${siteId}/save`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ elements })
    });
    if (res.ok) alert('Saved!'); else alert('Error saving');
}

// ---------- Publish Popover Logic ----------
function openPublishModal() {
    document.getElementById('publishModal').style.display = 'flex';
    document.getElementById('slugInput').value = '';
    document.getElementById('slugStatus').className = 'slug-status';
    document.getElementById('slugMessage').innerHTML = '';
    document.getElementById('modalPublishBtn').disabled = true;
    document.getElementById('slugInput').focus();
}

function closePublishModal() {
    document.getElementById('publishModal').style.display = 'none';
}

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

async function checkSlug() {
    const input = document.getElementById('slugInput');
    const status = document.getElementById('slugStatus');
    const msg = document.getElementById('slugMessage');
    const publishBtn = document.getElementById('modalPublishBtn');
    const slug = input.value.trim().toLowerCase();

    if (!slug) {
        status.className = 'slug-status';
        msg.innerHTML = '';
        publishBtn.disabled = true;
        return;
    }

    // Client-side basic format validation (to reduce unnecessary API calls)
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
        status.className = 'slug-status invalid';
        msg.innerHTML = 'Only lowercase letters, numbers, and hyphens allowed.';
        publishBtn.disabled = true;
        return;
    }

    // Check availability via API
    try {
        const res = await fetch(`/site/check-slug?slug=${encodeURIComponent(slug)}`);
        const data = await res.json();
        if (data.available) {
            status.className = 'slug-status valid';
            msg.innerHTML = '✓ Available!';
            publishBtn.disabled = false;
        } else {
            status.className = 'slug-status invalid';
            msg.innerHTML = data.message || 'Not available.';
            publishBtn.disabled = true;
        }
    } catch (err) {
        status.className = 'slug-status invalid';
        msg.innerHTML = 'Error checking availability.';
        publishBtn.disabled = true;
    }
}

async function performPublish() {
    const slug = document.getElementById('slugInput').value.trim().toLowerCase();
    if (!slug) return;

    // Disable button to prevent double click
    const publishBtn = document.getElementById('modalPublishBtn');
    publishBtn.disabled = true;
    publishBtn.textContent = 'Publishing...';

    try {
        const res = await fetch(`/site/${siteId}/publish`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ slug: slug })
        });
        const data = await res.json();
        if (res.ok && data.success) {
            alert(`🎉 Published successfully!\nLive URL: ${data.url}`);
            closePublishModal();
        } else {
            alert(`Error: ${data.error || 'Publish failed.'}`);
        }
    } catch (err) {
        alert('Network error. Please try again.');
    } finally {
        publishBtn.disabled = false;
        publishBtn.textContent = 'Publish';
    }
}

function previewSite() {
    window.open(`/s/`, '_blank');
}

function deleteElement(id) {
    elements = elements.filter(e => e.id !== id);
    renderAllElements();
}
