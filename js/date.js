
    document.addEventListener('DOMContentLoaded', function() {
        const copyrightElement = document.getElementById('copyright');
        const currentYear = new Date().getFullYear();
        copyrightElement.textContent = `Copyright © ${currentYear} MySchoolProject. All rights reserved | Happycode Technologies & Graphitie originals.`;
    });
