let currentProject = null;
let projectData = {};

const projectTitles = {
    'weather': '🌤️ Weather Wizard',
    'random-fact': '🤓 Random Facts',
    'cat-pics': '🐱 Cat Pictures',
    'dog-pics': '🐶 Dog Pictures',
    'space-info': '🚀 Space Explorer',
    'pokemon': '⚡ Pokemon Info',
    '3d-viewer': '🎮 3D Model Viewer',
    'memes': '😂 Meme Generator',
    'funny-names': '🎭 Funny Names',
    'ai-fun': '🤖 AI Fun'
};

function initApp() {
    particlesJS('background', {
        particles: {
            number: { value: 150 },
            color: { value: '#ff69b4' },
            opacity: { value: 0.6 },
            size: { value: 4 },
            line_linked: { enable: false },
            move: { enable: true, speed: 2, direction: 'bottom' }
        }
    });
    showHomepage();
}

async function loadProject(projectName) {
    console.log('Loading project:', projectName);

    try {
        currentProject = projectName;

        const homepage = document.getElementById('homepage');
        const projectContent = document.getElementById('projectContent');
        const codeViewBtn = document.getElementById('codeViewBtn');
        const downloadBtn = document.getElementById('downloadBtn');
        const breadcrumb = document.getElementById('breadcrumb');

        console.log('Hiding homepage, showing project content');
        homepage.classList.add('hidden');
        projectContent.classList.remove('hidden');
        codeViewBtn.classList.remove('hidden');
        downloadBtn.classList.remove('hidden');

        console.log('Homepage hidden:', homepage.classList.contains('hidden'));
        console.log('Project content visible:', !projectContent.classList.contains('hidden'));

        breadcrumb.innerHTML = `
            <ul>
                <li><button onclick="showHomepage()" class="link link-hover">🏠 Home</button></li>
                <li><span class="text-lg font-semibold">${projectTitles[projectName]}</span></li>
            </ul>
        `;

        await loadProjectFiles(projectName);
        await loadProjectContent(projectName);

        console.log('Project loaded successfully:', projectName);
    } catch (error) {
        console.error('Error loading project:', error);
        showToast('❌ Error loading project. Please try again.');
    }
}

async function loadProjectFiles(projectName) {
    const htmlPath = `html-files/${projectName}/index.html`;
    const jsPath = `html-files/${projectName}/app.js`;

    const [htmlResponse, jsResponse] = await Promise.all([
        fetch(htmlPath),
        fetch(jsPath)
    ]);

    projectData.html = await htmlResponse.text();
    projectData.js = await jsResponse.text();
    projectData.name = projectName;
}

async function loadProjectContent(projectName) {
    const projectFrame = document.getElementById('projectFrame');

    let modifiedHtml = projectData.html
        .replace('<script src="app.js"></script>', `<script>${projectData.js}</script>`)
        .replace('<script src="../../shared/header.js"></script>', '')
        .replace('<script src="../../shared/footer.js"></script>', '')
        .replace('loadHeader(); loadFooter(); ', '')
        .replace('<link rel="stylesheet" href="styles.css">', '')
        .replace('<link rel="stylesheet" href="./styles.css">', '');

    console.log('Loading project content into frame');
    console.log('Project frame element:', projectFrame);
    console.log('Modified HTML length:', modifiedHtml.length);

    projectFrame.innerHTML = `
        <iframe
            id="projectIframe"
            srcdoc="${modifiedHtml.replace(/"/g, '&quot;').replace(/'/g, '&#39;')}"
            class="w-full h-full border-0"
            sandbox="allow-scripts allow-forms allow-downloads"
            style="background: white; min-height: 500px;">
        </iframe>
    `;

    console.log('Iframe created, content loaded');
}

function showHomepage() {
    currentProject = null;

    const homepage = document.getElementById('homepage');
    const projectContent = document.getElementById('projectContent');
    const codeViewBtn = document.getElementById('codeViewBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const breadcrumb = document.getElementById('breadcrumb');
    const codeViewer = document.getElementById('codeViewer');

    homepage.classList.remove('hidden');
    projectContent.classList.add('hidden');

    // Hide the code buttons on homepage
    codeViewBtn.classList.add('hidden');
    downloadBtn.classList.add('hidden');
    codeViewer.style.width = '0';

    breadcrumb.innerHTML = `
        <ul>
            <li><span class="text-lg font-semibold">🏠 Home</span></li>
        </ul>
    `;

    const mainContent = document.getElementById('mainContent');
    mainContent.style.marginRight = '0';
}

function toggleCodeViewer() {
    if (!currentProject) return;

    const codeViewer = document.getElementById('codeViewer');
    const mainContent = document.getElementById('mainContent');
    const htmlCodeEl = document.getElementById('htmlCode');
    const jsCodeEl = document.getElementById('jsCode');

    if (codeViewer.style.width === '0px' || codeViewer.style.width === '') {
        codeViewer.style.width = '500px';
        mainContent.style.marginRight = '500px';

        htmlCodeEl.textContent = formatCode(projectData.html);
        jsCodeEl.textContent = formatCode(projectData.js);
    } else {
        codeViewer.style.width = '0';
        mainContent.style.marginRight = '0';
    }
}

function formatCode(code) {
    return code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

async function copyCode(elementId) {
    const codeElement = document.getElementById(elementId);
    const code = codeElement.textContent;

    await navigator.clipboard.writeText(code);

    showToast('📋 Code copied to clipboard! 🎉');
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'alert alert-success fixed top-20 right-4 w-auto z-50 shadow-lg';
    toast.innerHTML = `<span>${message}</span>`;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

async function downloadProject() {
    if (!currentProject) return;

    const zip = new JSZip();

    const cleanHtml = projectData.html
        .replace('<script src="../../shared/header.js"></script>\n    ', '')
        .replace('<script src="../../shared/footer.js"></script>\n    ', '')
        .replace('loadHeader(); loadFooter(); ', '');

    zip.file('index.html', cleanHtml);
    zip.file('app.js', projectData.js);

    const zipBlob = await zip.generateAsync({ type: 'blob' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(zipBlob);
    link.download = `${currentProject}-project.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(`📁 ${projectTitles[currentProject]} downloaded! 🎉`);
}