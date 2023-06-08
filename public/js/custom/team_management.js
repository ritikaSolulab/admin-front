let activeRoleId = '';
let activeUserId = '';
let activeTeamId = '';
var roleDataTable;
var userManagementTable;
var teamManagementTable;
var team = true;
var user = true;
var role = true;
// const pool_region = cognito.pool_region;
// const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
var cognitoUser;
jQuery.validator.addMethod("emailAccept", function (value, element, param) {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,7})+$/;
    return emailRegex.test(value);
}, 'please enter a valid email');
$(document).ready(function () {


    if (checkForRoleManagementPermission()) {
        roleList();
        loadRoleData();

        if (!activeUser.userOtherDetails.isSuperAdmin) {

            if (!activeUser.userOtherDetails?.role?.role?.create) {
                if (!activeUser.userOtherDetails.otherResponsibilities.role.create) {
                    document.getElementById('createRoleButton').style.display = 'none';
                }
            } else {
                if (!activeUser.userOtherDetails.otherResponsibilities.role.create) {
                    document.getElementById('createRoleButton').style.display = 'none';
                }
            }
        }
    } else {
        document.getElementById('roleManagementTab').style.display = 'none';
    }


    if (activeUser.userOtherDetails.isSuperAdmin) {
        getUserList();

    } else {
        document.getElementById('userManagementTab').style.display = 'none';
    }
    employeeListData();
    getTeamList();
    getCountryCode();
});

function getCountryCode() {
    $.ajax({
        url: '/admin/country-code',
        method: 'get',
        success(data) {
            const countryCode = document.getElementById('countryCode');
            data.forEach(code => {
                const option = document.createElement('option');
                option.setAttribute('value', `+${code.countryCallingCode}`);
                option.innerHTML = `+${code.countryCallingCode}`;
                countryCode.appendChild(option);
            })
            document.getElementById('countryCode').value = "+1";
       },
        error(xhr, status, error) {
        }
    })
}

function checkForRoleManagementPermission() {
    // if (activeUser.userOtherDetails.role.role.view || activeUser.userOtherDetails.isSuperAdmin) {
    //     if (activeUser.userOtherDetails.otherResponsibilities.role.view || activeUser.userOtherDetails.isSuperAdmin) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // } else {
    //     if (activeUser.userOtherDetails.otherResponsibilities.role.view || activeUser.userOtherDetails.isSuperAdmin) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    return true;
}

function roleList() {
    $.ajax({
        url: roleApi,
        method: 'get',
        success(data) {
            console.log('data', data);
            $('#roleSelector').html('');
            let options = '<option value="">Please Select Role ...</option>';
            data.data.forEach(role => {
                options += `<option value=${role._id}>${role.roleName}</option>`;
            })
            $('#roleSelector').html(options);
            $('#edit_roleSelector').html(options);
        },
        error(xhr, status, error) { }
    })
}

function employeeListData() {
    $.ajax({
        url: allUserApi,
        method: 'get',
        success(data) {
            $('#employeeSelector').html('');
            let optionsForEmployee = '<option value="">Please Select Manager...</option>';
            let options = '';
            data.data.forEach(role => {
                options += `<option value=${role._id}>${role.firstName}</option>`;
                optionsForEmployee += `<option value=${role._id}>${role.firstName}</option>`;
            })
            $('#employeeSelector').html(options);
            $('#managerSelector').html(optionsForEmployee);
            $('#edit_employeeSelector').html(options);
            $('#edit_managerSelector').html(optionsForEmployee);

            $(".select2_demo_3").select2({
                // placeholder: "Select a state",
                allowClear: true
            });
        },
        error(xhr, status, error) { }
    })
}


function checkForUpdateUserPermission() {
    if (activeUser.userOtherDetails?.role?.role?.update || activeUser.userOtherDetails.isSuperAdmin) {
            return true;
     } else {
        if (activeUser.userOtherDetails.otherResponsibilities.role.update || activeUser.userOtherDetails.isSuperAdmin) {
            return true;
        } else {
            return false;
        }
    }
}

