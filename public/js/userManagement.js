
const users = () => {
    userTable = $('#userTable').DataTable({
        
        columns: [
            { data: 'srno' },
            { data: 'name' },
            { data: 'email_address' },
            { data: 'created_by' },
            { data: 'role' },
            { data: 'action' },
              
        ],
        data: [
            {
                srno: 1,
                name: 'XYZ',
                email_address: 'xyz@gmail.com',
                created_by: 'xyz',
                role: 'super admin',
                action: `<i class="fa fa-edit"></i> <i class="fa fa-eye"></i> <i class="fa fa-trash"></i>`,
            },
            {
                srno: 1,
                name: 'XYZ',
                email_address: 'xyz@gmail.com',
                created_by: 'xyz',
                role: 'super admin',
                action: `<i class="fa fa-edit"></i> <i class="fa fa-eye"></i> <i class="fa fa-trash"></i>`,
            },
            {
                srno: 1,
                name: 'XYZ',
                email_address: 'xyz@gmail.com',
                created_by: 'xyz',
                role: 'super admin',
                action: `<i class="fa fa-edit"></i> <i class="fa fa-eye"></i> <i class="fa fa-trash"></i>`,
            }

        ]
    });
    
}


const roles = () => {
    roleTable = $('#roleTable').DataTable({
        // serverSide: true,
        // searching: false,
        columns: [
            { data: 'srno' },
            { data: 'name' },
            { data: 'created_by' },
            { data: 'role' },
            { data: 'action' },
              
        ],
        data: [
            {
                srno: 1,
                name: 'XYZ',
                created_by: 'xyz',
                role: 'super admin',
                action: `<i class="fa fa-edit"></i> <i class="fa fa-eye"></i> <i class="fa fa-trash"></i>`,
            },
            {
                srno: 1,
                name: 'XYZ',
                created_by: 'xyz',
                role: 'super admin',
                action: `<i class="fa fa-edit"></i> <i class="fa fa-eye"></i> <i class="fa fa-trash"></i>`,
            },
            {
                srno: 1,
                name: 'XYZ',
                created_by: 'xyz',
                role: 'super admin',
                action: `<i class="fa fa-edit"></i> <i class="fa fa-eye"></i> <i class="fa fa-trash"></i>`,
            }

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

    users();
    roles();
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

