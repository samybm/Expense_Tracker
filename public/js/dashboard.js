var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                '#FF0000',
                '#FFA500',
                '#FFFF00',
                '#008000',
                '#0000FF',
                '#800080',
                '#FFC0CB',
                '#000000',
                '#DAA520',
                '#00FFFF',
            ],
            // borderColor: [
            //     'rgba(255,99,132,1)',
            //     'rgba(54, 162, 235, 1)',
            //     'rgba(255, 206, 86, 1)',
            //     'rgba(75, 192, 192, 1)',
            //     'rgba(153, 102, 255, 1)',
            //     'rgba(255, 159, 64, 1)'
            // ],
            borderWidth: 2
        }]
    },
    options: {
       
    }
});

$.ajax("/api/expenses", {
    type: "GET",
    data: {
        UserId:1,
        startDate: "2018-07-10",
        endDate: "2018-10-10",
        description: "",
        CategoryId: ""
    }
}).then(function(dbExpenses) {
    console.log(dbExpenses);
    var categorySums = {};


    for (expense of dbExpenses) {
        var currentCategory = expense.Category.category_name;
    
        if (categorySums[currentCategory] === undefined) {
            categorySums[currentCategory] = expense.amount;
        }
        else {
            categorySums[currentCategory] += expense.amount;
        }
    }

    myChart.data.labels = [];
    myChart.data.datasets[0].data = [];

    for (category in categorySums) {
        const sum = categorySums[category];

        myChart.data.labels.push(category);

        myChart.data.datasets[0].data.push(sum);
    }
    myChart.update();   
})

