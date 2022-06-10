//path of the data 
const DATA_PATH = 'src/files/';

//Receive all the data to fill the select element
let __dataCodes__ = JSON.parse(fetchData(DATA_PATH+"data.json"));

//Create the select element with the data received above
let htmlSelectElement = createSelector("#code-selector");

//initial state of the select and the code container.
displayCodeSelected(-1);

//This event fires when the user selects an item from the select element.
htmlSelectElement.addEventListener("change", function(event){
    const selectedIndex = Number(event.target.value);
    displayCodeSelected(selectedIndex);
});

//This function create an HTML select element with all its items
function createSelector(elementId){
    let index = 0;
    let selector = document.querySelector(elementId);
    let selector_options = __dataCodes__.reduce((prev, curr) => {
        prev += `<option value="${index}">${curr.title}</option>`;
        index++;
        return prev;
    }, '<option value="-1" selected>No Snippet Code selected</option>');
    
    updateHTMLElements(elementId, selector_options); 
    return selector;  
}

// This function insert the selected Code Snippet and the information about that code in HTML containers elements
function displayCodeSelected(index){
    let contentToHtml = `<br><br><br><br><br>
            <code class="text-muted">//JS Code will be display here!</code>`;
    let codeDetail = '';

    if(index !== -1){
        const dataRepo = __dataCodes__[index];
        const filename = dataRepo.fileName;
        codeDetail = `<p class="fs-6 text-secondary lh-2 animate__animated animate__fadeInUp">${dataRepo.details}</p>`;
        const fileContent = getFileContent(DATA_PATH, filename);
        contentToHtml = `<code class="fw-semibold animate__animated animate__fadeInUp">${fileContent}</code>`;
    }
    updateHTMLElements("#display-js-code", contentToHtml);
    updateHTMLElements("#code-details", codeDetail);
}

// This function gets the content of a file in string format
function getFileContent(path, filename){
    let content = fetchData(path+filename);
    return content;
}

// This function insert any content in any HTML element
function updateHTMLElements(elementId, contentUpdated){
    let containerCode = document.querySelector(elementId);
    containerCode.innerHTML = contentUpdated;  
}

//This function builds an HTTTP Request using the GET method
function fetchData(filePath){
    const HEADERS = new Headers();
    const INIT = { method: 'GET',
                headers: HEADERS,
                mode: 'cors',
                cache: 'default' };
    const REQUEST = new Request(filePath, INIT);

    try {
        
        let req = new XMLHttpRequest();
        req.open('GET', REQUEST.url, false);
        req.send(null);
        if(req.status == 0)
            dump(req.responseText);
            return req.responseText;
    }
    catch (err) {
        return err;
    }
}
