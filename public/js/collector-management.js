var providersTable;
var providersApprovalTable;

var old = alert;

alert = function() {
  console.log(new Error().stack);
};

const transaction = () => {
    transactionTable = $('#transactionTable').DataTable({
        columns: [
            { data: 'srno' },
            { data: 'txn' },
            { data: 'status' },
            { data: 'seller' },
            { data: 'buyer' },
            { data: 'section' },
            { data: 'items' },
            { data: 'type' },
            { data: 'value' },
          
            { data: 'payment' },
            { data: 'date' },
            { data: 'fees' },
              
        ],
        data: [
            {
                srno: 1,
                txn: '111111111',
                status: 'success',
                seller: '1111111111',
                buyer: '1111111',
                section: 'test',
                items: 'test',
                type: 'test',
                value: 'test',
                payment: 'test',
                date: 'test',
                fees: 'test',
            },
            {
                srno: 1,
                txn: '111111111',
                status: 'success',
                seller: '1111111111',
                buyer: '1111111',
                section: 'test',
                items: 'test',
                type: 'test',
                value: 'test',
                payment: 'test',
                date: 'test',
                fees: 'test',
            },
            {
                srno: 1,
                txn: '111111111',
                status: 'success',
                seller: '1111111111',
                buyer: '1111111',
                section: 'test',
                items: 'test',
                type: 'test',
                value: 'test',
                payment: 'test',
                date: 'test',
                fees: 'test',
            }

        ]
    });

}

$(document).ready(function () {

    transaction();
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