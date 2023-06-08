// let contatReplay = true;
// $('#contactUsTable tbody').on('click', 'tr', function () {
//     let id = $(this).attr('id');
//     $.ajax({
//         url: `${contactUsApi}/details?inquiryId=${id}`,
//         method: 'get',
//         success: (result) => {
//             const { data: { country, email, inquiryDate, message, mobileNumber, name, productOfInterest } } = result
//             $('#c_name').html(name);
//             $('#c_email').html(email);
//             $('#c_date').html(new Date(inquiryDate).toLocaleString());
//             $('#c_number').html(mobileNumber);
//             $('#c_poi').html(productOfInterest);
//             $('#c_jobtitle').html('');
//             $('#c_country').html(country);
//             $('#c_message').html(message);


//             $('#contactDetails').modal('toggle');
//             console.log('result', result);
//         }, error: (result) => {
//             console.log(result);
//         }
//     })
// });


var contactUsTable;
var searchKeyword = '';
// const loadContactUs = () => {


//     contactUsTable = $('#contactUsTable').DataTable({
//         "processing": true,
//         "serverSide": true,
//         "paging": true,


//         ajax: {
//             url: "http://75.101.217.210:3000/api/v1/admin/contact_us/list",
//             data: (data) => {
//                 console.log(data);
//                 const value = $('#dateFilter').val();
//                 if (value.split('-').length) {
//                     let orderOn = '';
//                     let orderBy = '';

//                     if (data.order && data.order[0].column) {
//                         orderOn = data.order[0].column;
//                         orderBy = data.order[0].dir;
//                     }


//                     let query = '';
//                     query += `startDate=${value.split('-')[0]}`;
//                     query += `&endDate=${value.split('-')[1]}`;
//                     query += `&search=${searchKeyword}`;
//                     query += `&length=${data.length}`;
//                     query += `&start=${data.start}`;
//                     query += `&draw=${data.draw}`;
//                     query += `&limit=${data.start}`;
//                     query += `&orderOn=${orderOn}`;
//                     query += `&orderBy=${orderBy}`;

//                     return query;
//                 }
//             },

//         },

//         'select': {
//             'style': 'multi'
//         },
//         columns: [
//             {
//                 'targets': 0,
//                 'checkboxes': {
//                     'selectRow': true
//                 }
//             },
//             {
//                 mRender(data, type, row, meta) {
//                     return new Date(`${row.inquiryDate}`).toLocaleString();
//                 },
//             },
//             {
//                 data: 'name'
//             }, {
//                 data: 'email'
//             }, {
//                 data: 'message'
//             }, {
//                 mRender(data, type, row, meta) {
//                     console.log(row.country);
//                     if (row.country && row.country != 'null') {
//                         return row.country
//                     } else {
//                         return 'NA';
//                     }
//                 },

//                 // data: 'country'
//             },
//             // {
//             //     searchable: true
//             // }
//         ],
//         rowId: '_id',
//         'order': [[1, 'asc']]
//     });

//     $('#contactUsTable_filter input').unbind();
//     $('#contactUsTable_filter input').bind('keyup', function (e) {
//         console.log(this.value);
//         console.log(e.keyCode);
//         if (e.keyCode == 13) {
//             searchKeyword = this.value
//             contactUsTable.ajax.reload();
//         }
//     });



// }
// loadContactUs();

function setToData() {
    const ids = [];
    contactUsTable.$('input[type="checkbox"]').each(function () {
        if ($(this).prop('checked') == true) {
           ids.push($(this).closest('tr').attr('id'));
        }
    });
    if (ids.length == 0) {
        swal({
            title: "Inquiry",
            text: "Please Select Inquiry!",
        })
        return;
    }
    let emails = '';
    let count = 0;
    const emailList = [];
    $.ajax({
        url: contactUsEmailApi,
        method: 'post',
        data: JSON.stringify({
            "ids": ids,
        }),
        success: (result) => {
            const { data } = result;
            data.forEach(element => {
                emailList.push(element.email);
            });
            for (let i = 0; i < emailList.length; i++) {
                if (i < 1) {
                    emails += `${emailList[i]}  `
                }
                if (i === 1) {
                    emails += ' + ' + ((emailList.length) - 1) + ' More';
                }

            }
            $('#to_data').val(emails);
            $('#sendBulkDetails').modal('toggle');

        }, error: (result) => {
       }
    })

}

// function bulkReplay() {


