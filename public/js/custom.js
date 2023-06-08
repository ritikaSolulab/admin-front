

$.fn.dataTable.ext.errMode = 'none';  
$('.backBtn').click(function(e) {
    e.preventDefault();
    window.history.back();
});
$(document).ready(function(){
    $('.datepicker').datepicker({
       
    });
    
    $('#data_5 .input-daterange').datepicker({
    keyboardNavigation: false,
    forceParse: false,
    autoclose: true
    });

    $('.dataTables-example1').DataTable( {
        pageLength: 5,
        responsive: true
    });

    $('input[name="daterange"]').daterangepicker({
        autoUpdateInput: true,
        // locale: {
        // 	cancelLabel: 'Clear'
        // },
        opens: 'left'
    });		

    $('input[name="daterange"]').on('apply.daterangepicker', function(ev, picker) {
        $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
    });
});

function resetForm(formId){
    $('#' + formId).trigger('reset');
}

function toastMsg(msg){
    toastr.show(msg);
}

function successModal(msg){
    $('#successMessage').modal();
    $('#successMessageBox').html(msg);
}

function subscriptionSuccessModal(msg) {
    $('#subscriptionSuccessMessage').modal();
    $('#subscriptionSuccessMessageBox').html(msg);
}

function errorModal(msg){
    $('#errorMessage').modal();
    $('#errorMessageBox').html(msg);
}



$.ajax({
    url: `${profileApi}/profile`,
    method: 'get',
    success(result) {
        const {data  :  { photo }} = result
        if(photo)
        {
            $('#userSmallDP').attr('src',photo)
        }else{
            $('#userSmallDP').attr('src','https://doctrace-ms.s3.amazonaws.com/profile_small.jpg')     
        }
    },
    error(xhr, status, error) {
    }
})