function checkForDeleteUserPermission() {
    if (activeUser.userOtherDetails?.role?.role?.delete || activeUser.userOtherDetails.isSuperAdmin) {
           return true;
    } else {
        if (activeUser.userOtherDetails.otherResponsibilities.role.delete || activeUser.userOtherDetails.isSuperAdmin) {
            return true;
        } else {
            return false;
        }
    }
}

// role functions
function loadRoleData() {
    let userUpdatePermission = false;
    let userDeletePermission = false;

    if (checkForUpdateUserPermission()) {
        userUpdatePermission = true;
    }

    if (checkForDeleteUserPermission()) {
        userDeletePermission = true;
    }

    roleDataTable = $('#roleManagement').DataTable({
        dom: 'lTfgt<"bottom"ip>',
        ajax: {
            url: roleApi,
        },
        columns: [{
            mRender(data, type, row, meta) {

                return meta.row + 1;
            }
        },
        {
            data: "roleName"
        },
        {
            mRender(data, type, row) {
                if (row.createdBy === '') {
                    return '';
                }
                return row.createdBy;
            },
        },
        {
            data: "totalUser"
        },
        {
            mRender(data, type, row) {
                if (row.totalUser === 0) {
                    let updateData = '';
                    let deleteData = '';
                    if (userUpdatePermission) {
                        updateData = `<a href="javascript:" onclick="roleEnableForEdit('${row._id}')"><i class="fa fa-edit"></i></a>`;
                    }

                    if (userDeletePermission) {
                        deleteData = `<a href="javascript:" onclick="deleteRole('${row._id}')"><i
                        class="fa fa-trash"></i></a>`;
                    }
                    return `${updateData}${deleteData}`;

                }
                if (userUpdatePermission) {
                    return `<a href="javascript:" onclick="roleEnableForEdit('${row._id}')"><i class="fa fa-edit"></i></a>  `;
                } else {
                    return ``;
                }
            },
            orderable: false,
            searchable: false,
        }
        ],
    });
}

function createRole() {

    let formData = $('#createRoleForm'); //.serialize();
    console.log(formData);
    formData.validate({
        rules: {
            roleName: {
                required: true
            }
        }
    });

    if (formData.valid()) {
        if (role) {
            role = false;
            if (formData.serialize().indexOf("&") > -1) {
                const data = {
                };
                formData.serializeArray().forEach((element) => {
                    data[`${element.name}`] = element.value;
                });
                $.ajax({
                    url: roleApi,
                    data: JSON.stringify(data),
                    method: 'post',
                    success(data) {
                        $('#createRole').modal('toggle');
                        successModal(data.msg);
                        roleDataTable.ajax.reload()
                        roleList();
                        role = true;
                        resetForm('createRoleForm');
                    },
                    error(xhr, status, error) {
                        errorModal(xhr.responseJSON.msg);
                        role = true;
                    }
                })
            } else {
                errorModal('Please Select One Access');
                role = true;
            }

        }
    }

}

function roleEnableForEdit(roleId) {
    activeRoleId = roleId;
    let form = $('#updateRoleForm');
    form[0].reset();

    $.ajax({
        url: `${roleDetailsApi}?roleId=${roleId}`,
        method: 'get',
        success(data) {
            console.log(data);
            const roleData = data.data;
            $('#edit_roleName').val(roleData.roleName);
            $('#edit_roleCreate').prop('checked', roleData.role.create)
            $('#edit_roleUpdate').prop('checked', roleData.role.update)
            $('#edit_roleDelete').prop('checked', roleData.role.delete)
            $('#edit_roleView').prop('checked', roleData.role.view)

            $('#edit_subscriptionCreate').prop('checked', roleData.subscription.create)
            $('#edit_subscriptionUpdater').prop('checked', roleData.subscription.update)
            $('#edit_subscriptionView').prop('checked', roleData.subscription.view)


            $('#edit_metadataCreate').prop('checked', roleData.metadata.create)
            $('#edit_metadataDelete').prop('checked', roleData.metadata.delete)
            $('#edit_metadataView').prop('checked', roleData.metadata.view)
            $('#edit_metadataUpdate').prop('checked', roleData.metadata.delete)


            $('#edit_invoiceView').prop('checked', roleData.invoice.view)
            $('#edit_reportsAccess').prop('checked', roleData.reports.view)

            $('#editRole').modal('toggle');

        },
        error(xhr, status, error) {
            console.log(xhr);
            // errorModal(xhr.responseJSON.msg);
        }
    })
}

