let roleId;
$(document).ready(async () => {
  /** Inititate the Datatable
   *  Fetch the Role list and bind it to the select tag option
   */
  loadAdminTable();
  loadRoleTable();
  await loadRoles();

  /** View role Details Ends*/
  $("#View_Role_Modal").on("hidden.bs.modal", function () {
    $("#View_Role_Modal_Form").trigger("reset");
  });
});
const adminTableConfig = {
  url: `${config.SERVER_URL}${config.URLS.ADMIN_LIST}`,
  type: "GET",
};
const roleTableConfig = {
  url: `${config.SERVER_URL}${config.URLS.ROLE_LIST}`,
  type: "GET",
};
const adminColumns = [
  {
    orderable: false,
    targets: -1,
    render: function (data, type, row, meta) {
      return meta.row + meta.settings._iDisplayStart + 1;
    },
  },
  { data: "name" },
  { data: "email" },
  {
    render: (data, type, row, meta) => {
      return row.adminDetails.length > 0
        ? row.adminDetails[0].name
        : "Super Admin";
    },
  },
  {
    render: (data, type, row, meta) => {
      return row.roleDetails ? row?.roleDetails?.roleName : "Role not assigned";
    },
  },
  {
    render: (data, type, row, meta) => {
      let text = `<div class="form-check form-switch">
                    <input name="blockAdmin" type="checkbox" class="form-check-input" id="blockToggle" value="${row._id}">
                </div>`;
      return text;
    },
  },
  {
    data: "_id",
    orderable: false,
    targets: -1,
    render: (data, type, row, meta) => {
      let text = `<div class='action-btn'>
                    <a data-bs-toggle="modal" data-bs-target="#View_Modal" data-id="${row._id}" data-name="${row.name}" data-roleid="${row?.roleDetails?.roleName}" data-email = "${row.email}" style="margin-right: 10px; cursor:pointer">
                    <i data-toggle="tooltip" data-placement="top" title="View" class="fa fa-eye" aria-hidden="true"></i></a>                         
                    <a data-bs-toggle="modal" data-bs-target="#Edit_Modal" data-id="${row._id}" data-name="${row.name}" data-roleid="${row.roleId}" data-email = "${row.email}"  style="margin-right: 10px; cursor:pointer">
                    <i data-toggle="tooltip" data-placement="top" title=Edit class="fa fa-pencil" aria-hidden="true"></i></a>
                    <a data-bs-toggle="modal" data-bs-target = "#Delete_Confirm_Modal" data-name="${row.name}" data-id="${row._id}" data-status = "${row.isDeleted}"  style="margin-right: 10px; cursor:pointer">
                    <i data-toggle="tooltip" data-placement="top" title='Delete' class="fa fa-trash" aria-hidden="true"></i></a>
                    </div>`;
      return text;
    },
  },
];

const roleColumns = [
  {
    orderable: false,
    targets: -1,
    render: function (data, type, row, meta) {
      return meta.row + meta.settings._iDisplayStart + 1;
    },
  },
  { data: "roleName" },
  {
    render: (data, type, row, meta) => {
      return row.adminDetails?.name;
    },
  },
  {
    render: (data, type, row, meta) => {
      return row?.roleCount.length > 0 ? row?.roleCount[0]?.string : 0;
    },
  },
  {
    data: "_id",
    orderable: false,
    targets: -1,
    render: (data, type, row, meta) => {
      let title = "";
      let modal = "";
      let _Class = "";
      if (row.isDeleted) {
        title = "Active";
        modal = "#Deactivate_Modal";
        _Class = "fa fa-user enabled-user";
      } else {
        title = "Inactive";
        modal = "#Reactivate_Modal";
        _Class = "fa fa-user-times disable-user";
      }
      let text = `<div class='action-btn'>
                    <a data-bs-toggle="modal" data-bs-target = "#View_Role_Modal" data-id="${
                      row._id
                    }" data-rolename="${
        row.roleName
      }" data-permissions = '${JSON.stringify(
        row.permissions
      )}'  style="margin-right: 10px; cursor:pointer">
                    <i data-toggle="tooltip" data-placement="top" title="View" class="fa fa-eye" aria-hidden="true"></i></a>
                    <a data-bs-toggle="modal" data-bs-target = "#Edit_Role_Modal" data-id="${
                      row._id
                    }" data-rolename = "${row.roleName}" data-roleid="${
        row.roleId
      }" data-permissions='${JSON.stringify(
        row.permissions
      )}'  style="margin-right: 10px; cursor:pointer">
                    <i data-toggle="tooltip" data-placement="top" title=Edit class="fa fa-pencil" aria-hidden="true"></i></a>`;
      text +=
        row?.roleCount.length == 0
          ? `<a data-bs-toggle="modal" data-bs-target = "#Delete_Role_Modal" data-id="${row._id}" data-rolename="${row.roleName}"  style="margin-right: 10px; cursor:pointer">
                <i data-toggle="tooltip" data-placement="top" title=Delete class="fa fa-trash" aria-hidden="true"></i></a>`
          : ``;
      text += `</div>`;
      return text;
    },
  },
];

