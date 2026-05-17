// =====================
//   LAMP TOGGLE
// =====================

const lampToggle = document.getElementById('lampToggle');
const lampFace   = document.getElementById('lampFace');
const successBanner = document.getElementById('successBanner');

let isOn = false;

lampToggle.addEventListener('click', () => {
  isOn = !isOn;

  if (isOn) {
    document.body.classList.add('lit');
    lampFace.classList.remove('sleeping');
  } else {
    document.body.classList.remove('lit');
    // Small delay so face transition looks smooth
    setTimeout(() => lampFace.classList.add('sleeping'), 300);
    successBanner.classList.remove('show');
    resetAllFields();
  }
});


// =====================
//   FIELD HELPERS
// =====================

/**
 * Sets the visual state of a field.
 * @param {string} inputId  - ID of the <input>
 * @param {string} msgId    - ID of the message <div>
 * @param {'err'|'ok'|''}   type  - state type
 * @param {string} text     - message to display (empty to clear)
 */
function setField(inputId, msgId, type, text) {
  const input = document.getElementById(inputId);
  const msg   = document.getElementById(msgId);

  // Reset classes
  input.classList.remove('error-input', 'success-input');
  if (type === 'err') input.classList.add('error-input');
  if (type === 'ok')  input.classList.add('success-input');

  msg.className = 'msg ' + (type || '');
  msg.innerHTML = text
    ? (type === 'err' ? '&#10007; ' : '&#10003; ') + text
    : '';
}

/** Clears all fields and messages */
function resetAllFields() {
  const fields = [
    { input: 'fname',  msg: 'msg-name'  },
    { input: 'femail', msg: 'msg-email' },
    { input: 'fphone', msg: 'msg-phone' },
    { input: 'fpass',  msg: 'msg-pass'  },
  ];
  fields.forEach(({ input, msg }) => {
    document.getElementById(input).value = '';
    setField(input, msg, '', '');
  });
}


// =====================
//   LIVE CLEAR ON INPUT
// =====================

const fieldMap = {
  fname:  'msg-name',
  femail: 'msg-email',
  fphone: 'msg-phone',
  fpass:  'msg-pass',
};

Object.entries(fieldMap).forEach(([inputId, msgId]) => {
  document.getElementById(inputId).addEventListener('input', () => {
    setField(inputId, msgId, '', '');
  });
});


// =====================
//   VALIDATION RULES
// =====================

/**
 * Validates the full name field.
 * @returns {boolean}
 */
function validateName() {
  const value = document.getElementById('fname').value.trim();

  if (!value) {
    setField('fname', 'msg-name', 'err', 'Name is required');
    return false;
  }
  if (value.length < 3) {
    setField('fname', 'msg-name', 'err', 'Name must be at least 3 characters');
    return false;
  }
  if (!/^[a-zA-Z\s]+$/.test(value)) {
    setField('fname', 'msg-name', 'err', 'Name should only contain letters');
    return false;
  }

  setField('fname', 'msg-name', 'ok', 'Looks good!');
  return true;
}

/**
 * Validates the email field.
 * @returns {boolean}
 */
function validateEmail() {
  const value = document.getElementById('femail').value.trim();

  if (!value) {
    setField('femail', 'msg-email', 'err', 'Email is required');
    return false;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    setField('femail', 'msg-email', 'err', 'Please enter a valid email address');
    return false;
  }

  setField('femail', 'msg-email', 'ok', 'Valid email address');
  return true;
}

/**
 * Validates the phone number field.
 * @returns {boolean}
 */
function validatePhone() {
  const value = document.getElementById('fphone').value.trim();

  if (!value) {
    setField('fphone', 'msg-phone', 'err', 'Phone number is required');
    return false;
  }
  if (!/^[\d\s\+\-\(\)]{7,15}$/.test(value)) {
    setField('fphone', 'msg-phone', 'err', 'Enter a valid phone number (7–15 digits)');
    return false;
  }

  setField('fphone', 'msg-phone', 'ok', 'Phone looks good!');
  return true;
}

/**
 * Validates the password field.
 * @returns {boolean}
 */
function validatePassword() {
  const value = document.getElementById('fpass').value;

  if (!value) {
    setField('fpass', 'msg-pass', 'err', 'Password is required');
    return false;
  }
  if (value.length < 8) {
    setField('fpass', 'msg-pass', 'err', 'Password must be at least 8 characters');
    return false;
  }
  if (!/[A-Z]/.test(value)) {
    setField('fpass', 'msg-pass', 'err', 'Include at least one uppercase letter');
    return false;
  }
  if (!/[0-9]/.test(value)) {
    setField('fpass', 'msg-pass', 'err', 'Include at least one number');
    return false;
  }

  setField('fpass', 'msg-pass', 'ok', 'Strong password!');
  return true;
}


// =====================
//   FORM SUBMISSION
// =====================

document.getElementById('submitBtn').addEventListener('click', validateForm);

function validateForm() {
  const nameOk  = validateName();
  const emailOk = validateEmail();
  const phoneOk = validatePhone();
  const passOk  = validatePassword();

  if (nameOk && emailOk && phoneOk && passOk) {
    successBanner.classList.add('show');
    successBanner.scrollIntoView({ behavior: 'smooth' });
  } else {
    successBanner.classList.remove('show');
  }
}