function updateRole() {

    let formData = $('#updateRoleForm'); //.serialize();
    console.log(formData);
    formData.validate({
        rules: {
            edit_roleName: {
                required: true
            }
        }
    });

    if (formData.valid()) {
        console.log(formData.serialize());
        if (formData.serialize().indexOf("&") > -1) {
            const data = {
                roleId : activeRoleId
            };
            formData.serializeArray().forEach((element) => {
                data[`${element.name}`] = element.value;
            });
            $.ajax({
                url: roleApi,
                data: JSON.stringify(data),
                method: 'put',
                success(data) {
                    $('#editRole').modal('toggle');
                    successModal(data.msg);
                    roleDataTable.ajax.reload()
                    roleList();
                },
                error(xhr, status, error) {
                    errorModal(xhr.responseJSON.msg);
                }
            })
        } else {
            errorModal('Please Select One Access');
        }
    }
}

function deleteRole(roleId) {
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover this role!",
        icon: "warning",
        buttons: [
            'No',
            'Yes'
        ],
        dangerMode: true,
    }).then(function (iscofirm) {
        if (iscofirm) {
            $.ajax({
                url: roleApi,
                method: 'delete',
                data: JSON.stringify({ roleId: roleId }),
                success(data) {
                    successModal(data.msg);
                    roleDataTable.ajax.reload();
                    roleList();
                }
            });
        }
    });
    console.log(roleId);
}


// user functions
function getUserList() {
    userManagementTable = $('#userManagementTable').DataTable({
        dom: 'lTfgt<"bottom"ip>',
        ajax: {
            url: userApi
        },
        columns: [{
            mRender(data, type, row, meta) {

                return meta.row + 1;
            }
        },
        {
            mRender(data, type, row) {
                if (row.lastName === undefined) {
                    return `${row.firstName}`;
                }
                return `${row.firstName}  ${row.lastName}`;
            }
        },
        {
            data: "email"
        },
        {
            mRender(data, type, row) {
                if (row.createdBy != undefined && row.createdBy.firstName != undefined) {
                    return `${row.createdBy.firstName}`;
                } else {
                    return '';
                }
            }
        },
        {
            mRender(data, type, row) {
                return `${row.role.roleName}`;
            }
        },
        {
            mRender(data, type, row) {
                return `<a href="javascript:" onclick="userEnableForEdit('${row._id}')"><i class="fa fa-edit"></i></a>
                        <a href="javascript:" onclick="deleteUser('${row._id}','${row.email}')"><i
                                                                class="fa fa-trash"></i></a>`;

            },
            orderable: false,
            searchable: false,
        }
        ],
    });
}

