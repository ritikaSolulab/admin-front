const provider = window.location.href.split('/').slice(-1).pop();
var teamManagementTable;

var searchKeyword = '';

const deactivateProvider = () => {
    $.ajax({
        url: providerActiveDeactivateApi,
        method: 'put',
        data: JSON.stringify({
            'providerId': provider,
            'status': false
        }),
        success(data) {
            successModal(data.msg);
            window.location = '';
        },
        error(xhr, status, error) {
            errorModal(xhr.responseJSON.msg);
            window.location = '';
        }
    });
}

const paymentHistoryList = () => {
    teamManagementTable = $('#paymentHistoryTable').DataTable({
        "processing": true,
        "serverSide": true,
        "paging":true,
   
        ajax: {
            url: `${paymentHistoryListApi}`,
            data: (data) => {
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
            }
        },
        columns: [{
            mRender(data, type, row, meta) {

                return meta.row + 1;
            }
        },
        {
            mRender(data, type, row, meta) {
                return `${row.provider.firstName} ${row.provider.lastName}`
            }
        },
        {
           data : 'planName'
        },
        {
            mRender(data, type, row, meta) {

                return `card`
            }
        },{
            mRender(data, type, row, meta) {

                return `${row.cost} $`;
            }
        }, 
        {
                mRender(data, type, row) {
                    return `<a href="/admin/payment_details/${row._id}"><i
                                                                    class="fa fa-eye"></i></a>`;

                },
                orderable: false,
                searchable: false,
            }
        ],
        rowId: '_id'

    });
    $('#paymentHistoryTable_filter input').unbind();
    $('#paymentHistoryTable_filter input').bind('keyup', function (e) {
        if (e.keyCode == 13) {
            searchKeyword = this.value
            teamManagementTable.ajax.reload();
            teamManagementTable.search(this.value).draw();
        }
    });
}


const dateFilter = (value) => {
    const startDate = value.split('-')[0];
    const endDate = value.split('-')[1];
    if (new Date(startDate) <= new Date(endDate)) {
        teamManagementTable.ajax.reload();
    } else {
        swal({
            text: 'please select correct date'
        });
    }
}

paymentHistoryList();
