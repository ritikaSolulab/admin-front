$(function() {

    Morris.Bar({
        element: 'morris-bar-chart',
        data: [{ y: 'sold', a: 60, b: 50 },
            { y: 'revenue', a: 75, b: 65 },
            
             ],
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Series A', 'Series B'],
        hideHover: 'auto',
        resize: true,
        barColors: ['#3393C4', '#cacaca'],
    });
    

});
