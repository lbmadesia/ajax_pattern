
function callAjax(type,url,data,btn,alert,funName){
  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });
   $.ajax({
      type : type,
      url : url,
      cache: false,
      contentType: false,
      processData: false,
      data: data,
      beforeSend: function () {
        $(btn).attr('disabled', 'disabled');
        $(alert).html(`<div class="alert alert-info alert-dismissible"> Please wait...</div>`);
    },
      success : function(res){
        $(btn).removeAttr('disabled');
        $(alert).html(` <div class="alert alert-success alert-dismissible">
        <button type="button" class="close" data-dismiss="alert">&times;</button>`+ res.message + `.
      </div>`);
        setTimeout(() => {
          $(alert).html('');
      }, 10000);
          var aData = {"status":true,"data":res.data};
          funName(aData);
      },
      error : function(xhr){
          $(btn).removeAttr('disabled');
          $(alert).html(` <div class="alert alert-danger alert-dismissible">
          <button type="button" class="close" data-dismiss="alert">&times;</button>`+ xhr.responseJSON.message + `.
        </div>`);
          setTimeout(() => {
            $(alert).html('');
        }, 10000);
        var aData = {"status":false,"data":xhr};
          funName(aData);
        }
   });
}

//aipAddress_form

$(document).ready(function(){
  $("#aipAddress_form").submit(function(e){
    e.preventDefault();
    var data = new FormData(this);
    var ajaxData = callAjax('POST',"ipsave",data,"#aipAddress_submit",".aipAddress_btnalert",allotip);
  });
});

function allotip(adata){
 // adata = JSON.parse(adata);
  console.log(adata);
}