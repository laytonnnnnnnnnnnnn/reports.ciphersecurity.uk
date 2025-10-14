// Configuration is now handled by auth.js and environment variables

// Form configurations for different report types
const formConfigs = {
    staff: {
        title: 'Report Staff Member',
        subtitle: 'Please provide detailed information about the staff member and the incident',
        color: '#667eea',
        fields: [
            {
                type: 'text',
                name: 'reporterName',
                label: 'Your Name',
                required: false,
                placeholder: 'Leave blank to remain anonymous',
                isFullSpan: false
            },
            {
                type: 'email',
                name: 'reporterEmail',
                label: 'Your Email',
                required: false,
                placeholder: 'For follow-up (optional)',
                isFullSpan: false
            },
            {
                type: 'text',
                name: 'staffMember',
                label: 'Staff Member Name/Username',
                required: true,
                placeholder: 'Username or display name',
                isFullSpan: false
            },
            {
                type: 'text',
                name: 'staffRole',
                label: 'Staff Member Role',
                required: false,
                placeholder: 'Admin, Moderator, etc.',
                isFullSpan: false
            },
            {
                type: 'select',
                name: 'incidentType',
                label: 'Type of Issue',
                required: true,
                isFullSpan: true,
                options: [
                    'Abuse of Power',
                    'Inappropriate Behavior',
                    'Harassment',
                    'Discrimination',
                    'Policy Violation',
                    'Conflict of Interest',
                    'Other'
                ]
            },
            {
                type: 'datetime-local',
                name: 'incidentDate',
                label: 'When did this occur?',
                required: false,
                isFullSpan: false
            },
            {
                type: 'text',
                name: 'witnesses',
                label: 'Witnesses (if any)',
                required: false,
                placeholder: 'Usernames of people who saw this',
                isFullSpan: false
            },
            {
                type: 'textarea',
                name: 'description',
                label: 'Detailed Description',
                required: true,
                placeholder: 'Please describe what happened in detail. Include specific actions, words used, and context.',
                isFullSpan: true
            },
            {
                type: 'textarea',
                name: 'evidence',
                label: 'Evidence/Screenshots',
                required: false,
                placeholder: 'Describe any screenshots, messages, or other evidence you have. You can share these separately if needed.',
                isFullSpan: true
            },
            {
                type: 'select',
                name: 'severity',
                label: 'Severity Level',
                required: true,
                isFullSpan: false,
                options: [
                    'Low - Minor issue',
                    'Medium - Concerning behavior',
                    'High - Serious violation',
                    'Critical - Immediate action needed'
                ]
            }
        ]
    },
    security: {
        title: 'General Report',
        subtitle: 'Report rule breaking, TOS violations, and community issues',
        color: '#764ba2',
        fields: [
            {
                type: 'text',
                name: 'reporterName',
                label: 'Your Name',
                required: false,
                placeholder: 'Leave blank to remain anonymous',
                isFullSpan: false
            },
            {
                type: 'email',
                name: 'reporterEmail',
                label: 'Your Email',
                required: false,
                placeholder: 'For follow-up (optional)',
                isFullSpan: false
            },
            {
                type: 'select',
                name: 'violationType',
                label: 'Type of Violation/Issue',
                required: true,
                isFullSpan: true,
                options: [
                    'Spam/Flooding',
                    'Inappropriate Content',
                    'Terms of Service Violation',
                    'Server Rules Violation',
                    'Advertising/Self-Promotion',
                    'Trolling/Disruptive Behavior',
                    'Impersonation',
                    'Bot/Alt Account Abuse',
                    'Other Rule Breaking'
                ]
            },
            {
                type: 'text',
                name: 'affectedChannels',
                label: 'Affected Channels/Areas',
                required: false,
                placeholder: 'Which channels or areas of the server were affected?',
                isFullSpan: true
            },
            {
                type: 'datetime-local',
                name: 'incidentDate',
                label: 'When did this occur?',
                required: false,
                isFullSpan: false
            },
            {
                type: 'select',
                name: 'severityLevel',
                label: 'Severity Level',
                required: true,
                isFullSpan: false,
                options: [
                    'Low - Minor violation',
                    'Medium - Concerning behavior',
                    'High - Serious violation',
                    'Critical - Immediate action needed'
                ]
            },
            {
                type: 'textarea',
                name: 'incidentDescription',
                label: 'Incident Description',
                required: true,
                placeholder: 'Describe what happened in detail. Include specific actions, messages, or behaviors that violated the rules.',
                isFullSpan: true
            },
            {
                type: 'textarea',
                name: 'ruleImpact',
                label: 'Impact on Community',
                required: false,
                placeholder: 'How did this violation affect other members or the server community?',
                isFullSpan: true
            },
            {
                type: 'textarea',
                name: 'evidence',
                label: 'Evidence/Screenshots',
                required: false,
                placeholder: 'Describe any screenshots, message links, or other evidence of the violation.',
                isFullSpan: true
            },
            {
                type: 'text',
                name: 'previousAction',
                label: 'Previous Action Taken?',
                required: false,
                placeholder: 'Has this user been warned or reported before for similar behavior?',
                isFullSpan: true
            }
        ]
    },
    safeguarding: {
        title: 'Safeguarding Concern Report',
        subtitle: 'Report child protection or safety concerns - Highest Priority',
        color: '#f5576c',
        fields: [
            {
                type: 'text',
                name: 'reporterName',
                label: 'Your Name',
                required: false,
                placeholder: 'Leave blank to remain anonymous',
                isFullSpan: false
            },
            {
                type: 'email',
                name: 'reporterEmail',
                label: 'Your Email',
                required: false,
                placeholder: 'For follow-up (optional)',
                isFullSpan: false
            },
            {
                type: 'text',
                name: 'reporterRole',
                label: 'Your Role/Relationship',
                required: false,
                placeholder: 'Parent, teacher, friend, etc.',
                isFullSpan: false
            },
            {
                type: 'select',
                name: 'concernType',
                label: 'Type of Concern',
                required: true,
                isFullSpan: true,
                options: [
                    'Child Grooming',
                    'Inappropriate Contact with Minor',
                    'Sexual Harassment',
                    'Sharing Inappropriate Content',
                    'Cyberbullying',
                    'Self-Harm Discussion',
                    'Exploitation',
                    'Abuse Disclosure',
                    'Other Child Protection Issue'
                ]
            },
            {
                type: 'text',
                name: 'childAge',
                label: 'Age of Child/Young Person',
                required: false,
                placeholder: 'If known',
                isFullSpan: false
            },
            {
                type: 'text',
                name: 'suspectedPerson',
                label: 'Suspected Person (Username)',
                required: false,
                placeholder: 'Username of person of concern',
                isFullSpan: false
            },
            {
                type: 'select',
                name: 'urgencyLevel',
                label: 'Urgency Level',
                required: true,
                isFullSpan: false,
                options: [
                    'Emergency - Child in immediate danger',
                    'Urgent - Serious concern requiring quick action',
                    'Important - Needs investigation soon',
                    'Standard - Requires follow-up'
                ]
            },
            {
                type: 'datetime-local',
                name: 'incidentDate',
                label: 'When did this occur?',
                required: false,
                isFullSpan: false
            },
            {
                type: 'textarea',
                name: 'incidentDescription',
                label: 'Description of Concern',
                required: true,
                placeholder: 'Describe the situation or behavior that concerns you. Include as much detail as possible while being sensitive.',
                isFullSpan: true
            },
            {
                type: 'textarea',
                name: 'childResponse',
                label: 'Child\'s Response/Disclosure',
                required: false,
                placeholder: 'If the child has said anything about the situation, record it here as accurately as possible.',
                isFullSpan: true
            },
            {
                type: 'text',
                name: 'witnesses',
                label: 'Witnesses',
                required: false,
                placeholder: 'Anyone else who has witnessed concerning behavior',
                isFullSpan: false
            },
            {
                type: 'textarea',
                name: 'previousConcerns',
                label: 'Previous Concerns',
                required: false,
                placeholder: 'Any previous incidents or ongoing concerns about this person or situation.',
                isFullSpan: true
            },
            {
                type: 'textarea',
                name: 'actionsTaken',
                label: 'Actions Already Taken',
                required: false,
                placeholder: 'What steps have you already taken? Have you reported this elsewhere?',
                isFullSpan: true
            }
        ]
    }
};

