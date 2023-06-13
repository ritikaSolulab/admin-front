const provider = window.location.href.split("/").slice(-1).pop();
var teamManagementTable;
var transactionTable;

const subscriptionChart = AmCharts.makeChart("provide-pie", {
    type: "pie",
    // "angle": 2,
    balloonText: "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
    //   "depth3D": 2,
    labelRadius: -40,
    labelTickAlpha: 0,
    startDuration: 0,
    gradientRatio: [],
    hideCredits: true,
    pullOutDuration: 0,
    pullOutRadius: 0,
    labelText: " [[percents]]%",
    titleField: "category",
    valueField: "column-1",
    //   "allLabels": [],
    handDrawn: false,
    handDrawScatter: 0,
    handDrawThickness: 0,
    theme: "chalk",

    balloon: {},
    colors: [
        "#1691B3",
        "#F6BE57"
        // "#EB5858",
        // "#F3ACB3",
        // "#999c9e",
    ],
    legend: {
        enabled: true,
        color: "#221815",
        markerType: "square",
        valueAlign: "left",
        // "fontSize": 12,
        align: "center",
        autoMargins: false,
        valueText: ":[[value]]"
        // "position": "right",
    },
    titles: [],
    dataProvider: []
});

const deactivateProvider = () => {
    $.ajax({
        url: providerActiveDeactivateApi,
        method: "put",
        data: JSON.stringify({
            providerId: provider,
            status: false
        }),
        success(data) {
            swal({
                text: "Grantor De-Activated Successfully"
            })
                .then(() => {
                    window.location = "";
                })
                .catch(() => {
                    window.location = "";
                });
        },
        error(xhr, status, error) {
            swal({
                text: xhr.responseJSON.msg
            })
                .then(() => {
                    window.location = "";
                })
                .catch(() => {
                    window.location = "";
                });
        }
    });
};

const activateProvider = () => {
    $.ajax({
        url: providerActiveDeactivateApi,
        method: "put",
        data: JSON.stringify({
            providerId: provider,
            status: true
        }),
        success(data) {
            swal({
                text: "Grantor Activated Successfully"
            })
                .then(() => {
                    window.location = "";
                })
                .catch(() => {
                    window.location = "";
                });
        },
        error(xhr, status, error) {
            swal({
                text: xhr.responseJSON.msg
            })
                .then(() => {
                    window.location = "";
                })
                .catch(() => {
                    window.location = "";
                });
        }
    });
};

const providerTeamList = () => {
    teamManagementTable = $("#teamManagementTable").DataTable({
        ajax: {
            url: `${providerTeam}?providerId=${provider}`,
            data: (data) => {
                const value = $("#providerTeamDateFilter").val();
                if (value.split("-").length) {
                    let query = "";
                    query += value.split("-")[0] ? `startDate=${value.split("-")[0]}` : "";
                    query += value.split("-")[1] ? `&endDate=${value.split("-")[1]}` : "";
                    return query;
                }
            }
        },
        columns: [
            {
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
                        return "";
                    }
                }
            },
            {
                mRender(data, type, row) {
                    return `${row.members.length}`;
                }
            }

            // {
            //     mRender(data, type, row) {
            //         return `<a href="javascript:" onclick="teamEnableForEdit('${row._id}')"><i class="fa fa-edit"></i></a>
            //                 <a href="javascript:" onclick="deleteTeam('${row._id}')"><i
            //                                                         class="fa fa-trash"></i></a>`;

            //     },
            //     orderable: false,
            //     searchable: false,
            // }
        ],
        rowId: "_id"
    });
};

