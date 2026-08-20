// Today's Unified Builder Module (Will be split into smaller files tomorrow)

// --- Load Library from library.js ---
if (!window.ELEMENT_LIBRARY) {
    console.warn('ELEMENT_LIBRARY not loaded. Ensure library.js is loaded first.');
}

let siteId = window.SITE_ID;
let elements = [];
let currentDevice = 'pc';
let currentOrientation = 'portrait';
let selectedId = null;
let nextId = 1000;
let canvasProperties = { backgroundColor: '#ffffff', width: 1366, height: 768 };

const VIEW_SIZES = {
    pc: { portrait: { w: 1366, h: 768 }, landscape: { w: 1024, h: 768 } },
    phone: { portrait: { w: 390, h: 844 }, landscape: { w: 844, h: 390 } },
    tablet: { portrait: { w: 768, h: 1024 }, landscape: { w: 1024, h: 768 } },
    tv: { portrait: { w: 1920, h: 1080 }, landscape: { w: 1080, h: 1920 } }
};

function initBuilder() {
    const data = window.SITE_DATA || { elements: [], canvas: {} };
    elements = data.elements || [];
    if (data.canvas) {
        canvasProperties = { ...canvasProperties, ...data.canvas };
    }
    setCanvasProperties();
    elements.forEach(el => renderElement(el));
    setView('pc', 'portrait');
    populateCategories();
    bindEvents();
}

function setCanvasProperties() {
    const c = document.getElementById('canvas');
    c.style.background = canvasProperties.backgroundColor;
    c.style.width = canvasProperties.width + 'px';
    c.style.height = canvasProperties.height + 'px';
}

function bindEvents() {
    // View toggles
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

    document.getElementById('saveBtn').addEventListener('click', () => saveSite());
    document.getElementById('previewBtn').addEventListener('click', previewSite);
    document.getElementById('publishBtn').addEventListener('click', openPublishModal);
    
    const canvas = document.getElementById('canvas');
    canvas.addEventListener('dragover', e => e.preventDefault());
    canvas.addEventListener('drop', handleDrop);
    canvas.addEventListener('dblclick', () => openCanvasProperties());
    document.getElementById('cloudinaryInput').addEventListener('change', handleImageUpload);
    document.addEventListener('keydown', e => { if (e.key === 'Delete' && selectedId) deleteElement(selectedId); });

    // Mobile drawer & Modals
    const toggleBtn = document.getElementById('toggleMobileDrawer');
    const closeBtn = document.getElementById('closeMobileDrawer');
    const drawer = document.getElementById('mobile-drawer');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => drawer.classList.add('open'));
        closeBtn.addEventListener('click', () => drawer.classList.remove('open'));
        drawer.addEventListener('click', (e) => { if (e.target === drawer) drawer.classList.remove('open'); });
    }

    document.getElementById('closePublishModal').addEventListener('click', closePublishModal);
    document.getElementById('publishModal').addEventListener('click', (e) => { if (e.target === this) closePublishModal(); });
    document.getElementById('slugInput').addEventListener('input', debounce(checkSlug, 300));
    document.getElementById('modalPublishBtn').addEventListener('click', performPublish);

    document.getElementById('closeCategoryModal').addEventListener('click', closeCategoryModal);
    document.getElementById('categoryModal').addEventListener('click', (e) => { if (e.target === this) closeCategoryModal(); });

    document.getElementById('applyCanvasProps').addEventListener('click', applyCanvasProperties);
}

function setView(device, orientation) {
    const size = VIEW_SIZES[device]?.[orientation] || VIEW_SIZES.pc.portrait;
    const c = document.getElementById('canvas');
    c.style.width = size.w + 'px'; c.style.height = size.h + 'px';
    renderAllElements();
}

function populateCategories() {
    const container = document.getElementById('category-list');
    const mobileContainer = document.getElementById('mobile-category-list');
    if (!container) return;
    container.innerHTML = ''; mobileContainer.innerHTML = '';

    for (const cat of Object.keys(window.ELEMENT_LIBRARY)) {
        const btn = document.createElement('button');
        btn.className = 'category-btn';
        btn.textContent = cat;
        btn.dataset.category = cat;
        btn.addEventListener('click', () => openCategoryModal(cat));
        container.appendChild(btn);
        mobileContainer.appendChild(btn.cloneNode(true));
    }
}

// --- Category Modal ---
function openCategoryModal(category) {
    document.getElementById('modalCategoryTitle').textContent = category;
    const itemsContainer = document.getElementById('modalCategoryItems');
    itemsContainer.innerHTML = '';
    const items = window.ELEMENT_LIBRARY[category] || [];
    items.forEach((item) => {
        const div = document.createElement('div');
        div.className = 'modal-item';
        div.innerHTML = `<span class="item-label">${item.label}</span><span class="item-preview">${item.html}</span>`;
        div.addEventListener('click', () => {
            addItemToCanvas(item);
            closeCategoryModal();
        });
        itemsContainer.appendChild(div);
    });
    document.getElementById('categoryModal').style.display = 'flex';
}
function closeCategoryModal() { document.getElementById('categoryModal').style.display = 'none'; }