// Current state
let currentReportType = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    initializeAuth();
    // Static mode - no callback handling needed
});

// Configuration not needed for static mode - webhooks are hardcoded in auth.js

function initializeApp() {
    showSection('home');
    createParticles();
}

function setupEventListeners() {
    // Report card click events
    document.querySelectorAll('.report-card').forEach(card => {
        card.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            showReportForm(type);
        });
    });

    // Form submission
    document.getElementById('report-form').addEventListener('submit', handleFormSubmission);
    
    // Contact form submission
    document.getElementById('contact-form').addEventListener('submit', handleContactSubmission);

    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href').substring(1);
            if (target === 'home') {
                showSection('home');
            } else if (target === 'report') {
                showReportSection();
            } else if (target === 'contact') {
                showSection('contact');
            }
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function createParticles() {
    const container = document.getElementById('particles-container');
    
    // Add floating elements for visual interest
    for (let i = 0; i < 6; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(255, 255, 255, 0.1)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 10 + 15}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 10 + 's';
        container.appendChild(particle);
    }
}

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.hero-section, .report-section, .form-section, .contact-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    if (sectionId === 'home') {
        document.querySelector('.hero-section').classList.add('active');
    } else if (sectionId === 'report') {
        document.querySelector('.report-section').classList.add('active');
    } else if (sectionId === 'form') {
        document.querySelector('.form-section').classList.add('active');
    } else if (sectionId === 'contact') {
        document.querySelector('.contact-section').classList.add('active');
    }
}

