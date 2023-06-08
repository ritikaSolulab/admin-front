const urlParams = new URLSearchParams(window.location.search);
const receiverId = urlParams.get('receiver');
console.log(receiverId);

$.ajax({
    url: `${baseUrl}/receiver/details?id=${receiverId}`,
    method: 'get',
    success: (result) => {
        showReceiverDetails(result.data)
    }, error: (result) => {
        console.log(result);
        toastr.show(result.responseJSON.msg);
    }
})


const showReceiverDetails = (receiver) =>{
    console.log('data',receiver);
    if(receiver.lastName) $('.name').html(`${receiver.firstName} ${receiver.lastName}`) 
    else  $('.name').html(`${receiver.firstName}`)
    $('.emailShow').html(receiver.email);
    $('#profile').attr('src',receiver.profilePicture);
    $('#address').html(receiver.address);
    $('#phoneNumber').html(receiver.mobileNumber);
    $('#registeredAt').html((new Date(receiver.createdAt)).toLocaleString());
    console.log(receiver.isDeactivate)
    if(receiver.isDeactivate)  
    {
        console.log('here');
        $('#statusShow').html(`<p class="text-red">De-active</p>`);
        $('#deActivateAccount').hide();
        $('#activateAccount').show();
        
    }else{
        console.log('here1');
        $('#statusShow').html(`<p class="text-green">Active  </p>`);
        $('#activateAccount').hide();
        $('#deActivateAccount').show();
    }
    $('#acceptedDocTotal').html(receiver.totalAcceptedDocument);
    $('#rejectedDocTotal').html(receiver.totalRejectedDocument);
    $('#pendingDocTotal').html(receiver.totalPendingDocument);
    $('#sharedDocTotal').html(receiver.totalSharedDocument);
    $('#updateRequiredDocTotal').html(receiver.totalUpdateRequireDocument);
    $('#blockedProviderTotal').html(receiver.totalBlockedProvider);
    $('#favouriteDocTotal').html(receiver.totalFavouriteDoc);  
}   


const activateUser = () =>{
    swal({
        title: "Are you sure?",
        text: "To Activate This Receiver!",
        icon: "warning",
        buttons: [
            'No',
            'Yes'
        ],
        dangerMode: true,
    }).then(function (iscofirm) {
        if (iscofirm) {
            $.ajax({
                url: `${receiverApi}/active`,
                method: 'put',
                data: JSON.stringify({ receiverId , isDeactivate : false }),
                success(data) {
                    console.log(data);
                    data.data.isDeactivate = false;
                    showReceiverDetails(data.data);
                    swal({
                        text: 'Grantee Activated Successfully'
                    })
                    // successModal(data.msg);
                },
                error(xhr, status, error) {
                    errorModal(xhr.responseJSON.msg);
                }
            })
        }
    });
}



const deactivateUser = () =>{
    swal({
        title: "Are you sure?",
        text: "To De-Activate This Receiver!",
        icon: "warning",
        buttons: [
            'No',
            'Yes'
        ],
        dangerMode: true,
    }).then(function (iscofirm) {
        if (iscofirm) {
            $.ajax({
                url: `${receiverApi}/active`,
                method: 'put',
                data: JSON.stringify({ receiverId , isDeactivate : true }),
                success(data) {
                    console.log(data);
                    data.data.isDeactivate = true;
                    showReceiverDetails(data.data);
                    swal({
                        text: 'Grantee De-Activated Successfully'
                    })
                },
                error(xhr, status, error) {
                    errorModal(xhr.responseJSON.msg);
                }
            })
        }
    });
}
