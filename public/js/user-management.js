$(document).ready(()=>{
    loadUserTable()
})
const ajaxConfig = {
    url: `${config.SERVER_URL}${config.URLS.USER_LIST}`,
    type: 'Get',        
}
const columns = [
    {
        orderable: false, targets: -1,
        render: function (data, type, row, meta) {
            return meta.row + meta.settings._iDisplayStart + 1;
        }
    },
    { data: 'name' },
    { data: 'username' },
    { data: 'email' },
    {
        render: (data, type, row, meta) => {
            return row.mobileNumber ? row.mobileNumber : 'NA'
        }
    },
    { data: 'kycStatus' },
    { data: 'userType' },
    {
        render: (data, type, row, meta) => {
            return new Date(row.createdAt).toLocaleDateString()
        }
    },
    // {
    //     data: '_id', orderable: false, targets: -1,
    //     render: (data, type, row, meta) => {
    //         let text = `<div class='action-btn'>
    //             <a data-bs-toggle="modal" data-bs-target="#View_Modal" data-id="${row._id}" data-name="${row.name}" data-roleid="${row?.roleDetails?.roleName}" data-email = "${row.email}">
    //             <i data-toggle="tooltip" data-placement="top" title="View" class="fa fa-eye" aria-hidden="true"></i></a>                         
    //             <a data-bs-toggle="modal" data-bs-target="#Edit_Modal" data-id="${row._id}" data-name="${row.name}" data-roleid="${row.roleId}" data-email = "${row.email}">
    //             <i data-toggle="tooltip" data-placement="top" title=Edit class="fa fa-pencil" aria-hidden="true"></i></a>
    //             <a data-bs-toggle="modal" data-bs-target = "#Delete_Confirm_Modal" data-name="${row.name}" data-id="${row._id}" data-status = "${row.isActive}">
    //             <i data-toggle="tooltip" data-placement="top" title='Delete' class="fa fa-trash" aria-hidden="true"></i></a>
    //             </div>`
    //         return text
    //     }
    // }
]
const loadUserTable = () => initiateDatatable('userTable', ajaxConfig, columns, 7 )