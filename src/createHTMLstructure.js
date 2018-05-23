function getElementById(id) {
    return document.getElementById(id);
}

function createElement(tag) {
    return document.createElement(tag);
}

function createTextStructure() {

    const textOutput = getElementById(`textOutput-content`);
    const heading = createElement(`h1`);
    const contentSummary = createElement(`p`);
    const contentTable = createElement(`table`);
    const contentDetails = createElement(`p`);

    textOutput.style.position = `absolute`;
    textOutput.style.left = `-1000px`;
    textOutput.style.top = `auto`;
    textOutput.style.width = `1px`;
    textOutput.style.height = `1px`;
    textOutput.style.overflow = `hidden`;

    textOutput.appendChild(heading);
    textOutput.appendChild(contentSummary);
    textOutput.appendChild(contentTable);
    textOutput.appendChild(contentDetails);

    heading.innerHTML = `Text Output`;

    contentSummary.setAttribute(`id`, `textOutput-content-summary`);
    contentSummary.setAttribute(`tabIndex`, `0`);
    contentSummary.setAttribute(`aria-label`, `text output summary`)
    contentSummary.setAttribute(`role`, `main`);

    contentTable.setAttribute(`id`, `textOutput-content-table`);
    contentTable.setAttribute(`summary`, `text output details`);

    contentDetails.setAttribute(`id`, `textOutput-content-details`);
    contentDetails.setAttribute(`tabIndex`, `0`);
    contentDetails.setAttribute(`aria-label`, `text output details`);
    contentDetails.setAttribute(`role`, `main`);

}

function createTableStructure() {

    const tableOutput = getElementById(`tableOutput-content`);
    const heading = createElement(`h1`);
    const contentSummary = createElement(`p`);
    const contentTable = createElement(`table`);
    const contentDetails = createElement(`div`);

    tableOutput.style.position = `absolute`;
    tableOutput.style.left = `-1000px`;
    tableOutput.style.top = `auto`;
    tableOutput.style.width = `1px`;
    tableOutput.style.height = `1px`;
    tableOutput.style.overflow = `hidden`;

    tableOutput.appendChild(heading);
    tableOutput.appendChild(contentSummary);
    tableOutput.appendChild(contentTable);
    tableOutput.appendChild(contentDetails);

    heading.innerHTML = `Table Output`;

    contentSummary.setAttribute(`id`, `tableOutput-content-summary`);
    contentSummary.setAttribute(`tabIndex`, `0`);
    contentSummary.setAttribute(`aria-label`, `table text output summary`)
    contentSummary.setAttribute(`role`, `main`);

    contentTable.setAttribute(`id`, `tableOutput-content-table`);
    contentTable.setAttribute(`summary`, `table output details`);

    contentDetails.setAttribute(`id`, `tableOutput-content-details`);
    contentDetails.setAttribute(`tabIndex`, `0`);
    contentDetails.setAttribute(`aria-label`, `table output elements`);
    contentDetails.setAttribute(`role`, `main`);
}

if (getElementById(`textOutput-content`)) {
    createTextStructure();
}

if (getElementById(`tableOutput-content`)) {
    createTableStructure();
}