function showReportSection() {
    showSection('report');
}

function showReportForm(type) {
    currentReportType = type;
    const config = formConfigs[type];
    
    if (!config) {
        console.error('Unknown report type:', type);
        return;
    }

    // Update form header
    document.getElementById('form-title').textContent = config.title;
    document.getElementById('form-subtitle').textContent = config.subtitle;
    
    // Update form header background
    const formHeader = document.querySelector('.form-header');
    formHeader.style.background = `linear-gradient(135deg, ${config.color} 0%, ${adjustColor(config.color, -20)} 100%)`;

    // Generate form fields
    generateFormFields(config.fields);
    
    showSection('form');
}

function generateFormFields(fields) {
    const container = document.getElementById('form-fields');
    container.innerHTML = '';

    fields.forEach(field => {
        const formGroup = document.createElement('div');
        formGroup.className = `form-group${field.isFullSpan ? ' full-width' : ''}`;

        const label = document.createElement('label');
        label.className = 'form-label';
        label.setAttribute('for', field.name);
        label.innerHTML = `${field.label} ${field.required ? '<span class="required">*</span>' : ''}`;

        let input;

        switch (field.type) {
            case 'textarea':
                input = document.createElement('textarea');
                input.className = 'form-textarea';
                input.rows = 4;
                break;
            
            case 'select':
                input = document.createElement('select');
                input.className = 'form-select';
                
                // Add default option
                const defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.textContent = 'Please select...';
                input.appendChild(defaultOption);
                
                // Add field options
                field.options.forEach(option => {
                    const optionElement = document.createElement('option');
                    optionElement.value = option;
                    optionElement.textContent = option;
                    input.appendChild(optionElement);
                });
                break;
            
            default:
                input = document.createElement('input');
                input.type = field.type;
                input.className = 'form-input';
        }

        input.id = field.name;
        input.name = field.name;
        input.required = field.required;
        
        if (field.placeholder) {
            input.placeholder = field.placeholder;
        }

        formGroup.appendChild(label);
        formGroup.appendChild(input);
        container.appendChild(formGroup);
    });

    // Add anonymous reporting checkbox for sensitive reports
    if (currentReportType === 'safeguarding' || currentReportType === 'staff') {
        const checkboxGroup = document.createElement('div');
        checkboxGroup.className = 'checkbox-group';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = 'anonymousReport';
        checkbox.name = 'anonymousReport';
        
        const checkboxLabel = document.createElement('label');
        checkboxLabel.setAttribute('for', 'anonymousReport');
        checkboxLabel.textContent = 'I wish to remain completely anonymous (this will remove identifying information from the report)';
        
        checkboxGroup.appendChild(checkbox);
        checkboxGroup.appendChild(checkboxLabel);
        container.appendChild(checkboxGroup);
    }
}

async function handleFormSubmission(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submit-btn');
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    
    try {
        const formData = collectFormData();
        const authenticatedUser = discordAuth.getCurrentUser();
        
        await webhookManager.sendReport(currentReportType, formData, authenticatedUser);
        
        // Show success modal
        showModal('success-modal');
        
        // Reset form
        document.getElementById('report-form').reset();
        
        // Return to report selection after a delay
        setTimeout(() => {
            closeModal('success-modal');
            showReportSection();
        }, 3000);
        
    } catch (error) {
        console.error('Submission error:', error);
        showErrorModal('Failed to submit report. Please try again or contact support directly.');
    } finally {
        // Reset loading state
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
    }
}

async function handleContactSubmission(e) {
    e.preventDefault();
    
    const submitBtn = e.target.querySelector('.contact-submit');
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    
    try {
        const formData = new FormData(e.target);
        const contactData = Object.fromEntries(formData.entries());
        
        await webhookManager.sendContactForm(contactData);
        
        // Show success message
        showSuccessMessage('Message sent successfully! We\'ll get back to you soon.');
        
        // Reset form
        e.target.reset();
        
    } catch (error) {
        console.error('Contact form error:', error);
        showErrorModal('Failed to send message. Please try again or contact support directly.');
    } finally {
        // Reset loading state
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
    }
}

function collectFormData() {
    const form = document.getElementById('report-form');
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    // Add metadata
    data.reportType = currentReportType;
    data.timestamp = new Date().toISOString();
    data.reportId = generateReportId();
    
    return data;
}

