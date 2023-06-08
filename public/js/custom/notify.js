let notifyDataTable;

const dataSet = [
    ['h@gmail.com', moment(Date.now()).format('DD MMMM, YYYY h:mm:s A')],
    ['h2@gmail.com', moment(Date.now()).format('DD MMMM, YYYY h:mm:s A')]
]

function reloadNotify() {
    $.ajax({
        url: "https://admin-api.doctrace.com/api/v1/admin/notify-list",
        method: 'get',
        success: function (data) {
            const tableData = data.data.reverse();
            const table = $('#notifyTable').DataTable({
                "data": tableData,
                "columns": [
                    {
                        mRender(data, type, row, meta) {
                            return meta.row + 1;
                        }
                    },
                    {
                        mRender(data, type, row, meta) {
                            return row.email;
                        }
                    },
                    {
                        mRender(data, type, row, meta) {
                            return moment(row.savedAt).format('DD MMMM, YYYY h:mm:s A');
                        }
                    }
                ]
            })
        }
    })
}
reloadNotify();