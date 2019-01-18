
var Util = {

    defaultData() {

        var rows = [];

        for (var i = 0; i < 3; i++) {

            var cell = [];

            for (var j = 0; j < 3; j++) {

                cell.push({
                    childrens: []
                });


            }
            rows.push({
                cells: cell
            });
        }

        return {

            type: "Table",

            id: "Table_" + (+new Date()),

            Settings: {

            },

            layOutData: {
                data: rows
            }

        }

    }

   

}

export default Util;