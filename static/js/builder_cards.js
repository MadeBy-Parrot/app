// builder_cards.js
window.ELEMENT_LIBRARY = window.ELEMENT_LIBRARY || {};
window.ELEMENT_LIBRARY['Cards'] = [
    {
        type: 'card',
        label: 'Profile Card',
        html: '<div style="border:1px solid #eee; border-radius:16px; padding:20px; background:#fff; width:100%; text-align:center;"><div style="width:80px; height:80px; background:#3498DB; border-radius:50%; margin:0 auto 12px; display:flex; align-items:center; justify-content:center; color:#fff; font-size:32px; font-family:Outfit;">AM</div><h3 style="font-family:Outfit; margin:0;">Alex Morgan</h3><p style="color:#666; font-size:14px; margin:4px 0;">Product Designer</p></div>',
        defaultStyles: { width: '260px', height: '220px' }
    },
    {
        type: 'card',
        label: 'Product Card',
        html: '<div style="border:1px solid #eee; border-radius:16px; padding:16px; background:#fff; width:100%;"><div style="background:#f1f3f5; height:140px; border-radius:12px; margin-bottom:12px;"></div><h4 style="font-family:Outfit; margin:0;">Wireless Headphones</h4><p style="color:#666; font-size:14px; margin:4px 0;">$89.99</p><button style="background:#232846; color:#fff; border:none; padding:6px 16px; border-radius:8px; cursor:pointer;">Add to Cart</button></div>',
        defaultStyles: { width: '240px', height: '280px' }
    },
    {
        type: 'card',
        label: 'Blog Post',
        html: '<div style="border:1px solid #eee; border-radius:16px; padding:16px; background:#fff; width:100%;"><div style="background:#e9ecef; height:120px; border-radius:12px; margin-bottom:12px;"></div><span style="font-size:12px; color:#888;">Jan 15, 2025</span><h4 style="font-family:Outfit; margin:4px 0;">Getting Started with Parrot</h4><p style="font-size:14px; color:#666; margin:4px 0;">Learn how to build your first website in minutes.</p></div>',
        defaultStyles: { width: '260px', height: '280px' }
    },
    {
        type: 'card',
        label: 'Pricing Basic',
        html: '<div style="border:1px solid #eee; border-radius:16px; padding:24px; background:#fff; width:100%; text-align:center;"><h4 style="font-family:Outfit; margin:0;">Basic</h4><h2 style="font-family:Outfit; margin:8px 0;">$19/mo</h2><p style="font-size:14px; color:#666;">Up to 5 sites</p><button style="background:#232846; color:#fff; border:none; padding:8px 20px; border-radius:8px; margin-top:16px; cursor:pointer;">Choose Plan</button></div>',
        defaultStyles: { width: '240px', height: '240px' }
    },
    {
        type: 'card',
        label: 'Testimonial',
        html: '<div style="border:1px solid #eee; border-radius:16px; padding:20px; background:#F7F8FC; width:100%;"><p style="font-style:italic; margin:0 0 12px;">"Absolutely the best tool we have ever used!"</p><div style="display:flex; align-items:center; gap:12px;"><div style="width:40px; height:40px; background:#2ECC71; border-radius:50%; display:flex; align-items:center; justify-content:center; color:#fff;">JD</div><div><h4 style="font-family:Outfit; margin:0;">John Doe</h4><p style="font-size:13px; color:#666; margin:0;">CEO, TechCorp</p></div></div></div>',
        defaultStyles: { width: '280px', height: '160px' }
    }
];
