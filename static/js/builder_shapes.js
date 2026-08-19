window.ELEMENT_LIBRARY = window.ELEMENT_LIBRARY || {};
window.ELEMENT_LIBRARY['Shapes'] = [
    {
        type: 'shape',
        label: 'Rectangle',
        html: '<div style="width:100%; height:100%; background:#232846; border-radius:4px;"></div>',
        defaultStyles: { width: '120px', height: '80px', background: '#232846' }
    },
    {
        type: 'shape',
        label: 'Circle',
        html: '<div style="width:100%; height:100%; background:#2ECC71; border-radius:50%;"></div>',
        defaultStyles: { width: '80px', height: '80px', background: '#2ECC71' }
    },
    {
        type: 'shape',
        label: 'Rounded Square',
        html: '<div style="width:100%; height:100%; background:#3498DB; border-radius:16px;"></div>',
        defaultStyles: { width: '100px', height: '100px', background: '#3498DB' }
    },
    {
        type: 'shape',
        label: 'Line Divider',
        html: '<hr style="width:100%; border:0; border-top:2px solid #ddd;">',
        defaultStyles: { width: '200px', height: '2px' }
    }
];
