let roleId
$(document).ready( async () => {
    /** Inititate the Datatable 
     *  Fetch the Role list and bind it to the select tag option
    */
    loadAdminTable()
    loadRoleTable()
    await axios({
        url: `${config.SERVER_URL}${config.URLS.ROLE_LIST}`,
        method: 'GET',
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    .then((resp) => {
        $.each(resp.data?.data, function (i, item) {
            $('#RoleList').append($('<option>', {
                value: item._id,
                text: item.roleName,
                id: item._id,
                class: 'form-control'
            }));
            $('#RoleListCreate').append($('<option>', {
                value: item._id,
                text: item.roleName,
                id: item._id,
                class: 'form-control'
            }));
        });
        roleId = resp?.data?.data[0]?._id
    })
    .catch((err) => {
        ToastMsg(err?.response?.data?.message, 'Error')
    })
})
const adminTableConfig = {
    url: `${config.SERVER_URL}${config.URLS.ADMIN_LIST}`,
    type: 'GET',
}
const roleTableConfig = {
    url: `${config.SERVER_URL}${config.URLS.ROLE_LIST}`,
    type: 'GET',
}
const adminColumns = [
        {
            orderable: false, targets: -1,
            render: function (data, type, row, meta) {
                return meta.row + meta.settings._iDisplayStart + 1;
            }
        },
        { data: 'name' },
        { data: 'email' },
        {
            render: (data, type, row, meta) => {
                return row.adminDetails.length > 0 ? row.adminDetails[0].name : 'Super Admin'
            }
        },
        {
            render: (data, type, row, meta) => {
                return row.roleDetails ? row?.roleDetails?.roleName : 'Role not assigned'
            }
        },
        {
            data: '_id', orderable: false, targets: -1,
            render: (data, type, row, meta) => {
                let text = `<div class='action-btn'>
                    <a data-bs-toggle="modal" data-bs-target="#View_Modal" data-id="${row._id}" data-name="${row.name}" data-roleid="${row?.roleDetails?.roleName}" data-email = "${row.email}">
                    <i data-toggle="tooltip" data-placement="top" title="View" class="fa fa-eye" aria-hidden="true"></i></a>                         
                    <a data-bs-toggle="modal" data-bs-target="#Edit_Modal" data-id="${row._id}" data-name="${row.name}" data-roleid="${row.roleId}" data-email = "${row.email}">
                    <i data-toggle="tooltip" data-placement="top" title=Edit class="fa fa-pencil" aria-hidden="true"></i></a>
                    <a data-bs-toggle="modal" data-bs-target = "#Delete_Confirm_Modal" data-name="${row.name}" data-id="${row._id}" data-status = "${row.isActive}">
                    <i data-toggle="tooltip" data-placement="top" title='Delete' class="fa fa-trash" aria-hidden="true"></i></a>
                    </div>`
                return text
            }
        }
]

const roleColumns = [
    {
        orderable: false, targets: -1,
        render: function (data, type, row, meta) {
            return meta.row + meta.settings._iDisplayStart + 1;
        }
    },
    { data: 'roleName' },
    {
        render: (data, type, row, meta) => {
            return row.adminDetails?.name
        }
    },
    {
        render: (data, type, row, meta) => {
            return row?.roleCount.length > 0 ? row?.roleCount[0]?.string : 0
        }
    },
    {
        data: '_id', orderable: false, targets: -1,
        render: (data, type, row, meta) => {
            let title = ""
            let modal = ""
            let _Class = ""
            if (row.isActive) {
                title = "Active"
                modal = "#Deactivate_Modal"
                _Class = "fa fa-user enabled-user"
            } else {
                title = "Inactive"
                modal = "#Reactivate_Modal"
                _Class = "fa fa-user-times disable-user"
            }
            let text = `<div class='action-btn'>
                    <a data-bs-toggle="modal" data-bs-target = "#View_Role_Modal" data-rolename="${row.roleName}" data-permissions = '${JSON.stringify(row.permissions)}'>
                    <i data-toggle="tooltip" data-placement="top" title="View" class="fa fa-eye" aria-hidden="true"></i></a>
                    <a data-toggle="modal" data-target = "${modal}" data-id="${data}" data-status = "${row.isActive}">
                    <i data-toggle="tooltip" data-placement="top" title=Edit class="fa fa-pencil" aria-hidden="true"></i></a>
                    <a data-bs-toggle="modal" data-bs-target = "#Delete_Role_Modal" data-id="${row._id}" data-rolname="${row.roleName}">
                    <i data-toggle="tooltip" data-placement="top" title=Delete class="fa fa-trash" aria-hidden="true"></i></a>
                    </div>`
            return text
        }
    }
]

const loadAdminTable = () => initiateDatatable('userTable', adminTableConfig, adminColumns)
const loadRoleTable = () => initiateDatatable('roleTable', roleTableConfig, roleColumns)

$(document).ready(async () => { 
/** Edit Admin Method*/
$('#Edit_Modal').on('show.bs.modal', (e) => {
    const btn = $(e.relatedTarget)
    const name = btn.data('name')
    const email = btn.data('email')
    let roleId = btn.data('roleid')
    const userId = btn.data('id')
    $('#NameInput').val(name)
    $('#EmailInput').val(email)
    $(`#RoleList`).val(roleId)
    $('#RoleList').on('change', function () {
        roleId = this.value
    })
    /** Update the Admin Details*/
    $('#UpdateDetails').off().on('click', async function () {
        const requestParams = {
            name,
            email,
            roleId,
            userId
        }
        await axios({
            url: `${config.SERVER_URL}${config.URLS.EDIT_ADMIN}`,
            method: 'PATCH',
            data: requestParams,
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            loadAdminTable
            ToastMsg(response?.data?.message, 'Success')
            $('#Edit_Modal').modal('hide')
            $('#Edit_Success_Modal').modal('show')
        })
        .catch((err) => {
            const { response: { data: { message } } } = err
            ToastMsg(message, 'Error')
        })
    })
})
/** Edit Admin method Ends */

/** View Admin Details Method*/
$('#View_Modal').on('show.bs.modal', (e) => {
    const btn = $(e.relatedTarget)
    const name = btn.data('name')
    const email = btn.data('email')
    const roleName = btn.data('roleid')
    console.log(roleName)
    $('#NameInputView').val(name)
    $('#EmailInputView').val(email)
    $(`#RoleListView`).val(roleName)
})
/** View Admin Details Method Ends*/

/** Delete Admin Method*/
$('#Delete_Confirm_Modal').on('show.bs.modal', (e) => {
    const btn = $(e.relatedTarget)
    const userId = btn.data('id')
    $('#AdminDeleteModalText').text(`Are you sure you want to delete ${name} admin?`)

    $('#DeleteAdminBtn').off().on('click', async function(){
        $('#DeleteAdminBtn').text('Please wait..')
        const requestParams = {
            userId,
            status: false
        }
        await axios({
            url: `${config.SERVER_URL}${config.URLS.DELETE_ADMIN}`,
            method: 'PATCH',
            data: requestParams,
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        .then((resp)=>{
            loadAdminTable()
            $('#DeleteAdminBtn').text('Delete')
            $('#Delete_Confirm_Modal').modal('hide')
            ToastMsg('ADMIN_DELETED', 'Success')
            
        })
        .catch((err)=>{
            const { response: { data: { message } } } = err
            ToastMsg(message, 'Error')
        })
    })
})
/** Delete Admin Method Ends*/

/** Edit Role Method*/
$('#Edit_Role_Modal').on('show.bs.modal', (e) => {
    const btn = $(e.relatedTarget)
    const roleName = btn.data('rolename')
    let roleId = btn.data('roleid')
    $('#RoleInput').val(roleName)
    $(`#RoleList`).val(roleId)
    $('#RoleList').on('change', function () {
        roleId = this.value
    })

    $('#UpdateRoleDetails').off().on('click', async function () {
        const requestParams = {
            roleName,
            roleId
        }
        await axios({
            url: `${config.SERVER_URL}${config.URLS.EDIT_ADMIN}`,
            method: 'PATCH',
            data: requestParams,
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                ToastMsg(response?.data?.message, 'Success')
                $('#Edit_Modal').modal('hide')
                $('#Edit_Success_Modal').modal('hide')
            })
            .catch((err) => {
                const { response: { data: { message } } } = err
                ToastMsg(message, 'Error')
            })
    })
})
/** Edit Role Method Ends*/

/** View role Details*/
$('#View_Role_Modal').on('show.bs.modal', (e) => {
    $(".ViewRoleDet").attr('disabled', true)
    const btn = $(e.relatedTarget)
    const roleName = btn.data('rolename')
    let permissions = btn.data('permissions')
    console.log(permissions)
    $('#RoleInputView').val(roleName)
    for(const e of permissions){
        if(e.permissionName === 'admin_management'){
            if(e.create) $('#adminMngCreate').attr('checked', true)
            if(e.update) $('#adminMngEdit').attr('checked', true)
            if(e.view) $('#adminMngView').attr('checked', true)            
        }
        if(e.permissionName === 'user_management'){
            if(e.create) $('#userMngCreate').attr('checked', true)
            if(e.update) $('#userMngEdit').attr('checked', true)
            if(e.view) $('#userMngView').attr('checked', true)            
        }
        if(e.permissionName === 'collector_management'){
            if(e.create) $('#collectorMngCreate').attr('checked', true)
            if(e.update) $('#collectorMngEdit').attr('checked', true)
            if(e.view) $('#collectorMngView').attr('checked', true)            
        }
        if(e.permissionName === 'license_management'){
            if(e.create) $('#licenseMngCreate').attr('checked', true)
            if(e.update) $('#licenseMngEdit').attr('checked', true)
            if(e.view) $('#licenseMngView').attr('checked', true)            
        }
        if(e.permissionName === 'nft_management'){
            if(e.create) $('#nftMngCreate').attr('checked', true)
            if(e.update) $('#nftMngEdit').attr('checked', true)
            if(e.view) $('nftnMngView').attr('checked', true)            
        }
        if(e.permissionName === 'royalties_management'){
            if(e.create) $('#royaltiesMngCreate').attr('checked', true)
            if(e.update) $('#royaltiesMngEdit').attr('checked', true)
            if(e.view) $('#royaltiesMngView').attr('checked', true)            
        }
        if(e.permissionName === 'transaction_management'){
            if(e.create) $('#transactionMngCreate').attr('checked', true)
            if(e.update) $('#transactionMngEdit').attr('checked', true)
            if(e.view) $('#transactionMngView').attr('checked', true)            
        }
        if(e.permissionName === 'infactuation'){
            if(e.create) $('#infactuationMngCreate').attr('checked', true)
            if(e.update) $('#infactuationMngEdit').attr('checked', true)
            if(e.view) $('#infactuationMngView').attr('checked', true)            
        }
        if(e.permissionName === 'curated'){
            if(e.create) $('#curatedMngCreate').attr('checked', true)
            if(e.update) $('#curatedMngEdit').attr('checked', true)
            if(e.view) $('#curatedMngView').attr('checked', true)            
        }
        if(e.permissionName === 'content_management'){
            if(e.create) $('#contentMngCreate').attr('checked', true)
            if(e.update) $('#contentMngEdit').attr('checked', true)
            if(e.view) $('#contentMngView').attr('checked', true)            
        }
        if(e.permissionName === 'feature'){
            if(e.create) $('#featureMngCreate').attr('checked', true)
            if(e.update) $('#featureMngEdit').attr('checked', true)
            if(e.view) $('#featureMngView').attr('checked', true)            
        }
        if(e.permissionName === 'role_management'){
            if(e.create) $('#roleMngCreate').attr('checked', true)
            if(e.update) $('#roleMngEdit').attr('checked', true)
            if(e.view) $('#roleMngView').attr('checked', true)            
        }
    }
})
/** View role Details Ends*/

/** Delete role Method*/
$('#Delete_Role_Modal').on('show.bs.modal', (e) => {
    const btn = $(e.relatedTarget)
    const roleId = btn.data('id')
    const name = btn.data('rolename')
    $('#RoleDeleteModalText').text(`Are you sure you want to delete ${name} role?`)

    $('#DeleteRoleBtn').off().on('click', async function(){
        $('#DeleteRoleBtn').text('Please wait..')
        await axios({
            url: `${config.SERVER_URL}${config.URLS.DELETE_ROLE}/${roleId}`,
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        .then((resp)=>{
            $('#DeleteRoleBtn').text('Delete')
            $('#Delete_Role_Modal').modal('hide')
            ToastMsg(resp?.data?.message, 'Success')
            role()
        })
        .catch((err)=>{
            const { response: { data: { message } } } = err
                ToastMsg(message, 'Error')
        })
    })
})
/** Delete role Method Ends*/

/** Create Admin Method */
$('#Create_Modal').on('show.bs.modal', function(){    
    $('#CreateAdminBtn').off().on('click', async function(){
        const name = $('#AdminNameInput').val().trim()
        const email = $('#AdminEmailInput').val().trim()
        $('#RoleListCreate').on('change', function(){
            roleId = this.value
        })
        const requestParams = {
            name,
            email,
            roleId
        }
        await axios(axiosConfig(`${config.SERVER_URL}${config.URLS.CREATE_ADMIN}`,'POST',requestParams))
            .then((resp)=>{
                loadAdminTable()
                $('#Create_Modal').modal('hide')
                $('#Create_Success_Modal').modal('show')
                ToastMsg(resp?.data?.message, 'Success')
            })
            .catch((e)=>{
                ToastMsg(e?.response?.data?.message, 'Error')
            })
    })
})
$('#Create_Modal').on('hidden.bs.modal', function(){
    $('#Create_Form').trigger('reset')
})

})