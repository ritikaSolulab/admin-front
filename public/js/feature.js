let roleId
$(document).ready( async () => {
    /** Inititate the Datatable 
     *  Fetch the Role list and bind it to the select tag option
    */
    loadAdminTable()
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
                    
                    </div>`
                return text
            }
        }
]



const loadAdminTable = () => initiateDatatable('userTable', adminTableConfig, adminColumns)

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

/** Create Admin Method */
$('#Create_Feature_Modal').on('show.bs.modal', function(){    
    $('#CreateFeatureBtn').off().on('click', async function(){
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
                $('#Create_Feature_Modal').modal('hide')
                $('#Create_Success_Modal').modal('show')
                ToastMsg(resp?.data?.message, 'Success')
            })
            .catch((e)=>{
                ToastMsg(e?.response?.data?.message, 'Error')
            })
    })
})
$('#Create_Feature_Modal').on('hidden.bs.modal', function(){
    $('#Create_Form').trigger('reset')
})

})
/** Create Admin Method Ends */


