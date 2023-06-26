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
            render: (data, type, row, meta) => {
                let text = `<div class="form-check form-switch">
                    <input name="blockAdmin" type="checkbox" class="form-check-input" id="blockToggle" value="${row._id}">
                </div>`
                return text
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
                    <a data-bs-toggle="modal" data-bs-target = "#Delete_Confirm_Modal" data-name="${row.name}" data-id="${row._id}" data-status = "${row.isDeleted}">
                    <i data-toggle="tooltip" data-placement="top" title='Delete' class="fa fa-trash" aria-hidden="true"></i></a>
                    </div>`
                return text
            }
        },
        
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
            if (row.isDeleted) {
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
                    <a data-bs-toggle="modal" data-bs-target = "#Edit_Role_Modal" data-id="${row._id}" data-rolename = "${row.roleName}" data-roleid="${row.roleId}" data-permissions='${JSON.stringify(row.permissions)}'>
                    <i data-toggle="tooltip" data-placement="top" title=Edit class="fa fa-pencil" aria-hidden="true"></i></a>`
                text += row?.roleCount.length == 0 ? `<a data-bs-toggle="modal" data-bs-target = "#Delete_Role_Modal" data-id="${row._id}" data-rolename="${row.roleName}">
                <i data-toggle="tooltip" data-placement="top" title=Delete class="fa fa-trash" aria-hidden="true"></i></a>` : ``
                text += `</div>`
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
    $('#NameInputView').val(name)
    $('#EmailInputView').val(email)
    $(`#RoleListView`).val(roleName)
})
/** View Admin Details Method Ends*/

