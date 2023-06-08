$(document).ready(function () {
    // if(!activeUser.userOtherDetails.role.metadata.create && !activeUser.userOtherDetails.isSuperAdmin)
    if(!activeUser.userOtherDetails.isSuperAdmin)
    {
        if(!activeUser.userOtherDetails.otherResponsibilities.metadata.create)
        {
            document.getElementById('addMetadataButton').style.display = 'none';
        }
    }
    getMetadata();
   
});

var metadata = [];

function getMetadata() {
    metadata = [];
    $.ajax({
        url: metaApi,
        method: 'get',
        success: (result) => {
            let metadataLength = metadata.length + 1;
            $('#metaContainer').html('');
            for (let i = 0; i < result.data.length; i++) {
                let deleteButton = '';
                let updateButton = '';
                // if(activeUser.userOtherDetails.role.metadata.delete || activeUser.userOtherDetails.isSuperAdmin)
                if(activeUser.userOtherDetails.isSuperAdmin)
                {
                        deleteButton =  `<button type="button"  class="btn btn-primary btn-lg  btn-rounded pull-right mr-2" onclick="deleteMetadata('metadata${metadataLength}','${result.data[i]._id}')"><i class="fa fa-trash"></i></button>`;       
                }else{
                    if(activeUser.userOtherDetails.otherResponsibilities.metadata.delete || activeUser.userOtherDetails.isSuperAdmin)
                    {
                        deleteButton =  `<button type="button"  class="btn btn-primary btn-lg  btn-rounded pull-right mr-2" onclick="deleteMetadata('metadata${metadataLength}','${result.data[i]._id}')"><i class="fa fa-trash"></i></button>`;       
                    }
                }
                // if(activeUser.userOtherDetails.role.metadata.update || activeUser.userOtherDetails.isSuperAdmin)
                if(activeUser.userOtherDetails.isSuperAdmin)
                {
                        updateButton =  `<button type="button" onclick="updateMetadata('metadataForm${metadataLength}','${result.data[i]._id}')" class="btn btn-primary btn-lg  btn-rounded pull-right mr-2"> <i class="fa fa-refresh"></i> </button>`;       
                }else{
                    // if(activeUser.userOtherDetails.otherResponsibilities.metadata.update || activeUser.userOtherDetails.isSuperAdmin)
                    if(activeUser.userOtherDetails.isSuperAdmin)
                    {
                        updateButton =  `<button type="button" onclick="updateMetadata('metadataForm${metadataLength}','${result.data[i]._id}')" class="btn btn-primary btn-lg  btn-rounded pull-right mr-2"> <i class="fa fa-refresh"></i> </button>`;       
                    }
                }
                
                let newMetaFields = `                            
                <div class="meta widget white-bg" id="metadata${metadataLength}">
                <form id="metadataForm${metadataLength}">
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="metaname${metadataLength}">Metadata Name</label>
                            <input type="text" class="form-control" id="metaname${metadataLength}" name="metaname" placeholder="Name" value="${result.data[i].name}">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="datatype${metadataLength}">Data Type</label>
                            <select  class="form-control" id="datatype${metadataLength}" name="datatype">
                                <option value="">Please select Data Type</option>
                                <option value="Date" ${result.data[i].datatype === 'Date' ? 'Selected' : ''}>Date</option>
                                <option value="String" ${result.data[i].datatype === 'String' ? 'Selected' : ''}>String</option>
                                <option value="Number" ${result.data[i].datatype === 'Number' ? 'Selected' : ''}>Number</option>
                                <option value="Boolean" ${result.data[i].datatype === 'Boolean' ? 'Selected' : ''}>Boolean</option>      
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-12">
                            <label for="description${metadataLength}">Description</label>
                            <textarea class="form-control" id="description${metadataLength}" name="description" placeholder="Enter Description" >${result.data[i].description}</textarea>
                        </div>    
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="Assigned${metadataLength}">Assigned</label>
                            <select id="assigned${metadataLength}" name="assigned" class="form-control">
                                <option value="">Please select Assignment</option>
                                <option value="Provider"  ${result.data[i].assigned === 'Provider' ? 'Selected' : ''}>Provider</option>
                                <option value="Receiver"  ${result.data[i].assigned === 'Receiver' ? 'Selected' : ''}>Receiver</option>
                            </select>
                        </div>
                        <div class="form-group col-md-6 pt-4 pl-3">
                            <label class="switch" for="required${metadataLength}">Required
                                <input type="checkbox" id="required${metadataLength}" name="required" ${result.data[i].required === true ? 'Checked' : ''}>
                                <div class="slider round"></div>
                            </label>
                            ${deleteButton}
                            ${updateButton}
                          
                      </div>
                    </div>
                 </form>
            </div>`;
                $('#metaContainer').append(newMetaFields);
                metadata.push(`metadataFrom${metadataLength}`);
                metadataLength++;
              
            }
        }, error: (result) => {
            toastr.show(result.responseJSON.msg);
        }
    });
}

