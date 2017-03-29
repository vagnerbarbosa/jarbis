$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').focus();
});

$("#cnpj").keydown(function(){
    try {
    	$("#cnpj").unmask();
    } catch (e) {}

    var tamanho = $("#cnpj").val().length;

    if(tamanho < 11){
        $("#cnpj").mask("999.999.999-99");
    } else if(tamanho >= 11){
        $("#cnpj").mask("99.999.999/9999-99");
    }
});
