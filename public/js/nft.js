// $("#pro table tr").on('click', function(){
//     window.location = "/admin/provider_details";    
// });
// $("#pend table tr").on('click', function(){
//     window.location = "/admin/provider_pending_approvals";    
// });
var providersTable;
var providersApprovalTable;

var old = alert;

alert = function() {
  console.log(new Error().stack);
};


const nft = () => {
    nftTable = $('#nftTable').DataTable({
        columns: [
            { data: 'srno' },
            { data: 'nft_name' },
            { data: 'creator' },
            { data: 'owner' },
            { data: 'collection_name' },
            { data: 'price' },
            { data: 'action' },
              
        ],
        data: [
            {
                srno: 1,
                nft_name: 'NFT 1',
                creator: 'John Smith',
                owner: 'Goking',
                collection_name: 'collection1',
                price: '10',
                action: 'test',
            },
            {
                srno: 1,
                nft_name: 'NFT 2',
                creator: 'Goking',
                owner: 'John Smith',
                collection_name: 'collection2',
                price: '2',
                action: 'test',
            },

        ]
    });

}

$(document).ready(function () {

    nft();
});

const dateFilter = (value) => {
    console.log(value);
    const startDate = value.split('-')[0];
    const endDate = value.split('-')[1];
    if (new Date(startDate) <= new Date(endDate)) {
        console.log('correct');
        // providersTable.ajax.reload();
        // providersApprovalTable.ajax.reload();
        // getFilteredCountAjax($('#startDate').val(),$('#endDate').val());
    } else {
        swal({
            text: 'please select correct date'
        });
    }
}