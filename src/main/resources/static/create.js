const form = document.forms["formNewUser"];
const applicantForm = document.getElementById('formNewUser')
applicantForm.addEventListener('submit', createUser)

async function createUser(event) {
    // Просим форму не отправлять данные самостоятельно
    event.preventDefault();
    let checkedRoles = [];
    for (let i = 0; i < form.roles.options.length; i++) {
        if (form.roles.options[i].selected) checkedRoles.push({
            id: form.roles.options[i].value,
            name: "ROLE_" + form.roles.options[i].text
        })
    }
    fetch("http://localhost:8080/api/admin", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            age: form.age.value,
            username: form.username.value,
            password: form.password.value,
            roles: checkedRoles
        })
    }).then(() => {
        form.reset();
        getUsers();
        $('#allUsersTable').click();
    })
}