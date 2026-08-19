// builder_searchbars.js
window.ELEMENT_LIBRARY = window.ELEMENT_LIBRARY || {};
window.ELEMENT_LIBRARY['Search Bars'] = [
    {
        type: 'search',
        label: 'Rounded with Button',
        html: '<div style="display:flex; border:1px solid #ddd; border-radius:24px; overflow:hidden; width:100%; background:#fff;"><input type="text" placeholder="Search..." style="flex:1; padding:10px 16px; border:none; outline:none; font-family:Inter;"><button style="background:#232846; color:#fff; border:none; padding:0 20px; cursor:pointer;"><span class="material-icons" style="font-size:20px;">search</span></button></div>',
        defaultStyles: { width: '100%', height: '48px' }
    },
    {
        type: 'search',
        label: 'Pill with Icon Left',
        html: '<div style="display:flex; align-items:center; border:1px solid #ddd; border-radius:50px; padding:4px 8px 4px 16px; background:#fff; width:100%;"><span class="material-icons" style="color:#666;">search</span><input type="text" placeholder="Search..." style="flex:1; padding:8px; border:none; outline:none; font-family:Inter; background:transparent;"></div>',
        defaultStyles: { width: '100%', height: '48px' }
    }
];
