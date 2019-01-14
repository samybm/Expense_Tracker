$(document).ready(function() {
    $("#date-range").on( "change", function(){
       var selection = $(this).val();

       if (selection === "lastthirty") {
            $("#custom-range").css("display", "none")
       }
       else if (selection === "customrange") {
           $("#custom-range").css("display", "inline-block")
           $("#start-date").val(moment().subtract(1, 'months').format("YYYY-MM-DD"));
           $("#end-date").val(moment().format("YYYY-MM-DD"));
       }
    });

    $("#view-expenses").on("submit", function(event) {
        event.preventDefault();

        var searchData = {
            description: $("#description").val().trim(),
            CategoryId: $("#category").val(),
            UserId: 1,
            startDate: "",
            endDate: ""   
        };

        var selection = $("#date-range").val();

        if (selection === "lastthirty") {
             searchData.startDate = moment().subtract(1, 'months').format("YYYY-MM-DD");
             searchData.endDate = moment().format("YYYY-MM-DD");
        }
        else if (selection === "customrange") {
            searchData.startDate = $("#start-date").val();
            searchData.endDate = $("#end-date").val();
        }

        $.ajax("/api/expenses", {
            type: "GET",
            data: searchData
        }).then(function(dbExpenses){
            console.log(dbExpenses);

            dbExpenses.sort( (a, b) => moment(b.date) - moment(a.date) );

            const display = $("#expenses-display");
            display.empty();

            var html = `
            <table class="table table-striped">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Category</th>
                </tr>
            </thead>
        <tbody>
        `;

        function row(e) {
            var row = $("<tr>");
            for (e of [moment(e.date).format("MM/DD/YYYY"), e.description, "$" + e.amount.toFixed(2), e.Category.category_name]) {
                var td = $("<td>").html(e)
                row.append(td);
            }
            return row.prop("outerHTML");
        }
        for (expense of dbExpenses) {
            html += row(expense);
        }

        html += `
        </tbody>
        </table>`;
        
        display.append(html)
        

    });
        


        
    })





})