const providerDetails = () => {
    $.ajax({
        url: `${providerDetailsApi}?providerId=${provider}`,
        method: "get",
        success(data) {
            const provider = data.data;

            if (provider.isActive) {
                $("#activeDeactivation").html(`<button class="btn btn-primary" data-toggle="modal" data-target="#sureModal"
                type="submit">deactivate account</button>`);
            } else {
                $("#activeDeactivation").html(` <button class="btn btn-primary" data-toggle="modal" data-target="#deactivateModal"
                type="submit">activate account</button>`);
            }

            if (provider.isActive) {
                $("#statusField").html(`<p class="text-green">
                Active
            </p>`);
            } else {
                $("#statusField").html(`<p class="text-red">
                De-active
            </p>`);
            }
            const name = provider.lastName ? `${provider.firstName} ${provider.lastName}` : `${provider.firstName}`;
            $("#firstName").html(name);
            $("#emailField").html(provider.email);
            $("#firstNameDetails").html(name);
            $("#addressField").html(provider.address);
            $("#mobileField").html(provider.mobileNumber);
            $("#emailDetails").html(provider.email);
            $("#organizationName").html(provider.document.organization_name);
            $("#designationField").html(provider.designation);
            if (provider.photo === "user.png") {
                $("#profilePic").attr("src", "/img/a4.jpg");
            } else {
                $("#profilePic").attr("src", `${provider.photo}`);
            }

            if (provider.counts) {
                const {
                    counts: { counts }
                } = provider;
                counts.forEach((count) => {
                    if (count._id === "Rejected") {
                        $("#rejectedDocCount").html(count.count);
                    } else if (count._id === "Pending") {
                        $("#pendingDocCount").html(count.count);
                    } else if (count._id === "Accepted") {
                        $("#acceptedDocCount").html(count.count);
                    } else if (count._id === "Update_Required") {
                        $("#updateRequiredDocCount").html(count.count);
                    } else if (count._id === "draft") {
                        $("#draftDocCount").html(count.count);
                    }
                });
            }
        },
        error(xhr, status, error) {
            errorModal(xhr.responseJSON.msg);
        }
    });
};

const providerActivityDetails = () => {
    $("#accountActivityTable").DataTable({
        ajax: {
            url: `${providerAccountActivityApi}?providerId=${provider}`
        },
        columns: [
            {
                mRender(data, type, row, meta) {
                    return meta.row + 1;
                }
            },
            {
                mRender(data, type, row) {
                    return moment(row.loginAt).format("MM/DD/YYYY");
                }
            },
            {
                mRender(data, type, row) {
                    if (row.logoutAt != undefined) {
                        return `${row.logoutAt}`;
                    } else {
                        return "";
                    }
                }
            },
            {
                mRender(data, type, row) {
                    return `${row.documentId.length}`;
                }
            }
        ]
    });
};

const subscriptionDetails = () => {
    $.ajax({
        url: `${providerApi}/subscriptionDetails?providerId=${provider}`,
        method: "get",
        success(result) {
            const {
                data: { documentLogsWithApi, subscriptionPlanDetails, totalCost, startOfSubscription, endOfSubscription }
            } = result;
            if (subscriptionPlanDetails.planName) $("#subscriptionPlanName").html(subscriptionPlanDetails.planName);
            if (subscriptionPlanDetails.isFreeTirePlan) {
                if (subscriptionPlanDetails.isFreeTirePlan) {
                    $("#subscriptionPlanValidity").html(`${subscriptionPlanDetails.validity.split(" ")[0]} Days`);
                } else {
                    $("#subscriptionPlanValidity").html(`${subscriptionPlanDetails.validity} Days`);
                }
            } else {
                $("#subscriptionPlanValidity").html(`${subscriptionPlanDetails.validity} Months`);
            }
            if (subscriptionPlanDetails.type === "pay_per_use" && subscriptionPlanDetails.isFreeTirePlan === false) {
                $("#subscriptionPrice").html(`${subscriptionPlanDetails.pricePerTransaction} $ / log`);
                $("#subscriptionPlanValidity").html(`--`);
            } else {
                $("#subscriptionPrice").html(`${totalCost} $`);
            }
            $("#subscriptionDate").html(new Date(startOfSubscription));
            $("#subscriptionEndDate").html(new Date(endOfSubscription));
            let totalLimit = 0;
            subscriptionPlanDetails.specialFeatures.forEach((feature) => {
                if (feature.featureName === "api_analytics") {
                    totalLimit = feature.limit;
                }
            });
            const chartData = [
                {
                    category: "Api Used",
                    "column-1": documentLogsWithApi.length
                },
                {
                    category: "Api Remaining",
                    "column-1": totalLimit - documentLogsWithApi.length
                }
            ];
            subscriptionChart.dataProvider = chartData;
            subscriptionChart.validateData();
        },
        error(xhr, status, error) {
            errorModal(xhr.responseJSON.msg);
        }
    });
};

