function daysFilter(value) {
    let startDate = new Date();
    let endDate = new Date();
    if (value === '30d') {
        startDate.setDate(endDate.getDate() - 30);
    } else if (value === '90d') {

        startDate.setDate(endDate.getDate() - 90);
    } else if (value === '1y') {

        startDate.setDate(endDate.getDate() - 365);
    }
    startDate = moment(startDate).format('MM/DD/YYYY');
    endDate = moment(endDate).format('MM/DD/YYYY');
    $('#startDate').val(startDate);
    $('#endDate').val(endDate);
    getFilteredCountAjax(startDate,endDate);
}
function getFilteredCount(){
    if(new Date($('#startDate').val()) <=   new Date($('#endDate').val()))
    {
        getFilteredCountAjax($('#startDate').val(),$('#endDate').val());
    }else{
        swal({
            text: 'please select correct date'
        });
    }
}

function getFilteredCountAjax(startDate,endDate){
    $.ajax({
        url: `${dashboardApi}?startDate=${startDate}&endDate=${endDate}`,
        method: 'get',
        headers:{ 'authorization': JSON.parse(localStorage.getItem("token"))},
        success: (result) => {
        $('#providerCount').html(result.data.provider);
        $('#metaCount').html(result.data.meta);
        $('#receiverCount').html(result.data.receiver);
        $('#documentCount').html(result.data.document);
                   
        }, error: (result) => {
            toastr.show(result.responseJSON.msg);
        }
    })
}
$.ajaxSetup({
    beforeSend: function (xhr)
    {
       xhr.setRequestHeader("Authorization",JSON.parse(localStorage.getItem("token")));        
    }
});
$.ajax({
    url: dashboardApi,
    method: 'get',
    success: (result) => {
    $('#providerCount').html(result.data.provider);
    $('#metaCount').html(result.data.meta);
    $('#receiverCount').html(result.data.receiver);
    $('#documentCount').html(result.data.document);
    },
    error: (result) => {
        toastr.show(result.responseJSON.msg);
    }
});
