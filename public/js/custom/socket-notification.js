const socket = io.connect('https://admin-api.doctrace.com/', { path: '/admin/notification' });

console.log('socket', socket);

socket.emit('join', { adminId: activeUser.userOtherDetails._id }, () => {
    console.log('socket join');
});

socket.on('notification', (data) => {
    const { list, count } = data
    console.log(data.count);
    if (count > 0) {
        $('#notification-count').attr('class', 'label label-primary')
        $('#notification-count').html(count);

    } else {
        $('#notification-count').attr('class', '')
        $('#notification-count').html('');
    }
    document.getElementById('notification-container').innerHTML = '';
    list.forEach(notification => {
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
        document.getElementById('notification-container').innerHTML += notification_template_string;
    })
    console.log('notification', data);
})

function markAllRead(){
    console.log('mark all as read')
    socket.emit('mark-all-read',{adminId : activeUser.userOtherDetails._id });
}

function markRead(notificationId) {
    
    console.log('mark read',notificationId)
    socket.emit('mark-read',{ notificationId  , adminId : activeUser.userOtherDetails._id});
}