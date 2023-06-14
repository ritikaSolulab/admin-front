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
            { data: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
            
              
        ],
        // data: [
            
        //         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            

        // ]
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

// $('#mydatatable').DataTable({
//     retrieve: true,
//     data: tableData,
//     pagingType: 'full_numbers',
//     lengthMenu: [
//       [5, 10, 25, 50, -1],
//       [5, 10, 25, 50, "All"]
//     ],
//      columns: [
//             {
//                 data: "ID",
//                 render:function (data, type, row) {
//                  return `<button class='add' >add</button>`;        
//             },
//             {
//                 data: "ID",
//                 render:function (data, type, row) {
//                         return `<button class='edit' >edit</button>`;
//             },
//             {
//                 data: "ID",
//                 render:function (data, type, row) {
//                         return `<button class='delete' >delete</button>`;
//             },
//                 //..... your remaining columns need to mention here...
    
//       });
    
    
    
//      $('#mydatatable .add').on('click',function(){ 
//     //.. your logic for add button click 
//     })
    
//         $('#mydatatable .edit').on('click',function(){ 
//     //.. your logic for edit button click 
//     })
    
//         $('#mydatatable .delete').on('click',function(){ 
//     //.. your logic for delete button click 
//     })

