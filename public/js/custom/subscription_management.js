let subscription = true;
let activePlanId = "";

$("#isFree").change(function (e) {
  if ($(this).prop("checked") == true) {
    document.getElementById("checkForMonthDay").innerHTML = "Days of validity";
  } else {
    document.getElementById("checkForMonthDay").innerHTML = "Monthly validity";
  }
});

$("#isFree_update").change(function (e) {
  if ($(this).prop("checked") == true) {
    document.getElementById("checkForMonthDay_update").innerHTML = "Days of validity";
  } else {
    document.getElementById("checkForMonthDay_update").innerHTML = "Monthly validity";
  }
});

$("#planType").change(function (e) {
  if (this.value === "pay_per_use") {
    $("#pay_par_use_plan_filed").show();
    $("#level_based_subscription_filed").hide();
  } else if (this.value === "level_based") {
    $("#pay_par_use_plan_filed").hide();
    $("#level_based_subscription_filed").show();
  } else {
    $("#pay_par_use_plan_filed").hide();
    $("#level_based_subscription_filed").hide();
  }
});

$("#role_management").change(function (e) {
  if ($(this).is(":checked")) {
    $("#role_management_cost").show();
  } else {
    $("#role_management_cost").hide();
  }
});

$("#user_management").change(function (e) {
  if ($(this).is(":checked")) {
    $("#user_management_limit").show();
    $("#user_management_limit_number").show();
    $("#user_management_limit_label").show();
    $("#user_management_cost").show();
    $("#role_management").prop("checked", true);
    $("#role_management_cost").show();
  } else {
    $("#user_management_limit").hide();
    $("#user_management_limit_number").hide();
    $("#user_management_limit_label").hide();
    $("#user_management_cost").hide();
  }
});

$("#user_management_limit").change(function (e) {
  if ($(this).is(":checked")) {
    $("#user_management_limit_number").hide();
  } else {
    $("#user_management_limit_number").show();
  }
});

$("#team_management").change(function (e) {
  if ($(this).is(":checked")) {
    $("#team_management_cost").show();
    $("#user_management_limit").show();
    $("#user_management_limit_number").show();
    $("#user_management_limit_label").show();
    $("#user_management_cost").show();
    $("#role_management").prop("checked", true);
    $("#user_management").prop("checked", true);
    $("#role_management_cost").show();
  } else {
    $("#team_management_cost").hide();
  }
});

$("#reports").change(function (e) {
  if ($(this).is(":checked")) {
    $("#reports_cost").show();
  } else {
    $("#reports_cost").hide();
  }
});

$("#transaction_history").change(function (e) {
  if ($(this).is(":checked")) {
    $("#transaction_history_cost").show();
  } else {
    $("#transaction_history_cost").hide();
  }
});

$("#add_tags").change(function (e) {
  if ($(this).is(":checked")) {
    $("#add_tags_cost").show();
  } else {
    $("#add_tags_cost").hide();
  }
});

$("#meta_fields_search").change(function (e) {
  if ($(this).is(":checked")) {
    $("#meta_fields_search_cost").show();
  } else {
    $("#meta_fields_search_cost").hide();
  }
});

$("#advance_tik_search").change(function (e) {
  if ($(this).is(":checked")) {
    $("#advance_tik_search_cost").show();
  } else {
    $("#advance_tik_search_cost").hide();
  }
});

$("#template_auto_save").change(function (e) {
  if ($(this).is(":checked")) {
    $("#template_auto_save_cost").show();
  } else {
    $("#template_auto_save_cost").hide();
  }
});

$("#api_analytics").change(function (e) {
  if ($(this).is(":checked")) {
    $("#api_analytics_cost").show();
    $("#api_limit_label").show();
    $("#api_analytics_limit").show();
  } else {
    $("#api_analytics_cost").hide();
    $("#api_limit_label").hide();
    $("#api_analytics_limit").hide();
  }
});

$("#createSubscriptionModal").on("hidden.bs.modal", function () {
  $("#SubscriptionPlanCreate").validate().resetForm();
  resetForm("SubscriptionPlanCreate");
  $(".cost").hide();
});

$("#editSubscriptionModal").on("hidden.bs.modal", function () {
  $("#SubscriptionPlanUpdate").validate().resetForm();
  resetForm("SubscriptionPlanUpdate");
  $(".cost").hide();
});

