// $("#pro table tr").on('click', function(){
//     window.location = "/admin/provider_details";    
// });
// $("#pend table tr").on('click', function(){
//     window.location = "/admin/provider_pending_approvals";    
// });
var providersTable;
var providersApprovalTable;

var old = alert;

alert = function() {
  console.log(new Error().stack);
};


const loadProviders = () => {
    // providersTable = $('#transactionTable').DataTable({
    //     // serverSide: true,
    //     searching: true,
    //     ajax: {
    //         url: `${providerApi}/approvedList`,
    //         data : (data) => {
    //             const value = $('#dateFilter').val();
    //             if (value.split('-').length) {
    //                 let query = '';
    //                 query+=`startDate=${value.split('-')[0]}`;
    //                 query+=`&endDate=${value.split('-')[1]}`;
    //                 return query;
    //             }
    //         }
    //     },
    //     columns: [{
    //         data: "firstName"
    //     },
    //     {
    //         mRender(data, type, row, meta) {
    //             console.log('type', type);
    //             return type == 'sort' ?  (new Date(row.createdTime)).getTime() : row.createdTime;
    //         }
    //     },
    //     {
    //         data: "document.organization_name"
    //     },
    //     {
    //         mRender(data, type, row, meta) {
    //             if (row.isActive && !row.isRejected) {
    //                 return 'Active';
    //             } else {
    //                 return 'De-active';
    //             }
    //         }
    //     },
    //     {
    //         data : 'plan'
    //     },
    //     {
    //         mRender(data, type, row) {
    //             return `<a href="/admin/provider_details/${row._id}"><i class="fa fa-eye"></i></a>`;

    //         },
    //         orderable: false,
    //         searchable: false,
    //     }
    //     ]
    // }
    // );
    // $('#providersTable_filter input').unbind();
    // $('#providersTable_filter input').bind('keyup', function (e) {
    //     console.log('here');
    //     console.log(this.value);
    //     if (e.keyCode == 13) {
    //         providersTable.search(this.value).draw();
    //     }
    // });
    
}


const loadPendingProviders = () => {
    transactionTable = $('#transactionTable').DataTable({
        // serverSide: true,
        // searching: false,
        columns: [
            { data: 'srno' },
            { data: 'name' },
            { data: 'creator_ID' },
            { data: 'date_of_listing' },
            { data: 'total_users' },
            { data: 'active_users' },
              
        ],
        data: [
            {
                srno: 1,
                name: 'NFT 1',
                creator_ID: 'John Smith',
                date_of_listing: '23-02-2023 12:00',
                total_users: '10',
                active_users: '8',
            },
            {
                srno: 2,
                name: 'NFT 2',
                creator_ID: 'Goking',
                date_of_listing: '23-02-2023 12:05',
                total_users: '100',
                active_users: '50',
            },

        ]
        // ajax: {
        //     url: providePendingApi,
        //     data : (data) => {
        //         const value = $('#dateFilter').val();
        //         if (value.split('-').length) {
        //            let query = '';
        //            query+=`startDate=${value.split('-')[0]}`;
        //            query+=`&endDate=${value.split('-')[1]}`;
        //             return query;
        //         }
        //     }
        // },
        // columns: [{
        //     mRender(data, type, row) {
        //         if(row.document)
        //         {
        //             return row.document.duns_number;
        //         }else{
        //             return '';
        //         }

        //     }
        // },
        // {
        //     data: "firstName"
        // },
        // {
        //     data: "createdTime"
        // },
        // {
        //     mRender(data, type, row) {
        //         if(row.document)
        //         {
        //             return row.document.organization_name;
        //         }else{
        //             return '';
        //         }

        //     }
        // },
        // {
        //     mRender(data, type, row) {
        //         return `<a href="/admin/provider_pending_approvals/${row._id}"><i class="fa fa-eye"></i></a>`;

        //     },
        //     orderable: false,
        //     searchable: false,
        // }
        // ]
    });
    membershipManagement = $('#membershipManagement').DataTable({
        // serverSide: true,
        // searching: false,
        columns: [
            { data: 'srno' },
            { data: 'name' },
            { data: 'creator_ID' },
            { data: 'date_of_listing' },
            { data: 'total_users' },
            { data: 'active_users' },
              
        ],
        data: [
            {
                srno: 1,
                name: 'NFT 1',
                creator_ID: 'John Smith',
                date_of_listing: '23-02-2023 12:00',
                total_users: '10',
                active_users: '8',
            },
            {
                srno: 2,
                name: 'NFT 2',
                creator_ID: 'Goking',
                date_of_listing: '23-02-2023 12:05',
                total_users: '100',
                active_users: '50',
            },

        ]
        // ajax: {
        //     url: providePendingApi,
        //     data : (data) => {
        //         const value = $('#dateFilter').val();
        //         if (value.split('-').length) {
        //            let query = '';
        //            query+=`startDate=${value.split('-')[0]}`;
        //            query+=`&endDate=${value.split('-')[1]}`;
        //             return query;
        //         }
        //     }
        // },
        // columns: [{
        //     mRender(data, type, row) {
        //         if(row.document)
        //         {
        //             return row.document.duns_number;
        //         }else{
        //             return '';
        //         }

        //     }
        // },
        // {
        //     data: "firstName"
        // },
        // {
        //     data: "createdTime"
        // },
        // {
        //     mRender(data, type, row) {
        //         if(row.document)
        //         {
        //             return row.document.organization_name;
        //         }else{
        //             return '';
        //         }

        //     }
        // },
        // {
        //     mRender(data, type, row) {
        //         return `<a href="/admin/provider_pending_approvals/${row._id}"><i class="fa fa-eye"></i></a>`;

        //     },
        //     orderable: false,
        //     searchable: false,
        // }
        // ]
    });

}

$(document).ready(function () {

    loadProviders();
    loadPendingProviders();
});

const dateFilter = (value) => {
    console.log(value);
    const startDate = value.split('-')[0];
    const endDate = value.split('-')[1];
    if (new Date(startDate) <= new Date(endDate)) {
        console.log('correct');
        // providersTable.ajax.reload();
        // providersApprovalTable.ajax.reload();
        // getFilteredCountAjax($('#startDate').val(),$('#endDate').val());
    } else {
        swal({
            text: 'please select correct date'
        });
    }
}