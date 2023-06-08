// $("#receiverTable table tr").on('click', function(){
//     window.location = "/admin/receiver_details";    
// });

$('#receiverTable tbody').on( 'click', 'tr', function () {
    let id = $(this).attr('id');
    window.location = `/admin/receiver_details?receiver=${id}`
} );
var receiversTable;
var searchKeyword = '';
const loadReceiver = () => {
    console.log('herher ');
    receiversTable = $('#receiverTable').DataTable({
        "processing": true,
        "serverSide": true,
        "paging":true,
        // searching: false,
        ajax: {
            url: receiverApi,
            data : (data) => {
                console.log(data);
               const value = $('#dateFilter').val();
                if (value.split('-').length) {
                    let orderOn = '';
                    let orderBy = '';
            
                    if(data.order && data.order[0].column)
                    {
                        orderOn = data.order[0].column;
                        orderBy = data.order[0].dir;
                    }
                   
                    
                    let query = '';
                    query+=`startDate=${value.split('-')[0]}`;
                    query+=`&endDate=${value.split('-')[1]}`;
                    query+=`&search=${searchKeyword}`;
                    query+=`&length=${data.length}`;
                    query+=`&start=${data.start}`;
                    query+=`&draw=${data.draw}`;
                    query+=`&limit=${data.start}`;
                    query+=`&orderOn=${orderOn}`;
                    query+=`&orderBy=${orderBy}`;
                    
                    return query;
                }
            },
          
        },
        columns: [{
            mRender(data, type, row, meta) {
                return meta.row + 1;
            },
            orderable: false,
            searchable: false,
        },
        {
            data: "firstName"
        },
        {
            data: "createdTime"
        }
        ],
        rowId : '_id'
    }
    );
    $('#receiverTable_filter input').unbind();
    $('#receiverTable_filter input').bind('keyup', function (e) {
        console.log(this.value);
        console.log(e.keyCode);
        if (e.keyCode == 13) {
            searchKeyword = this.value
            receiversTable.ajax.reload();
            receiversTable.search(this.value).draw();
        }
    });
}


$(document).ready(function () {

    loadReceiver();
});

const dateFilter = (value) => {
    console.log(value);
    const startDate = value.split('-')[0];
    const endDate = value.split('-')[1];
    console.log(startDate);
    console.log(endDate);
    if (new Date(startDate) <= new Date(endDate)) {
        console.log('correct');
        receiversTable.ajax.reload();
    } else {
        swal({
            text: 'please select correct date'
        });
    }
}