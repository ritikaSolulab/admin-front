const initiateDatatable = (
    tableId,
    ajaxConfig,
    columns,
    sorting=3
) => {
    return $(`#${tableId}`).DataTable({
        destroy: true,
        search: true,
        processing: true,
        filter: true,
        orderMulti: false,
        serverSide: true,
        columnDefs: [{ 'orderable': false, 'targets': 0 }], // hide sort icon on header of first column
        aaSorting: [[sorting, 'desc']],
        responsive: true,
        ajax: {
            url: ajaxConfig.url,
            type: ajaxConfig.type,
            contentType: 'application/json',
            datatype: "json",
            headers: {
                authorization: `Bearer ${token}`
            },
            error: (err) => {
                // ToastMsg(err?.responseJSON?.message, 'Error')
                // window.location.href = 'admin/dashboard'
            }
        },
        columns
    })
}