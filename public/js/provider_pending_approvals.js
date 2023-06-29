const provider = window.location.href.split("/").slice(-1).pop();

const approveProvider = () => {
  let formData = $("#acceptProviderForm");
  formData.validate({
    rules: {
      relationshipManagerList: {
        required: true
      },
      saleManager: {
        required: true
      }
    }
  });

  if (formData.valid() === true) {
    $.ajax({
      url: providerActiveApi,
      data: JSON.stringify({
        relationshipManagerList: $("#relationshipManagerList").val(),
        saleManager: $("#saleManager").val(),
        providerId: provider
      }),
      method: "put",
      success(data) {
        $("#acceptProvider").modal("toggle");
        successModal(data.msg);
        window.location = "";
      },
      error(xhr, status, error) {
        errorModal(xhr.responseJSON.msg);
      }
    });
  }
};

const rejectProvider = () => {
  swal({
    title: "Are you sure",
    text: "To reject provider..?",
    closeOnClickOutside: false,
    icon: "warning",
    type: "success",
    content: {
      element: "input",
      attributes: {
        placeholder: "Enter Reason",
        type: "text"
      }
    },
    dangerMode: true
  }).then((reason) => {
    if (reason === "") {
      return false;
    } else {
      $.ajax({
        url: providerRejectApi,
        method: "put",
        data: JSON.stringify({
          providerId: provider,
          reason: reason
        }),
        success: (data) => {
          successModal("Provider is rejected");
          window.location = "";
        },
        error: (result) => {
          errorModal("Reason is required");
        }
      });
    }
  });
};

const employeeListData = () => {
  $.ajax({
    url: allUserApi,
    method: "get",
    success(data) {
      $("#relationshipManagerList").html("");
      $("#saleManager").html("");

      let optionsForRelationShipManager = '<option value="">Please Select Relationship Manager...</option>';
      let optionsForSaleManager = '<option value="">Please Select Sale Manager...</option>';

      let options = "";
      data.data.forEach((role) => {
        options += `<option value=${role._id}>${role.firstName}</option>`;
      });
      optionsForRelationShipManager += options;
      optionsForSaleManager += options;
      $("#relationshipManagerList").html(optionsForRelationShipManager);
      $("#saleManager").html(optionsForSaleManager);
    },
    error(xhr, stats, error) {}
  });
};

const providerDetails = () => {
  $.ajax({
    url: `${providerDetailsApi}?providerId=${provider}`,
    method: "get",
    success: (data) => {
      const provider = data.data;

      if (provider.isRejected === false && provider.isVerified === false) {
        let html = ``;
        // if(provider.document?.duns_number){
        html = `<button class="btn btn-success " data-toggle="modal" data-target="#acceptProvider">Accept</button>`;
        // }
        $("#acceptRejectSection").html(`${html} &nbsp; <button class="btn btn-danger " onclick="rejectProvider()" >Reject </button>`);
      }

      if (provider.isRejected) {
        $("#rejectedDiv").html(`<div class="form-group row">
                <label class="col-sm-3 col-lg-5 col-xl-5 col-form-label">Is rejected</label>
                <div class="col-sm-7 col-lg-7 col-xl-7">
                    <p>True </p>
                </div>
            </div>`);
      }

      if (provider.isRejected) {
        $("#rejectedReasonDiv").html(` <div class="form-group row">
                <label class="col-sm-3 col-lg-5 col-xl-5 col-form-label">Reason of Rejected </label>
                <div class="col-sm-7 col-lg-7 col-xl-7">
                    <p>${provider.reason} </p>
                </div>
            </div> `);
      }
      const name = provider.lastName ? `${provider.firstName} ${provider.lastName}` : `${provider.firstName}`;
      $("#name").html(name);
      $("#createdAt").html(moment(new Date(provider.createdAt)).utc().format("MM/DD/YYYY "));
      $("#email").html(provider.email);

      if (provider.document) {
        $("#duns_number").html(provider.document.duns_number);
        $("#orgName").html(provider.document.organization_name);
      }
    },
    error: (result) => {}
  });
};

function generalAggrementRedire() {
  window.localStorage.setItem("lastProvider", provider);

  window.location = "/admin/general_agreement";
}

employeeListData();
providerDetails();
