// Character sets for password generation
const charSets = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

// Update length display when slider changes
function updateLength() {
    const slider = document.getElementById('lengthSlider');
    const display = document.getElementById('lengthValue');
    display.textContent = slider.value;
}

// Generate password based on selected options
function generatePassword() {
    const length = parseInt(document.getElementById('lengthSlider').value);
    const options = {
        uppercase: document.getElementById('uppercase').checked,
        lowercase: document.getElementById('lowercase').checked,
        numbers: document.getElementById('numbers').checked,
        symbols: document.getElementById('symbols').checked
    };
    
    // Build character pool
    let chars = '';
    Object.keys(options).forEach(key => {
        if (options[key]) {
            chars += charSets[key];
        }
    });
    
    if (chars === '') {
        alert('Please select at least one character type!');
        return;
    }
    
    // Generate password
    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    document.getElementById('generatedPassword').value = password;
}

// Check password strength
function checkStrength() {
    const password = document.getElementById('passwordInput').value;
    const result = document.getElementById('strengthResult');
    
    if (!password) {
        result.textContent = '';
        result.className = 'strength-result';
        return;
    }
    
    let score = 0;
    let feedback = [];
    
    // Length check
    if (password.length >= 8) score += 2;
    else if (password.length >= 6) score += 1;
    else feedback.push('Use at least 6 characters');
    
    // Character variety checks
    if (/[a-z]/.test(password)) score += 1;
    else feedback.push('Add lowercase letters');
    
    if (/[A-Z]/.test(password)) score += 1;
    else feedback.push('Add uppercase letters');
    
    if (/[0-9]/.test(password)) score += 1;
    else feedback.push('Add numbers');
    
    if (/[^A-Za-z0-9]/.test(password)) score += 2;
    else feedback.push('Add special characters');
    
    // Common patterns penalty
    if (/(.)\1{2,}/.test(password)) score -= 1;
    if (/123|abc|qwe/i.test(password)) score -= 1;
    
    // Determine strength level
    let strength, className;
    if (score <= 3) {
        strength = 'Weak';
        className = 'strength-weak';
    } else if (score <= 5) {
        strength = 'Medium';
        className = 'strength-medium';
    } else {
        strength = 'Strong';
        className = 'strength-strong';
    }
    
    result.textContent = `Strength: ${strength}${feedback.length ? ' - ' + feedback.join(', ') : ''}`;
    result.className = `strength-result ${className}`;
}

// Copy generated password to clipboard
function copyPassword() {
    const passwordField = document.getElementById('generatedPassword');
    if (!passwordField.value) {
        alert('No password to copy!');
        return;
    }
    
    passwordField.select();
    document.execCommand('copy');
    
    // Visual feedback
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = 'Copied!';
    setTimeout(() => {
        button.textContent = originalText;
    }, 1000);
}

// Real-time strength checking
document.getElementById('passwordInput').addEventListener('input', checkStrength);
