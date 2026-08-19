// builder_inputs.js
window.ELEMENT_LIBRARY = window.ELEMENT_LIBRARY || {};
window.ELEMENT_LIBRARY['Inputs'] = [
    {
        type: 'input',
        label: 'Text Input',
        html: '<input type="text" placeholder="Enter your name" style="width:100%; padding:12px; border:1px solid #ddd; border-radius:8px; font-family:Inter; outline:none;">',
        defaultStyles: { width: '100%', height: '48px' }
    },
    {
        type: 'input',
        label: 'Email Input',
        html: '<input type="email" placeholder="you@example.com" style="width:100%; padding:12px; border:1px solid #ddd; border-radius:8px; font-family:Inter; outline:none;">',
        defaultStyles: { width: '100%', height: '48px' }
    },
    {
        type: 'input',
        label: 'Password Input',
        html: '<input type="password" placeholder="Password" style="width:100%; padding:12px; border:1px solid #ddd; border-radius:8px; font-family:Inter; outline:none;">',
        defaultStyles: { width: '100%', height: '48px' }
    },
    {
        type: 'input',
        label: 'Textarea',
        html: '<textarea placeholder="Write a message..." style="width:100%; height:100px; padding:12px; border:1px solid #ddd; border-radius:8px; font-family:Inter; outline:none; resize:vertical;"></textarea>',
        defaultStyles: { width: '100%', height: '120px' }
    },
    {
        type: 'input',
        label: 'Select Dropdown',
        html: '<select style="width:100%; padding:12px; border:1px solid #ddd; border-radius:8px; font-family:Inter; outline:none; background:#fff;"><option>Option 1</option><option>Option 2</option><option>Option 3</option></select>',
        defaultStyles: { width: '100%', height: '48px' }
    },
    {
        type: 'input',
        label: 'Checkbox',
        html: '<label style="display:flex; align-items:center; gap:8px; font-family:Inter;"><input type="checkbox" /> I agree to the terms</label>',
        defaultStyles: { width: '200px', height: '30px' }
    }
];
