async function deleteUser(modal, id) {
    let oneUser = await userFetch.findOneUser(id);
    let user = oneUser.json();

    modal.find('.modal-title').html('Delete user');

    let deleteButton = `<button  class="btn btn-danger" id="deleteButton">Delete</button>`;
    let closeButton = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`
    modal.find('.modal-footer').append(deleteButton);
    modal.find('.modal-footer').append(closeButton);

    user.then(user => {
        let bodyForm = `
            <form class="form-group text-center" id="deleteUser">
               <div class="form-group">
                    <label for="userId" class="col-form-label">ID</label>
                    <input type="text" class="form-control username" id="userId" value="${user.id}" readonly>
               </div>
                <div class="form-group">
                    <label for="firstName" class="com-form-label">First name</label>
                    <input type="text" class="form-control" id="firstName" value="${user.firstName}" readonly>
                </div>
                <div class="form-group">
                    <label for="lastName" class="com-form-label">Last name</label>
                    <input type="text" class="form-control" id="lastName" value="${user.lastName}" readonly>
                    
                </div>
                <div class="form-group">
                    <label for="age" class="com-form-label">Age</label>
                    <input type="text" class="form-control" id="age" value="${user.age}" readonly>
                    <div class="invalid-feedback">
                        Age cannot be empty
                    </div>
                </div>
                
                 <div class="form-group">
                    <label for="username" class="col-form-label">Email</label>
                    <input type="text" class="form-control username" id="username" value="${user.username}" readonly>
               </div>
   
                 <div class="form-group">
                     <label for="rolesDelete" class="com-form-label">Role:</label>
                        <select multiple id="rolesDelete" class="form-control select" size="2" required="required">
                             <option selected="selected" value="ROLE_USER">USER</option>
                             <option value="ROLE_ADMIN">ADMIN</option>
                        </select>
                </div>
            </form>
        `;
        modal.find('.modal-body').append(bodyForm);
    })

    $("#deleteButton").on('click', async () => {
        const response = await userFetch.deleteUser(id);

        if (response.ok) {
            await getUsers();
            modal.modal('hide');
        } else {
            let body = await response.json();
            let alert = `<div class="alert alert-danger alert-dismissible fade show col-12" role="alert" id="messageError">
                            ${body.info}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`;
            modal.find('.modal-body').prepend(alert);
        }
    })
}