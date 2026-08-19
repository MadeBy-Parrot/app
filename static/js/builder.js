// Main builder logic
// Uses window.ELEMENT_LIBRARY populated by separate module files

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
    if (!window.ELEMENT_LIBRARY) return;
    for (const [cat, items] of Object.entries(window.ELEMENT_LIBRARY)) {
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
    const item = window.ELEMENT_LIBRARY[cat]?.[idx];
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

function renderElement(el) {
    const canvas = document.getElementById('canvas');
    const w = document.createElement('div');
    w.className = 'element-wrapper';
    w.id = el.id;
    const styles = getStylesForView(el);
    w.style.left = el.position.left + 'px'; w.style.top = el.position.top + 'px';
    w.style.width = el.position.width + 'px'; w.style.height = el.position.height + 'px';
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

function getStylesForView(el) {
    const ov = el.overrides && el.overrides[currentView] ? el.overrides[currentView] : null;
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

function openProperties(el) {
    const panel = document.getElementById('properties-panel');
    panel.style.display = 'block';
    panel.dataset.id = el.id;
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
        Object.assign(el.defaultStyles, styles);
        el.position.width = w; el.position.height = h;
    } else {
        if (!el.overrides) el.overrides = {};
        el.overrides[view] = { ...styles, position: { left: el.position.left, top: el.position.top, width: w, height: h } };
    }
    renderAllElements();
    document.getElementById(el.id).classList.add('selected');
});

// Cloudinary
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

function previewSite() {
    window.open(`/s/`, '_blank');
}

function deleteElement(id) {
    elements = elements.filter(e => e.id !== id);
    renderAllElements();
}