function addNewMetaFields() {
    
    let metadataLength = metadata.length + 1;

    let deleteButton = '';
    let addButton = '';
    if(activeUser.userOtherDetails.role.metadata.delete || activeUser.userOtherDetails.isSuperAdmin)
    {
            deleteButton =  `<button type="button" class="btn btn-primary btn-lg  btn-rounded pull-right mr-2" onclick="deleteMetadata('metadata${metadataLength}')"><i class="fa fa-trash"></i></button>`;       
    }else{
        if(activeUser.userOtherDetails.otherResponsibilities.metadata.delete || activeUser.userOtherDetails.isSuperAdmin)
        {
            deleteButton =  `<button type="button" class="btn btn-primary btn-lg  btn-rounded pull-right mr-2" onclick="deleteMetadata('metadata${metadataLength}')"><i class="fa fa-trash"></i></button>`;       
        }
    }
    if(activeUser.userOtherDetails.role.metadata.create || activeUser.userOtherDetails.isSuperAdmin)
    {
            addButton =  `<button type="button" onclick="saveMetadata('metadataForm${metadataLength}')" class="btn btn-primary btn-lg  btn-rounded pull-right mr-2"> <i class="fa fa-check"></i> </button>`;       
    }else{
        if(activeUser.userOtherDetails.otherResponsibilities.metadata.create || activeUser.userOtherDetails.isSuperAdmin)
        {
            addButton =  `<button type="button" onclick="saveMetadata('metadataForm${metadataLength}')" class="btn btn-primary btn-lg  btn-rounded pull-right mr-2"> <i class="fa fa-check"></i> </button>`;       
        }
    }
    let newMetaFields = `                            
    <div class="meta widget white-bg" id="metadata${metadataLength}">
    <form id="metadataForm${metadataLength}">
        <div class="form-row">
            <div class="form-group col-md-6">
                <label for="metaname${metadataLength}">Metadata Name</label>
                <input type="text" class="form-control" id="metaname${metadataLength}" name="metaname" placeholder="Name">
            </div>
            <div class="form-group col-md-6">
                <label for="datatype${metadataLength}">Data Type</label>
                <select  class="form-control" id="datatype${metadataLength}" name="datatype">
                    <option value="">Please select Data Type</option>
                    <option value="Date">Date</option>
                    <option value="String">String</option>
                    <option value="Number">Number</option>
                    <option value="Boolean">Boolean</option>      
                </select>
            </div>
        </div>
        <div class="form-row">
                        <div class="form-group col-md-12">
                            <label for="description${metadataLength}">Description</label>
                            <textarea class="form-control" id="description${metadataLength}" name="description" placeholder="Enter Description" ></textarea>
                        </div>    
                    </div>
        <div class="form-row">
            <div class="form-group col-md-6">
                <label for="assigned${metadataLength}">Assigned</label>
                <select id="assigned${metadataLength}" name="assigned" class="form-control">
                    <option value="">Please select Assignment</option>
                    <option value="Provider">Provider</option>
                    <option value="Receiver">Receiver</option>
                </select>
            </div>
            <div class="form-group col-md-6 pt-4 pl-3">
                 <label class="switch" for="required${metadataLength}">Required
                    <input type="checkbox" id="required${metadataLength}" name="required">
                    <div class="slider round"></div>
                </label>
                ${deleteButton}
                ${addButton}
             </div>
        </div>
     </form>
</div>`;
    $('#metaContainer').append(newMetaFields);
    metadata.push(`metadataFrom${metadataLength}`);

}

