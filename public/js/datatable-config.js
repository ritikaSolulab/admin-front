const initiateDatatable = (
    tableId,
    ajaxConfig,
    columns
) => {
    return $(`#${tableId}`).DataTable({
        destroy: true,
        search: true,
        processing: true,
        filter: true,
        orderMulti: false,
        serverSide: true,
        columnDefs: [{ 'orderable': false, 'targets': 0 }], // hide sort icon on header of first column
        aaSorting: [[3, 'desc']],
        responsive: true,
        ajax: {
            url: ajaxConfig.url,
            type: ajaxConfig.type,
            contentType: 'application/json',
            datatype: "json",
            headers: {
                authorization: `Bearer ${user.token}`
            }
        },
        columns
    })
}