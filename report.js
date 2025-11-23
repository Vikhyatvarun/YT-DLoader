document.addEventListener('DOMContentLoaded', () => {
    // Set default date and time to current
    const now = new Date();
    document.getElementById('date').valueAsDate = now;
    document.getElementById('time').value = now.toTimeString().substring(0, 5);

    // Handle screenshot checkbox toggle
    const screenshotCheckbox = document.getElementById('screenshot');
    const screenshotInputContainer = document.createElement('div');
    screenshotInputContainer.id = 'screenshotInputContainer'; // Added ID for easy reference in reset
    screenshotInputContainer.className = 'mt-4 hidden';
    screenshotInputContainer.innerHTML = `
        <label for="screenshotFile" class="block text-sm font-medium text-gray-700 mb-1">Upload Screenshot</label>
        <input type="file" id="screenshotFile" name="screenshotFile" accept=".png,.jpg,.jpeg" class="w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-primary-50 file:text-primary-700
            hover:file:bg-primary-100">
    `;
    // FIXED: Insert right after the checkbox's parent div (flex items-center), NOT at the end of the form
    screenshotCheckbox.parentElement.insertAdjacentElement('afterend', screenshotInputContainer);

    screenshotCheckbox.addEventListener('change', (e) => {
        if (e.target.checked) {
            screenshotInputContainer.classList.remove('hidden');
        } else {
            screenshotInputContainer.classList.add('hidden');
            document.getElementById('screenshotFile').value = '';
        }
    });

    // Form submission handler
    document.getElementById('reportForm').addEventListener('submit', function(e) {
        e.preventDefault();
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value || 'Not provided',
            issueType: document.getElementById('issueType').value,
            description: document.getElementById('description').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            hasScreenshot: document.getElementById('screenshot').checked,
            timestamp: new Date().toISOString()
        };

        // Clean the reporter name and issue type for filename
        const cleanName = formData.name.replace(/[^a-zA-Z0-9]/g, '_');
        const cleanIssueType = formData.issueType.replace(/[^a-zA-Z0-9]/g, '_');
        const cleanDate = new Date().toISOString().split('T')[0].replace(/-/g, '');
        
        // Create folder name and filename
        const folderName = `${cleanName}_${cleanIssueType}_${cleanDate}`;
        const fileName = `${folderName}.txt`;

        // Create report content
        const reportContent = `
Bug Report/feedback - ${formData.name} - ${formData.issueType} - ${formData.date}
----------------------------------------
Reporter Name: ${formData.name}
Email: ${formData.email}
Issue Type: ${formData.issueType}
Date of Issue: ${formData.date}
Time of Issue: ${formData.time}
Screenshot Available: ${formData.hasScreenshot ? 'Yes' : 'No'}

Description:
${formData.description}
        `;

        // Create folder and save files
        saveReportWithScreenshot(reportContent, fileName, folderName, formData.hasScreenshot);
        
        // Show success toast and reset form
        showToast('Your report submitted successfully! Thank you!');
        this.reset();
        document.getElementById('screenshotFile').value = '';
        document.getElementById('screenshotInputContainer').classList.add('hidden');
        
        // Reset date and time to current
        const newNow = new Date();
        document.getElementById('date').valueAsDate = newNow;
        document.getElementById('time').value = newNow.toTimeString().substring(0, 5);
        
        // Scroll to success message
        document.getElementById('successMessage').scrollIntoView({ behavior: 'smooth' });
    });
});

function showToast(message, duration = 3000) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        toast.classList.add('hide');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, duration);
}

async function saveReportWithScreenshot(content, fileName, folderName, hasScreenshot) {
    // In a real app, this would be a server-side operation
    // For this demo, we'll create a ZIP with the folder structure (reports/{folderName}/{fileName} + screenshot)
    
    // Note: You MUST add this script tag to your HTML <head> for JSZip to work:
    // <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
    
    if (typeof JSZip === 'undefined') {
        console.error('JSZip not loaded! Add <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script> to your HTML head.');
        alert('Error: JSZip library is required. Please add it to your HTML.');
        return;
    }
    
    const zip = new JSZip();
    const reportsFolder = zip.folder('reports');
    const reportFolder = reportsFolder.folder(folderName);
    
    // Add the TXT file to the subfolder
    reportFolder.file(fileName, content);
    
    // Handle screenshot if available
    if (hasScreenshot) {
        const screenshotFile = document.getElementById('screenshotFile').files[0];
        if (screenshotFile) {
            // Add the image file to the subfolder (keeps original name)
            reportFolder.file(screenshotFile.name, screenshotFile);
        }
    }
    
    // Generate the ZIP as a blob
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const zipURL = URL.createObjectURL(zipBlob);
    
    // Trigger download of the ZIP
    const downloadLink = document.createElement('a');
    downloadLink.href = zipURL;
    downloadLink.download = 'reports.zip';  // User can extract this to get the folder structure
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    
    // Clean up URL
    URL.revokeObjectURL(zipURL);
    
    // In a real implementation, you would send this ZIP to your server
    console.log('Report ZIP created with structure: reports/' + folderName + '/{files}');
    console.log('Report content:', content);
    if (hasScreenshot) {
        console.log('With screenshot:', document.getElementById('screenshotFile').files[0]?.name);
    }
}