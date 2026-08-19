window.ELEMENT_LIBRARY = window.ELEMENT_LIBRARY || {};
window.ELEMENT_LIBRARY['Images'] = [
    {
        type: 'image',
        label: 'Placeholder',
        html: '<div style="width:100%; height:100%; background:#e9ecef; display:flex; align-items:center; justify-content:center; border-radius:12px; color:#888; font-family:Inter;"><span class="material-icons" style="font-size:48px;">image</span></div>',
        defaultStyles: { width: '200px', height: '150px', background: '#e9ecef' }
    },
    {
        type: 'image',
        label: 'Square',
        html: '<div style="width:100%; height:100%; background:#e9ecef; display:flex; align-items:center; justify-content:center; border-radius:12px;"><span class="material-icons" style="font-size:48px;">crop_square</span></div>',
        defaultStyles: { width: '150px', height: '150px' }
    },
    {
        type: 'image',
        label: 'Landscape',
        html: '<div style="width:100%; height:100%; background:#e9ecef; display:flex; align-items:center; justify-content:center;"><span class="material-icons" style="font-size:48px;">landscape</span></div>',
        defaultStyles: { width: '300px', height: '150px' }
    }
];