const transactionDetails = () => {
    transactionTable = $("#transactionList").DataTable({
        ajax: {
            url: `${providerApi}/transaction-list?providerId=${provider}`,
            data: (data) => {
                const value = $("#providerTeamDateFilter").val();
                if (value.split("-").length) {
                    let query = "";
                    query += value.split("-")[0] ? `startDate=${value.split("-")[0]}` : "";
                    query += value.split("-")[1] ? `&endDate=${value.split("-")[1]}` : "";
                    return query;
                }
            }
        },
        columns: [
            {
                data: "_id"
            },
            {
                mRender(data, type, row) {
                    return moment(row.updateAt).format("MM/DD/YYYY");
                }
            },
            {
                data: "blockchainDocId"
            },
            {
                data: "documentStatus"
            }
        ],
        rowId: "_id"
    });
};

const dateFilter = (value) => {
    const startDate = value.split("-")[0];
    const endDate = value.split("-")[1];
    if (new Date(startDate) <= new Date(endDate)) {
        teamManagementTable.ajax.reload();
    } else {
        swal({
            text: "please select correct date"
        });
    }
};

providerDetails();
providerTeamList();
subscriptionDetails();
transactionDetails();
providerActivityDetails();

$('input[name="providerTeamDateFilter"]').daterangepicker({
    // autoUpdateInput: true,
    locale: {
        cancelLabel: "Clear"
    },
    opens: "left"
});

$("#teamManagementTable tbody").on("click", "tr", function () {
    let id = $(this).attr("id");
    // $('#teamDetails').modal('show');
    $.ajax({
        url: `${providerTeamDetails}`,
        method: "get",
        success(data) {
            // const provider = data.data;
            // if (provider.isActive) {
            //     $('#activeDeactivation').html(`<button class="btn btn-primary" data-toggle="modal" data-target="#sureModal"
            //     type="submit">deactivate account</button>`);
            // } else {
            //     $('#activeDeactivation').html(` <button class="btn btn-primary" data-toggle="modal" data-target="#deactivateModal"
            //     type="submit">activate account</button>`);
            // }
            // if (provider.isActive) {
            //     $('#statusField').html(`<p class="text-green">
            //     Active
            // </p>`);
            // } else {
            //     $('#statusField').html(`<p class="text-red">
            //     De-active
            // </p>`);
            // }
            // const name = provider.lastName ? `${provider.firstName} ${provider.lastName}` :  `${provider.firstName}`;
            // $('#firstName').html(name);
            // $('#emailField').html(provider.email);
            // $('#firstNameDetails').html(name);
            // $('#addressField').html(provider.address);
            // $('#mobileField').html(provider.mobileNumber);
            // $('#emailDetails').html(provider.email);
            // $('#organizationName').html(provider.document.organization_name);
            // $('#designationField').html(provider.designation);
            // if(provider.counts){
            //     const { counts : { counts } } = provider;
            //     counts.forEach(count => {
            //         if(count._id === 'Rejected')
            //         {
            //             $('#rejectedDocCount').html(count.count)
            //         }else if(count._id === "Pending")
            //         {
            //             $('#pendingDocCount').html(count.count)
            //         }else if(count._id === "Accepted")
            //         {
            //             $('#acceptedDocCount').html(count.count)
            //         }else if(count._id === "Update_Required")
            //         {
            //             $('#updateRequiredDocCount').html(count.count)
            //         }else if(count._id === "draft")
            //         {
            //             $('#draftDocCount').html(count.count)
            //         }
            //     })
            // }
        },
        error(xhr, status, error) {
            errorModal(xhr.responseJSON.msg);
        }
    });
    // window.location = `/admin/receiver_details?receiver=${id}`
});