function deleteMetadata(metadataId, metaId) {
    if (metaId != undefined) {
        swal({
            title: "Are you sure?",
            text: "To Delete This Metadata!",
            icon: "warning",
            buttons: [
                'No',
                'Yes'
            ],
            dangerMode: true,
        }).then(function (iscofirm) {
            if (iscofirm) {
                $.ajax({
                    url: metaApi,
                    method: 'delete',
                    data : JSON.stringify({metadataId : metaId}),
                    success: (result) => {
                        toastr.show(result.msg);
                        $('#' + metadataId).remove();
                    }, error: (result) => {
                        toastr.show(result.responseJSON.msg);
                        getMetadata();
                    }
                });
            }
        });

    } else {
        $('#' + metadataId).remove();
        // metadata.
    }
}

function updateMetadata(metadataForm, metaId) {
    let form = $(`#${metadataForm}`);
    form.validate({
        rules: {
            metaname: {
                required: true,
                normalizer: (value) => {
                    return $.trim(value);
                }
            },
            datatype: {
                required: true,
                normalizer: (value) => {
                    return $.trim(value);
                }
            },
            assigned: {
                required: true,
                normalizer: (value) => {
                    return $.trim(value);
                }
            }
        }
    });

    if (form.valid()) {
        $.ajax({
            url: metaApi,
            data: JSON.stringify({
                'metadataId' : metaId,
                'name': $(`#${metadataForm}`).find('input[name="metaname"]').val(),
                'datatype': $(`#${metadataForm}`).find('select[name="datatype"]').val(),
                'assigned': $(`#${metadataForm}`).find('select[name="assigned"]').val(),
                'description' : $(`#${metadataForm}`).find('textarea[name="description"]').val(),
                'required': $(`#${metadataForm}`).find('input[name="required"]').prop("checked"),
            }),
            method: 'put',
            success: (result) => {
                toastr.show(result.msg);
            }, error: (result) => {
                toastr.show(result.responseJSON.msg);
                getMetadata();
            }
        });
    }
}

function saveMetadata(metadataForm) {
    let form = $(`#${metadataForm}`);
    form.validate({
        rules: {
            metaname: {
                required: true,
                normalizer: (value) => {
                    return $.trim(value);
                }
            },
            datatype: {
                required: true,
                normalizer: (value) => {
                    return $.trim(value);
                }
            },
            assigned: {
                required: true,
                normalizer: (value) => {
                    return $.trim(value);
                }
            }
        }
    });

    if (form.valid()) {
        $.ajax({
            url: metaApi,
            data: JSON.stringify({
                'name': $(`#${metadataForm}`).find('input[name="metaname"]').val(),
                'datatype': $(`#${metadataForm}`).find('select[name="datatype"]').val(),
                'assigned': $(`#${metadataForm}`).find('select[name="assigned"]').val(),
                'description' : $(`#${metadataForm}`).find('textarea[name="description"]').val(),
                'required': $(`#${metadataForm}`).find('input[name="required"]').prop("checked"),
            }),
            method: 'post',
            success: (result) => {
                getMetadata();
            }, error: (result) => {
                toastr.show(result.responseJSON.msg);
            }
        });
    }
}