function formatDiscordMessage(data) {
    const config = formConfigs[data.reportType];
    const reportTypeNames = {
        staff: 'Staff Member Report',
        security: 'General Report',
        safeguarding: 'Safeguarding Concern'
    };

    const embed = {
        title: `🚨 ${reportTypeNames[data.reportType]}`,
        color: parseInt(config.color.substring(1), 16),
        timestamp: data.timestamp,
        footer: {
            text: `Report ID: ${data.reportId}`
        },
        fields: []
    };

    // Add priority indicator for safeguarding
    if (data.reportType === 'safeguarding') {
        embed.description = '⚠️ **SAFEGUARDING ALERT - REQUIRES IMMEDIATE ATTENTION** ⚠️';
    }

    // Process form fields based on report type
    const fieldMapping = {
        reporterName: 'Reporter Name',
        reporterEmail: 'Reporter Email',
        reporterRole: 'Reporter Role',
        staffMember: 'Staff Member',
        staffRole: 'Staff Role',
        suspectedPerson: 'Suspected Person',
        incidentType: 'Incident Type',
        violationType: 'Violation Type',
        concernType: 'Concern Type',
        childAge: 'Child Age',
        incidentDate: 'Incident Date',
        witnesses: 'Witnesses',
        affectedChannels: 'Affected Channels',
        severityLevel: 'Severity Level',
        urgencyLevel: 'Urgency Level',
        severity: 'Severity',
        description: 'Description',
        incidentDescription: 'Incident Description',
        ruleImpact: 'Impact on Community',
        childResponse: 'Child Response/Disclosure',
        evidence: 'Evidence',
        previousConcerns: 'Previous Concerns',
        actionsTaken: 'Actions Taken',
        previousAction: 'Previous Action Taken'
    };

    // Handle anonymous reporting
    if (data.anonymousReport === 'on') {
        embed.fields.push({
            name: '🔒 Anonymous Report',
            value: 'Reporter has requested to remain anonymous',
            inline: false
        });
        // Remove identifying information
        delete data.reporterName;
        delete data.reporterEmail;
    }

    // Add form fields to embed
        Object.keys(data).forEach(key => {
        if (fieldMapping[key] && data[key]) {
            const isImportant = ['urgencyLevel', 'severity', 'severityLevel', 'concernType', 'incidentType', 'violationType'].includes(key);            embed.fields.push({
                name: fieldMapping[key],
                value: data[key],
                inline: !['description', 'incidentDescription', 'ruleImpact', 'evidence', 'childResponse', 'previousConcerns', 'actionsTaken', 'previousAction'].includes(key)
            });
        }
    });

    return {
        embeds: [embed],
        content: data.reportType === 'safeguarding' ? '@here URGENT: Safeguarding concern reported' : undefined
    };
}

// Authentication functions
function initializeAuth() {
    updateAuthUI();
    // Static mode - no login required
}

function handleAuthCallback() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    if (code) {
        // Handle OAuth callback
        discordAuth.handleCallback(code).then(() => {
            updateAuthUI();
            // Clear URL parameters
            window.history.replaceState({}, document.title, window.location.pathname);
            showSuccessMessage('Successfully logged in with Discord!');
        }).catch(error => {
            console.error('Auth callback error:', error);
            showErrorModal('Authentication failed. Please try again.');
        });
    }
}

// Add a demo login button for testing
// Auth functions not needed in static mode

function updateAuthUI() {
    const loggedOutState = document.getElementById('auth-logged-out');
    const loggedInState = document.getElementById('auth-logged-in');
    const userAvatar = document.getElementById('user-avatar');
    const userName = document.getElementById('user-name');
    
    if (discordAuth.isAuthenticated()) {
        const user = discordAuth.getCurrentUser();
        
        loggedOutState.style.display = 'none';
        loggedInState.style.display = 'flex';
        
        if (user) {
            userAvatar.src = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
            userName.textContent = user.username;
        }
    } else {
        loggedOutState.style.display = 'block';
        loggedInState.style.display = 'none';
    }
}

function generateReportId() {
    const prefix = currentReportType.toUpperCase().substring(0, 3);
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `${prefix}-${timestamp}-${random}`.toUpperCase();
}

function adjustColor(color, amount) {
    const num = parseInt(color.substring(1), 16);
    const amt = Math.round(2.55 * amount);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

function showModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('active');
    
    // Close on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal(modalId);
        }
    });
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

function showErrorModal(message) {
    document.getElementById('error-message').textContent = message;
    showModal('error-modal');
}

function showSuccessMessage(message) {
    // Create a temporary success message
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    successDiv.style.cssText = `
        position: fixed;
        inset-block-start: 20px;
        inset-inline-end: 20px;
        background: #48bb78;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 3000;
        font-weight: 500;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// Utility function for smooth scrolling
function smoothScroll(target) {
    document.querySelector(target).scrollIntoView({
        behavior: 'smooth'
    });
}




