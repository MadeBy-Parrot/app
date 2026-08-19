// builder_navbars.js
// Adds Navbars category to global ELEMENT_LIBRARY

window.ELEMENT_LIBRARY = window.ELEMENT_LIBRARY || {};

window.ELEMENT_LIBRARY['Navbars'] = [
    {
        type: 'navbar',
        label: 'Minimal Light',
        html: '<nav style="display:flex; justify-content:space-between; align-items:center; padding:12px 20px; background:#fff; border-bottom:1px solid #eee;"><span style="font-weight:600; font-family:Outfit;">Parrot</span><div style="display:flex; gap:16px; font-size:14px; font-family:Inter;"><a href="#" style="color:#232846; text-decoration:none;">Home</a><a href="#" style="color:#232846; text-decoration:none;">Features</a><a href="#" style="color:#232846; text-decoration:none;">Contact</a></div></nav>',
        defaultStyles: { width: '100%', height: '64px' }
    },
    {
        type: 'navbar',
        label: 'Dark Minimal',
        html: '<nav style="display:flex; justify-content:space-between; align-items:center; padding:12px 20px; background:#161A30; border-bottom:1px solid #2a2f45;"><span style="font-weight:600; font-family:Outfit; color:#fff;">Parrot</span><div style="display:flex; gap:16px; font-size:14px; font-family:Inter;"><a href="#" style="color:#fff; text-decoration:none; opacity:0.8;">Home</a><a href="#" style="color:#fff; text-decoration:none; opacity:0.8;">About</a></div></nav>',
        defaultStyles: { width: '100%', height: '64px' }
    },
    {
        type: 'navbar',
        label: 'Centered Logo',
        html: '<nav style="display:flex; justify-content:space-between; align-items:center; padding:12px 20px; background:#fff; border-bottom:1px solid #eee;"><div style="width:80px;"></div><span style="font-weight:600; font-family:Outfit; font-size:18px;">MadeBy-Parrot</span><div style="display:flex; gap:12px; font-size:14px; font-family:Inter;"><a href="#" style="color:#232846; text-decoration:none;">Login</a><a href="#" style="background:#232846; color:#fff; padding:6px 14px; border-radius:12px; text-decoration:none;">Sign Up</a></div></nav>',
        defaultStyles: { width: '100%', height: '64px' }
    },
    {
        type: 'navbar',
        label: 'With Search',
        html: '<nav style="display:flex; justify-content:space-between; align-items:center; padding:12px 20px; background:#F7F8FC; border-bottom:1px solid #eee;"><span style="font-weight:600; font-family:Outfit;">Parrot</span><div style="display:flex; align-items:center; gap:12px;"><input type="text" placeholder="Search..." style="padding:6px 12px; border:1px solid #ddd; border-radius:20px; outline:none; font-family:Inter; font-size:13px;"><a href="#" style="color:#232846; text-decoration:none; font-size:14px; font-family:Inter;">Profile</a></div></nav>',
        defaultStyles: { width: '100%', height: '64px' }
    },
    {
        type: 'navbar',
        label: 'With CTA Button',
        html: '<nav style="display:flex; justify-content:space-between; align-items:center; padding:12px 20px; background:#fff; box-shadow:0 2px 8px rgba(0,0,0,0.05);"><span style="font-weight:600; font-family:Outfit; font-size:18px;">Brand</span><div style="display:flex; align-items:center; gap:16px;"><a href="#" style="color:#232846; text-decoration:none; font-family:Inter;">Pricing</a><button style="background:#2ECC71; color:#fff; border:none; padding:8px 16px; border-radius:12px; font-weight:600; font-family:Inter; cursor:pointer;">Get Started</button></div></nav>',
        defaultStyles: { width: '100%', height: '64px' }
    },
    {
        type: 'navbar',
        label: 'Glassmorphism',
        html: '<nav style="display:flex; justify-content:space-between; align-items:center; padding:12px 20px; background:rgba(255,255,255,0.8); backdrop-filter:blur(10px); border:1px solid rgba(255,255,255,0.3); box-shadow:0 4px 16px rgba(0,0,0,0.05);"><span style="font-weight:600; font-family:Outfit;">Glass</span><div style="display:flex; gap:16px; font-size:14px; font-family:Inter;"><a href="#" style="color:#232846; text-decoration:none;">Home</a><a href="#" style="color:#232846; text-decoration:none;">About</a></div></nav>',
        defaultStyles: { width: '100%', height: '64px' }
    },
    {
        type: 'navbar',
        label: 'With Tabs',
        html: '<nav style="display:flex; align-items:center; padding:0 20px; background:#fff; border-bottom:2px solid #eee; height:60px;"><span style="font-weight:600; font-family:Outfit; margin-right:24px;">Parrot</span><div style="display:flex; gap:0; height:100%;"><a href="#" style="color:#232846; text-decoration:none; padding:0 16px; display:flex; align-items:center; border-bottom:2px solid #232846; font-weight:500; font-family:Inter;">Projects</a><a href="#" style="color:#666; text-decoration:none; padding:0 16px; display:flex; align-items:center; font-family:Inter;">Docs</a><a href="#" style="color:#666; text-decoration:none; padding:0 16px; display:flex; align-items:center; font-family:Inter;">Settings</a></div></nav>',
        defaultStyles: { width: '100%', height: '60px' }
    },
    {
        type: 'navbar',
        label: 'Split Menu',
        html: '<nav style="display:flex; align-items:center; padding:12px 20px; background:#161A30; color:#fff;"><span style="font-weight:600; font-family:Outfit; margin-right:auto;">LOGO</span><div style="display:flex; gap:16px; font-size:14px; font-family:Inter;"><a href="#" style="color:#fff; text-decoration:none;">Home</a><a href="#" style="color:#fff; text-decoration:none;">Blog</a></div><div style="margin-left:auto; display:flex; gap:12px;"><button style="background:transparent; border:1px solid #fff; color:#fff; padding:4px 12px; border-radius:20px;">Login</button><button style="background:#fff; color:#161A30; border:none; padding:4px 12px; border-radius:20px;">Signup</button></div></nav>',
        defaultStyles: { width: '100%', height: '64px' }
    },
    {
        type: 'navbar',
        label: 'Social Icons',
        html: '<nav style="display:flex; justify-content:space-between; align-items:center; padding:12px 20px; background:#fff; border-bottom:1px solid #eee;"><span style="font-weight:600; font-family:Outfit;">Parrot</span><div style="display:flex; gap:12px; color:#666;"><span class="material-icons" style="font-size:20px; cursor:pointer;">facebook</span><span class="material-icons" style="font-size:20px; cursor:pointer;">twitter</span><span class="material-icons" style="font-size:20px; cursor:pointer;">instagram</span></div></nav>',
        defaultStyles: { width: '100%', height: '60px' }
    },
    {
        type: 'navbar',
        label: 'Multi Row',
        html: '<nav style="background:#fff; border-bottom:1px solid #eee;"><div style="padding:12px 20px; border-bottom:1px solid #eee; text-align:center; font-weight:600; font-family:Outfit;">Top Brand</div><div style="display:flex; justify-content:center; gap:20px; padding:8px 20px; font-size:14px; font-family:Inter;"><a href="#" style="color:#232846; text-decoration:none;">Home</a><a href="#" style="color:#232846; text-decoration:none;">Products</a><a href="#" style="color:#232846; text-decoration:none;">Support</a></div></nav>',
        defaultStyles: { width: '100%', height: '80px' }
    },
    {
        type: 'navbar',
        label: 'Transparent Overlay',
        html: '<nav style="display:flex; justify-content:space-between; align-items:center; padding:12px 20px; background:transparent; color:#232846; border-bottom:1px solid rgba(0,0,0,0.05);"><span style="font-weight:600; font-family:Outfit;">OVERLAY</span><div style="display:flex; gap:16px; font-size:14px; font-family:Inter;"><a href="#" style="color:#232846; text-decoration:none;">Work</a><a href="#" style="color:#232846; text-decoration:none;">Studio</a></div></nav>',
        defaultStyles: { width: '100%', height: '64px' }
    },
    {
        type: 'navbar',
        label: 'Mega Menu (mock)',
        html: '<nav style="display:flex; justify-content:space-between; align-items:center; padding:12px 20px; background:#fff; border-bottom:1px solid #eee;"><span style="font-weight:600; font-family:Outfit;">Mega</span><div style="display:flex; gap:12px; font-size:14px; font-family:Inter;"><a href="#" style="color:#232846; text-decoration:none;">Products ▾</a><a href="#" style="color:#232846; text-decoration:none;">Solutions</a></div><button style="background:#232846; color:#fff; border:none; padding:6px 14px; border-radius:12px;">Contact</button></nav>',
        defaultStyles: { width: '100%', height: '64px' }
    },
    {
        type: 'navbar',
        label: 'Mobile Hamburger',
        html: '<nav style="display:flex; justify-content:space-between; align-items:center; padding:12px 20px; background:#fff; border-bottom:1px solid #eee;"><span style="font-weight:600; font-family:Outfit;">App</span><span class="material-icons" style="font-size:28px; cursor:pointer;">menu</span></nav>',
        defaultStyles: { width: '100%', height: '60px' }
    },
    {
        type: 'navbar',
        label: 'With Badge',
        html: '<nav style="display:flex; justify-content:space-between; align-items:center; padding:12px 20px; background:#232846; color:#fff;"><span style="font-weight:600; font-family:Outfit;">Notif</span><div style="display:flex; align-items:center; gap:12px; position:relative;"><span class="material-icons" style="font-size:24px;">notifications</span><span style="position:absolute; top:-4px; right:-4px; background:#E74C3C; color:#fff; font-size:10px; padding:2px 6px; border-radius:50%; font-family:Inter;">3</span><div style="display:flex; align-items:center; gap:4px; font-size:14px; font-family:Inter;"><div style="width:28px; height:28px; background:#2ECC71; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:bold;">A</div></div></div></nav>',
        defaultStyles: { width: '100%', height: '64px' }
    },
    {
        type: 'navbar',
        label: 'Minimal Brand Only',
        html: '<nav style="display:flex; justify-content:center; align-items:center; padding:16px 20px; background:#fff; border-bottom:1px solid #eee;"><span style="font-weight:600; font-family:Outfit; font-size:20px; letter-spacing:1px;">PARROT</span></nav>',
        defaultStyles: { width: '100%', height: '60px' }
    },
    {
        type: 'navbar',
        label: 'Bottom Border Style',
        html: '<nav style="display:flex; justify-content:space-between; align-items:center; padding:12px 20px; background:#fff; border-bottom:3px solid #232846;"><span style="font-weight:700; font-family:Outfit;">Brand</span><div style="display:flex; gap:16px; font-size:14px; font-family:Inter;"><a href="#" style="color:#232846; text-decoration:none;">Features</a><a href="#" style="color:#232846; text-decoration:none;">Pricing</a></div></nav>',
        defaultStyles: { width: '100%', height: '64px' }
    },
    {
        type: 'navbar',
        label: 'Link Only (Simple)',
        html: '<nav style="display:flex; justify-content:flex-end; padding:8px 20px; background:#F7F8FC; border-bottom:1px solid #eee; gap:16px; font-size:14px; font-family:Inter;"><a href="#" style="color:#232846; text-decoration:none;">Home</a><a href="#" style="color:#232846; text-decoration:none;">About</a><a href="#" style="color:#232846; text-decoration:none;">Contact</a></nav>',
        defaultStyles: { width: '100%', height: '44px' }
    },
    {
        type: 'navbar',
        label: 'Glass Dark',
        html: '<nav style="display:flex; justify-content:space-between; align-items:center; padding:12px 20px; background:rgba(22,26,48,0.85); backdrop-filter:blur(8px); border-bottom:1px solid rgba(255,255,255,0.1);"><span style="font-weight:600; font-family:Outfit; color:#fff;">GlassDark</span><div style="display:flex; gap:16px; font-size:14px; font-family:Inter; color:#fff;"><a href="#" style="color:#fff; text-decoration:none; opacity:0.8;">Home</a><a href="#" style="color:#fff; text-decoration:none; opacity:0.8;">About</a></div></nav>',
        defaultStyles: { width: '100%', height: '64px' }
    },
    {
        type: 'navbar',
        label: 'With Avatar',
        html: '<nav style="display:flex; justify-content:space-between; align-items:center; padding:12px 20px; background:#fff; box-shadow:0 2px 8px rgba(0,0,0,0.04);"><span style="font-weight:600; font-family:Outfit;">Team</span><div style="display:flex; align-items:center; gap:12px;"><span style="font-size:14px; font-family:Inter; color:#232846;">John Doe</span><div style="width:32px; height:32px; background:#3498DB; color:#fff; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:bold;">JD</div></div></nav>',
        defaultStyles: { width: '100%', height: '60px' }
    }
];
