const transactionId = window.location.href.split('/').slice(-1).pop();

const paymentDetails = () => {
    $.ajax({
        url: `${paymentHistoryDetails}?transactionId=${transactionId}`,
        method: 'get',
        success(data) {
            const{ providerDetails} = data.data;
           
            const name = providerDetails.lastName ? `${providerDetails.firstName} ${providerDetails.lastName}` : `${providerDetails.firstName}`;
            $('#providerName').html(name);
            $('#providerEmail').html(providerDetails.email);

            $('#providerSubscription').html(new Date(data.data.startOfSubscription).toLocaleString());
            $('#validity').html(data.data.subscriptionPlanDetails.validity);
            $('#expirySubscription').html(new Date(data.data.endOfSubscription).toLocaleString());
            // $('#emailField').html(providerDetails.email);
            $('#paymentId').html(data.data.paymentTransactionId);
            
            $('#productId').html(data.data._id);
            $('#planName').html(data.data.subscriptionPlanDetails.planName);
            $('#planAmount').html(data.data.totalCost);
            $('#planAmountSubTotal').html(data.data.totalCost);
            $('#planAmountTotal').html(data.data.totalCost);
            

         

        },
        error(xhr, status, error) {
            errorModal(xhr.responseJSON.msg);
            window.location = '';
        }
    });
}

paymentDetails();