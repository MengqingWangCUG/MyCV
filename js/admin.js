document.addEventListener('DOMContentLoaded', () => {
    const adminBtn = document.getElementById('admin-btn');
    const adminModal = new bootstrap.Modal(document.getElementById('adminModal'));
    const loginBtn = document.getElementById('login-btn');
    const saveJsonBtn = document.getElementById('save-json-btn');
    const uploadImageBtn = document.getElementById('upload-image-btn');
    const jsonTextarea = document.getElementById('json-textarea');
    const githubTokenInput = document.getElementById('github-token');
    const loginSection = document.getElementById('login-section');
    const editorSection = document.getElementById('editor-section');

    // Check for saved token
    const savedToken = localStorage.getItem('github_pat');
    if (savedToken) {
        githubTokenInput.value = savedToken;
    }

    adminBtn.addEventListener('click', () => {
        adminModal.show();
    });

    loginBtn.addEventListener('click', async () => {
        const token = githubTokenInput.value.trim();
        if (!token) {
            alert('Please enter a GitHub Token');
            return;
        }

        try {
            // Verify token by fetching user info
            const response = await fetch('https://api.github.com/user', {
                headers: {
                    'Authorization': `token ${token}`
                }
            });

            if (response.ok) {
                localStorage.setItem('github_pat', token);
                loginSection.style.display = 'none';
                editorSection.style.display = 'block';
                loadJsonData();
            } else {
                alert('Invalid Token');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Error logging in');
        }
    });

    async function loadJsonData() {
        try {
            // Check if we are running locally or on server
            if (window.cvData) {
                jsonTextarea.value = JSON.stringify(window.cvData, null, 2);
            } else {
                // Fallback to fetch if for some reason window.cvData isn't there but file exists (unlikely)
                const response = await fetch('js/data.js');
                const text = await response.text();
                const jsonStr = text.replace('window.cvData = ', '').replace(/;$/, '');
                jsonTextarea.value = jsonStr;
            }
        } catch (error) {
            console.error('Error loading data:', error);
            alert('Error loading current data');
        }
    }

    saveJsonBtn.addEventListener('click', async () => {
        const token = localStorage.getItem('github_pat');
        const newContent = jsonTextarea.value;

        try {
            // Validate JSON
            JSON.parse(newContent);

            // Prepare JS content
            const jsContent = `window.cvData = ${newContent};`;

            // Get current SHA of js/data.js
            const repoInfo = await getRepoInfo();
            const fileData = await getFileSha('js/data.js', repoInfo, token);

            // Update file
            await updateFile('js/data.js', jsContent, fileData.sha, repoInfo, token);

            alert('Changes saved! It may take a few minutes for the site to update.');
        } catch (error) {
            console.error('Error saving:', error);
            alert('Error saving changes: ' + error.message);
        }
    });

    uploadImageBtn.addEventListener('click', async () => {
        const token = localStorage.getItem('github_pat');
        const fileInput = document.getElementById('image-file');
        const pathInput = document.getElementById('image-path');
        const file = fileInput.files[0];
        const path = pathInput.value.trim();

        if (!file || !path) {
            alert('Please select a file and specify a path');
            return;
        }

        try {
            const content = await toBase64(file);
            const repoInfo = await getRepoInfo();

            // Check if file exists to get SHA (for update) or null (for create)
            let sha = null;
            try {
                const fileData = await getFileSha(path, repoInfo, token);
                sha = fileData.sha;
            } catch (e) {
                // File likely doesn't exist, which is fine
            }

            await updateFile(path, content, sha, repoInfo, token, true);

            alert('Image uploaded! It may take a few minutes to appear.');
        } catch (error) {
            console.error('Error uploading:', error);
            alert('Error uploading image: ' + error.message);
        }
    });

    // Helper functions
    async function getRepoInfo() {
        // Infer repo info from current URL if possible, or hardcode/ask user
        // For GitHub Pages: username.github.io/repo-name
        const pathSegments = window.location.pathname.split('/').filter(p => p);
        // Default to MengqingWangCUG/MyCV if we can't infer
        let owner = 'MengqingWangCUG';
        let repo = 'MyCV';

        // Try to infer from URL
        if (pathSegments.length >= 2 && window.location.hostname.includes('github.io')) {
            owner = window.location.hostname.split('.')[0];
            repo = pathSegments[0];
        }

        return { owner, repo };
    }

    async function getFileSha(path, repoInfo, token) {
        const url = `https://api.github.com/repos/${repoInfo.owner}/${repoInfo.repo}/contents/${path}`;
        const response = await fetch(url, {
            headers: { 'Authorization': `token ${token}` }
        });
        if (!response.ok) throw new Error('File not found or access denied');
        return await response.json();
    }

    async function updateFile(path, content, sha, repoInfo, token, isBase64 = false) {
        const url = `https://api.github.com/repos/${repoInfo.owner}/${repoInfo.repo}/contents/${path}`;
        const body = {
            message: `Update ${path} via Admin Interface`,
            content: isBase64 ? content.split(',')[1] : btoa(unescape(encodeURIComponent(content))), // Handle UTF-8 for text
            sha: sha
        };

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.message);
        }
    }

    function toBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }
});
