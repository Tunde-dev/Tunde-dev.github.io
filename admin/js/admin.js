let customers = [
    {
        id: 1,
        firstname: "Veres",
        lastname: "Tünde",
        address: "Záhony, Ady Endre út",
        zipCode: "4625",
        email: "tunderke86@gmail.com",
        phone: "+3670000000",
    },
    {
        id: 2,
        firstname: "Sass",
        lastname: "Zoltán",
        address: "Záhony, Ady Endre út",
        zipCode: "4625",
        email: "sasszoltan@gmail.com",
        phone: "+3670000026",  
    },
    {
        id: 3,
        firstname: "Kiss",
        lastname: "Piroska",
        address: "Záhony, Krúdy Gyula út 25",
        zipCode: "4625",
        email: "kisspiroska@gmail.com",
        phone: "+3630000000",  
    },
    {
        id: 4,
        firstname: "Nagy",
        lastname: "Gyula",
        address: "Záhony, Újélet utca 3, 2/10",
        zipCode: "4625",
        email: "nagygyula@gmail.com",
        phone: "+3620000000",  
    },
];

const fields = Object.keys(customers[0]);
let table = document.querySelector("#customersTable tbody");
let rowIndex;

function drawTable() {
    let content = "";
    for(let i = 0; i < customers.length; i++) {
        content += getTableRow(customers[i]);
    }
    table.innerHTML = content;
}
function getTableRow(customer) {
    return `<tr>
        <td>${customer.id}</td>
        <td>${customer.firstname}</td>
        <td>${customer.lastname}</td>
        <td>${customer.address}</td>
        <td>${customer.zipCode}</td>
        <td>${customer.email}</td>
        <td>${customer.phone}</td>
        <td>
            <div class="btn-group">
                <button type="button" value="${customer.id}" class="js-edit btn btn-info">Szerkesztés</button>
                <button type="button" class="js-delete btn btn-danger">Törlés</button>
            </div>
        </td>
    </tr>`;
}
function getTableRowInputs(customer) {
    let content = "";
    for(let i = 0; i < fields.length; i++) {
        content += `<td><input name="${fields[i]}" value="${customer[fields[i]]}"></td>`;
    }
    return content + `<td>
            <div class="btn-group">
                <button type="button" class="js-edit btn btn-success">Mentés</button>
                <button type="button" class="js-cancel btn btn-secondary">Mégse</button>
            </div>
        </td>`;
}
function getCustumerById(id) {
    for(i = 0; i < customers.length; i++) {
        if(id == customers[i].id) {
            return customers[i];
        }
    }
    return null;
}
drawTable();

function restoreRow(){
    if(rowIndex != null) {
        table.deleteRow(rowIndex);
        rowIndex = null;
        let hiddenRow = document.querySelector("table .d-none");
        if(hiddenRow != null){
            hiddenRow.setAttribute("class", "");
        }
    }
}

const editButtons = document.querySelectorAll(".js-edit");
for(let i = 0; i < editButtons.length; i++){
    editButtons[i].addEventListener("click", function(ev) {
        let customer = getCustumerById(ev.target.value);
        let currentRow = ev.target.parentElement.parentElement.parentElement;

        restoreRow();

        rowIndex = currentRow.rowIndex;
        let row = table.insertRow(currentRow.rowIndex);
        row.innerHTML = getTableRowInputs(customer);
        currentRow.setAttribute("class", "d-none");

        const btnCancel = document.querySelector(".js-cancel");
        btnCancel.addEventListener("click", restoreRow);
    });
}

const deleteButtons = document.querySelectorAll(".js-delete");
for(let i = 0; i < deleteButtons.length; i++){
    deleteButtons[i].addEventListener("click", function(ev) {
        if(confirm("Biztos törli a felhasználót?")){
            let customer = getCustumerById(ev.target.value);
            let currentRow = ev.target.parentElement.parentElement.parentElement;
            table.deleteRow(currentRow.rowIndex);
        }
    });
}


/*
for(let i = 0; i < editButtons.length; i++){
    editButtons[i].addEventListener("click", function(ev){
        let row = ev.target.parentElement.parentElement.parentElement;
        for(let j = 0; j < row.children.length; j++){
            if(j != row.children.length-1) {
                let value = row.children[j].innerHTML;
                row.children[j].innerHTML = `<input name="${fields[j]}" value="${value}">`;
            } else {
                row.children[j].innerHTML =`<div class="btn-group">
                <button type="button" class="js-submit btn btn-success">Mentés</button>
                <button type="button" class="btn btn-secondary">Mégse</button>
            </div>`;
            } 
        }
    });

}*/
function modify() {


}