const createSubscription = () => {
  let formData = $("#SubscriptionPlanCreate");

  formData.validate({
    rules: {
      planPrice: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        }
      },
      tireName: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        }
      },
      pricePerTransaction: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        }
      },
      extraSize: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        }
      },
      extraCost: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        }
      },
      planType: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        }
      },
      planName: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        }
      },
      transactionPerMonth: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        }
      },
      docSizePerTransaction: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        }
      },
      planValidity: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        }
      },
      tireName: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        }
      },
      pricePerTransaction: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        }
      },
      extraSize: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        }
      },
      extraCost: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        }
      },
      role_management_cost: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        }
      },
      user_management_cost: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        }
      },
      team_management_cost: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        }
      },
      reports_cost: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        }
      },
      api_analytics_cost: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        }
      },
      transaction_history_cost: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        }
      },
      add_tags_cost: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        }
      },
      meta_fields_search_cost: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        }
      },
      advance_tik_search_cost: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        }
      },
      template_auto_save_cost: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        }
      }
    },
    errorPlacement(error, element) {
      if (element.attr("type") == "radio") {
        error.insertAfter($("#benefitDiv"));
      } else {
        error.insertAfter(element);
      }
    }
  });

  if (formData.valid()) {
    if (subscription) {
      subscription = false;
      const subscriptionData = {
        type: $("#planType").val(),
        planName: $("#planName").val(),
        transactionPerMonth: $("#transactionPerMonth").val(),
        docSizePerTransaction: $("#docSizePerTransaction").val(),
        validity: $("#planValidity").val()
      };
      if ($("#isFree").is(":checked")) {
        subscriptionData.isFreeTirePlan = true;
      } else {
        subscriptionData.isFreeTirePlan = false;
      }
      if (subscriptionData.type === "pay_per_use") {
        subscriptionData.tierName = $("#tireName").val();
        subscriptionData.pricePerTransaction = $("#pricePerTransaction").val();
        subscriptionData.extraSize = $("#extraSize").val();
        subscriptionData.extraCost = $("#extraCost").val();
      } else {
        subscriptionData.planPrice = $("#planPrice").val();
      }

      const specialFeatures = [];

      if ($("#role_management").is(":checked")) {
        specialFeatures.push({
          featureName: "role_management",
          price: $("#role_management_cost").val()
        });
      }

      if ($("#user_management").is(":checked")) {
        const test = {
          featureName: "user_management",
          price: $("#user_management_cost").val()
        };
        test.limit = $("#user_management_limit_number").val();
        test.isInfinite = $("#user_management_limit").is(":checked");
        specialFeatures.push(test);
      }

      if ($("#team_management").is(":checked")) {
        specialFeatures.push({
          featureName: "team_management",
          price: $("#team_management_cost").val()
        });
      }

      if ($("#reports").is(":checked")) {
        specialFeatures.push({
          featureName: "reports",
          price: $("#reports_cost").val()
        });
      }

      if ($("#api_analytics").is(":checked")) {
        specialFeatures.push({
          featureName: "api_analytics",
          price: $("#api_analytics_cost").val(),
          limit: $("#api_analytics_limit").val()
        });
      }

      if ($("#transaction_history").is(":checked")) {
        specialFeatures.push({
          featureName: "transaction_history",
          price: $("#transaction_history_cost").val()
        });
      }

      if ($("#add_tags").is(":checked")) {
        specialFeatures.push({
          featureName: "add_tags",
          price: $("#add_tags_cost").val()
        });
      }

      if ($("#meta_fields_search").is(":checked")) {
        specialFeatures.push({
          featureName: "meta_fields_search",
          price: $("#meta_fields_search_cost").val()
        });
      }

      if ($("#advance_tik_search").is(":checked")) {
        specialFeatures.push({
          featureName: "advance_tik_search",
          price: $("#advance_tik_search_cost").val()
        });
      }

      if ($("#template_auto_save").is(":checked")) {
        specialFeatures.push({
          featureName: "template_auto_save",
          price: $("#template_auto_save_cost").val()
        });
      }

      subscriptionData.specialFeatures = specialFeatures;
      $.ajax({
        url: subscriptionApi,
        data: JSON.stringify(subscriptionData),
        method: "post",
        success(data) {
          $("#createSubscriptionModal").modal("toggle");
          successModal(data.msg);
          subscription = true;
          window.location = "";
          resetForm("SubscriptionPlanCreate");
        },
        error(xhr, status, error) {
          subscription = true;
          errorModal(xhr.responseJSON.msg);
        }
      });
    }
  }
};

