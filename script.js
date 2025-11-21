// Helper function to get element values
const getElement = (id) => document.getElementById(id);

// --- Encryption Logic ---
getElement('encryptBtn').addEventListener('click', () => {
    const text = getElement('inputText').value;
    const key = getElement('secretKey').value;

    if (!text || !key) {
        alert('Please enter both text and a secret key!');
        return;
    }

    try {
        // Use CryptoJS AES encryption
        const encrypted = CryptoJS.AES.encrypt(text, key).toString();
        getElement('outputText').value = encrypted;
    } catch (error) {
        console.error(error);
        alert('Encryption failed. Please try again.');
    }
});

// --- Decryption Logic ---
getElement('decryptBtn').addEventListener('click', () => {
    const text = getElement('inputText').value;
    const key = getElement('secretKey').value;

    if (!text || !key) {
        alert('Please enter text to decrypt and the secret key!');
        return;
    }

    try {
        // Use CryptoJS AES decryption
        const bytes = CryptoJS.AES.decrypt(text, key);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);

        // If logic fails (wrong key usually results in empty string or malformed UTF8)
        if (!decrypted) {
            throw new Error('Wrong key or invalid text');
        }

        getElement('outputText').value = decrypted;

    } catch (error) {
        console.error(error);
        alert('Decryption failed! Ensure the key is correct and text is valid.');
        getElement('outputText').value = '';
    }
});

// --- Copy to Clipboard Function ---
async function copyToClipboard(elementId) {
    const element = getElement(elementId);
    if (!element.value) return;

    try {
        await navigator.clipboard.writeText(element.value);
        
        // Visual feedback
        const btn = element.nextElementSibling; // The button next to the textarea
        const originalIcon = btn.innerHTML;
        
        btn.innerHTML = '<i class="fa-solid fa-check"></i>';
        btn.style.color = 'var(--success)';
        
        setTimeout(() => {
            btn.innerHTML = originalIcon;
            btn.style.color = '';
        }, 2000);

    } catch (err) {
        alert('Failed to copy text');
    }
}

// --- Toggle Password Visibility ---
function toggleKeyVisibility() {
    const keyInput = getElement('secretKey');
    const icon = getElement('eyeIcon');

    if (keyInput.type === 'password') {
        keyInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        keyInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}