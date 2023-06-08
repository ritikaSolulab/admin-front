function ticketListCounts () {
    $.ajax({
        url: `${zendeskApiPrefix}/search.json?query=type:ticket status:new`,
        method: 'get',
        headers: {
            "authorization": `${zendeskToken}`,
        },
        success: (result) => {
            const { count } = result;
            $('#new_count').html(count);
        }, error: (result) => {
            console.log(result);
        }
    })
    
    
    $.ajax({
        url: `${zendeskApiPrefix}/search.json?query=type:ticket status:open`,
        method: 'get',
        headers: {
            "authorization": `${zendeskToken}`,
        },
        success: (result) => {
            const { count } = result;
            $('#open_count').html(count);
     }, error: (result) => {
            console.log(result);
        }
    })


    $.ajax({
        url: `${zendeskApiPrefix}/search.json?query=type:ticket status:pending`,
        method: 'get',
        headers: {
            "authorization": `${zendeskToken}`,
        },
        success: (result) => {
            const { count } = result;
            $('#pending_count').html(count);
        }, error: (result) => {
            console.log(result);
        }
    })

    $.ajax({
        url: `${zendeskApiPrefix}/search.json?query=type:ticket status:hold`,
        method: 'get',
        headers: {
            "authorization": `${zendeskToken}`,
        },
        success: (result) => {
            const { count } = result;
            $('#hold_count').html(count);
        }, error: (result) => {
            console.log(result);
        }
    })

    $.ajax({
        url: `${zendeskApiPrefix}/search.json?query=type:ticket status:solved`,
        method: 'get',
        headers: {
            "authorization": `${zendeskToken}`,
        },
        success: (result) => {
            const { count } = result;
            $('#solved_count').html(count);
        }, error: (result) => {
            console.log(result);
        }
    })

    $.ajax({
        url: `${zendeskApiPrefix}/search.json?query=type:ticket status:closed`,
        method: 'get',
        headers: {
            "authorization": `${zendeskToken}`,
        },
        success: (result) => {
            const { count } = result;
            $('#closed_count').html(count);
        }, error: (result) => {
            console.log(result);
        }
    })
}
ticketListCounts();