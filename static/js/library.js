// library.js - Manages the Element Library and Templates

// --- 1. Core Elements (Existing) ---
const CORE_ELEMENTS = {
    'Layout': [
        { type: 'container', label: 'Container', html: '<div style="padding:20px; border:1px dashed #ccc;">Container</div>', defaultStyles: { width: '100%', height: '100px' } },
        { type: 'section', label: 'Section', html: '<section style="padding:20px; background:#f9f9f9;">Section</section>', defaultStyles: { width: '100%', height: '150px' } },
        { type: 'columns', label: '2 Columns', html: '<div style="display:flex; gap:16px;"><div style="flex:1; border:1px dashed #ccc;">Col 1</div><div style="flex:1; border:1px dashed #ccc;">Col 2</div></div>', defaultStyles: { width: '100%', height: '100px' } },
        { type: 'grid', label: 'Grid 4', html: '<div style="display:grid; grid-template-columns:repeat(4,1fr); gap:12px;"><div style="border:1px dashed #ccc;">1</div><div>2</div><div>3</div><div>4</div></div>', defaultStyles: { width: '100%', height: '120px' } },
    ],
    'Buttons': [
        { type: 'button', label: 'Primary', html: '<button style="background:#232846; color:#fff; border:none; padding:12px 24px; border-radius:12px;">Get Started</button>', defaultStyles: { width: '160px', height: '48px' } },
        { type: 'button', label: 'Secondary', html: '<button style="background:transparent; color:#232846; border:2px solid #232846; padding:12px 24px; border-radius:12px;">Learn More</button>', defaultStyles: { width: '160px', height: '48px' } },
        { type: 'button', label: 'With Icon', html: '<button style="background:#232846; color:#fff; border:none; padding:12px 16px; border-radius:12px; display:flex; align-items:center; gap:8px;"><span class="material-icons" style="font-size:20px;">arrow_forward</span> Next</button>', defaultStyles: { width: '140px', height: '48px' } },
    ],
    'Cards': [
        { type: 'card', label: 'Profile', html: '<div style="border:1px solid #eee; border-radius:16px; padding:20px; background:#fff; text-align:center;"><div style="width:80px; height:80px; background:#3498DB; border-radius:50%; margin:0 auto;"></div><h3>Alex Morgan</h3><p style="color:#666;">Designer</p></div>', defaultStyles: { width: '260px', height: '220px' } },
        { type: 'card', label: 'Pricing', html: '<div style="border:1px solid #eee; border-radius:16px; padding:24px; background:#fff; text-align:center;"><h4>Basic</h4><h2>$19/mo</h2><button style="background:#232846; color:#fff; border:none; padding:8px 20px; border-radius:8px;">Choose</button></div>', defaultStyles: { width: '240px', height: '240px' } },
    ],
    'Text': [
        { type: 'text', label: 'Heading 1', html: '<h1 style="font-family:Outfit; margin:0; font-size:36px;">Welcome</h1>', defaultStyles: { width: 'auto', height: 'auto' } },
        { type: 'text', label: 'Paragraph', html: '<p style="font-family:Inter; margin:0; font-size:16px; color:#3E466E;">This is a paragraph.</p>', defaultStyles: { width: '300px', height: 'auto' } },
    ],
    'Inputs': [
        { type: 'input', label: 'Text', html: '<input type="text" placeholder="Enter name" style="width:100%; padding:12px; border:1px solid #ddd; border-radius:8px;">', defaultStyles: { width: '100%', height: '48px' } },
    ],
    'Images': [
        { type: 'image', label: 'Placeholder', html: '<div style="width:100%; height:100%; background:#e9ecef; display:flex; align-items:center; justify-content:center;"><span class="material-icons" style="font-size:48px;">image</span></div>', defaultStyles: { width: '200px', height: '150px' } },
    ],
    // ... বাকি ক্যাটাগরি (Shapes, Icons, Colors, Shadows, Fonts) আগের মতোই থাকবে
};

// --- 2. Professional Templates (New Category) ---
const TEMPLATES = [
    { type: 'template', label: 'Modern Landing', html: '<div style="background:#f7f8fc; padding:40px; border:1px solid #eee;"><h1 style="font-family:Outfit; margin:0; color:#232846;">Launch Your App</h1><p style="color:#3E466E;">Build professional sites in minutes.</p><button style="background:#2ECC71; color:#fff; border:none; padding:12px 24px; border-radius:12px;">Start Free Trial</button></div>', defaultStyles: { width: '100%', height: '200px' } },
    { type: 'template', label: 'Portfolio Header', html: '<div style="background:#161A30; padding:30px; text-align:center;"><h2 style="font-family:Outfit; color:#fff; margin:0;">Creative Designer</h2><p style="color:#fff; opacity:0.8;">Crafting digital experiences</p></div>', defaultStyles: { width: '100%', height: '150px' } },
];

// --- 3. Design System (Colors & Spacers) ---
const DESIGN_SYSTEM = [
    { type: 'spacer', label: 'Small Gap', html: '<div style="height:12px;"></div>', defaultStyles: { width: '100%', height: '12px' } },
    { type: 'spacer', label: 'Large Gap', html: '<div style="height:48px;"></div>', defaultStyles: { width: '100%', height: '48px' } },
    { type: 'divider', label: 'Divider Line', html: '<hr style="border:0; border-top:1px solid #e0e0e0;">', defaultStyles: { width: '100%', height: '1px' } },
];

// Export all categories together
window.ELEMENT_LIBRARY = {
    ...CORE_ELEMENTS,
    'Templates': TEMPLATES,
    'Design System': DESIGN_SYSTEM
};
