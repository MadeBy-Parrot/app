document.addEventListener('DOMContentLoaded', function() {
    loadElements();
    loadColors();
    loadFonts();
});

async function loadElements() {
    const res = await fetch('/api/elements');
    const data = await res.json();
    const container = document.getElementById('elementList');
    container.innerHTML = data.map(el => `
        <div class="list-item">
            <span><strong>${el.label}</strong> (${el.category})</span>
            <button onclick="deleteElement(${el.id})" class="btn-danger-small">Delete</button>
        </div>
    `).join('');
}

document.getElementById('elementForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
        category: document.getElementById('elemCategory').value,
        label: document.getElementById('elemLabel').value,
        type: document.getElementById('elemType').value,
        html: document.getElementById('elemHtml').value,
        default_styles: JSON.parse(document.getElementById('elemStyles').value || '{}')
    };
    await fetch('/api/elements', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) });
    document.getElementById('elementForm').reset();
    loadElements();
});

async function deleteElement(id) {
    if(confirm('Delete this element?')) {
        await fetch(`/api/elements/${id}`, { method: 'DELETE' });
        loadElements();
    }
}

async function loadColors() {
    const res = await fetch('/api/colors');
    const data = await res.json();
    document.getElementById('colorList').innerHTML = data.map(c => `
        <div class="color-swatch" style="background:${c.hex}; color:#fff;">${c.name}</div>
    `).join('');
}

document.getElementById('colorForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    await fetch('/api/colors', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({
        name: document.getElementById('colorName').value,
        hex: document.getElementById('colorHex').value
    })});
    document.getElementById('colorForm').reset();
    loadColors();
});

async function loadFonts() {
    const res = await fetch('/api/fonts');
    const data = await res.json();
    document.getElementById('fontList').innerHTML = data.map(f => `
        <div class="font-item"><span style="font-family:'${f.name}', sans-serif;">${f.name}</span></div>
    `).join('');
}

document.getElementById('fontForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    await fetch('/api/fonts', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({
        name: document.getElementById('fontName').value
    })});
    document.getElementById('fontForm').reset();
    loadFonts();
});
