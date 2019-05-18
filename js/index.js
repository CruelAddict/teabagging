const teas = {
    "Букет Грузии": 1,
    "Принцесса Нури": 2,
    "Каждый День": 3,
    "Круглый Год": 4
};

var rowCounter = 1;

function generateTeanameID() {
    return "tea-name-" + (rowCounter-1)
}

function generateAmountID() {
    return "amount-" + (rowCounter-1)
}

function generateResultID() {
    return "tea-result-" + (rowCounter-1)
}

function generateOptionsHtml() {
    var html = '';
    for (var tea in teas) {
        html += '<option value="' + tea + '">' + tea + '</option>\n'
    }
    return html
}

function recalculateRow(rowNumber){
    var amount = parseFloat($("#amount-"+rowNumber).val())*teas[$("#tea-name-"+rowNumber+" option:selected").val()];
    isNaN(amount) ? $("#tea-result-"+rowNumber).text("0").addClass('red') :  $("#tea-result-"+rowNumber).text(amount).removeClass('red');
    recalculateAll();
}

function recalculateAll(){
    var result = 0;
    for (i = 0; i < rowCounter; i++) {
        result+=parseFloat($("#tea-result-"+i).text())
    }
    $("#result").text(result);
}

document.addEventListener("DOMContentLoaded", main);

function main() {
    $("#create-row-button").click(function () {
        rowCounter++;
        $("#teatable").find('tbody')
            .append($('<tr>')
                .addClass('teatable-row')
                .append($('<label>')
                    .append($('<td>')
                        .addClass('teatable-cell')
                        .append($('<select>')
                            .attr('id', generateTeanameID())
                            .addClass('tea-name')
                            .append($('<option>')
                                .text('Название чая')
                            ).append(
                                generateOptionsHtml()
                            )
                        )
                    )
                )
                .append($('<td>')
                    .addClass('teatable-cell')
                    .append($('<input>')
                        .attr('id', generateAmountID())
                        .attr('placeholder', 'Количество в граммах')
                        .addClass('amount')
                    )
                )
                .append($('<td>')
                    .addClass('teatable-cell')
                    .append($('<span>')
                        .attr('id', generateResultID())
                        .text('0')
                    )
                    .append($('<span>')
                        .text(' р.')
                    )
                )
            )
        ;
        $('.tea-name').change(function(){
            recalculateRow(event.target.id.substr(-1));
        });
        $('.amount').keyup(function(){
            recalculateRow(event.target.id.substr(-1));
        });
    });

    $('.tea-name').change(function(){
        recalculateRow(event.target.id.substr(-1));
    });
    $('.amount').keyup(function(){
        recalculateRow(event.target.id.substr(-1));
    });

}