const getSubscriptionList = () => {
  $.ajax({
    url: subscriptionApi,
    method: "get",
    success(result) {
      const { data } = result;
      let containerShow = "";
      let deletedContainerShow = "";
      let doctraceApiTableData = [];
      for (let i = 0; i < data.length; i++) {
        let totalCost = 0;
        let grayOutStyle = "";
        let isDeleteAndUpdateHide = "block";
        let deleteButtonHtml = `<h4 mr-2><i class="fa fa-trash f-18 text-white" aria-hidden="true" onclick="deleteSubscriptionPlan('${data[i]._id}')"  ></i></h4>`;
        let editButtonHtml = `<h4 mr-2><i class="fa fa-pencil-square-o f-18 text-white" aria-hidden="true" onclick="getSubscriptionPlan('${data[i]._id}')" ></i></h4>`;
        let enableButtonHtml = "";
        const apiObject = {
          name: data[i].planName,
          limit: "",
          price: null,
          status: data[i].isDeleted == true ? "In-active" : "Active"
        };
        if (data[i].isFreeTirePlan == true) {
          deleteButtonHtml = "";
        }

        let deletedFlag = 0;
        if (data[i].isDeleted == true) {
          deletedFlag = 1;
          grayOutStyle = 'style="background: gray;"';
          isDeleteAndUpdateHide = "none";
          deleteButtonHtml = "";
          editButtonHtml = "";
          enableButtonHtml = `<h4 mr-2><i class="fa fa-undo f-18 text-white" aria-hidden="true" onclick="enableSubscriptionPlan('${data[i]._id}')" ></i></h4>`;
        }

        if (data[i].type === "pay_per_use") {
          let role_management = ' <p><i class="fa fa-times-circle f-15" aria-hidden="true"></i> </p>';
          let user_management = ' <p><i class="fa fa-times-circle f-15" aria-hidden="true"></i> </p>';
          let team_management = ' <p><i class="fa fa-times-circle f-15" aria-hidden="true"></i> </p>';
          let reports = ' <p><i class="fa fa-times-circle f-15" aria-hidden="true"></i> </p>';
          let api_analytics = ' <p><i class="fa fa-times-circle f-15" aria-hidden="true"></i> </p>';
          let transaction_history = ' <p><i class="fa fa-times-circle f-15" aria-hidden="true"></i> </p>';
          let add_tags = ' <p><i class="fa fa-times-circle f-15" aria-hidden="true"></i> </p>';
          let meta_fields_search = ' <p><i class="fa fa-times-circle f-15" aria-hidden="true"></i> </p>';
          let advance_tik_search = ' <p><i class="fa fa-times-circle f-15" aria-hidden="true"></i> </p>';
          let template_auto_save = ' <p><i class="fa fa-times-circle f-15" aria-hidden="true"></i> </p>';

          if (data[i].specialFeatures) {
            data[i].specialFeatures.forEach((specialList) => {
              totalCost += Number(specialList.price);

              if (specialList.featureName === "role_management") {
                role_management = ` <p><i class="fa fa-check-circle f-15" aria-hidden="true"></i> / ${specialList.price} $</p>`;
              } else if (specialList.featureName === "user_management") {
                user_management = ` <p><i class="fa fa-check-circle f-15" aria-hidden="true"></i> / ${specialList.price} $</p>`;
              } else if (specialList.featureName === "team_management") {
                team_management = ` <p><i class="fa fa-check-circle f-15" aria-hidden="true"></i> / ${specialList.price} $</p>`;
              } else if (specialList.featureName === "reports") {
                reports = ` <p><i class="fa fa-check-circle f-15" aria-hidden="true"></i> / ${specialList.price} $</p>`;
              } else if (specialList.featureName === "api_analytics") {
                apiObject.price = specialList.price;
                apiObject.limit = specialList.limit;
                api_analytics = ` <p><i class="fa fa-check-circle f-15" aria-hidden="true"></i> / ${specialList.price} $</p>`;
              } else if (specialList.featureName === "transaction_history") {
                transaction_history = ` <p><i class="fa fa-check-circle f-15" aria-hidden="true"></i> / ${specialList.price} $</p>`;
              } else if (specialList.featureName === "add_tags") {
                add_tags = ` <p><i class="fa fa-check-circle f-15" aria-hidden="true"></i> / ${specialList.price} $</p>`;
              } else if (specialList.featureName === "meta_fields_search") {
                meta_fields_search = ` <p><i class="fa fa-check-circle f-15" aria-hidden="true"></i> / ${specialList.price} $</p>`;
              } else if (specialList.featureName === "advance_tik_search") {
                advance_tik_search = ` <p><i class="fa fa-check-circle f-15" aria-hidden="true"></i> / ${specialList.price} $</p>`;
              } else if (specialList.featureName === "template_auto_save") {
                template_auto_save = ` <p><i class="fa fa-check-circle f-15" aria-hidden="true"></i> / ${specialList.price} $</p>`;
              }
            });
          }
          let showStr;
          if (data[i].isDeleted == false) {
            showStr = `  <div class="col w-250-min">
                    <div class="h-100 border bg-light">
                        <div class="text-center p-2 badge-dark d-flex align-items-center justify-content-between" ${grayOutStyle}>
                            <div>
                            <h4 class="d-inline-block ml-4">${data[i].planName}</h4>
                            </div>
                            <div>
                            <a href="#!" class="float-right d-flex">
                                ${editButtonHtml} &nbsp;
                                ${deleteButtonHtml}
                                ${enableButtonHtml}
                            </a>
                            </div>
                        </div>
                        <div class="text-center mt-4">
                        <p class="font-bold">${data[i].isFreeTirePlan ? "Yes" : "No"}</p>
                        <p class="font-bold">${data[i].type}</p>
                        <p class="font-bold">${data[i].transactionPerMonth}</p>
                        <p class="font-bold">${data[i].docSizePerTransaction}</p>
                        <p class="font-bold">${data[i].validity}</p>
                        <p class="font-bold">${data[i].pricePerTransaction}</p>
                        <p class="font-bold">${data[i].extraSize}</p>
                        <p class="font-bold">${data[i].extraCost}</p>
                        <p class="font-bold">-</p>
                        <p class="font-bold">${role_management}</p>
                        <p class="font-bold">${user_management}</p>
                        <p class="font-bold">${team_management}</p>
                        <p class="font-bold">${reports}</p>
                        <p class="font-bold">${api_analytics}</p>
                        <p class="font-bold">${transaction_history}</p>
                        <p class="font-bold">${add_tags}</p>
                        <p class="font-bold">${meta_fields_search}</p>
                        <p class="font-bold">${advance_tik_search}</p>
                        <p class="font-bold">${template_auto_save}</p>
                        <p class="font-bold">${totalCost} $</p>
                         </div>
                    </div>
                </div>`;
            containerShow += showStr;
          } else {
            showStr = `  <div class="col w-250-min">
                <div class="h-100 border bg-light">
                    <div class="text-center p-2 badge-dark d-flex align-items-center justify-content-between" ${grayOutStyle}>
                        <div>
                        <h4 class="d-inline-block ml-4">${data[i].planName}</h4>
                        </div>
                        <div>
                        <a href="#!" class="float-right d-flex">
                            ${enableButtonHtml}
                        </a>
                        </div>
                    </div>
                    <div class="text-center mt-4">
                    <p class="font-bold">${data[i].isFreeTirePlan ? "Yes" : "No"}</p>
                    <p class="font-bold">${data[i].type}</p>
                    <p class="font-bold">${data[i].transactionPerMonth}</p>
                    <p class="font-bold">${data[i].docSizePerTransaction}</p>
                    <p class="font-bold">${data[i].validity}</p>
                    <p class="font-bold">${data[i].pricePerTransaction}</p>
                    <p class="font-bold">${data[i].extraSize}</p>
                    <p class="font-bold">${data[i].extraCost}</p>
                    <p class="font-bold">-</p>
                    <p class="font-bold">${role_management}</p>
                    <p class="font-bold">${user_management}</p>
                    <p class="font-bold">${team_management}</p>
                    <p class="font-bold">${reports}</p>
                    <p class="font-bold">${api_analytics}</p>
                    <p class="font-bold">${transaction_history}</p>
                    <p class="font-bold">${add_tags}</p>
                    <p class="font-bold">${meta_fields_search}</p>
                    <p class="font-bold">${advance_tik_search}</p>
                    <p class="font-bold">${template_auto_save}</p>
                    <p class="font-bold">${totalCost} $</p>
                    </div>
                    </div>
                    </div>`;
            deletedContainerShow += showStr;
          }
        } else {
          let role_management = ' <p><i class="fa fa-times-circle f-15" aria-hidden="true"></i> </p>';
          let user_management = ' <p><i class="fa fa-times-circle f-15" aria-hidden="true"></i> </p>';
          let team_management = ' <p><i class="fa fa-times-circle f-15" aria-hidden="true"></i> </p>';
          let reports = ' <p><i class="fa fa-times-circle f-15" aria-hidden="true"></i> </p>';
          let api_analytics = ' <p><i class="fa fa-times-circle f-15" aria-hidden="true"></i> </p>';
          let transaction_history = ' <p><i class="fa fa-times-circle f-15" aria-hidden="true"></i> </p>';
          let add_tags = ' <p><i class="fa fa-times-circle f-15" aria-hidden="true"></i> </p>';
          let meta_fields_search = ' <p><i class="fa fa-times-circle f-15" aria-hidden="true"></i> </p>';
          let advance_tik_search = ' <p><i class="fa fa-times-circle f-15" aria-hidden="true"></i> </p>';
          let template_auto_save = ' <p><i class="fa fa-times-circle f-15" aria-hidden="true"></i> </p>';
          totalCost += Number(data[i].planPrice);

          if (data[i].specialFeatures) {
            data[i].specialFeatures.forEach((specialList) => {
              totalCost += Number(specialList.price);

              if (specialList.featureName === "role_management") {
                role_management = ` <p><i class="fa fa-check-circle f-15" aria-hidden="true"></i> / ${specialList.price} $</p>`;
              } else if (specialList.featureName === "user_management") {
                user_management = ` <p><i class="fa fa-check-circle f-15" aria-hidden="true"></i> / ${specialList.price} $</p>`;
              } else if (specialList.featureName === "team_management") {
                team_management = ` <p><i class="fa fa-check-circle f-15" aria-hidden="true"></i> / ${specialList.price} $</p>`;
              } else if (specialList.featureName === "reports") {
                reports = ` <p><i class="fa fa-check-circle f-15" aria-hidden="true"></i> / ${specialList.price} $</p>`;
              } else if (specialList.featureName === "api_analytics") {
                apiObject.price = specialList.price;

                apiObject.limit = specialList.limit;
                api_analytics = ` <p><i class="fa fa-check-circle f-15" aria-hidden="true"></i> / ${specialList.price} $</p>`;
              } else if (specialList.featureName === "transaction_history") {
                transaction_history = ` <p><i class="fa fa-check-circle f-15" aria-hidden="true"></i> / ${specialList.price} $</p>`;
              } else if (specialList.featureName === "add_tags") {
                add_tags = ` <p><i class="fa fa-check-circle f-15" aria-hidden="true"></i> / ${specialList.price} $</p>`;
              } else if (specialList.featureName === "meta_fields_search") {
                meta_fields_search = ` <p><i class="fa fa-check-circle f-15" aria-hidden="true"></i> / ${specialList.price} $</p>`;
              } else if (specialList.featureName === "advance_tik_search") {
                advance_tik_search = ` <p><i class="fa fa-check-circle f-15" aria-hidden="true"></i> / ${specialList.price} $</p>`;
              } else if (specialList.featureName === "template_auto_save") {
                template_auto_save = ` <p><i class="fa fa-check-circle f-15" aria-hidden="true"></i> / ${specialList.price} $</p>`;
              }
            });
          }

          let showStr;
          if (data[i].isDeleted == false) {
            totalCost = totalCost.toFixed(2);
            showStr = `  <div class="col w-250-min">
                    <div class="h-100 border bg-light" >
                        <div class="text-center p-2 badge-dark d-flex align-items-center justify-content-between" ${grayOutStyle}>
                            <div>
                            <h4 class="d-inline-block ml-4">${data[i].planName}</h4>
                            </div>
                            <div>
                            <a href="#!" class="float-right d-flex" style="display:${isDeleteAndUpdateHide}">
                                ${editButtonHtml} &nbsp; 
                                ${deleteButtonHtml}
                                ${enableButtonHtml}
                            </a>
                            </div>
                        </div>
                        <div class="text-center mt-4">
                        <p class="font-bold">${data[i].isFreeTirePlan ? "Yes" : "No"}</p>
                   
                        <p class="font-bold">${data[i].type}</p>
                        <p class="font-bold">${data[i].transactionPerMonth}</p>
                        <p class="font-bold">${data[i].docSizePerTransaction}</p>
                        <p class="font-bold">${data[i].validity}</p>
                        <p class="font-bold">-</p>
                        <p class="font-bold">-</p>
                        <p class="font-bold">-</p>
                        <p class="font-bold">${data[i].planPrice}</p>
                        <p class="font-bold">${role_management}</p>
                        <p class="font-bold">${user_management}</p>
                        <p class="font-bold">${team_management}</p>
                        <p class="font-bold">${reports}</p>
                        <p class="font-bold">${api_analytics}</p>
                        <p class="font-bold">${transaction_history}</p>
                        <p class="font-bold">${add_tags}</p>
                        <p class="font-bold">${meta_fields_search}</p>
                        <p class="font-bold">${advance_tik_search}</p>
                        <p class="font-bold">${template_auto_save}</p>
                        <p class="font-bold">${totalCost} $</p>
                         </div>
                    </div>
                </div>`;
            containerShow += showStr;
          } else {
            totalCost = totalCost.toFixed(2);
            console.log("total cost = ", totalCost);
            showStr = `  <div class="col w-250-min">
                        <div class="h-100 border bg-light" >
                            <div class="text-center p-2 badge-dark d-flex align-items-center justify-content-between" ${grayOutStyle}>
                                <div>
                                <h4 class="d-inline-block ml-4">${data[i].planName}</h4>
                                </div>
                                <div>
                                <a href="#!" class="float-right d-flex" style="display:${isDeleteAndUpdateHide}">
                                    ${enableButtonHtml}
                                </a>
                                </div>
                            </div>
                            <div class="text-center mt-4">
                            <p class="font-bold">${data[i].isFreeTirePlan ? "Yes" : "No"}</p>
                       
                            <p class="font-bold">${data[i].type}</p>
                            <p class="font-bold">${data[i].transactionPerMonth}</p>
                            <p class="font-bold">${data[i].docSizePerTransaction}</p>
                            <p class="font-bold">${data[i].validity}</p>
                            <p class="font-bold">-</p>
                            <p class="font-bold">-</p>
                            <p class="font-bold">-</p>
                            <p class="font-bold">${data[i].planPrice}</p>
                            <p class="font-bold">${role_management}</p>
                            <p class="font-bold">${user_management}</p>
                            <p class="font-bold">${team_management}</p>
                            <p class="font-bold">${reports}</p>
                            <p class="font-bold">${api_analytics}</p>
                            <p class="font-bold">${transaction_history}</p>
                            <p class="font-bold">${add_tags}</p>
                            <p class="font-bold">${meta_fields_search}</p>
                            <p class="font-bold">${advance_tik_search}</p>
                            <p class="font-bold">${template_auto_save}</p>
                            <p class="font-bold">${totalCost} $</p>
                             </div>
                        </div>
                    </div>`;
            deletedContainerShow += showStr;
          }
        }

        if (apiObject.price) {
          doctraceApiTableData.push(apiObject);
        }
      }

      $("#doctraceApiTable").DataTable({
        data: doctraceApiTableData,
        columns: [
          {
            data: "name"
          },
          {
            data: "limit"
          },
          {
            data: "price"
          },
          {
            data: "status"
          }
        ]
      });
      document.getElementById("planShowContainer").innerHTML += containerShow;
      document.getElementById("deletedPlanShowContainer").innerHTML += deletedContainerShow;
    },
    error(xhr, status, error) {
      // errorModal(xhr.responseJSON.msg);
    }
  });
};