function deleteUser(userId, email) {
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover this user!",
        icon: "warning",
        buttons: [
            'No',
            'Yes'
        ],
        dangerMode: true,
    }).then(function (iscofirm) {
        if (iscofirm) {
            $.ajax({
                url: `${checkIsManagerApi}?userId=${userId}`,
                method: 'get',
                success(data) {
                    if (data.result === 1) {
                        swal({
                            title: "Are you sure?",
                            text: "This user is assigned as manager!",
                            icon: "warning",
                            buttons: [
                                'No',
                                'Yes'
                            ],
                            dangerMode: true,
                        }).then(function (iscofirm) {
                            if (iscofirm) {
                                console.log('call result: ' + result);
                                $.ajax({
                                    url: userApi,
                                    method: 'delete',
                                    data: JSON.stringify({
                                        email: email,
                                        userId: userId
                                    }),
                                    success(data) {
                                        successModal(data.msg);
                                        userManagementTable.ajax.reload();
                                        roleDataTable.ajax.reload();
                                        teamManagementTable.ajax.reload();
                                    },
                                    error(xhr, status, error) {
                                        errorModal(xhr.responseJSON.msg);
                                    }
                                });
                            }

                        });
                    }
                    else {
                        $.ajax({
                            url: userApi,
                            method: 'delete',
                            data: JSON.stringify({
                                email: email,
                                userId: userId
                            }),
                            success(data) {
                                successModal(data.msg);
                                userManagementTable.ajax.reload();
                                roleDataTable.ajax.reload();
                                teamManagementTable.ajax.reload();
                            },
                            error(xhr, status, error) {
                                errorModal(xhr.responseJSON.msg);
                            }
                        });
                    }
                }
            });
        }
    });
}

function createUser() {

    let formData = $('#createUserForm'); //.serialize();
    console.log(formData);
    formData.validate({
        rules: {
            userName: {
                required: true
            },
            userEmail: {
                required: true,
                emailAccept: "[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}"
            },
            roleSelector: {
                required: true
            },
            userMobile: {
                required: true,
                digits: true,
                normalizer(value) {
                    return $.trim(value);
                },

            }
        }
    });

    if (formData.valid()) {
        console.log(formData.serialize());
        if (user) {
            user = false;
            const data = {
            };
            formData.serializeArray().forEach((element) => {
                data[`${element.name}`] = element.value;
            });
            data.countryCode = $('#countryCode').val();
            $.ajax({
                url: userApi,
                data: JSON.stringify(data),
                method: 'post',
                success(data) {
                    $('#createUser').modal('toggle');
                    successModal(data.msg);
                    userManagementTable.ajax.reload();
                    roleDataTable.ajax.reload()
                    employeeListData();
                    user = true;
                    resetForm('createUserForm');
                },
                error(xhr, status, error) {
                    user = true;
                    errorModal(xhr.responseJSON.msg);
                }
            })
        }
    }
}

function userEnableForEdit(userId) {
    activeUserId = userId;
    // let form = $('#updateUserForm').validate();

    $.ajax({
        url: `${userDetailsApi}?userId=${userId}`,
        method: 'get',
        success(data) {
            console.log(data);
            const userData = data.data;
            $('#edit_userName').val(userData.firstName);
            $('#edit_userEmail').html(userData.email);
            $('#edit_userMobile').html(userData.mobileNumber);
            $('#edit_roleSelector').val(userData.role);
            $('#edit_user_roleCreate').prop('checked', userData.otherResponsibilities.role.create)
            $('#edit_user_roleUpdate').prop('checked', userData.otherResponsibilities.role.update)
            $('#edit_user_roleDelete').prop('checked', userData.otherResponsibilities.role.delete)
            $('#edit_user_roleView').prop('checked', userData.otherResponsibilities.role.view)

            $('#edit_user_subscriptionCreate').prop('checked', userData.otherResponsibilities.subscription.create)
            $('#edit_user_subscriptionUpdater').prop('checked', userData.otherResponsibilities.subscription.update)
            $('#edit_user_subscriptionView').prop('checked', userData.otherResponsibilities.subscription.view)


            $('#edit_user_metadataCreate').prop('checked', userData.otherResponsibilities.metadata.create)
            $('#edit_user_metadataDelete').prop('checked', userData.otherResponsibilities.metadata.delete)
            $('#edit_user_metadataView').prop('checked', userData.otherResponsibilities.metadata.view)
            $('#edit_user_metadataUpdate').prop('checked', userData.otherResponsibilities.metadata.delete)


            $('#edit_user_invoiceView').prop('checked', userData.otherResponsibilities.invoice.view)
            $('#edit_user_reportsAccess').prop('checked', userData.otherResponsibilities.reports.view)

            $('#editUser').modal('toggle');

        },
        error(xhr, status, error) {
            console.log(xhr);
            // errorModal(xhr.responseJSON.msg);
        }
    })
}

