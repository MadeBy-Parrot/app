document.addEventListener('DOMContentLoaded', function() {
    const avatarBtn = document.getElementById('avatarBtn');
    const dropdown = document.getElementById('avatarDropdown');
    if (avatarBtn && dropdown) {
        avatarBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const isOpen = dropdown.classList.toggle('open');
            avatarBtn.setAttribute('aria-expanded', isOpen);
        });
        document.addEventListener('click', function(e) {
            if (!avatarBtn.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.classList.remove('open');
                avatarBtn.setAttribute('aria-expanded', 'false');
            }
        });
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && dropdown.classList.contains('open')) {
                dropdown.classList.remove('open');
                avatarBtn.setAttribute('aria-expanded', 'false');
                avatarBtn.focus();
            }
        });
    }
});
