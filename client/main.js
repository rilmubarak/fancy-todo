$(document).ready(function () {
    if (localStorage.token) {
        afterLogin()
    } else {
        beforeLogin()
    }
});

function beforeLogin () {
    $("#register-form").hide()
    $("#login-form").show()
    $("#logout").hide()

    $("#table").hide()
    $("#table-list").hide()
    $("#add-button").hide()
    $("#form-add").hide()
    $("#form-edit").hide()

    $("#add-error").hide()
    $("#edit-error").hide()
    $("#back-button").hide()

    $("#error-add").hide()
    $("#error-login").hide()
    $("#error-register").hide()
    $("#error-add").hide()

    $("#card-todos").hide()
    $("#card-list-container").hide()
}

function afterLogin () {
    $("#register-form").hide()
    $("#login-form").hide()
    $("#logout").show()

    $("#table").show()
    $("#table-list").show()
    $("#add-button").show()
    $("#form-add").hide()
    $("#form-edit").hide()

    $("#add-error").hide()
    $("#edit-error").hide()
    $("#back-button").hide()

    $("#error-add").hide()
    $("#error-login").hide()
    $("#error-register").hide()
    $("#error-add").hide()
    $("#add-card").show()

    $("#card-todos").show()
    $("#card-list-container").show()

    getTodoList()
}

const baseUrl = `http://localhost:3000`

function processLogin (event) {
    event.preventDefault();
    
    $.ajax({
        method: "POST",
        url: `${baseUrl}/login`,
        data: {
            email: $('#emailLogin').val(),
            password: $('#passwordLogin').val(),
        }
    })
    .done((todos) => {
        localStorage.token = todos.access_token
        afterLogin()
    })
    .fail((err) => {
        $("#error-login").text(err.responseJSON.message).show()
        console.log('Error:', err);
    })
    .always(() => {
        $('#emailLogin').val('')
        $('#passwordLogin').val('')
    })
}

function processRegister (event) {
    event.preventDefault();
  
    $.ajax({
      method: "POST",
      url: `${baseUrl}/register`,
      data: {
          email: $('#emailRegister').val(),
          password: $('#passwordRegister').val()
      }
    })
    .done((todos) => {
        beforeLogin()
        $('#front-page').hide()
        // $('#navbar-todos').show()
        $("#login-form").show()
        console.log('Success Register');
    })
    .fail((err) => {
        $('#error-register').text(err.responseJSON.message).show()
        console.log("Error:", err)
    })
    .always(() => {
        $('#emailRegister').val('')
        $('#passwordRegister').val('')
    })
}

function logOut (event) {
    event.preventDefault()

    localStorage.clear()
    beforeLogin()
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
    $(`#todoEmpty`).empty()
}

function makeAccount (event) {
    event.preventDefault()
    $('#register-form').show()
    $('#login-form').hide()
}

function haveAccount (event) {
    event.preventDefault()
    $('#register-form').hide()
    $('#login-form').show()
}

function toggle(obj) {
    var obj = document.getElementById(obj);
    console.log(obj)
    if (obj.style.display == "block") obj.style.display = "none";
    else obj.style.display = "block";
}

function getTodoList () {
    $('#card-list').empty()
    $(`#todoEmpty`).empty()
    $.ajax({
      method: "GET",
      url: `${baseUrl}/todos`,
      headers: {
        access_token: localStorage.token
      }
    })
    .done((todos) => {
        if (todos.length === 0) {
            $(`#todoEmpty`).append(
                `<h2 class="text-center">You haven't done anything yet. &#128542</h2>`
            )
        } else {
            let counter = 1
            todos.forEach(item => {
                $('#card-list').append(`
                    <div class="card mx-2 mt-4 col-3" id="card-todos" style="width: 18rem;">
                    <img class="card-img-top" src="${item.qrCode}" alt="Card image cap">
                    <div class="card-body" style="background-color: whitesmoke;">
                        <h5 class="card-title">${item.title}</h5>
                        <a href="javascript: void(0);" onClick="toggle('ex${counter}')">Click to see your to-do!</a><br>
                        <p id="ex${counter}" style="display:none;">${item.description}</p>
                        <span class="font-weight-bold"><i class="fa fa-hourglass-half"></i> ${new Date(item.due_date).toDateString()}</span>
                        <br><span class="font-weight-bold"><i class="fa fa-check-square-o"></i> Status: ${item.status}</span>
                        <br><br><a data-toggle="modal" data-target="#form-edit" onclick="getEdit(${item.id}, event)" role="button" class="btn btn-warning btn-sm"><i class="fa fa-edit"></i> Edit</a>
                        <a role="button" onclick="deleteAllert(${item.id}, event)" class="btn btn-danger btn-sm"><i class="fa fa-trash"></i> Delete</a>
                    </div>
                    </div>
                    `)
                counter++
        });
        }

        console.log(todos);
    })
    .fail(err => {
        console.log("Error:", err)
    })
    .always(() => {})
}