function updateUser() {

    let formData = $('#updateUserForm'); //.serialize();
    console.log(formData);
    formData.validate({
        rules: {
            userName: {
                required: true
            },
            userEmail: {
                required: true
            },
            roleSelector: {
                required: true
            },
            userMobile: {
                required: true,
                digits: true,
                normalizer(value) {
                    return $.trim(value);
                },

            }
        }
    });

    if (formData.valid()) {
        const data = {
            'userId': activeUserId
        };
        formData.serializeArray().forEach((element) => {
            data[`${element.name}`] = element.value;
        });
        $.ajax({
            url: userApi,
            data: JSON.stringify(data),
            method: 'put',
            success(data) {
                $('#editUser').modal('toggle');
                successModal(data.msg);
                userManagementTable.ajax.reload()
                roleDataTable.ajax.reload()
                employeeListData();

            },
            error(xhr, status, error) {
                errorModal(xhr.responseJSON.msg);
            }
        })
    }
}


// team functions
function getTeamList() {
    console.log('here');
    teamManagementTable = $('#teamManagementTable').DataTable({
        ajax: {
            url: teamApi
        },
        columns: [{
            mRender(data, type, row, meta) {

                return meta.row + 1;
            }
        },
        {
            data: "name"
        },
        {
            mRender(data, type, row) {
                if (row.teamManager != undefined) {
                    return `${row.teamManager.firstName}`;
                } else {
                    return '';
                }
            }
        },
        {
            mRender(data, type, row) {
                return `${row.members.length}`;
            }
        },
        {
            mRender(data, type, row) {
                return `<a href="javascript:" onclick="teamEnableForEdit('${row._id}')"><i class="fa fa-edit"></i></a>
                        <a href="javascript:" onclick="deleteTeam('${row._id}')"><i
                                                                class="fa fa-trash"></i></a>`;

            },
            orderable: false,
            searchable: false,
        }
        ],
    });
}

function addEmployeeToTeam() {
    const array = document.getElementById('employeeSelector').selectedOptions;
    console.log(array);
    console.log($('#employeeSelector').val());
}

function createTeam() {

    let formData = $('#createTeamFrom'); //.serialize();
    console.log(formData);
    formData.validate({
        rules: {
            teamName: {
                required: true,
                normalizer(value) {
                    return $.trim(value);
                }
            },
            managerSelector: {
                required: true,
                normalizer(value) {
                    return $.trim(value);
                }
            },
            employeeSelector: {
                required: true,
                normalizer(value) {
                    return $.trim(value);
                }
            },
            description: {
                required: true,
                normalizer(value) {
                    return $.trim(value);
                }
            }
        },
        errorPlacement: function (error, element) {
            if (element.attr("name") == "employeeSelector") {
                console.log('here');
                error.insertAfter($('#employee_error'));
            } else {
                error.insertAfter(element);
            }
        }
    });

    if (formData.valid()) {
        if (team) {
            team = false;
            $.ajax({
                url: teamApi,
                data: JSON.stringify({
                    'name': $('#teamName').val(),
                    'teamManager': $('#managerSelector').val(),
                    'members': $('#employeeSelector').val(),
                    'desc': $('#description').val()
                }),
                method: 'post',
                success(data) {
                    console.log(data);
                    $('#createTeam').modal('toggle');
                    successModal(data.msg);
                    team = true;
                    teamManagementTable.ajax.reload();
                    resetForm('createTeamFrom')
                },
                error(xhr, status, error) {
                    team = true;
                    errorModal(xhr.responseJSON.msg);
                }
            })
        }
    }
}