const getSubscriptionPlan = (planId) => {
  activePlanId = planId;
  $.ajax({
    url: `${subscriptionDetailsApi}?planId=${planId}`,
    method: "get",
    success(result) {
      const { data } = result;
      $("#planType_update").val(data.type);
      $("#isFree_update").prop("checked", data.isFreeTirePlan);
      if (data.isFreeTirePlan === true) {
        document.getElementById("checkForMonthDay_update").innerHTML = "Days of Validity";
      } else {
        document.getElementById("checkForMonthDay_update").innerHTML = "Month Validity";
      }
      if (data.type === "pay_per_use") {
        $("#pay_par_use_plan_filed_update").show();
        $("#level_based_subscription_filed_update").hide();

        $("#planName_update").val(data.planName);
        $("#transactionPerMonth_update").val(data.transactionPerMonth);
        $("#docSizePerTransaction_update").val(data.docSizePerTransaction);
        $("#planValidity_update").val(data.validity);
        $("#tireName_update").val(data.tierName);
        $("#pricePerTransaction_update").val(data.pricePerTransaction);
        $("#extraSize_update").val(data.extraSize);
        $("#extraCost_update").val(data.extraCost);
      } else {
        $("#pay_par_use_plan_filed_update").hide();
        $("#level_based_subscription_filed_update").show();

        $("#planName_update").val(data.planName);
        $("#transactionPerMonth_update").val(data.transactionPerMonth);
        $("#docSizePerTransaction_update").val(data.docSizePerTransaction);
        $("#planValidity_update").val(data.validity);
        $("#planPrice_update").val(data.planPrice);
      }

      if (data.specialFeatures) {
        data.specialFeatures.forEach((specialList) => {
          if (specialList.featureName === "role_management") {
            $("#role_management_update").prop("checked", true);
            $("#role_management_cost_update").show();
            $("#role_management_cost_update").val(specialList.price);
          } else if (specialList.featureName === "user_management") {
            $("#user_management_update").prop("checked", true);
            $("#user_management_cost_update").show();
            $("#user_management_limit_label_update").show();
            $("#user_management_limit_update").show();

            if (specialList.isInfinite) {
              $("#user_management_limit_update").prop("checked", specialList.isInfinite);
            } else {
              $("#user_management_limit_number_update").show();
              $("#user_management_limit_number_update").val(specialList.limit);
            }
            $("#user_management_cost_update").val(specialList.price);
          } else if (specialList.featureName === "team_management") {
            $("#team_management_update").prop("checked", true);
            $("#team_management_cost_update").show();
            $("#team_management_cost_update").val(specialList.price);
          } else if (specialList.featureName === "reports") {
            $("#reports_update").prop("checked", true);
            $("#reports_cost_update").show();
            $("#reports_cost_update").val(specialList.price);
          } else if (specialList.featureName === "api_analytics") {
            $("#api_analytics_update").prop("checked", true);
            $("#api_analytics_cost_update").show();
            $("#api_analytics_cost_update").val(specialList.price);
            $("#api_analytics_limit_label_update").show();
            $("#api_analytics_limit_update").show();
            $("#api_analytics_limit_update").val(specialList.limit);
          } else if (specialList.featureName === "transaction_history") {
            $("#transaction_history_update").prop("checked", true);
            $("#transaction_history_cost_update").show();
            $("#transaction_history_cost_update").val(specialList.price);
          } else if (specialList.featureName === "add_tags") {
            $("#add_tags_update").prop("checked", true);
            $("#add_tags_cost_update").show();
            $("#add_tags_cost_update").val(specialList.price);
          } else if (specialList.featureName === "meta_fields_search") {
            $("#meta_fields_search_update").prop("checked", true);
            $("#meta_fields_search_cost_update").show();
            $("#meta_fields_search_cost_update").val(specialList.price);
          } else if (specialList.featureName === "advance_tik_search") {
            $("#advance_tik_search_update").prop("checked", true);
            $("#advance_tik_search_cost_update").show();
            $("#advance_tik_search_cost_update").val(specialList.price);
          } else if (specialList.featureName === "template_auto_save") {
            $("#template_auto_save_update").prop("checked", true);
            $("#template_auto_save_cost_update").show();
            $("#template_auto_save_cost_update").val(specialList.price);
          }
        });
      }

      $("#editSubscriptionModal").modal();
    },
    error(xhr, status, error) {
      subscription = true;
      errorModal(xhr.responseJSON.msg);
    }
  });
};

