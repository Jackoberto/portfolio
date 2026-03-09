document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');

    if (projectId) {
        // We are on project.html
        fetch('js/projects.json')
            .then(response => response.json())
            .then(projects => {
                const project = projects.find(p => p.id === projectId);
                if (project) {
                    loadProjectDetails(project);
                } else {
                    console.error('Project not found');
                    document.body.innerHTML = '<h1>Project not found</h1><p><a href="index.html">Go back to home</a></p>';
                }
            })
            .catch(error => {
                console.error('Error loading projects:', error);
            });
    } else if (document.querySelector('.grid-container')) {
        // We are on index.html and want to load the project list
        fetch('js/projects.json')
            .then(response => response.json())
            .then(projects => {
                loadProjectList(projects);
            })
            .catch(error => {
                console.error('Error loading project list:', error);
            });
    }
});

function loadProjectList(projects) {
    const gridContainer = document.querySelector('.grid-container');
    if (!gridContainer) return;

    gridContainer.innerHTML = ''; // Clear existing static content

    projects.forEach(project => {
        const projectDiv = document.createElement('div');
        projectDiv.className = 'project-container';
        
        projectDiv.innerHTML = `
            <a href="project.html?id=${project.id}">
                <h3 class="project-title">${project.title}: ${project.subTitle}</h3>
                <img class="project-image" src="${project.splashScreen}" alt="${project.title}: ${project.subTitle}" />
                <span class="project-cta">View Project</span>
            </a>
        `;
        gridContainer.appendChild(projectDiv);
    });
}

function loadProjectDetails(project) {
    if (document.getElementById('page-title')) document.getElementById('page-title').textContent = `${project.title} | Jack Karlsson Portfolio`;
    if (document.getElementById('project-title')) document.getElementById('project-title').textContent = project.title;
    if (document.getElementById('project-date')) document.getElementById('project-date').textContent = project.date;
    
    // Dynamic SEO Metadata
    const metaDesc = document.getElementById('meta-description');
    if (metaDesc) metaDesc.content = project.shortDescription || `Details about ${project.title}, a project by Jack Karlsson.`;
    
    const ogTitle = document.getElementById('og-title');
    if (ogTitle) ogTitle.content = `${project.title} | Jack Karlsson Portfolio`;
    
    const ogDesc = document.getElementById('og-description');
    if (ogDesc) ogDesc.content = project.shortDescription;
    
    const ogImage = document.getElementById('og-image');
    if (ogImage) ogImage.content = `https://jackkarlsson.com/${project.splashScreen}`;

    const twitterTitle = document.getElementById('twitter-title');
    if (twitterTitle) twitterTitle.content = `${project.title} | Jack Karlsson Portfolio`;
    
    const twitterDesc = document.getElementById('twitter-description');
    if (twitterDesc) twitterDesc.content = project.shortDescription;
    
    const twitterImage = document.getElementById('twitter-image');
    if (twitterImage) twitterImage.content = `https://jackkarlsson.com/${project.splashScreen}`;

    if (document.getElementById('project-description')) {
        if (project.description) {
            document.getElementById('project-description').innerHTML = project.description;
        }
        else if (project.shortDescription) {
            document.getElementById('project-description').innerHTML = project.shortDescription;
        }
    }
    if (document.getElementById('project-description-short')) document.getElementById('project-description-short').innerHTML = project.shortDescription;

    // Screenshots
    const screenshotsSection = document.getElementById('project-screenshots');
    if (screenshotsSection) {
        if (project.screenshots && project.screenshots.length > 0) {
            project.screenshots.forEach(src => {
                const img = document.createElement('img');
                img.className = 'project-screenshot';
                img.src = src;
                img.alt = `${project.title} Screenshot`;
                screenshotsSection.appendChild(img);
            });
        } else {
            screenshotsSection.style.display = 'none';
        }
    }

    // Role
    const roleElem = document.getElementById('project-role');
    if (roleElem) {
        if (project.role) {
            roleElem.textContent = project.role;
        } else {
            roleElem.style.display = 'none';
            const roleHeader = document.querySelector('#project-role-section h2');
            if (roleHeader) roleHeader.style.display = 'none';
        }
    }

    // Contributions
    const contributionsList = document.getElementById('project-contributions');
    if (contributionsList) {
        if (project.contributions && project.contributions.length > 0) {
            project.contributions.forEach(contribution => {
                const li = document.createElement('li');
                li.textContent = contribution;
                contributionsList.appendChild(li);
            });
        } else {
            const contContainer = document.getElementById('project-contributions-container');
            if (contContainer) contContainer.style.display = 'none';
        }
    }

    // Technologies
    const techList = document.getElementById('project-technologies');
    if (techList) {
        if (project.technologies && project.technologies.length > 0) {
            project.technologies.forEach(tech => {
                const li = document.createElement('li');
                li.textContent = tech;
                techList.appendChild(li);
            });
        } else {
            const techSection = document.getElementById('project-technologies-section');
            if (techSection) techSection.style.display = 'none';
        }
    }

    // Links
    const linksGrid = document.getElementById('project-links-grid');
    if (linksGrid) {
        if (project.links && project.links.length > 0) {
            project.links.forEach(link => {
                const a = document.createElement('a');
                a.className = 'project-link-card';
                a.href = link.url;
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
                a.ariaLabel = `Visit ${project.title} on ${link.platform}`;

                const logoSrc = link.logo;
                const logoDarkSrc = link.logoDark || link.logo; // Use normal logo if dark one isn't provided

                a.innerHTML = `
                    <div class="project-link-logo-box">
                        <img class="project-link-image logo-light" src="${logoSrc}" alt="${link.platform} Logo">
                        <img class="project-link-image logo-dark" src="${logoDarkSrc}" alt="${link.platform} Logo">
                    </div>
                    <div class="project-link-text">
                        <h3>${link.platform}</h3>
                        <p>${link.description}</p>
                    </div>
                `;
                linksGrid.appendChild(a);
            });
        } else {
            const linksSection = document.getElementById('project-links-section');
            if (linksSection) linksSection.style.display = 'none';
        }
    }
}