const loadAdminTable = () =>
  initiateDatatable("userTable", adminTableConfig, adminColumns);
const loadRoleTable = () =>
  initiateDatatable("roleTable", roleTableConfig, roleColumns);

$(document).ready(async () => {
  /** Edit Admin Method*/
  $("#Edit_Modal").on("show.bs.modal", async (e) => {
    const btn = $(e.relatedTarget)
    const name = btn.data('name')
    let roleId = btn.data('roleid')
    const userId = btn.data('id')
    $('#NameInput').val(name)
    $(`#RoleList`).val(roleId)
    $('#RoleList').on('change', function () {
        roleId = this.value
    })
    $("#UpdateDetails")
      .off()
      .on("click", async function () {
        const editAdminForm = $("#Edit_Form");
        editAdminForm.validate({
          rules: {
            name: {
              required: true,
              normalizer(value) {
                return $.trim(value);
              },
            },
            RoleList: {
              required: true,
            },
          },
        });
        if (editAdminForm.valid()) {
          const editAdminFrom = {
            name: $("#NameInput").val().trim(),
            roleId: $("#RoleList").val(),
            userId
          };
          await axios({
            url: `${config.SERVER_URL}${config.URLS.EDIT_ADMIN}`,
            method: "PATCH",
            data: editAdminFrom,
            headers: {
              authorization: `Bearer ${token}`,
            },
          })
            .then((response) => {
              loadAdminTable();
              ToastMsg(response?.data?.message, "Success");
              loadRoleTable();
            })
            .catch((err) => {
              const {
                response: {
                  data: { message },
                },
              } = err;
              ToastMsg(message, "Error");
            });
          $("#Edit_Modal").modal("hide");
        }
      });
  });
  /** Edit Admin method Ends */

  /** View Admin Details Method*/
  $("#View_Modal").on("show.bs.modal", (e) => {
    const btn = $(e.relatedTarget);
    const name = btn.data("name");
    const email = btn.data("email");
    const roleName = btn.data("roleid");
    $("#NameInputView").val(name);
    $("#EmailInputView").val(email);
    $(`#RoleListView`).val(roleName);
  });
  /** View Admin Details Method Ends*/

  /** Delete Admin Method*/
  $("#Delete_Confirm_Modal").on("show.bs.modal", (e) => {
    const btn = $(e.relatedTarget);
    const userId = btn.data("id");
    const name = btn.data("name");
    $("#AdminDeleteModalText").text(
      `Are you sure you want to delete admin ${name}?`
    );

    $("#DeleteAdminBtn")
      .off()
      .on("click", async function () {
        $("#DeleteAdminBtn").text("Please wait..");
        const requestParams = {
          userId,
          status: true,
        };
        await axios({
          url: `${config.SERVER_URL}${config.URLS.DELETE_ADMIN}`,
          method: "PATCH",
          data: requestParams,
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
          .then((resp) => {
            loadAdminTable();
            console.log(resp);
            const {
              data: { data: { message },
              }} = resp;
            ToastMsg(message, "Success");

            })
          .catch((err) => {
            const {
              data: {
                data: { message },
              },
            } = err;
            ToastMsg(message, "Error");
          });
        $("#DeleteAdminBtn").text("Delete");
        $("#Delete_Confirm_Modal").modal("hide");
      });
  });
  /** Delete Admin Method Ends*/

  /** Edit Role Method*/
  $("#Edit_Role_Modal").on("show.bs.modal", (e) => {
    const btn = $(e.relatedTarget);
    const roleName = btn.data("rolename");
    roleId = btn.data("id");
    const permission = btn.data("permissions");
    $("#RoleInput").val(roleName);
    console.log(permission);
    for (const role of permission) {
      if (role.permissionName === "admin_management") {
        role.create
          ? $("#adminMng-Create").prop("checked", true)
          : $("#adminMng-Create").prop("checked", false);
        role.update
          ? $("#adminMng-Edit").prop("checked", true)
          : $("#adminMng-Edit").prop("checked", false);
        role.view
          ? $("#adminMng-View").prop("checked", true)
          : $("#adminMng-View").prop("checked", false);
        role.remove
          ? $("#adminMng-Delete").prop("checked", true)
          : $("#adminMng-Delete").prop("checked", false);
      }
      if (role.permissionName === "user_management") {
        role.create
          ? $("#userMng-Create").prop("checked", true)
          : $("#userMng-Create").prop("checked", false);
        role.update
          ? $("#userMng-Edit").prop("checked", true)
          : $("#userMng-Edit").prop("checked", false);
        role.remove
          ? $("#userMng-Delete").prop("checked", true)
          : $("#userMng-Delete").prop("checked", false);
        role.view
          ? $("#userMng-View").prop("checked", true)
          : $("#userMng-View").prop("checked", false);
      }
      if (role.permissionName === "collector_management") {
        role.create
          ? $("#collectorMng-Create").prop("checked", true)
          : $("#collectorMng-Create").prop("checked", false);
        role.update
          ? $("#collectorMng-Edit").prop("checked", true)
          : $("#collectorMng-Edit").prop("checked", false);
        role.view
          ? $("#collectorMng-View").prop("checked", true)
          : $("#collectorMng-View").prop("checked", false);
        role.remove
          ? $("#collectorMng-Delete").prop("checked", true)
          : $("#collectorMng-Delete").prop("checked", false);
      }
      if (role.permissionName === "license_management") {
        role.create
          ? $("#licenseMng-Create").prop("checked", true)
          : $("#licenseMng-Create").prop("checked", false);
        role.update
          ? $("#licenseMng-Edit").prop("checked", true)
          : $("#licenseMng-Edit").prop("checked", false);
        role.view
          ? $("#licenseMng-View").prop("checked", true)
          : $("#licenseMng-View").prop("checked", false);
        role.remove
          ? $("#licenseMng-Delete").prop("checked", true)
          : $("#licenseMng-Delete").prop("checked", false);
      }
      if (role.permissionName === "nft_management") {
        role.create
          ? $("#nftMng-Create").prop("checked", true)
          : $("#nftMng-Create").prop("checked", false);
        role.update
          ? $("#nftMng-Edit").prop("checked", true)
          : $("#nftMng-Edit").prop("checked", false);
        role.view
          ? $("#nftMng-View").prop("checked", true)
          : $("#nftMng-View").prop("checked", false);
        role.remove
          ? $("#nftMng-Delete").prop("checked", true)
          : $("#nftMng-Delete").prop("checked", false);
      }
      if (role.permissionName === "royalties_management") {
        role.create
          ? $("#royaltiesMng-Create").prop("checked", true)
          : $("#royaltiesMng-Create").prop("checked", false);
        role.update
          ? $("#royaltiesMng-Edit").prop("checked", true)
          : $("#royaltiesMng-Edit").prop("checked", false);
        role.view
          ? $("#royaltiesMng-View").prop("checked", true)
          : $("#royaltiesMng-View").prop("checked", false);
        role.remove
          ? $("#royaltiesMng-Delete").prop("checked", true)
          : $("#royaltiesMng-Delete").prop("checked", false);
      }
      if (role.permissionName === "transaction_management") {
        role.create
          ? $("#transactionMng-Create").prop("checked", true)
          : $("#transactionMng-Create").prop("checked", false);
        role.update
          ? $("#transactionMng-Edit").prop("checked", true)
          : $("#transactionMng-Edit").prop("checked", false);
        role.view
          ? $("#transactionMng-View").prop("checked", true)
          : $("#transactionMng-View").prop("checked", false);
        role.remove
          ? $("#transactionMng-Delete").prop("checked", true)
          : $("#transactionMng-Delete").prop("checked", false);
      }
      if (role.permissionName === "infatuation") {
        role.create
          ? $("#infactuationMng-Create").prop("checked", true)
          : $("#infactuationMng-Create").prop("checked", false);
        role.update
          ? $("#infactuationMng-Edit").prop("checked", true)
          : $("#infactuationMng-Edit").prop("checked", false);
        role.view
          ? $("#infactuationMng-View").prop("checked", true)
          : $("#infactuationMng-View").prop("checked", false);
        role.remove
          ? $("#infactuationMng-Delete").prop("checked", true)
          : $("#infactuationMng-Delete").prop("checked", false);
      }
      if (role.permissionName === "curated") {
        role.create
          ? $("#curatedMng-Create").prop("checked", true)
          : $("#curatedMng-Create").prop("checked", false);
        role.update
          ? $("#curatedMng-Edit").prop("checked", true)
          : $("#curatedMng-Edit").prop("checked", false);
        role.view
          ? $("#curatedMng-View").prop("checked", true)
          : $("#curatedMng-View").prop("checked", false);
        role.remove
          ? $("#curatedMng-Delete").prop("checked", true)
          : $("#curatedMng-Delete").prop("checked", false);
      }
      if (role.permissionName === "content_management") {
        role.create
          ? $("#contentMng-Create").prop("checked", true)
          : $("#contentMng-Create").prop("checked", false);
        role.update
          ? $("#contentMng-Edit").prop("checked", true)
          : $("#contentMng-Edit").prop("checked", false);
        role.view
          ? $("#contentMng-View").prop("checked", true)
          : $("#contentMng-View").prop("checked", false);
        role.remove
          ? $("#contentMng-Delete").prop("checked", true)
          : $("#contentMng-Delete").prop("checked", false);
      }
      if (role.permissionName === "feature") {
        role.create
          ? $("#featureMng-Create").prop("checked", true)
          : $("#featureMng-Create").prop("checked", false);
        role.update
          ? $("#featureMng-Edit").prop("checked", true)
          : $("#featureMng-Edit").prop("checked", false);
        role.view
          ? $("#featureMng-View").prop("checked", true)
          : $("#featureMng-View").prop("checked", false);
        role.remove
          ? $("#featureMng-Delete").prop("checked", true)
          : $("#featureMng-Delete").prop("checked", false);
      }
      if (role.permissionName === "role_management") {
        role.create
          ? $("#roleMng-Create").prop("checked", true)
          : $("#roleMng-Create").prop("checked", false);
        role.update
          ? $("#roleMng-Edit").prop("checked", true)
          : $("#roleMng-Edit").prop("checked", false);
        role.view
          ? $("#roleMng-View").prop("checked", true)
          : $("#roleMng-View").prop("checked", false);
        role.remove
          ? $("#roleMng-Delete").prop("checked", true)
          : $("#roleMng-Delete").prop("checked", false);
      }
    }
    $("#UpdateRoleDetails")
      .off()
      .on("click", async function () {
        let permissions = [];

        const permissionIdList = [
          "adminMng-Create",
          "adminMng-Edit",
          "adminMng-View",
          "adminMng-Delete",
          "userMng-Create",
          "userMng-Edit",
          "userMng-View",
          "userMng-Delete",
          "roleMng-Create",
          "roleMng-Edit",
          "roleMng-View",
          "roleMng-Delete",
          "collectorMng-Create",
          "collectorMng-Edit",
          "collectorMng-View",
          "collectorMng-Delete",
          "licenseMng-Create",
          "licenseMng-Edit",
          "licenseMng-View",
          "licenseMng-Delete",
          "nftMng-Create",
          "nftMng-Edit",
          "nftMng-View",
          "nftMng-Delete",
          "royaltiesMng-Create",
          "royaltiesMng-Edit",
          "royaltiesMng-View",
          "royaltiesMng-Delete",
          "transactionMng-Create",
          "transactionMng-Edit",
          "transactionMng-View",
          "transactionMng-Delete",
          "infactuationMng-Create",
          "infactuationMng-Edit",
          "infactuationMng-View",
          "infactuationMng-Delete",
          "curatedMng-Create",
          "curatedMng-Edit",
          "curatedMng-View",
          "curatedMng-Delete",
          "contentMng-Create",
          "contentMng-Edit",
          "contentMng-Delete",
          "contentMng-View",
          "featureMng-Create",
          "featureMng-Edit",
          "featureMng-View",
          "featureMng-Delete",
        ];

        const permissonsObj = {
          adminMng: "admin_management",
          userMng: "user_management",
          roleMng: "role_management",
          collectorMng: "collector_management",
          licenseMng: "license_management",
          nftMng: "nft_management",
          royaltiesMng: "royalties_management",
          transactionMng: "transaction_management",
          infactuationMng: "infatuation",
          curatedMng: "curated",
          contentMng: "content_management",
          featureMng: "feature",
        };
        const calculatedPermissionObj = {};
        permissionIdList.forEach((permisson) => {
          const permissionSplit = permisson.split("-");
          const permissionId = permissionCond(permissionSplit[1]);
          if (
            !calculatedPermissionObj[
              `${permissonsObj[`${permissionSplit[0]}`]}`
            ]
          ) {
            calculatedPermissionObj[
              `${permissonsObj[`${permissionSplit[0]}`]}`
            ] = {};
          }
          if ($(`#${permisson}`).prop("checked") == true) {
            calculatedPermissionObj[
              `${permissonsObj[`${permissionSplit[0]}`]}`
            ][`${permissionId}`] = true;
          } else {
            calculatedPermissionObj[
              `${permissonsObj[`${permissionSplit[0]}`]}`
            ][`${permissionId}`] = false;
          }
        });

        const keyList = Object.keys(calculatedPermissionObj);
        keyList.forEach((eachKey) => {
          permissions.push({
            permissionName: eachKey,
            ...calculatedPermissionObj[`${eachKey}`],
          });
        });
        const _roleName = $("#RoleInput").val().trim();
        const requestParams = {
          roleName: _roleName,
          permissions,
          roleId,
        };
        await axios({
          url: `${config.SERVER_URL}${config.URLS.EDIT_ROLE}`,
          method: "PATCH",
          data: requestParams,
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
          .then(async (response) => {
            loadRoleTable();
            ToastMsg(response?.data?.message, "Success");
            await loadRoles();
          })
          .catch((err) => {
            const {
              response: {
                data: { message },
              },
            } = err;
            ToastMsg(message, "Error");
          });
        $("#Edit_Role_Modal").modal("hide");
      });
  });
  /** Edit Role Method Ends*/

  /** View role Details*/
  $("#View_Role_Modal").on("show.bs.modal", (e) => {
    $(".ViewRoleDet").prop("disabled", true);
    const btn = $(e.relatedTarget);
    const roleName = btn.data("rolename");
    let permissions = btn.data("permissions");
    console.log(permissions);
    $("#RoleInputView").val(roleName);
    console.log(permissions);
    for (const e of permissions) {
      if (e.permissionName === "admin_management") {
        e.create
          ? $("#adminMngCreate").prop("checked", true)
          : $("#adminMngCreate").prop("checked", false);
        e.update
          ? $("#adminMngEdit").prop("checked", true)
          : $("#adminMngEdit").prop("checked", false);
        e.view
          ? $("#adminMngView").prop("checked", true)
          : $("#adminMngView").prop("checked", false);
        e.remove
          ? $("#adminMngDelete").prop("checked", true)
          : $("#adminMngDelete").prop("checked", false);
      }
      if (e.permissionName === "user_management") {
        e.create
          ? $("#userMngCreate").prop("checked", true)
          : $("#userMngCreate").prop("checked", false);
        e.update
          ? $("#userMngEdit").prop("checked", true)
          : $("#userMngEdit").prop("checked", false);
        e.view
          ? $("#userMngView").prop("checked", true)
          : $("#userMngView").prop("checked", false);
        e.remove
          ? $("#userMngDelete").prop("checked", true)
          : $("#userMngDelete").prop("checked", false);
      }
      if (e.permissionName === "collector_management") {
        e.create
          ? $("#collectorMngCreate").prop("checked", true)
          : $("#collectorMngCreate").prop("checked", false);
        e.update
          ? $("#collectorMngEdit").prop("checked", true)
          : $("#collectorMngEdit").prop("checked", false);
        e.view
          ? $("#collectorMngView").prop("checked", true)
          : $("#collectorMngView").prop("checked", false);
        e.remove
          ? $("#collectorMngDelete").prop("checked", true)
          : $("#collectorMngDelete").prop("checked", false);
      }
      if (e.permissionName === "license_management") {
        e.create
          ? $("#licenseMngCreate").prop("checked", true)
          : $("#licenseMngCreate").prop("checked", false);
        e.update
          ? $("#licenseMngEdit").prop("checked", true)
          : $("#licenseMngEdit").prop("checked", false);
        e.view
          ? $("#licenseMngView").prop("checked", true)
          : $("#licenseMngView").prop("checked", false);
        e.remove
          ? $("#licenseMngDelete").prop("checked", true)
          : $("#licenseMngDelete").prop("checked", false);
      }
      if (e.permissionName === "nft_management") {
        e.create
          ? $("#nftMngCreate").prop("checked", true)
          : $("#nftMngCreate").prop("checked", false);
        e.update
          ? $("#nftMngEdit").prop("checked", true)
          : $("#nftMngEdit").prop("checked", false);
        e.view
          ? $("#nftMngView").prop("checked", true)
          : $("#nftMngView").prop("checked", false);
        e.remove
          ? $("#nftMngDelete").prop("checked", true)
          : $("#nftMngDelete").prop("checked", false);
      }
      if (e.permissionName === "royalties_management") {
        e.create
          ? $("#royaltiesMngCreate").prop("checked", true)
          : $("#royaltiesMngCreate").prop("checked", false);
        e.update
          ? $("#royaltiesMngEdit").prop("checked", true)
          : $("#royaltiesMngEdit").prop("checked", false);
        e.view
          ? $("#royaltiesMngView").prop("checked", true)
          : $("#royaltiesMngView").prop("checked", false);
        e.remove
          ? $("#royaltiesMngDelete").prop("checked", true)
          : $("#royaltiesMngDelete").prop("checked", false);
      }
      if (e.permissionName === "transaction_management") {
        e.create
          ? $("#transactionMngCreate").prop("checked", true)
          : $("#transactionMngCreate").prop("checked", false);
        e.update
          ? $("#transactionMngEdit").prop("checked", true)
          : $("#transactionMngEdit").prop("checked", false);
        e.view
          ? $("#transactionMngView").prop("checked", true)
          : $("#transactionMngView").prop("checked", false);
        e.remove
          ? $("#transactionMngDelete").prop("checked", true)
          : $("#transactionMngDelete").prop("checked", false);
      }
      if (e.permissionName === "infatuation") {
        e.create
          ? $("#infactuationMngCreate").prop("checked", true)
          : $("#infactuationMngCreate").prop("checked", false);
        e.update
          ? $("#infactuationMngEdit").prop("checked", true)
          : $("#infactuationMngEdit").prop("checked", false);
        e.view
          ? $("#infactuationMngView").prop("checked", true)
          : $("#infactuationMngView").prop("checked", false);
        e.remove
          ? $("#infactuationMngDelete").prop("checked", true)
          : $("#infactuationMngDelete").prop("checked", false);
      }
      if (e.permissionName === "curated") {
        e.create
          ? $("#curatedMngCreate").prop("checked", true)
          : $("#curatedMngCreate").prop("checked", false);
        e.update
          ? $("#curatedMngEdit").prop("checked", true)
          : $("#curatedMngEdit").prop("checked", false);
        e.view
          ? $("#curatedMngView").prop("checked", true)
          : $("#curatedMngView").prop("checked", false);
        e.remove
          ? $("#curatedMngDelete").prop("checked", true)
          : $("#curatedMngDelete").prop("checked", false);
      }
      if (e.permissionName === "content_management") {
        e.create
          ? $("#contentMngCreate").prop("checked", true)
          : $("#contentMngCreate").prop("checked", false);
        e.update
          ? $("#contentMngEdit").prop("checked", true)
          : $("#contentMngEdit").prop("checked", false);
        e.view
          ? $("#contentMngView").prop("checked", true)
          : $("#contentMngView").prop("checked", false);
        e.remove
          ? $("#contentMngDelete").prop("checked", true)
          : $("#contentMngDelete").prop("checked", false);
      }
      if (e.permissionName === "feature") {
        e.create
          ? $("#featureMngCreate").prop("checked", true)
          : $("#featureMngCreate").prop("checked", false);
        e.update
          ? $("#featureMngEdit").prop("checked", true)
          : $("#featureMngEdit").prop("checked", false);
        e.view
          ? $("#featureMngView").prop("checked", true)
          : $("#featureMngView").prop("checked", false);
        e.remove
          ? $("#featureMngDelete").prop("checked", true)
          : $("#featureMngDelete").prop("checked", false);
      }
      if (e.permissionName === "role_management") {
        e.create
          ? $("#roleMngCreate").prop("checked", true)
          : $("#roleMngCreate").prop("checked", false);
        e.update
          ? $("#roleMngEdit").prop("checked", true)
          : $("#roleMngEdit").prop("checked", false);
        e.view
          ? $("#roleMngView").prop("checked", true)
          : $("#roleMngView").prop("checked", false);
        e.remove
          ? $("#roleMngDelete").prop("checked", true)
          : $("#roleMngDelete").prop("checked", false);
      }
    }
  });

  /** Delete role Method*/
  $("#Delete_Role_Modal").on("show.bs.modal", (e) => {
    const btn = $(e.relatedTarget);
    roleId = btn.data("id");
    const roleName = btn.data("rolename");
    $("#RoleDeleteModalText").text(
      `Are you sure you want to delete ${roleName} role?`
    );

    $("#DeleteRoleBtn")
      .off()
      .on("click", async function () {
        $("#DeleteRoleBtn").text("Please wait..");
        await axios({
          url: `${config.SERVER_URL}${config.URLS.DELETE_ROLE}/${roleId}`,
          method: "PATCH",
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
          .then(async (resp) => {
            loadRoleTable();
            ToastMsg(resp?.data?.message, "Success");
            await loadRoles();
          })
          .catch((err) => {
            const {
              response: {
                data: { message },
              },
            } = err;
            ToastMsg(message, "Error");
          });
        $("#DeleteRoleBtn").text("Delete");
        $("#Delete_Role_Modal").modal("hide");
      });
  });

  /** Delete role Method Ends*/

  /** Create Admin Method */
  $("#Create_Modal").on("show.bs.modal", function () {
    $("#CreateAdminBtn")
      .off()
      .on("click", async function () {
        const name = $("#AdminNameInput").val().trim();
        const email = $("#AdminEmailInput").val().trim().toLowerCase();
        // $("#RoleListCreate").on("change", function () {
        //   roleId = this.value;
        // });
        let roleId = $("#RoleListCreate").val().trim();
        const requestParams = {
          name,
          email,
          roleId,
        };
        await axios(
          axiosConfig(
            `${config.SERVER_URL}${config.URLS.CREATE_ADMIN}`,
            "POST",
            requestParams
          )
        )
          .then((resp) => {
            loadAdminTable();
            loadRoleTable();
            ToastMsg(resp?.data?.message, "Success");
          })
          .catch((e) => {
            ToastMsg(e?.response?.data?.message, "Error");
          });
        $("#Create_Modal").modal("hide");
      });
  });

  $("#Create_Modal").on("hidden.bs.modal", function () {
    $("#Create_Form").trigger("reset");
  });
  $("#Edit_Role_Modal").on("hidden.bs.modal", function () {
    $("#Edit_Role_Form").trigger("reset");
  });
});
/** Create Admin Method Ends */

/** Create Role Method */
$("#Create_Role_Modal").on("show.bs.modal", (e) => {
  $("#CreateRoleBtn")
    .off()
    .on("click", async function () {
      const btn = $(e.relatedTarget);
      $(".CreateRoleDet").prop("enabled", true);
      const roleName = $("#RoleNameInput").val().trim();
      let permissions = [];
      const permissionIdList = [
        "adminMng_Create",
        "adminMng_Edit",
        "adminMng_View",
        "adminMng_Delete",
        "userMng_Create",
        "userMng_Edit",
        "userMng_View",
        "userMng_Delete",
        "roleMng_Create",
        "roleMng_Edit",
        "roleMng_View",
        "roleMng_Delete",
        "collectorMng_Create",
        "collectorMng_Edit",
        "collectorMng_View",
        "collectorMng_Delete",
        "licenseMng_Create",
        "licenseMng_Edit",
        "licenseMng_View",
        "licenseMng_Delete",
        "nftMng_Create",
        "nftMng_Edit",
        "nftMng_View",
        "nftMng_Delete",
        "royaltiesMng_Create",
        "royaltiesMng_Edit",
        "royaltiesMng_View",
        "royaltiesMng_Delete",
        "transactionMng_Create",
        "transactionMng_Edit",
        "transactionMng_View",
        "transactionMng_Delete",
        "infactuationMng_Create",
        "infactuationMng_Edit",
        "infactuationMng_View",
        "infactuationMng_Delete",
        "curatedMng_Create",
        "curatedMng_Edit",
        "curatedMng_View",
        "curatedMng_Delete",
        "contentMng_Create",
        "contentMng_Edit",
        "contentMng_Delete",
        "contentMng_View",
        "featureMng_Create",
        "featureMng_Edit",
        "featureMng_View",
        "featureMng_Delete",
      ];
      const permissonsObj = {
        adminMng: "admin_management",
        userMng: "user_management",
        roleMng: "role_management",
        collectorMng: "collector_management",
        licenseMng: "license_management",
        nftMng: "nft_management",
        royaltiesMng: "royalties_management",
        transactionMng: "transaction_management",
        infactuationMng: "infatuation",
        curatedMng: "curated",
        contentMng: "content_management",
        featureMng: "feature",
      };
      const calculatedPermissionObj = {};
      permissionIdList.forEach((permisson) => {
        const permissionSplit = permisson.split("_");
        const permissionId = permissionCond(permissionSplit[1]);
        if (
          !calculatedPermissionObj[`${permissonsObj[`${permissionSplit[0]}`]}`]
        ) {
          calculatedPermissionObj[`${permissonsObj[`${permissionSplit[0]}`]}`] =
            {};
        }
        if ($(`#${permisson}`).prop("checked") == true) {
          calculatedPermissionObj[`${permissonsObj[`${permissionSplit[0]}`]}`][
            `${permissionId}`
          ] = true;
        } else {
          calculatedPermissionObj[`${permissonsObj[`${permissionSplit[0]}`]}`][
            `${permissionId}`
          ] = false;
        }
      });
      const keyList = Object.keys(calculatedPermissionObj);
      keyList.forEach((eachKey) => {
        permissions.push({
          permissionName: eachKey,
          ...calculatedPermissionObj[`${eachKey}`],
        });
      });
      const requestParams = {
        roleName,
        permissions,
      };
      await axios(
        axiosConfig(
          `${config.SERVER_URL}${config.URLS.CREATE_ROLE}`,
          "POST",
          requestParams
        )
      )
        .then(async (resp) => {
          loadRoleTable();
          ToastMsg(resp?.data?.message, "Success");
          await loadRoles();
        })
        .catch((e) => {
          ToastMsg(e?.response?.data?.message, "Error");
        });
      $("#Create_Role_Modal").modal("hide");
    });
});
$("#Create_Role_Modal").on("hidden.bs.modal", function () {
  $("#Create_Role_Form").trigger("reset");
});

function permissionCond(cond) {
  if (cond == "Create") {
    return "create";
  } else if (cond == "Edit") {
    return "update";
  } else if (cond == "View") {
    return "view";
  } else if (cond == "Delete") {
    return "remove";
  }
}

/**Block & Unblock admin */
let status;
$(document).on("change", "input[name='blockAdmin']", function () {
  if (this.checked) {
    status = true;
    blockUser(this.value);
  } else {
    status = false;
    blockUser(this.value);
  }
});
async function blockUser(userId) {
  const requestParams = {
    userId,
    status,
  };
  await axios({
    url: `${config.SERVER_URL}${config.URLS.BLOCK_ADMIN}`,
    method: "PATCH",
    data: requestParams,
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      ToastMsg(response?.data?.message, "Success");
      //console.log('User blocked successfully', response);
    })
    .catch((err) => {
      const {
        response: {
          data: { message },
        },
      } = err;
      ToastMsg(message, "Error");
    });
}

async function loadRoles() {
  await axios({
    url: `${config.SERVER_URL}${config.URLS.ROLE_LIST}`,
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .then((resp) => {
        $('#RoleList').find('option').remove()
        $('#RoleListCreate').find('option').remove()
        $("#RoleList").append(
            $("<option>")
          );
          $("#RoleListCreate").append(
            $("<option>")
          );
          
        $.each(resp.data?.data, function (i, item) {
        $("#RoleList").append(
          $("<option>", {
            value: item._id,
            text: item.roleName,
            id: item._id,
            class: "form-control",
          })
        );
        $("#RoleListCreate").append(
          $("<option>", {
            value: item._id,
            text: item.roleName,
            id: item._id,
            class: "form-control",
          })
        );
      });
    })
    .catch((err) => {});
}