const deleteSubscriptionPlan = (planId) => {
  activePlanId = planId;
  swal({
    title: "Are you sure?",
    text: "To Delete This Subscription Plan ?",
    icon: "warning",
    buttons: ["No", "Yes"],
    dangerMode: true
  }).then(function (iscofirm) {
    if (iscofirm) {
      $.ajax({
        url: `${subscriptionApi}?planId=${planId}`,
        method: "delete",
        success(result) {
          subscriptionSuccessModal(result.msg);
        },
        error(xhr, status, error) {
          subscription = true;
          errorModal(xhr.responseJSON.msg);
        }
      });
    }
  });
};

/* To Enable Deleted Subscription Plan */
const enableSubscriptionPlan = (planId) => {
  activePlanId = planId;
  swal({
    title: "Are you sure?",
    text: "To Enable This Subscription Plan ?",
    icon: "warning",
    buttons: ["No", "Yes"],
    dangerMode: true
  }).then(function (iscofirm) {
    if (iscofirm) {
      const subscriptionData = {
        subscriptionPlanId: planId,
        isDeleted: false
      };
      $.ajax({
        url: `${subscriptionApi}`,
        method: "put",
        data: JSON.stringify(subscriptionData),
        success(result) {
          subscriptionSuccessModal(result.msg);
        },
        error(xhr, status, error) {
          subscription = true;
          errorModal(xhr.responseJSON.msg);
        }
      });
    }
  });
};

