// Character sets
const CHAR_SETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers:   '0123456789',
  symbols:   '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

// DOM elements
const passwordEl  = document.getElementById('password');
const lengthEl    = document.getElementById('length');
const lengthValue = document.getElementById('length-value');
const generateBtn = document.getElementById('generate-btn');
const copyBtn     = document.getElementById('copy-btn');

// Update length display when slider moves
lengthEl.addEventListener('input', () => {
  lengthValue.textContent = lengthEl.value;
});

// Secure random number generator
function secureRandom(max) {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] % max;
}

// Generate password
function generatePassword() {
  const length = +lengthEl.value;
  let pool = '';

  if (document.getElementById('uppercase').checked) pool += CHAR_SETS.uppercase;
  if (document.getElementById('lowercase').checked) pool += CHAR_SETS.lowercase;
  if (document.getElementById('numbers').checked)   pool += CHAR_SETS.numbers;
  if (document.getElementById('symbols').checked)   pool += CHAR_SETS.symbols;

  if (!pool) {
    passwordEl.value = 'Select at least one option!';
    return;
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = secureRandom(pool.length);
    password += pool[randomIndex];
  }

  passwordEl.value = password;
}

// Copy to clipboard
copyBtn.addEventListener('click', async () => {
  if (!passwordEl.value || passwordEl.value === 'Select at least one option!') return;
  try {
    await navigator.clipboard.writeText(passwordEl.value);
    copyBtn.textContent = '✅';
    setTimeout(() => (copyBtn.textContent = '📋'), 1500);
  } catch (err) {
    // Fallback for older browsers
    passwordEl.select();
    document.execCommand('copy');
    copyBtn.textContent = '✅';
    setTimeout(() => (copyBtn.textContent = '📋'), 1500);
  }
});

// Event listeners
generateBtn.addEventListener('click', generatePassword);

// Generate one password on page load
generatePassword();