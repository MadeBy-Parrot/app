// === expanded ELEMENT_LIBRARY with many items ===
const ELEMENT_LIBRARY = {
    'Layout': [
        { type: 'container', label: 'Container', html: '<div style="padding:20px; border:1px dashed #ccc; width:100%;">Container</div>', defaultStyles: { width: '100%', height: '100px' } },
        { type: 'section', label: 'Section', html: '<section style="padding:20px; background:#f9f9f9;">Section</section>', defaultStyles: { width: '100%', height: '150px' } },
        { type: 'columns', label: '2 Columns', html: '<div style="display:flex; gap:16px;"><div style="flex:1; border:1px dashed #ccc; padding:12px;">Col 1</div><div style="flex:1; border:1px dashed #ccc; padding:12px;">Col 2</div></div>', defaultStyles: { width: '100%', height: '100px' } },
        { type: 'columns', label: '3 Columns', html: '<div style="display:flex; gap:16px;"><div style="flex:1; border:1px dashed #ccc; padding:12px;">Col 1</div><div style="flex:1; border:1px dashed #ccc; padding:12px;">Col 2</div><div style="flex:1; border:1px dashed #ccc; padding:12px;">Col 3</div></div>', defaultStyles: { width: '100%', height: '100px' } },
        { type: 'grid', label: 'Grid 4', html: '<div style="display:grid; grid-template-columns:repeat(4,1fr); gap:12px;"><div style="border:1px dashed #ccc; padding:12px;">1</div><div style="border:1px dashed #ccc; padding:12px;">2</div><div style="border:1px dashed #ccc; padding:12px;">3</div><div style="border:1px dashed #ccc; padding:12px;">4</div></div>', defaultStyles: { width: '100%', height: '120px' } },
    ],
    'Buttons': [
        { type: 'button', label: 'Primary', html: '<button style="background:#232846; color:#fff; border:none; padding:12px 24px; border-radius:12px;">Get Started</button>', defaultStyles: { width: '160px', height: '48px' } },
        { type: 'button', label: 'Secondary', html: '<button style="background:transparent; color:#232846; border:2px solid #232846; padding:12px 24px; border-radius:12px;">Learn More</button>', defaultStyles: { width: '160px', height: '48px' } },
        { type: 'button', label: 'Green CTA', html: '<button style="background:#2ECC71; color:#fff; border:none; padding:12px 24px; border-radius:12px;">Sign Up</button>', defaultStyles: { width: '150px', height: '48px' } },
        { type: 'button', label: 'Ghost', html: '<button style="background:transparent; color:#232846; border:none; padding:12px 24px; font-weight:600;">Skip</button>', defaultStyles: { width: '100px', height: '48px' } },
        { type: 'button', label: 'Rounded Pill', html: '<button style="background:#232846; color:#fff; border:none; padding:12px 24px; border-radius:50px;">Subscribe</button>', defaultStyles: { width: '140px', height: '48px' } },
        { type: 'button', label: 'Outline Green', html: '<button style="background:transparent; color:#2ECC71; border:2px solid #2ECC71; padding:12px 24px; border-radius:12px;">Go Green</button>', defaultStyles: { width: '150px', height: '48px' } },
        { type: 'button', label: 'With Icon', html: '<button style="background:#232846; color:#fff; border:none; padding:12px 16px; border-radius:12px; display:flex; align-items:center; gap:8px;"><span class="material-icons" style="font-size:20px;">arrow_forward</span> Next</button>', defaultStyles: { width: '140px', height: '48px' } },
        { type: 'button', label: 'Large CTA', html: '<button style="background:#232846; color:#fff; border:none; padding:16px 32px; border-radius:16px; font-size:18px;">Download Now</button>', defaultStyles: { width: '200px', height: '60px' } },
        { type: 'button', label: 'Small', html: '<button style="background:#232846; color:#fff; border:none; padding:8px 16px; border-radius:8px; font-size:14px;">OK</button>', defaultStyles: { width: '80px', height: '36px' } },
        { type: 'button', label: 'Warning', html: '<button style="background:#F4C542; color:#232846; border:none; padding:12px 24px; border-radius:12px;">Warning</button>', defaultStyles: { width: '140px', height: '48px' } },
        { type: 'button', label: 'Danger', html: '<button style="background:#E74C3C; color:#fff; border:none; padding:12px 24px; border-radius:12px;">Delete</button>', defaultStyles: { width: '120px', height: '48px' } },
        { type: 'button', label: 'Info', html: '<button style="background:#3498DB; color:#fff; border:none; padding:12px 24px; border-radius:12px;">Info</button>', defaultStyles: { width: '140px', height: '48px' } },
        { type: 'button', label: 'White Shadow', html: '<button style="background:#fff; color:#232846; border:none; padding:12px 24px; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.1);">White</button>', defaultStyles: { width: '140px', height: '48px' } },
    ],
    'Cards': [
        { type: 'card', label: 'Profile Card', html: '<div style="border:1px solid #eee; border-radius:16px; padding:20px; background:#fff; text-align:center;"><div style="width:80px; height:80px; background:#3498DB; border-radius:50%; margin:0 auto;"></div><h3>Alex Morgan</h3><p style="color:#666;">Designer</p></div>', defaultStyles: { width: '260px', height: '220px' } },
        { type: 'card', label: 'Product Card', html: '<div style="border:1px solid #eee; border-radius:16px; padding:16px; background:#fff;"><div style="background:#f1f3f5; height:120px; border-radius:12px;"></div><h4>Headphones</h4><p>$89.99</p></div>', defaultStyles: { width: '240px', height: '260px' } },
        { type: 'card', label: 'Blog Post', html: '<div style="border:1px solid #eee; border-radius:16px; padding:16px; background:#fff;"><div style="background:#e9ecef; height:100px; border-radius:12px;"></div><h4>Blog Title</h4><p>Jan 15, 2026</p></div>', defaultStyles: { width: '240px', height: '240px' } },
        { type: 'card', label: 'Pricing Basic', html: '<div style="border:1px solid #eee; border-radius:16px; padding:24px; background:#fff; text-align:center;"><h4>Basic</h4><h2>$19/mo</h2><button style="background:#232846; color:#fff; border:none; padding:8px 20px; border-radius:8px;">Choose</button></div>', defaultStyles: { width: '240px', height: '240px' } },
        { type: 'card', label: 'Testimonial', html: '<div style="border:1px solid #eee; border-radius:16px; padding:20px; background:#F7F8FC;"><p>"Great product!"</p><div style="display:flex; align-items:center; gap:12px;"><div style="width:40px; height:40px; background:#2ECC71; border-radius:50%;"></div><div><h4 style="margin:0;">John</h4><p style="margin:0;">CEO</p></div></div></div>', defaultStyles: { width: '260px', height: '160px' } },
        { type: 'card', label: 'Feature Card', html: '<div style="border:1px solid #eee; border-radius:16px; padding:20px; background:#fff;"><span class="material-icons" style="font-size:32px; color:#3498DB;">rocket_launch</span><h4>Fast</h4><p>Lightning fast performance.</p></div>', defaultStyles: { width: '240px', height: '180px' } },
    ],
    'Text': [
        { type: 'text', label: 'Heading 1', html: '<h1 style="font-family:Outfit; margin:0; font-size:36px;">Welcome</h1>', defaultStyles: { width: 'auto', height: 'auto' } },
        { type: 'text', label: 'Heading 2', html: '<h2 style="font-family:Outfit; margin:0; font-size:28px;">Heading 2</h2>', defaultStyles: { width: 'auto', height: 'auto' } },
        { type: 'text', label: 'Heading 3', html: '<h3 style="font-family:Outfit; margin:0; font-size:22px;">Heading 3</h3>', defaultStyles: { width: 'auto', height: 'auto' } },
        { type: 'text', label: 'Paragraph', html: '<p style="font-family:Inter; margin:0; font-size:16px; color:#3E466E;">This is a paragraph of text. You can edit it.</p>', defaultStyles: { width: '300px', height: 'auto' } },
        { type: 'text', label: 'Blockquote', html: '<blockquote style="border-left:4px solid #232846; padding:8px 16px; margin:0; font-style:italic;">Design is not just what it looks like.</blockquote>', defaultStyles: { width: '300px', height: 'auto' } },
        { type: 'text', label: 'List', html: '<ul style="margin:0; padding-left:20px;"><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>', defaultStyles: { width: '200px', height: 'auto' } },
    ],
    'Inputs': [
        { type: 'input', label: 'Text Input', html: '<input type="text" placeholder="Enter name" style="width:100%; padding:12px; border:1px solid #ddd; border-radius:8px;">', defaultStyles: { width: '100%', height: '48px' } },
        { type: 'input', label: 'Email Input', html: '<input type="email" placeholder="Email" style="width:100%; padding:12px; border:1px solid #ddd; border-radius:8px;">', defaultStyles: { width: '100%', height: '48px' } },
        { type: 'input', label: 'Password Input', html: '<input type="password" placeholder="Password" style="width:100%; padding:12px; border:1px solid #ddd; border-radius:8px;">', defaultStyles: { width: '100%', height: '48px' } },
        { type: 'input', label: 'Textarea', html: '<textarea placeholder="Message" style="width:100%; height:120px; padding:12px; border:1px solid #ddd; border-radius:8px; resize:vertical;"></textarea>', defaultStyles: { width: '100%', height: '120px' } },
        { type: 'input', label: 'Select', html: '<select style="width:100%; padding:12px; border:1px solid #ddd; border-radius:8px; background:#fff;"><option>Option 1</option><option>Option 2</option></select>', defaultStyles: { width: '100%', height: '48px' } },
        { type: 'input', label: 'Checkbox Group', html: '<div><label><input type="checkbox"> Option A</label><br><label><input type="checkbox"> Option B</label></div>', defaultStyles: { width: '200px', height: '60px' } },
    ],
    'Search Bars': [
        { type: 'search', label: 'Rounded', html: '<div style="display:flex; border:1px solid #ddd; border-radius:24px; overflow:hidden; width:100%;"><input type="text" placeholder="Search..." style="flex:1; padding:10px 16px; border:none; outline:none;"><button style="background:#232846; color:#fff; border:none; padding:0 20px;"><span class="material-icons" style="font-size:20px;">search</span></button></div>', defaultStyles: { width: '100%', height: '48px' } },
        { type: 'search', label: 'Pill', html: '<div style="display:flex; align-items:center; border:1px solid #ddd; border-radius:50px; padding:4px 8px 4px 16px; background:#fff;"><span class="material-icons" style="color:#666;">search</span><input type="text" placeholder="Search..." style="flex:1; padding:8px; border:none; outline:none; background:transparent;"></div>', defaultStyles: { width: '100%', height: '48px' } },
    ],
    'Images': [
        { type: 'image', label: 'Placeholder', html: '<div style="width:100%; height:100%; background:#e9ecef; display:flex; align-items:center; justify-content:center;"><span class="material-icons" style="font-size:48px;">image</span></div>', defaultStyles: { width: '200px', height: '150px' } },
        { type: 'image', label: 'Square', html: '<div style="width:100%; height:100%; background:#e9ecef; display:flex; align-items:center; justify-content:center;"><span class="material-icons" style="font-size:48px;">crop_square</span></div>', defaultStyles: { width: '150px', height: '150px' } },
        { type: 'image', label: 'Landscape', html: '<div style="width:100%; height:100%; background:#e9ecef; display:flex; align-items:center; justify-content:center;"><span class="material-icons" style="font-size:48px;">landscape</span></div>', defaultStyles: { width: '300px', height: '150px' } },
        { type: 'image', label: 'Circle', html: '<div style="width:100%; height:100%; background:#e9ecef; display:flex; align-items:center; justify-content:center; border-radius:50%;"><span class="material-icons" style="font-size:48px;">circle</span></div>', defaultStyles: { width: '150px', height: '150px' } },
    ],
    'Shapes': [
        { type: 'shape', label: 'Rectangle', html: '<div style="width:100%; height:100%; background:#232846; border-radius:4px;"></div>', defaultStyles: { width: '120px', height: '80px' } },
        { type: 'shape', label: 'Circle', html: '<div style="width:100%; height:100%; background:#2ECC71; border-radius:50%;"></div>', defaultStyles: { width: '80px', height: '80px' } },
        { type: 'shape', label: 'Rounded Square', html: '<div style="width:100%; height:100%; background:#3498DB; border-radius:16px;"></div>', defaultStyles: { width: '100px', height: '100px' } },
        { type: 'shape', label: 'Line', html: '<hr style="width:100%; border:0; border-top:2px solid #ddd;">', defaultStyles: { width: '200px', height: '2px' } },
        { type: 'shape', label: 'Triangle', html: '<div style="width:0; height:0; border-left:50px solid transparent; border-right:50px solid transparent; border-bottom:80px solid #232846;"></div>', defaultStyles: { width: '100px', height: '80px' } },
    ],
    'Icons': [
        { type: 'icon', label: 'Home', html: '<span class="material-icons" style="font-size:48px;">home</span>', defaultStyles: { width: '60px', height: '60px' } },
        { type: 'icon', label: 'Settings', html: '<span class="material-icons" style="font-size:48px;">settings</span>', defaultStyles: { width: '60px', height: '60px' } },
        { type: 'icon', label: 'User', html: '<span class="material-icons" style="font-size:48px;">person</span>', defaultStyles: { width: '60px', height: '60px' } },
        { type: 'icon', label: 'Cart', html: '<span class="material-icons" style="font-size:48px;">shopping_cart</span>', defaultStyles: { width: '60px', height: '60px' } },
        { type: 'icon', label: 'Heart', html: '<span class="material-icons" style="font-size:48px;">favorite</span>', defaultStyles: { width: '60px', height: '60px' } },
        { type: 'icon', label: 'Search', html: '<span class="material-icons" style="font-size:48px;">search</span>', defaultStyles: { width: '60px', height: '60px' } },
        { type: 'icon', label: 'Camera', html: '<span class="material-icons" style="font-size:48px;">camera_alt</span>', defaultStyles: { width: '60px', height: '60px' } },
        { type: 'icon', label: 'Mail', html: '<span class="material-icons" style="font-size:48px;">mail</span>', defaultStyles: { width: '60px', height: '60px' } },
        { type: 'icon', label: 'Phone', html: '<span class="material-icons" style="font-size:48px;">phone</span>', defaultStyles: { width: '60px', height: '60px' } },
        { type: 'icon', label: 'Location', html: '<span class="material-icons" style="font-size:48px;">location_on</span>', defaultStyles: { width: '60px', height: '60px' } },
    ],
    'Colors': [
        { type: 'color', label: 'Primary', html: '<div style="width:100%; height:100%; background:#232846; border-radius:8px;"></div>', defaultStyles: { width: '60px', height: '60px' } },
        { type: 'color', label: 'Green', html: '<div style="width:100%; height:100%; background:#2ECC71; border-radius:8px;"></div>', defaultStyles: { width: '60px', height: '60px' } },
        { type: 'color', label: 'Blue', html: '<div style="width:100%; height:100%; background:#3498DB; border-radius:8px;"></div>', defaultStyles: { width: '60px', height: '60px' } },
        { type: 'color', label: 'Red', html: '<div style="width:100%; height:100%; background:#E74C3C; border-radius:8px;"></div>', defaultStyles: { width: '60px', height: '60px' } },
        { type: 'color', label: 'Yellow', html: '<div style="width:100%; height:100%; background:#F4C542; border-radius:8px;"></div>', defaultStyles: { width: '60px', height: '60px' } },
        { type: 'color', label: 'Dark BG', html: '<div style="width:100%; height:100%; background:#161A30; border-radius:8px;"></div>', defaultStyles: { width: '60px', height: '60px' } },
        { type: 'color', label: 'Light BG', html: '<div style="width:100%; height:100%; background:#F7F8FC; border-radius:8px; border:1px solid #eee;"></div>', defaultStyles: { width: '60px', height: '60px' } },
        { type: 'color', label: 'White', html: '<div style="width:100%; height:100%; background:#fff; border:1px solid #ddd; border-radius:8px;"></div>', defaultStyles: { width: '60px', height: '60px' } },
        { type: 'color', label: 'Gradient Green/Blue', html: '<div style="width:100%; height:100%; background:linear-gradient(135deg, #2ECC71, #3498DB); border-radius:8px;"></div>', defaultStyles: { width: '60px', height: '60px' } },
        { type: 'color', label: 'Gradient Red/Yellow', html: '<div style="width:100%; height:100%; background:linear-gradient(135deg, #E74C3C, #F4C542); border-radius:8px;"></div>', defaultStyles: { width: '60px', height: '60px' } },
    ],
    'Shadows': [
        { type: 'shadow', label: 'Soft', html: '<div style="width:80px; height:80px; background:#fff; border-radius:16px; box-shadow:0 8px 24px rgba(35,40,70,0.08);"></div>', defaultStyles: { width: '80px', height: '80px' } },
        { type: 'shadow', label: 'Medium', html: '<div style="width:80px; height:80px; background:#fff; border-radius:16px; box-shadow:0 12px 32px rgba(35,40,70,0.15);"></div>', defaultStyles: { width: '80px', height: '80px' } },
        { type: 'shadow', label: 'Strong', html: '<div style="width:80px; height:80px; background:#fff; border-radius:16px; box-shadow:0 20px 40px rgba(0,0,0,0.2);"></div>', defaultStyles: { width: '80px', height: '80px' } },
        { type: 'shadow', label: 'Glow', html: '<div style="width:80px; height:80px; background:#2ECC71; border-radius:16px; box-shadow:0 0 20px rgba(46,204,113,0.4);"></div>', defaultStyles: { width: '80px', height: '80px' } },
        { type: 'shadow', label: 'Inset', html: '<div style="width:80px; height:80px; background:#f8f9fa; border-radius:16px; box-shadow:inset 0 2px 8px rgba(0,0,0,0.05);"></div>', defaultStyles: { width: '80px', height: '80px' } },
    ],
    'Fonts': [
        { type: 'font', label: 'Outfit Heading', html: '<div style="font-family:Outfit; font-size:24px; font-weight:700;">Outfit</div>', defaultStyles: { width: 'auto', height: 'auto' } },
        { type: 'font', label: 'Inter Body', html: '<div style="font-family:Inter; font-size:16px;">Inter</div>', defaultStyles: { width: 'auto', height: 'auto' } },
        { type: 'font', label: 'JetBrains Mono', html: '<div style="font-family:JetBrains Mono; font-size:14px;">JetBrains</div>', defaultStyles: { width: 'auto', height: 'auto' } },
        { type: 'font', label: 'Serif', html: '<div style="font-family:Georgia, serif; font-size:20px;">Serif</div>', defaultStyles: { width: 'auto', height: 'auto' } },
    ]
};

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
    // Load canvas properties if any
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
    canvas.addEventListener('dblclick', function() {
        openCanvasProperties();
    });
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

    // Category Modal events
    document.getElementById('closeCategoryModal').addEventListener('click', closeCategoryModal);
    document.getElementById('categoryModal').addEventListener('click', function(e) {
        if(e.target === this) closeCategoryModal();
    });

    // Canvas Properties events
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
    if(!container) return;
    container.innerHTML = ''; mobileContainer.innerHTML = '';

    for (const cat of Object.keys(ELEMENT_LIBRARY)) {
        // Create button for each category
        const btn = document.createElement('button');
        btn.className = 'category-btn';
        btn.textContent = cat;
        btn.dataset.category = cat;
        btn.addEventListener('click', function() {
            openCategoryModal(cat);
        });
        container.appendChild(btn);
        mobileContainer.appendChild(btn.cloneNode(true));
    }
}

