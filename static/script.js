const canvas = document.getElementById('canvas');
const elements = document.querySelectorAll('.element');

// 1. Drag Start Event
elements.forEach(el => {
    el.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.dataset.type);
    });
});

// 2. Drag Over (Allow Drop)
canvas.addEventListener('dragover', (e) => {
    e.preventDefault(); // drop করতে দেবে
});

// 3. Drop Event
canvas.addEventListener('drop', (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('text/plain');
    addBlockToCanvas(type);
});

// 4. Block যোগ করার ফাংশন
function addBlockToCanvas(type) {
    const block = document.createElement('div');
    block.className = 'canvas-block';
    block.draggable = false; // ভেতরের ব্লককে আর ড্র্যাগ করবেন না

    if (type === 'text') {
        block.innerHTML = 'Edit this text';
        block.contentEditable = true; // টেক্সট এডিট করা যাবে
    } else if (type === 'button') {
        const btn = document.createElement('button');
        btn.innerText = 'Click Me';
        btn.style.padding = '10px 20px';
        block.appendChild(btn);
    } else if (type === 'image') {
        const img = document.createElement('div');
        img.innerText = '[Image Placeholder]';
        img.style.width = '100px';
        img.style.height = '100px';
        img.style.background = '#eee';
        img.style.display = 'flex';
        img.style.alignItems = 'center';
        img.style.justifyContent = 'center';
        block.appendChild(img);
    }

    // ডাবল ক্লিক করে ব্লক ডিলিট করার ফিচার
    block.addEventListener('dblclick', () => {
        block.remove();
    });

    canvas.appendChild(block);
}

// 5. Save & Load (Python API কল)
document.getElementById('saveBtn').addEventListener('click', async () => {
    const blocks = [];
    document.querySelectorAll('.canvas-block').forEach(block => {
        blocks.push(block.outerHTML);
    });
    await fetch('/save_design', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blocks })
    });
    alert('Design Saved!');
});

document.getElementById('loadBtn').addEventListener('click', async () => {
    const res = await fetch('/load_design');
    const data = await res.json();
    canvas.innerHTML = '';
    if (data.blocks) {
        data.blocks.forEach(html => {
            canvas.insertAdjacentHTML('beforeend', html);
        });
    }
});
