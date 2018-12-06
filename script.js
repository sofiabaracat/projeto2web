$(function() {
    $('#send').click(function() {
    // Gets the form data
    var name = $("input#nome").val();
    var mail = $("input#email").val();
    var senha= $("input#senha").val();
    // Stores the data on a variable
   
    //Process the Data
    var data = {
        nome = name,
        email = mail,
        senha = senha
    }
    $.ajax({
        type: "POST",
        url: "localhost:8000/novoUsuario",
        dataType: 'json',
		data: data,
		contentType: 'application/json',
        success: function(data) {
            console.log(data);
        //Zeros the inputs values
        $('#name').val('');
        $('#email').val('');
        $('#senha').val('');
        }
    });
    return false;
    });
});