function add (event) {
    event.preventDefault()

    $('#form-edit').hide()
    $('#form-add').show()
    $('#table-list').hide()
    $('#table').hide()
    $('#add-button').hide()
}

function resetFormAdd() {
    $(`#add-title`).val(``),
    $(`#add-description`).val(``),
    $(`#add-status`).val(`select`),
    $(`#add-due_date`).val(``),
    $(`#alertAdd`).empty()
}

function getAdd (event) {
    event.preventDefault()
    $('#form-edit').hide()

    const newTodo = {
        title: $('#add-title').val(),
        description: $('#add-description').val(),
        status: $('#add-status').val(),
        due_date: $('#add-due_date').val()
    }
    $.ajax({
        method: "POST",
        url: `${baseUrl}/todos`,
        data: {
            title: newTodo.title,
            description: newTodo.description,
            status: newTodo.status,
            due_date: newTodo.due_date,
        },
        headers: {
            access_token: localStorage.token
        }
    })
    .done((todos) => {
        $('#form-add').modal('hide')
        resetFormAdd()
        afterLogin()
    })
    .fail((err) => {
        console.log("error", err.responseJSON)
        $('#add-error').text(err.responseJSON.message).show()
    })
    .always(() => {})
}

function getEdit (id, event) {
    event.preventDefault()
    $('#form-add').hide()
    $('#form-edit').show()
    $('#table-list').hide()
    $('#table').hide()

    $.ajax({
        method: 'GET',
        url: `${baseUrl}/todos/${id}`,
        headers: {
            access_token: localStorage.token
        }
    })
    .done((todos) => {
        id = todos.id
        let due_date = new Date(todos.due_date) 
        let day = due_date.getDate() > 9 ? due_date.getDate() : `0${due_date.getDate()}`
        let month = due_date.getMonth() + 1 > 9 ? due_date.getMonth() : `0${due_date.getMonth()+1}`
        let year = due_date.getFullYear()
        due_date = `${year}-${month}-${day}`
        $('#edit-title').val(todos.title)
        $('#edit-description').val(todos.description)
        $('#edit-status').val(todos.status)
        $('#edit-due_date').val(due_date)
        $('#edit-id').val(todos.id)
    })
    .fail((err) => {
        console.log(err.responseJSON.message)
    })
    .always(() => {})
}

function processEdit (event) {
    event.preventDefault()
    const id = $('#edit-id').val()
    const title = $('#edit-title').val()
    const description = $('#edit-description').val()
    const status = $('#edit-status').val()
    const due_date = $('#edit-due_date').val()

    console.log(title, description, status, due_date)

    $.ajax({
        method: 'PUT',
        url: `${baseUrl}/todos/${id}`,
        data: {
            title : title,
            description : description,
            status : status,
            due_date : due_date
        },
        headers: {
            access_token: localStorage.token
        }
    })
    .done((todos) => {
        $('#form-edit').modal('hide')
        afterLogin()
    })
    .fail((err) => {
        $('#edit-error').text(err.responseJSON.message).show()
        console.log(err)
    })
    .always(() => {})
}

function deleteAllert (id, event) {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: ['cancel', 'destroy'],
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            processDelete (id, event)
            swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
            });
        } else {
            swal("Your imaginary file is safe!");
        }
    });
}

function processDelete (id, event) {
    event.preventDefault()
    $.ajax({
        method: 'DELETE',
        url: `${baseUrl}/todos/${id}`,
        headers: {
            access_token: localStorage.token
        }
    })
    .done( data => {
        afterLogin()
    })
    .fail( err =>{
        console.log(err)
        $('#errorDelete').text(err.responseJSON.message).show()
    })
    .always()
}

function back (event) {
    event.preventDefault()
    afterLogin()
    $("#img-detail").hide()
}

// Google-OAuth
function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
      method: "POST",
      url: `${baseUrl}/googleSignin`,
      data: { id_token }
    })
    .done(todos => {
        console.log(todos.access_token, "INI ACCESS TOKEN");
        localStorage.token = todos.access_token
        afterLogin()
      })
    .fail(err => {
        console.log(err)
    })
    .always(() => {})
}