function deleteTeam(teamId) {
    swal({
        title: "Are you sure?",
        text: "To Delete This Team!",
        icon: "warning",
        buttons: [
            'No',
            'Yes'
        ],
        dangerMode: true,
    }).then(function (iscofirm) {
        if (iscofirm) {
            $.ajax({
                url: teamApi,
                method: 'delete',
                data: JSON.stringify({ teamId: teamId }),
                success(data) {
                    console.log(data);
                    successModal(data.msg);
                    teamManagementTable.ajax.reload()
                },
                error(xhr, status, error) {
                    errorModal(xhr.responseJSON.msg);
                }
            })
        }
    });

}

function teamEnableForEdit(teamId) {
    activeTeamId = teamId;
    let form = $('#updateTeamFrom');
    form[0].reset();

    $.ajax({
        url: `${teamDetailsApi}?teamId=${teamId}`,
        method: 'get',
        success(data) {
            const teamData = data.data;
            console.log(teamData);

            $('#edit_teamName').val(teamData.name);
            $('#edit_managerSelector').val(teamData.teamManager);
            $('#edit_employeeSelector').val(teamData.members);
            $('#edit_description').val(teamData.desc);
            // $("#edit_employeeSelector option").each(function () {
            //     if (teamData.members.includes($('#edit_managerSelector').attr('value'))) {
            //         $("#edit_managerSelector").attr("selected", true);
            //     }
            // });
            $(".select2_demo_3").select2({
                // placeholder: "Select a state",
                allowClear: true
            });
            $('#editTeam').modal('toggle');

        },
        error(xhr, status, error) {
            console.log(xhr);
            // errorModal(xhr.responseJSON.msg);
        }
    })
}

function updateTeam() {

    let formData = $('#updateTeamFrom'); //.serialize();
    console.log(formData);
    formData.validate({
        rules: {
            teamName: {
                required: true,
                normalizer(value) {
                    return $.trim(value);
                }
            },
            managerSelector: {
                required: true,
                normalizer(value) {
                    return $.trim(value);
                }
            },
            employeeSelector: {
                required: true,
                normalizer(value) {
                    return $.trim(value);
                }
            },
            description: {
                required: true,
                normalizer(value) {
                    return $.trim(value);
                }
            }
        },
        errorPlacement: function (error, element) {
            if (element.attr("name") == "employeeSelector") {
                console.log('here');
                error.insertAfter($('#update_employee_error'));
            } else {
                error.insertAfter(element);
            }
        }
    });

    if (formData.valid()) {
        console.log(formData.serialize());
        $.ajax({
            url: teamApi,
            data: JSON.stringify({
                'teamId': activeTeamId,
                'name': $('#edit_teamName').val(),
                'teamManager': $('#edit_managerSelector').val(),
                'members': $('#edit_employeeSelector').val(),
                'desc': $('#edit_description').val()
            }),
            method: 'put',
            success(data) {
                $('#editTeam').modal('toggle');
                successModal(data.msg);
                teamManagementTable.ajax.reload()
            },
            error(xhr, status, error) {
                errorModal(xhr.responseJSON.msg);
            }
        })
    }
}

function team_reset(formId){
    $('#edit_employeeSelector').val(null).trigger('change');
    $('#employeeSelector').val(null).trigger('change');
   
    
    $('#' + formId).trigger('reset');
}

$('#editUser').on('hidden.bs.modal', function () {
    $("#updateUserForm").validate().resetForm();
});

$('#createUser').on('hidden.bs.modal', function () {
    $("#createUserForm").validate().resetForm();
});

$('#createTeam').on('hidden.bs.modal', function () {
    $("#createTeamFrom").validate().resetForm();
});

$('#editTeam').on('hidden.bs.modal', function () {
    $("#updateTeamFrom").validate().resetForm();
});

$('#createRole').on('hidden.bs.modal', function () {
    $("#createRoleForm").validate().resetForm();
});

$('#editRole').on('hidden.bs.modal', function () {
    $("#updateRoleForm").validate().resetForm();
});