const updateSubscription = () => {
  let formData = $("#SubscriptionPlanUpdate");

  formData.validate({
    rules: {
      // isFree_update : {
      //     required: true,
      //     normalizer (value) {
      //         return $.trim(value)
      //     }
      // },
      planPrice: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        }
      },
      tireName: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        }
      },
      pricePerTransaction: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        }
      },
      extraSize: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        }
      },
      extraCost: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        }
      },
      planType: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        }
      },
      planName: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        }
      },
      transactionPerMonth: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        }
      },
      docSizePerTransaction: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        }
      },
      planValidity: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        }
      },
      tireName: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        }
      },
      pricePerTransaction: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        }
      },
      extraSize: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        }
      },
      extraCost: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        }
      },
      role_management_cost: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        }
      },
      user_management_cost: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        }
      },
      team_management_cost: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        }
      },
      reports_cost: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        }
      },
      api_analytics_cost: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        }
      },
      transaction_history_cost: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        }
      },
      add_tags_cost: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        }
      },
      meta_fields_search_cost: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        }
      },
      advance_tik_search_cost: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        }
      },
      template_auto_save_cost: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        }
      }
    },
    errorPlacement(error, element) {
      if (element.attr("type") == "radio") {
        error.insertAfter($("#benefitDiv"));
      } else {
        error.insertAfter(element);
      }
    }
  });

  if (formData.valid()) {
    if (subscription) {
      subscription = false;
      const subscriptionData = {
        type: $("#planType_update").val(),
        planName: $("#planName_update").val(),
        transactionPerMonth: $("#transactionPerMonth_update").val(),
        docSizePerTransaction: $("#docSizePerTransaction_update").val(),
        validity: $("#planValidity_update").val(),
        isFreeTirePlan: $("#isFree_update").prop("checked") ? true : false
      };
      if (subscriptionData.type === "pay_per_use") {
        subscriptionData.tierName = $("#tireName_update").val();
        subscriptionData.pricePerTransaction = $("#pricePerTransaction_update").val();
        subscriptionData.extraSize = $("#extraSize_update").val();
        subscriptionData.extraCost = $("#extraCost_update").val();
      } else {
        subscriptionData.planPrice = $("#planPrice_update").val();
      }

      const specialFeatures = [];

      if ($("#role_management_update").is(":checked")) {
        specialFeatures.push({
          featureName: "role_management",
          price: $("#role_management_cost_update").val()
        });
      }

      if ($("#user_management_update").is(":checked")) {
        const test = {
          featureName: "user_management",
          price: $("#user_management_cost_update").val()
        };
        test.limit = $("#user_management_limit_number_update").val();

        test.isInfinite = $("#user_management_limit_update").is(":checked");
        specialFeatures.push(test);
      }

      if ($("#team_management_update").is(":checked")) {
        specialFeatures.push({
          featureName: "team_management",
          price: $("#team_management_cost_update").val()
        });
      }

      if ($("#reports_update").is(":checked")) {
        specialFeatures.push({
          featureName: "reports",
          price: $("#reports_cost_update").val()
        });
      }

      if ($("#api_analytics_update").is(":checked")) {
        specialFeatures.push({
          featureName: "api_analytics",
          price: $("#api_analytics_cost_update").val(),
          limit: $("#api_analytics_limit_update").val()
        });
      }

      if ($("#transaction_history_update").is(":checked")) {
        specialFeatures.push({
          featureName: "transaction_history",
          price: $("#transaction_history_cost_update").val()
        });
      }

      if ($("#add_tags_update").is(":checked")) {
        specialFeatures.push({
          featureName: "add_tags",
          price: $("#add_tags_cost_update").val()
        });
      }

      if ($("#meta_fields_search_update").is(":checked")) {
        specialFeatures.push({
          featureName: "meta_fields_search",
          price: $("#meta_fields_search_cost_update").val()
        });
      }

      if ($("#advance_tik_search_update").is(":checked")) {
        specialFeatures.push({
          featureName: "advance_tik_search",
          price: $("#advance_tik_search_cost_update").val()
        });
      }

      if ($("#template_auto_save_update").is(":checked")) {
        specialFeatures.push({
          featureName: "template_auto_save",
          price: $("#template_auto_save_cost_update").val()
        });
      }
      subscriptionData.subscriptionPlanId = activePlanId;
      subscriptionData.specialFeatures = specialFeatures;
      $.ajax({
        url: subscriptionApi,
        data: JSON.stringify(subscriptionData),
        method: "put",
        success(data) {
          $("#editSubscriptionModal").modal("toggle");
          successModal(data.msg);
          subscription = true;
          resetForm("SubscriptionPlanUpdate");

          window.location = "";
        },
        error(xhr, status, error) {
          subscription = true;
          errorModal(xhr.responseJSON.msg);
        }
      });
    }
  }
};

