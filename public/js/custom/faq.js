
var faqTable;
var faqId = '';
var status = '';
var saveUpdateFlag = true;
const loadFAQ = () => {
    faqTable = $('#faqTable').DataTable({
        ajax: faqApi,
        columns: [
            {
                mRender(data, type, row, meta) {
                    return meta.row + 1;
                },
            },
            {
                data: 'question'
            }, {
                data: 'answer'
            }, {
                mRender(data, type, row) {
                    return `<a href="#" onclick="show('${row._id}')"><i class="fa fa-eye"></i></a>
                    <a href="#" onclick="remove('${row._id}')"><i class="fa fa-trash-o"></i></a>
                    <a href="#" onclick="show('${row._id}' , true)"><i class="fa fa-edit"></i></a>`;
                },
                orderable: false,
                searchable: false,
            },
        ],
    });

}



function show(id, isUpdate) {
    faqId = id;
    $.ajax({
        url: `${faqApi}/details?faqId=${faqId}`,
        method: 'get',
        success: (result) => {
            if(isUpdate)
            {
                status = 'update'; 
                const { data: { answer, question } } = result;
                $('#question').val(question);
                $('#question').attr('disabled',false);
                
                $('#answer').val(answer);
                
                $('#answer').attr('disabled',false);
                 
                $('#exampleModalLabel').html('Update FAQ Details');
                $('#formModel').modal('show');
                $('#btnSave').html('Update FAQ');
                $('#btnSave').show();
  
            }else{
                status = 'show';
                const { data: { answer, question } } = result;
                $('#question').val(question);
                $('#question').attr('disabled',true);
                
                $('#answer').val(answer);
                
                $('#answer').attr('disabled',true);
                 
                $('#exampleModalLabel').html('FAQ Details');
                $('#formModel').modal('show');
                $('#btnSave').hide();
            }
         
        }, error: (result) => {
            contactUsTable.ajax.reload();
        }
    })
}

function remove(id){

    swal({
        title: "Are you sure?",
        text: "To Delete This FAQ!",
        icon: "warning",
        buttons: [
            'No',
            'Yes'
        ],
        dangerMode: true,
    }).then(function (iscofirm) {
        if (iscofirm) {
            $.ajax({
                url: faqApi,
                method: 'delete',
                data : JSON.stringify({faqId : id}),
                success: (result) => {
                    swal({
                        text: 'FAQ Deleted Successfully',
                    });
                    faqTable.ajax.reload();
                }, error: (result) => {
                    swal({
                        text: 'FAQ Not Detelted',
                    });
                }
            });
        }
    });

}

function createFaqShow(){
    status = 'create';
    $('#question').val('');
    $('#question').attr('disabled',false);
    
    $('#answer').val('');
    
    $('#answer').attr('disabled',false);
     
    $('#exampleModalLabel').html('Add New FAQ Details');
    $('#btnSave').show();
    $('#btnSave').html('Save FAQ');
    $('#formModel').modal('show');

}


function faqData() {
    let formData = $('#faqFrom');

    formData.validate({
        rules: {
            question: {
                required: true,
                normalizer(value) {
                    return $.trim(value);
                }
            },
            answer: {
                required: true,
                normalizer(value) {
                    return $.trim(value);
                }
            },
        },
        errorPlacement(error, element) {
            if (element.attr("type") == "radio") {
                error.insertAfter($('#benefitDiv'));
            } else {
                error.insertAfter(element);
            }
        }
    });



    if (formData.valid()) {
        if (saveUpdateFlag) {
            saveUpdateFlag = false;

            if(status == 'create')
            {
                const faqData = {
                    'question': $('#question').val(),
                    'answer': $('#answer').val(),
                }
                $.ajax({
                    url: faqApi,
                    data: JSON.stringify(faqData),
                    method: 'post',
                    success(data) {
                        $('#formModel').modal('hide');
    
                        swal({
                            text: 'FAQ Added Successfully',
                        });
                        faqTable.ajax.reload();
                        saveUpdateFlag = true;
                        
                    },
                    error(xhr, status, error) {
                        $('#formModel').modal('hide');
    
                        swal({
                            text: 'Fail to Add FAQ',
                        });
                        saveUpdateFlag = true;
                    }
                })
            }else{
                const faqData = {
                    'faqId' : faqId,
                    'question': $('#question').val(),
                    'answer': $('#answer').val(),
                }
                $.ajax({
                    url: faqApi,
                    data: JSON.stringify(faqData),
                    method: 'put',
                    success(data) {
                        $('#formModel').modal('hide');
    
                        swal({
                            text: 'FAQ Updated Successfully',
                        });
                        faqTable.ajax.reload();
                        saveUpdateFlag = true;
                        
                    },
                    error(xhr, status, error) {
                        $('#formModel').modal('hide');
    
                        swal({
                            text: 'Fail to Updated FAQ',
                        });
                        saveUpdateFlag = true;
                    }
                })
            }

        }

    }

}

$(document).ready(function () {

    loadFAQ();
});


