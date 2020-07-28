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
function drawTable() {
    let table = document.querySelector("#customersTable tbody");
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
                <button type="button" class="btn btn-info">Szerkesztés</button>
                <button type="button" class="btn btn-danger">Törlés</button>
            </div>
        </td>
    </tr>`;
}
drawTable();