//     if (!contatReplay) {
//         return;
//     }
//     const ids = [];
//     contactUsTable.$('input[type="checkbox"]').each(function () {
//         if ($(this).prop('checked') == true) {
//             console.log($(this).closest('tr').attr('id'));
//             ids.push($(this).closest('tr').attr('id'));
//         }
//     });
//     if (ids.length == 0) {
//         swal({
//             title: "Inquiry",
//             text: "Please Select Inquiry!",
//         })
//         return;
//     }



//     let formData = $('#replayFrom');

//     formData.validate({
//         rules: {
//             subject: {
//                 required: true,
//                 normalizer(value) {
//                     return $.trim(value);
//                 }
//             },
//             send_message_replay: {
//                 required: true,
//                 normalizer(value) {
//                     return $.trim(value);
//                 }
//             },
//         },
//         errorPlacement(error, element) {
//             if (element.attr("type") == "radio") {
//                 error.insertAfter($('#benefitDiv'));
//             } else {
//                 error.insertAfter(element);
//             }
//         }
//     });



//     if (formData.valid()) {
//         contatReplay = false
//         $.ajax({
//             url: contactUsApi,
//             method: 'post',
//             data: JSON.stringify({
//                 "sendTo": ids,
//                 "subject": $('#subject').val(),
//                 "replay": $('#send_message_replay').val()
//             }),
//             success: (result) => {
//                 console.log('result', result);
//                 $('#sendBulkDetails').modal('hide');
//                 resetForm('replayFrom');
//                 swal({
//                     title: "Inquiry",
//                     text: "Inquiry Replay Send Successfully!",
//                     button: {
//                         text: "close",
//                         className: "btn btn-primary"
//                     }
//                 })
//                 contactUsTable.ajax.reload();
//                 contatReplay = true;
//             }, error: (result) => {
//                 contatReplay = true;
//                 console.log(result);
//                 contactUsTable.ajax.reload();
//             }
//         })

//     }

// }


// function remove() {
//     const ids = [];
//     contactUsTable.$('input[type="checkbox"]').each(function () {
//         if ($(this).prop('checked') == true) {
//             console.log($(this).closest('tr').attr('id'));
//             ids.push($(this).closest('tr').attr('id'));
//         }
//     });
//     console.log('herher');
//     if (ids.length == 0) {
//         swal({
//             title: "Inquiry",
//             text: "Please Select Inquiry!",
//         })
//         return;
//     }
//     $.ajax({
//         url: contactUsApi,
//         method: 'delete',
//         data: JSON.stringify({
//             "inquiryIdList": ids
//         }),
//         success: (result) => {
//             swal({
//                 title: "Inquiry",
//                 text: "Inquiry Deleted Successfully!",
//                 button: {
//                     text: "close",
//                     className: "btn btn-primary"
//                 }
//             })
//             contactUsTable.ajax.reload();
//         }, error: (result) => {
//             console.log(result);
//             contactUsTable.ajax.reload();
//         }
//     })
// }


// $(document).ready(function () {

//     loadContactUs();
// });

// const dateFilter = (value) => {
//     console.log(value);
//     const startDate = value.split('-')[0];
//     const endDate = value.split('-')[1];
//     console.log(startDate);
//     console.log(endDate);
//     if (new Date(startDate) <= new Date(endDate)) {
//         console.log('correct');
//         contactUsTable.ajax.reload();
//     } else {
//         swal({
//             text: 'please select correct date'
//         });
//     }
// }


function reloadContactUs() {
    $.ajax({
        url: "https://admin-api.doctrace.com/api/v1/admin/contact_us/list",
        method: 'get',
        success: function (data) {
            console.log('API dataaa', data)
            const tableData = data.data;
            console.log(tableData);
            const table = $('#contactUsTable').DataTable({
                "data": tableData,
                "columns": [
                    // {
                    //     'targets': 0,
                    //     'checkboxes': {
                    //         'selectRow': true
                    //     }
                    // },
                    {
                        mRender(data, type, row, meta) {
                            return moment(row.inquiryDate).format('DD MMMM, YYYY h:mm:s A');
                        }
                    },
                    {
                        mRender(data, type, row, meta) {
                            return row.name;
                        }
                    },
                    {
                        mRender(data, type, row, meta) {
                            return row.email;
                        }
                    },
                    {
                        mRender(data, type, row, meta) {
                            return row.message;
                        }
                    },
                    {
                        mRender(data, type, row, meta) {
                            return row.country;
                        }
                    },

                ]
            })
        }
    })
}
reloadContactUs();