$("#planType_update").change(function (e) {
  if (this.value === "pay_per_use") {
    $("#pay_par_use_plan_filed_update").show();
    $("#level_based_subscription_filed_update").hide();
  } else if (this.value === "level_based") {
    $("#pay_par_use_plan_filed_update").hide();
    $("#level_based_subscription_filed_update").show();
  } else {
    $("#pay_par_use_plan_filed_update").hide();
    $("#level_based_subscription_filed_update").hide();
  }
});

$("#role_management_update").change(function (e) {
  if ($(this).is(":checked")) {
    $("#role_management_cost_update").show();
  } else {
    $("#role_management_cost_update").hide();
  }
});

$("#user_management_update").change(function (e) {
  if ($(this).is(":checked")) {
    $("#user_management_cost_update").show();
    $("#user_management_limit_label_update").show();

    $("#role_management_update").prop("checked", true);
    $("#role_management_cost_update").show();
  } else {
    $("#user_management_cost_update").hide();
    $("#user_management_limit_label_update").hide();
  }
});

$("#user_management_limit_update").change(function (e) {
  if ($(this).is(":checked")) {
    $("#user_management_limit_number_update").hide();
  } else {
    $("#user_management_limit_number_update").show();
  }
});

$("#team_management_update").change(function (e) {
  if ($(this).is(":checked")) {
    $("#team_management_cost_update").show();

    $("#role_management_update").prop("checked", true);
    $("#role_management_cost_update").show();

    $("#user_management_update").prop("checked", true);
    $("#user_management_cost_update").show();
    $("#user_management_limit_label_update").show();
  } else {
    $("#team_management_cost_update").hide();
  }
});

