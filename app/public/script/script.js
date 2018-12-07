$(function() {
    $('#send').click(function() {
    // Gets the form data
    var name = $("input#nome").val();
    var mail = $("input#email").val();
    var senha= $("input#senha").val();
    // Stores the data on a variable
   
    console.log("ola");
    //Process the Data
    var data = {
        nome: name,
        email: mail,
        senha: senha
    }
    $.ajax({
        url: "http://localhost:8000/novoUsuario",
        type: "POST",
        dataType: 'json',
		data: JSON.stringify(data),
		contentType: 'application/json',
        success: function(data) {
            console.log(data);
        //Zeros the inputs values
        $('#name').val('');
        $('#email').val('');
        $('#senha').val('');
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log("erro");
            alert(xhr.status);
            alert(thrownError);
            }
    });
    return false;
    });
});