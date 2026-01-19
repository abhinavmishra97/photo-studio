// Admin Dashboard JavaScript - Enquiries and Customers functionality

// ============================================
// ENQUIRIES FUNCTIONALITY
// ============================================

// Handle status button clicks
document.querySelectorAll('.status-btn').forEach(btn => {
  btn.addEventListener('click', async (e) => {
    const target = e.target;
    const enquiryId = target.dataset.enquiryId;
    const newStatus = target.dataset.status;
    
    const originalText = target.textContent;
    
    try {
      target.disabled = true;
      target.textContent = 'Updating...';

      const response = await fetch('/api/enquiries/update-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: enquiryId, status: newStatus }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to update status');
      }

      // Reload page to show updated status
      window.location.reload();
    } catch (error) {
      console.error('Full error:', error);
      alert('Error updating status: ' + error.message);
      
      // Re-enable button
      target.disabled = false;
      target.textContent = originalText;
    }
  });
});

// Handle quick reply forms
const replyForms = document.querySelectorAll('.reply-form');

replyForms.forEach(form => {
  const formElement = form;
  const input = formElement.querySelector('input');
  const email = formElement.dataset.email;
  const phone = formElement.dataset.phone;
  const name = formElement.dataset.name;

  // Handle Copy Email button click
  const copyEmailBtn = formElement.querySelector('[data-type="copy-email"]');
  copyEmailBtn?.addEventListener('click', async (e) => {
    e.preventDefault();
  
    const message = input.value.trim();
    if (!message) {
      alert('Please type a message');
      return;
    }

    // Create formatted email text
    const emailText = `To: ${email}
Subject: Re: Your enquiry - Ram Digital Photo Studio

Hi ${name},

${message}

Best regards,
Ram Digital Photo Studio
Contact: +91 9412000718`;

    try {
      // Copy to clipboard
      await navigator.clipboard.writeText(emailText);
      
      // Show success feedback
      const originalText = copyEmailBtn.innerHTML;
      copyEmailBtn.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg><span class="hidden sm:inline">Copied!</span>';
      copyEmailBtn.classList.add('bg-green-600');
      
      setTimeout(() => {
        copyEmailBtn.innerHTML = originalText;
        copyEmailBtn.classList.remove('bg-green-600');
      }, 2000);

      // Clear input
      input.value = '';
      
      // Show instructions
      alert('Email text copied! Now:\\n1. Open Gmail (gmail.com)\\n2. Click Compose\\n3. Paste (Ctrl+V) the email\\n4. Send');
    } catch (error) {
      console.error('Copy failed:', error);
      alert('Failed to copy. Please try again or copy manually:\\n\\n' + emailText);
    }
  });

  // Handle WhatsApp button click
  const whatsappBtn = formElement.querySelector('[data-type="whatsapp"]');
  whatsappBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    
    const message = input.value.trim();
    if (!message) {
      alert('Please type a message');
      return;
    }

    // Create WhatsApp link with pre-filled message (using actual line breaks)
    const whatsappMessage = encodeURIComponent(`Hi ${name},

${message}

Best regards,
Ram Digital Photo Studio`);
    const whatsappLink = `https://wa.me/${phone}?text=${whatsappMessage}`;

    // Open WhatsApp in new tab
    window.open(whatsappLink, '_blank');

    // Clear input after sending
    input.value = '';
  });

  // Handle SMS button click
  const smsBtn = formElement.querySelector('[data-type="sms"]');
  smsBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    
    const message = input.value.trim();
    if (!message) {
      alert('Please type a message');
      return;
    }

    // Create SMS link with pre-filled message (using actual line breaks)
    const smsMessage = encodeURIComponent(`Hi ${name},

${message}

Best regards,
Ram Digital Photo Studio
Contact: +91 9412000718`);
    const smsLink = `sms:${phone}?body=${smsMessage}`;

    // Open SMS app
    window.location.href = smsLink;

    // Clear input after sending
    setTimeout(() => {
      input.value = '';
    }, 500);
  });
});

// ============================================
// CUSTOMERS FUNCTIONALITY
// ============================================

// Modal elements
const modal = document.getElementById('customerModal');
const modalTitle = document.getElementById('modalTitle');
const customerForm = document.getElementById('customerForm');
const addCustomerBtn = document.getElementById('addCustomerBtn');
const cancelBtn = document.getElementById('cancelBtn');
const saveBtn = document.getElementById('saveBtn');