// --- Category Modal ---
function openCategoryModal(category) {
    const modal = document.getElementById('categoryModal');
    document.getElementById('modalCategoryTitle').textContent = category;
    const itemsContainer = document.getElementById('modalCategoryItems');
    itemsContainer.innerHTML = '';

    const items = ELEMENT_LIBRARY[category] || [];
    items.forEach((item, idx) => {
        const div = document.createElement('div');
        div.className = 'modal-item';
        div.innerHTML = `
            <span class="item-label">${item.label}</span>
            <span class="item-preview">${item.html}</span>
        `;
        div.addEventListener('click', function() {
            // Add to canvas
            addItemToCanvas(category, idx);
            closeCategoryModal();
        });
        itemsContainer.appendChild(div);
    });

    modal.style.display = 'flex';
}

function closeCategoryModal() {
    document.getElementById('categoryModal').style.display = 'none';
}

function addItemToCanvas(category, idx) {
    const item = ELEMENT_LIBRARY[category][idx];
    const canvas = document.getElementById('canvas');
    // Position at center
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

// ... rest of the functions remain mostly same with minor adjustments ...

// NOTE: handleDrop, renderElement, renderAllElements, getStylesForView, makeDraggable, openProperties, etc. stay as before (just ensure they use canvasProperties if needed)
// Since the original builder.js already had those, we skip duplicating them here. 
// However, we need to ensure saveSite includes canvas properties.

async function saveSite() {
    // Update element positions
    document.querySelectorAll('.element-wrapper').forEach(w => {
        const el = elements.find(e => e.id === w.id);
        if (el) { el.position.left = parseInt(w.style.left); el.position.top = parseInt(w.style.top); }
    });
    const payload = { 
        elements: elements,
        canvas: canvasProperties
    };
    const res = await fetch(`/site/${siteId}/save`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    if (res.ok) alert('Saved!'); else alert('Error saving');
}

// ... also need to handle canvas properties in load from SITE_DATA (already done in initBuilder)
// For brevity, I'm not repeating all the unchanged functions. The user can keep their existing ones.
// But we must ensure that the canvas properties are saved and loaded.

// The rest of the functions (handleDrop, renderElement, renderAllElements, getStylesForView, makeDraggable, openProperties, handleImageUpload, publishModal, etc.) remain exactly as before.