function addItemToCanvas(item) {
    const canvas = document.getElementById('canvas');
    const rect = canvas.getBoundingClientRect();
    const x = (rect.width - parseInt(item.defaultStyles.width || 200)) / 2;
    const y = (rect.height - parseInt(item.defaultStyles.height || 50)) / 2;
    const el = {
        id: 'el-' + (nextId++), type: item.type, html: item.html,
        defaultStyles: { ...item.defaultStyles }, overrides: {},
        position: { left: x, top: y, width: parseInt(item.defaultStyles.width) || 200, height: parseInt(item.defaultStyles.height) || 50 }
    };
    elements.push(el); renderElement(el);
}

// --- Canvas Properties ---
function openCanvasProperties() {
    const panel = document.getElementById('canvas-properties-panel');
    panel.style.display = 'block';
    document.getElementById('canvasBgColor').value = canvasProperties.backgroundColor;
    document.getElementById('canvasWidth').value = canvasProperties.width;
    document.getElementById('canvasHeight').value = canvasProperties.height;
}
function applyCanvasProperties() {
    canvasProperties.backgroundColor = document.getElementById('canvasBgColor').value;
    canvasProperties.width = parseInt(document.getElementById('canvasWidth').value) || 1366;
    canvasProperties.height = parseInt(document.getElementById('canvasHeight').value) || 768;
    setCanvasProperties();
    document.getElementById('canvas-properties-panel').style.display = 'none';
}

// --- Drop & Render ---
function handleDrop(e) {
    e.preventDefault();
    const raw = e.dataTransfer.getData('text/plain');
    if (!raw) return;
    try {
        const { cat, idx } = JSON.parse(raw);
        const item = window.ELEMENT_LIBRARY[cat]?.[idx];
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
    } catch (e) { console.warn("Invalid drop data"); }
}

function renderElement(el) {
    const canvas = document.getElementById('canvas');
    const w = document.createElement('div');
    w.className = 'element-wrapper'; w.id = el.id;
    const styles = getStylesForView(el);
    w.style.left = el.position.left + 'px';
    w.style.top = el.position.top + 'px';
    w.style.width = el.position.width + 'px';
    w.style.height = el.position.height + 'px';
    w.style.background = styles.background || '';
    w.style.color = styles.color || '';
    w.style.fontSize = styles.fontSize || '';
    w.style.borderRadius = styles.borderRadius || '';
    w.style.padding = styles.padding || '';
    w.innerHTML = el.html;
    w.addEventListener('click', function(e) {
        e.stopPropagation();
        document.querySelectorAll('.element-wrapper').forEach(el => el.classList.remove('selected'));
        this.classList.add('selected');
        selectedId = this.id;
        openProperties(el);
    });
    w.addEventListener('dblclick', () => openProperties(el));
    makeDraggable(w, el);
    canvas.appendChild(w);
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
            const onMove = (e) => {
                w.style.left = (ox + (e.clientX - sx)) + 'px';
                w.style.top = (oy + (e.clientY - sy)) + 'px';
            };
            const onUp = () => {
                document.removeEventListener('mousemove', onMove);
                document.removeEventListener('mouseup', onUp);
                w.style.zIndex = 1;
                el.position.left = parseInt(w.style.left);
                el.position.top = parseInt(w.style.top);
            };
            document.addEventListener('mousemove', onMove);
            document.addEventListener('mouseup', onUp);
        }
    });
}

// --- Properties Panel ---
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
        Object.assign(el.defaultStyles, styles);
        el.position.width = w; el.position.height = h;
    } else {
        if (!el.overrides) el.overrides = {};
        el.overrides[viewKey] = { ...styles, position: { left: el.position.left, top: el.position.top, width: w, height: h } };
    }
    renderAllElements(); document.getElementById(el.id).classList.add('selected');
});

// --- Cloudinary ---
async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', window.UPLOAD_PRESET);
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

// --- Save Function (using module-like pattern) ---
async function saveSite() {
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
    const res = await fetch(`/site/${siteId}/save`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    if (res.ok) alert('Saved!'); else alert('Error saving');
}

// --- Publish popover ---
function openPublishModal() {
    document.getElementById('publishModal').style.display = 'flex';
    document.getElementById('slugInput').value = '';
    document.getElementById('slugStatus').className = 'slug-status';
    document.getElementById('slugMessage').innerHTML = '';
    document.getElementById('modalPublishBtn').disabled = true;
    document.getElementById('slugInput').focus();
}
function closePublishModal() { document.getElementById('publishModal').style.display = 'none'; }
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
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
        status.className = 'slug-status invalid';
        msg.innerHTML = 'Only lowercase letters, numbers, and hyphens allowed.';
        publishBtn.disabled = true;
        return;
    }
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
    const publishBtn = document.getElementById('modalPublishBtn');
    publishBtn.disabled = true;
    publishBtn.textContent = 'Publishing...';
    try {
        const res = await fetch(`/site/${siteId}/publish`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ slug })
        });
        const data = await res.json();
        if (res.ok && data.success) {
            alert(`Published!\nLive URL: ${data.url}`);
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
