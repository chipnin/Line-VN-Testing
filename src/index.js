import './sass/main.scss';

function getDataFromDataSource() {
    return TABLE_DATA;
}

function appendAppWithTemplateItem(app) {
    return `
        <li class="dropdown-select-app__item">
            <img class="dropdown-select-app__thumbnail" src="${app.thumbnailUrl}" alt="">
            <span class="dropdown-select-app__name">${app.name}</span>
        </li>
    `;
}

function importDataSourceIntoDropdownList(dropdownElement) {
    const dataSource = getDataFromDataSource();
    
    let dropDownListHtmlContent = '';
    
    dataSource.forEach((app) => {
        dropDownListHtmlContent += appendAppWithTemplateItem(app);
    });
    
    dropdownElement.innerHTML = dropDownListHtmlContent;
}

document.addEventListener("DOMContentLoaded", function(event) { 
    let inputElement = document.querySelector('.box-select-app__input');
    let dropdownApp = document.querySelector('.dropdown-select-app');

    inputElement.addEventListener('focus', () => {
        importDataSourceIntoDropdownList(dropdownApp);

        dropdownApp.classList.add('show');
    });

    inputElement.addEventListener('focusout', () => {
        dropdownApp.classList.remove('show');
    });
});