/** Delete Admin Method*/
$('#Delete_Confirm_Modal').on('show.bs.modal', (e) => {
    const btn = $(e.relatedTarget)
    const userId = btn.data('id')
    const name = btn.data('name')
    $('#AdminDeleteModalText').text(`Are you sure you want to delete admin ${name}?`)

    $('#DeleteAdminBtn').off().on('click', async function(){
        $('#DeleteAdminBtn').text('Please wait..')
        const requestParams = {
            userId,
            status: true
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
    roleId = btn.data('id')
    const permission = btn.data('permissions')
    $('#RoleInput').val(roleName)
    for(const role of permission){
        if(role.permissionName === 'admin_management'){
            if(role.create) $('#adminMng-Create').attr('checked', true)
            if(role.update) $('#adminMng-Edit').attr('checked', true)
            if(role.view) $('#adminMng-View').attr('checked', true)            
            if(role.remove) $('#adminMng-Delete').attr('checked', true)            
        }
        if(role.permissionName === 'user_management'){
            if(role.create) $('#userMng-Create').attr('checked', true)
            if(role.update) $('#userMng-Edit').attr('checked', true)
            if(role.remove) $('#userMng-Delete').attr('checked', true)
            if(role.view) $('#userMng-View').attr('checked', true)            
        }
        if(role.permissionName === 'collector_management'){
            if(role.create) $('#collectorMng-Create').attr('checked', true)
            if(role.update) $('#collectorMng-Edit').attr('checked', true)
            if(role.view) $('#collectorMng-View').attr('checked', true)            
            if(role.remove) $('#collectorMng-Delete').attr('checked', true)            
        }
        if(role.permissionName === 'license_management'){
            if(role.create) $('#licenseMng-Create').attr('checked', true)
            if(role.update) $('#licenseMng-Edit').attr('checked', true)
            if(role.view) $('#licenseMng-View').attr('checked', true)            
            if(role.remove) $('#licenseMng-Delete').attr('checked', true)            
        }
        if(role.permissionName === 'nft_management'){
            if(role.create) $('#nftMng-Create').attr('checked', true)
            if(role.update) $('#nftMng-Edit').attr('checked', true)
            if(role.view) $('nftMng-View').attr('checked', true)            
            if(role.remove) $('nftMng-Delete').attr('checked', true)            
        }
        if(role.permissionName === 'royalties_management'){
            if(role.create) $('#royaltiesMng-Create').attr('checked', true)
            if(role.update) $('#royaltiesMng-Edit').attr('checked', true)
            if(role.view) $('#royaltiesMng-View').attr('checked', true)            
            if(role.remove) $('#royaltiesMng-Delete').attr('checked', true)            
        }
        if(role.permissionName === 'transaction_management'){
            if(role.create) $('#transactionMng-Create').attr('checked', true)
            if(role.update) $('#transactionMng-Edit').attr('checked', true)
            if(role.view) $('#transactionMng-View').attr('checked', true)            
            if(role.remove) $('#transactionMng-Delete').attr('checked', true)            
        }
        if(role.permissionName === 'infactuation'){
            if(role.create) $('#infactuationMng-Create').attr('checked', true)
            if(role.update) $('#infactuationMng-Edit').attr('checked', true)
            if(role.view) $('#infactuationMng-View').attr('checked', true)            
            if(role.remove) $('#infactuationMng-Delete').attr('checked', true)            
        }
        if(role.permissionName === 'curated'){
            if(role.create) $('#curatedMng-Create').attr('checked', true)
            if(role.update) $('#curatedMng-Edit').attr('checked', true)
            if(role.view) $('#curatedMng-View').attr('checked', true)            
            if(role.remove) $('#curatedMng-View').attr('checked', true)            
        }
        if(role.permissionName === 'content_management'){
            if(role.create) $('#contentMng-Create').attr('checked', true)
            if(role.update) $('#contentMng-Edit').attr('checked', true)
            if(role.view) $('#contentMng-View').attr('checked', true)            
            if(role.remove) $('#contentMng-Delete').attr('checked', true)            
        }
        if(role.permissionName === 'feature'){
            if(role.create) $('#featureMng-Create').attr('checked', true)
            if(role.update) $('#featureMng-Edit').attr('checked', true)
            if(role.view) $('#featureMng-View').attr('checked', true)            
            if(role.remove) $('#featureMng-Delete').attr('checked', true)            
        }
        if(role.permissionName === 'role_management'){
            if(role.create) $('#roleMng-Create').attr('checked', true)
            if(role.update) $('#roleMng-Update').attr('checked', true)
            if(role.view) $('#roleMng-View').attr('checked', true)            
            if(role.remove) $('#roleMng-Delete').attr('checked', true)            
        }
    }
    $('#UpdateRoleDetails').off().on('click', async function () {
        let permissions =[]

    
    const permissionIdList = ['adminMng-Create', 'adminMng-Edit', 'adminMng-View',
    'adminMng-Delete', 
    'userMng-Create', 'userMng-Edit', 'userMng-View', 'userMng-Delete', 'roleMng-Create', 'roleMng-Edit',
    'roleMng-View', 'roleMng-Delete', 'collectorMng-Create', 'collectorMng-Edit', 'collectorMng-View', 
    'collectorMng-Delete',
    'licenseMng-Create' , 'licenseMng-Edit', 'licenseMng-View' , 'licenseMng-Delete', 'nftMng-Create', 
    'nftMng-Edit', 'nftMng-View',  'nftMng-Delete', 'royaltiesMng-Create', 'royaltiesMng-Edit', 'royaltiesMng-View', 
    'royaltiesMng-Delete',
    'transactionMng-Create', 'transactionMng-Edit', 'transactionMng-View', 'transactionMng-Delete',
    'infactuationMng-Create', 'infactuationMng-Edit', 'infactuationMng-View', 'infactuationMng-Delete',
    'curatedMng-Create', 'curatedMng-Edit', 'curatedMng-View', 'curatedMng-Delete', 
    'contentMng-Create', 'contentMng-Edit' , 'contentMng-Delete',
    'contentMng-View', 'featureMng-Create', 'featureMng-Edit', 'featureMng-View', 'featureMng-Delete']

    const permissonsObj = {
        'adminMng': 'admin_management', 
        'userMng': 'user_management', 
        'roleMng': 'role_management', 
        'collectorMng': 'collector_management', 
        'licenseMng': 'license_management',
        'nftMng': 'nft_management', 
        'royaltiesMng': 'royalties_management', 
        'transactionMng': 'transaction_management', 
        'infactuationMng': 'infatuation', 
        'curatedMng': 'curated', 
        'contentMng': 'content_management', 
        'featureMng': 'feature'
    };
    const calculatedPermissionObj = {}
        permissionIdList.forEach(permisson => {
            const permissionSplit = permisson.split('-');
            const permissionId = permissionCond(permissionSplit[1]);
            if(!calculatedPermissionObj[`${permissonsObj[`${permissionSplit[0]}`]}`]) {
                calculatedPermissionObj[`${permissonsObj[`${permissionSplit[0]}`]}`] = {}
            }
            if ( $(`#${permisson}`).prop('checked') == true ) {                
                calculatedPermissionObj[`${permissonsObj[`${permissionSplit[0]}`]}`][`${permissionId}`] = true;
            } else {
                calculatedPermissionObj[`${permissonsObj[`${permissionSplit[0]}`]}`][`${permissionId}`] = false;
            }
        })
   
        const keyList = Object.keys(calculatedPermissionObj);
        keyList.forEach(eachKey => {
            permissions.push({ permissionName: eachKey, ...calculatedPermissionObj[`${eachKey}`] })
        });
        const _roleName = $('#RoleInput').val().trim()
        const requestParams = {
            roleName: _roleName,
            permissions,
            roleId
        }
        await axios({
            url: `${config.SERVER_URL}${config.URLS.EDIT_ROLE}`,
            method: 'PATCH',
            data: requestParams,
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                loadRoleTable()
                ToastMsg(response?.data?.message, 'Success')
                $('#Edit_Role_Modal').modal('hide')
                $('#Edit_Role_Success_Modal').modal('show')
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
    $('#RoleInputView').val(roleName)
    for(const e of permissions){
        if(e.permissionName === 'admin_management'){
            if(e.create) $('#adminMngCreate').attr('checked', true)
            if(e.update) $('#adminMngEdit').attr('checked', true)
            if(e.view) $('#adminMngView').attr('checked', true)
            if(e.remove) $('#adminMngView').attr('checked', true)
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
$('#View_Role_Modal').on('hidden.bs.modal', function(){
    $('#View_Role_Modal_Form').trigger('reset');
})
/** Delete role Method*/
$('#Delete_Role_Modal').on('show.bs.modal', (e) => {
    const btn = $(e.relatedTarget)
    roleId = btn.data('id')
    const roleName = btn.data('rolename')
    $('#RoleDeleteModalText').text(`Are you sure you want to delete ${roleName} role?`)

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
$('#Edit_Role_Modal').on('hidden.bs.modal', function(){
    $('#Edit_Role_Form').trigger('reset')
})

})
/** Create Admin Method Ends */

/** Create Role Method */
$('#Create_Role_Modal').on('show.bs.modal', (e) => {    
    $('#CreateRoleBtn').off().on('click', async function(){
        const btn = $(e.relatedTarget)
        $(".CreateRoleDet").attr('enabled', true)
        const roleName = $('#RoleNameInput').val().trim();
        let permissions= [];
        const permissionIdList = ['adminMng_Create', 'adminMng_Edit', 'adminMng_View',
        'adminMng_Delete', 
        'userMng_Create', 'userMng_Edit', 'userMng_View', 'userMng_Delete', 'roleMng_Create', 'roleMng_Edit',
        'roleMng_View', 'roleMng_Delete', 'collectorMng_Create', 'collectorMng_Edit', 'collectorMng_View', 
        'collectorMng_Delete',
        'licenseMng_Create' , 'licenseMng_Edit', 'licenseMng_View' , 'licenseMng_Delete', 'nftMng_Create', 
        'nftMng_Edit', 'nftMng_View',  'nftMng_Delete', 'royaltiesMng_Create', 'royaltiesMng_Edit', 'royaltiesMng_View', 
        'royaltiesMng_Delete',
        'transactionMng_Create', 'transactionMng_Edit', 'transactionMng_View', 'transactionMng_Delete',
        'infactuationMng_Create', 'infactuationMng_Edit', 'infactuationMng_View', 'infactuationMng_Delete',
        'curatedMng_Create', 'curatedMng_Edit', 'curatedMng_View', 'curatedMng_Delete', 
        'contentMng_Create', 'contentMng_Edit' , 'contentMng_Delete',
        'contentMng_View', 'featureMng_Create', 'featureMng_Edit', 'featureMng_View', 'featureMng_Delete']
        const permissonsObj = {
            'adminMng': 'admin_management', 
            'userMng': 'user_management', 
            'roleMng': 'role_management', 
            'collectorMng': 'collector_management', 
            'licenseMng': 'license_management',
            'nftMng': 'nft_management', 
            'royaltiesMng': 'royalties_management', 
            'transactionMng': 'transaction_management', 
            'infactuationMng': 'infatuation', 
            'curatedMng': 'curated', 
            'contentMng': 'content_management', 
            'featureMng': 'feature'
        };
        const calculatedPermissionObj = {}
        permissionIdList.forEach(permisson => {
            const permissionSplit = permisson.split('_');
            const permissionId = permissionCond(permissionSplit[1]);
            if(!calculatedPermissionObj[`${permissonsObj[`${permissionSplit[0]}`]}`]) {
                calculatedPermissionObj[`${permissonsObj[`${permissionSplit[0]}`]}`] = {}
            }
            if ( $(`#${permisson}`).prop('checked') == true ) {                
                calculatedPermissionObj[`${permissonsObj[`${permissionSplit[0]}`]}`][`${permissionId}`] = true;
            } else {
                calculatedPermissionObj[`${permissonsObj[`${permissionSplit[0]}`]}`][`${permissionId}`] = false;
            }
        })
        const keyList = Object.keys(calculatedPermissionObj);
        keyList.forEach(eachKey => {
            permissions.push({ permissionName: eachKey, ...calculatedPermissionObj[`${eachKey}`] })
        });
        const requestParams = {
            roleName,
            permissions,
        }
        await axios(axiosConfig(`${config.SERVER_URL}${config.URLS.CREATE_ROLE}`,'POST', requestParams))
            .then((resp)=>{
                loadRoleTable()
                $('#Create_Role_Modal').modal('hide')
                $('#Create_Role_Success_Modal').modal('show')
                ToastMsg(resp?.data?.message, 'Success')
            })
            .catch((e)=>{
                ToastMsg(e?.response?.data?.message, 'Error')
            })
    })
})
$('#Create_Role_Modal').on('hidden.bs.modal', function(){
    $('#Create_Role_Form').trigger('reset')
})

function permissionCond(cond) {
    if (cond == 'Create') {
        return 'create'
    } else if (cond == 'Edit') {
        return 'update'
    } else if (cond == 'View') {
        return 'view'
    } else if (cond == 'Delete') {
        return 'remove'
    }
}