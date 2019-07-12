const ingredients = {
    'Апельсин': 'orange',
    'Лайм': 'lime',
    'Мята': 'mint',
    'Сахар': 'sugar',
    '1' : '123',
    '2' : '223',
    '3' : '3',
    '4' : '4',
    '5' : '5',
    '6' : '6',
    'hgasdhjagsdjahgsdjhagsdjhagsdasdassdhjagsdjahgsdjhagsdjhagsdasdassdhjagsdjahgsdjhagsdjhagsdasdassdhjagsdjahgsdjhagsdjhagsdasdassdhjagsdjahgsdjhagsdjhagsdasdassdhjagsdjahgsdjhagsdjhagsdasdasda' : '5'
};

var rowCounter = 0;

var waste = {};

function generateWaste() {
    for (var _key in ingredients) {
        waste[ingredients[_key]] = 0;
    }
}

function generateResultTable() {
    for(var key in ingredients) {
        $('.ingredients-row')
            .append(
                $('<td>')
                .append(
                    $('<span>')
                        .addClass('waste-table-item')
                        .text(key)
                )
        );
        $('.mass-row')
            .append(
                $('<td>')
                    .append(
                        $('<span>')
                            .addClass('waste-table-item')
                            .attr('id', 'waste-'+ingredients[key])
                            .text(0)
                    )
            )
    }
}

generateWaste();

function dropWaste() {
    for (var key in waste) {
        waste[key] = 0;
    }
}

function generateRowID() {
    return "teatable-row-" + (rowCounter - 1)
}

function generateResultID() {
    return "tea-result-" + (rowCounter - 1)
}

function generateAddIngredientID() {
    return "add-ingredient-" + (rowCounter - 1)
}

function generateCountID() {
    return "count-" + (rowCounter - 1)
}

function generateOptionsHtml() {
    var html = '<option selected disabled> Ингредиент </option>';
    for (var tea in ingredients) {
        html += '<option value="' + tea + '">' + tea + '</option>\n'
    }
    return html
}

function addIngredient(rowNumber) {
    $('<div>')
        .addClass('ingredients-cell')
        .append($('<label>')
            .addClass('tea-table-item')
            .append($('<select>')
                .addClass('ingredient-name')
                .append(
                    generateOptionsHtml()
                )
            )
        )
        .append($('<label>')
            .addClass('tea-table-item ')
            .append($('<input>')
                .attr('placeholder', 'Количество')
                .addClass('amount')
            )
        )
        .insertAfter($('#tea-result-' + rowNumber).parent().parent().parent().find('.ingredients-cell').last());
    $('.ingredient-name').unbind('change').change(function () {
        dropWaste();
        recalculateIngredients();
    });
    $('.amount').unbind('keyup').keyup(function () {
        dropWaste();
        recalculateIngredients();
    });
}

function recalculateIngredients() {
    for (i = 0; i < rowCounter; i++) {
        recalculateRow(i);
    }
    fillIngredients();
}

function recalculateRow(rowNumber) {
    $('#teatable-row-' + rowNumber).find('.ingredients-container').find('.ingredients-cell').toArray().forEach(function (item, i, arr) {
        waste[ingredients[$(item.getElementsByTagName('select')[0]).val()]] += parseInt($(item.getElementsByTagName('input')[0]).val())*parseInt($('.count-' + rowNumber).val());
    });
}

function fillIngredients() {
    for (var ingredient in waste) {
        isNaN(waste[ingredient]) ? $('#waste-'+ingredient).text("ERROR").addClass('red') : $('#waste-'+ingredient).text(waste[ingredient]).removeClass('red');
    }
}

function recalculateAll() {
    var result = 0;
    for (i = 0; i < rowCounter; i++) {
        amount = parseFloat($("#tea-result-" + i).val())
        amount*=parseInt($('.count-' + i).val());
        result += amount;
    }
    isNaN(amount) ? $("#result").text("ERROR").addClass('red') : $("#result").text(result).removeClass('red');
}

document.addEventListener("DOMContentLoaded", main);

function main() {
    $("#create-row-button").click(function () {
        rowCounter++;
        $("#teatable").find('tbody')
            .append($('<tr>')
                .append($('<div>')
                    .addClass('name-container')
                    .append($('<input value="Название коктейля">')
                        .addClass('cocktail-name')
                    )
                )
            )
            .append($('<tr>')
                .addClass('teatable-row')
                .attr('id', generateRowID())
                .append($('<td>')
                    .addClass('teatable-cell')
                    .append($('<button>')
                        .attr('id', generateAddIngredientID())
                        .addClass('add-ingredient')
                        .text('Добавить ингредиент')
                    )
                )
                .append($('<td>')
                    .addClass('teatable-cell ingredients-container')
                    .append($('<div>')
                        .addClass('all-ingredients-container')
                        .append($('<div>')
                            .addClass('ingredients-cell')
                            .append($('<label>')
                                .addClass('tea-table-item')
                                .append($('<select>')
                                    .addClass('ingredient-name')
                                    .append(
                                        generateOptionsHtml()
                                    )
                                )
                            )
                            .append($('<label>')
                                .addClass('tea-table-item')
                                .append($('<input>')
                                    .attr('placeholder', 'Количество')
                                    .addClass('amount')
                                )
                            )
                        )
                    )
                )
                .append($('<td>')
                    .addClass('teatable-cell')
                    .addClass('count-cell')
                    .append($('<label>')
                        .addClass('tea-table-item')
                        .append($('<input value="1" data-tooltip="Количество коктейлей">')
                            .addClass(generateCountID())
                        )
                    )
                )
                .append($('<td>')
                    .addClass('teatable-cell')
                    .addClass('result-cell')
                    .append($('<label>')
                        .addClass('tea-table-item')
                        .append($('<input value="0" data-tooltip="Стоимость коктейля">')
                            .attr('id', generateResultID())
                            .addClass('tea-result')
                        )
                    )
                    .append($('<span>')
                        .text(' р.')
                    )
                )
            )
        ;
        $('.add-ingredient').unbind('click').click(function (event) {
                addIngredient(event.target.id.slice(-1));
            }
        );
        addIngredient(rowCounter-1);
        addIngredient(rowCounter-1);
        $('.count-cell').unbind('keyup').keyup(function () {
            dropWaste();
            recalculateIngredients();
            recalculateAll();
        });
        $('.tea-result').unbind('keyup').keyup(function () {
            recalculateAll();
        });
    });
    var showingTooltip;
    document.onmouseover = function (e) {
        var target = e.target;

        var tooltip = target.getAttribute('data-tooltip');
        if (!tooltip) return;

        var tooltipElem = document.createElement('div');
        tooltipElem.className = 'tooltip';
        tooltipElem.innerHTML = tooltip;
        document.body.appendChild(tooltipElem);

        var coords = target.getBoundingClientRect();

        var left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
        if (left < 0) left = 0; // не вылезать за левую границу окна

        var top = coords.top - tooltipElem.offsetHeight - 5;
        if (top < 0) { // не вылезать за верхнюю границу окна
            top = coords.top + target.offsetHeight + 5;
        }

        tooltipElem.style.left = left + 'px';
        tooltipElem.style.top = top + 'px';

        showingTooltip = tooltipElem;
    };

    document.onmouseout = function (e) {

        if (showingTooltip) {
            document.body.removeChild(showingTooltip);
            showingTooltip = null;
        }

    };

    generateResultTable();
}
