$.ajax({
    url: notificationApi,
    method: 'get',
    success: (result) => {
        const { data } = result;
        data.forEach(notification => {
        const notification_template_string = `<li>
        <a href="#!" onclick="markRead('${notification._id}')" class="dropdown-item clearfix" style="${
            notification.isRead ? ' background-color: #e9ecef;' : ''
        }">
            <div>
               <i class="fa fa-file-text" aria-hidden="true"></i>
                <p class="d-inline-block mb-0"> ${notification.description}</p>
                <span class="float-right text-muted small d-inline-block">${moment(notification.at).fromNow()}</span>
            </div>
        </a>
    </li>
    <li class="dropdown-divider"></li>`
        document.getElementById('notification-container-list').innerHTML += notification_template_string;
    })
    }, error: (result) => {
        toastr.show(result.responseJSON.msg);
    }
});