// Form inputs
const customerIdInput = document.getElementById('customerId');
const customerNameInput = document.getElementById('customerName');
const customerSpouseNameInput = document.getElementById('customerSpouseName');
const customerPhoneInput = document.getElementById('customerPhone');
const customerEmailInput = document.getElementById('customerEmail');
const customerBirthdayInput = document.getElementById('customerBirthday');
const customerAnniversaryInput = document.getElementById('customerAnniversary');
const customerLocationInput = document.getElementById('customerLocation');
const customerCityInput = document.getElementById('customerCity');
const customerNotesInput = document.getElementById('customerNotes');

// Search
const searchInput = document.getElementById('searchInput');

// Open modal for adding new customer
addCustomerBtn?.addEventListener('click', () => {
  modalTitle.textContent = 'Add Customer';
  customerForm.reset();
  customerIdInput.value = '';
  modal.classList.remove('hidden');
});

// Close modal
cancelBtn?.addEventListener('click', () => {
  modal.classList.add('hidden');
});

// Close modal on outside click
modal?.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.add('hidden');
  }
});

// Handle form submission
customerForm?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const customerId = customerIdInput.value;
  const isEdit = !!customerId;

  const customerData = {
    id: customerId || undefined,
    name: customerNameInput.value.trim(),
    spouse_name: customerSpouseNameInput.value.trim() || null,
    phone: customerPhoneInput.value.trim(),
    email: customerEmailInput.value.trim() || null,
    birthday: customerBirthdayInput.value || null,
    anniversary: customerAnniversaryInput.value || null,
    location: customerLocationInput.value.trim() || null,
    city: customerCityInput.value.trim() || null,
    notes: customerNotesInput.value.trim() || null,
  };

  try {
    saveBtn.disabled = true;
    saveBtn.textContent = 'Saving...';

    const endpoint = isEdit ? '/api/customers/update' : '/api/customers/add';
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customerData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to save customer');
    }

    // Reload page to show updated data
    window.location.reload();
  } catch (error) {
    alert('Error: ' + error.message);
    saveBtn.disabled = false;
    saveBtn.textContent = 'Save';
  }
});

// Handle edit button clicks
document.querySelectorAll('.edit-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const target = e.target;
    const customerData = JSON.parse(target.dataset.customer || '{}');

    modalTitle.textContent = 'Edit Customer';
    customerIdInput.value = customerData.id;
    customerNameInput.value = customerData.name;
    customerSpouseNameInput.value = customerData.spouse_name || '';
    customerPhoneInput.value = customerData.phone;
    customerEmailInput.value = customerData.email || '';
    customerBirthdayInput.value = customerData.birthday || '';
    customerAnniversaryInput.value = customerData.anniversary || '';
    customerLocationInput.value = customerData.location || '';
    customerCityInput.value = customerData.city || '';
    customerNotesInput.value = customerData.notes || '';

    modal.classList.remove('hidden');
  });
});

// Handle delete button clicks
const deleteModal = document.getElementById('deleteModal');
const deleteCustomerNameSpan = document.getElementById('deleteCustomerName');
const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
let pendingDeleteId = null;
let pendingDeleteButton = null;

document.querySelectorAll('.delete-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const target = e.target;
    const customerId = target.dataset.customerId;
    const customerName = target.dataset.customerName;

    // Store the pending delete info
    pendingDeleteId = customerId;
    pendingDeleteButton = target;

    // Show modal with customer name
    deleteCustomerNameSpan.textContent = customerName;
    deleteModal.classList.remove('hidden');
  });
});

// Cancel delete
cancelDeleteBtn?.addEventListener('click', () => {
  deleteModal.classList.add('hidden');
  pendingDeleteId = null;
  pendingDeleteButton = null;
});

// Confirm delete
confirmDeleteBtn?.addEventListener('click', async () => {
  if (!pendingDeleteId || !pendingDeleteButton) return;

  try {
    pendingDeleteButton.disabled = true;
    pendingDeleteButton.textContent = 'Deleting...';
    deleteModal.classList.add('hidden');

    const response = await fetch('/api/customers/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: pendingDeleteId }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to delete customer');
    }

    // Reload page to show updated data
    window.location.reload();
  } catch (error) {
    alert('Error: ' + error.message);
    pendingDeleteButton.disabled = false;
    pendingDeleteButton.textContent = 'Delete';
    deleteModal.classList.remove('hidden');
  }
});