$("#reports_update").change(function (e) {
  if ($(this).is(":checked")) {
    $("#reports_cost_update").show();
  } else {
    $("#reports_cost_update").hide();
  }
});

$("#transaction_history_update").change(function (e) {
  if ($(this).is(":checked")) {
    $("#transaction_history_cost_update").show();
  } else {
    $("#transaction_history_cost_update").hide();
  }
});

$("#add_tags_update").change(function (e) {
  if ($(this).is(":checked")) {
    $("#add_tags_cost_update").show();
  } else {
    $("#add_tags_cost_update").hide();
  }
});

$("#meta_fields_search_update").change(function (e) {
  if ($(this).is(":checked")) {
    $("#meta_fields_search_cost_update").show();
  } else {
    $("#meta_fields_search_cost_update").hide();
  }
});

$("#advance_tik_search_update").change(function (e) {
  if ($(this).is(":checked")) {
    $("#advance_tik_search_cost_update").show();
  } else {
    $("#advance_tik_search_cost_update").hide();
  }
});

$("#template_auto_save_update").change(function (e) {
  if ($(this).is(":checked")) {
    $("#template_auto_save_cost_update").show();
  } else {
    $("#template_auto_save_cost_update").hide();
  }
});

$("#api_analytics_update").change(function (e) {
  if ($(this).is(":checked")) {
    $("#api_analytics_cost_update").show();
    $("#api_analytics_limit_update").show();
    $("#api_analytics_limit_label_update").show();
  } else {
    $("#api_analytics_cost_update").hide();
    $("#api_analytics_limit_update").hide();
    $("#api_analytics_limit_label_update").hide();
  }
});

getSubscriptionList();