// Search functionality
searchInput?.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const rows = document.querySelectorAll('.customer-row');

  rows.forEach(row => {
    const text = row.textContent?.toLowerCase() || '';
    if (text.includes(searchTerm)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
});

// ============================================
// SORT CUSTOMERS BY DATE
// ============================================

const sortSelect = document.getElementById('sortSelect');

sortSelect?.addEventListener('change', (e) => {
  const sortOrder = e.target.value;
  const tbody = document.getElementById('customersTableBody');
  const rows = Array.from(document.querySelectorAll('.customer-row'));

  rows.sort((a, b) => {
    const idA = parseInt(a.dataset.customerId);
    const idB = parseInt(b.dataset.customerId);

    if (sortOrder === 'newest') {
      return idB - idA; // Higher ID = newer
    } else {
      return idA - idB; // Lower ID = older
    }
  });

  // Re-append rows in sorted order
  rows.forEach(row => tbody.appendChild(row));
});

// ============================================
// GREETING BUTTONS FUNCTIONALITY
// ============================================

// Handle greeting button clicks for birthdays and anniversaries
function initGreetingButtons() {
  const greetBtns = document.querySelectorAll('.greet-btn');
  
  if (greetBtns.length === 0) {
    // No greeting buttons found, skip initialization
    return;
  }

  greetBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.target.closest('.greet-btn');
      const phone = target.dataset.phone;
      const name = target.dataset.name;
      const occasion = target.dataset.occasion;

      // Create appropriate greeting message
      let greetingMessage = '';
      if (occasion === 'birthday') {
        greetingMessage = `🎂 Happy Birthday ${name}! 🎉

Wishing you a wonderful day filled with joy and happiness! May this year bring you success, health, and countless beautiful moments.

Thank you for being a valued customer of Ram Digital Photo Studio. We hope to capture more of your special moments!

Best wishes,
Ram Digital Photo Studio
Contact: +91 9412733288`;
      } else if (occasion === 'anniversary') {
        greetingMessage = `💍 Happy Anniversary ${name}! 🎊

Wishing you both a beautiful day filled with love and cherished memories! May your bond grow stronger with each passing year.

Thank you for trusting Ram Digital Photo Studio to capture your precious moments. We wish you many more years of happiness together!

Warm regards,
Ram Digital Photo Studio
Contact: +91 9412733288`;
      }

      // Create WhatsApp link
      const whatsappMessage = encodeURIComponent(greetingMessage);
      const whatsappLink = `https://wa.me/${phone}?text=${whatsappMessage}`;

      // Open WhatsApp in new tab
      window.open(whatsappLink, '_blank');
    });
  });
}

// Initialize greeting buttons when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGreetingButtons);
} else {
  // DOM already loaded
  initGreetingButtons();
}

// ============================================
// TOGGLE SPECIAL OCCASIONS SECTION
// ============================================

function initOccasionsToggle() {
  const toggleOccasionsBtn = document.getElementById('toggleOccasionsBtn');
  const occasionsSection = document.getElementById('occasionsSection');
  const occasionsBtnText = document.getElementById('occasionsBtnText');

  console.log('Toggle button:', toggleOccasionsBtn);
  console.log('Occasions section:', occasionsSection);
  console.log('Button text element:', occasionsBtnText);

  if (toggleOccasionsBtn && occasionsSection && occasionsBtnText) {
    console.log('All elements found, adding click listener');
    toggleOccasionsBtn.addEventListener('click', () => {
      console.log('Toggle button clicked!');
      const isHidden = occasionsSection.classList.contains('hidden');
      console.log('Is hidden:', isHidden);
      
      if (isHidden) {
        // Show occasions
        occasionsSection.classList.remove('hidden');
        occasionsBtnText.textContent = 'Hide Special Occasions';
        console.log('Showing occasions');
      } else {
        // Hide occasions
        occasionsSection.classList.add('hidden');
        occasionsBtnText.textContent = 'View Special Occasions';
        console.log('Hiding occasions');
      }
    });
  } else {
    console.error('Missing elements:', {
      button: !!toggleOccasionsBtn,
      section: !!occasionsSection,
      text: !!occasionsBtnText
    });
  }
}

// Initialize toggle when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initOccasionsToggle);
} else {
  // DOM already loaded
  initOccasionsToggle();
}
