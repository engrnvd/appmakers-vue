<template>
    <a href @click.prevent="download()">
        <slot></slot>
    </a>
</template>

<script>
    export default {
        name: "ApmCsvDownloader",
        props: {
            data: Array,
            fileName: String,
            fields: Array
        },
        data() {
            return {}
        },
        methods: {
            processRow(row) {
                let finalVal = '';
                for (let j = 0; j < row.length; j++) {
                    let innerValue = row[j] ? row[j].toString() : '';
                    if (row[j] instanceof Date) {
                        innerValue = row[j].toLocaleString();
                    }
                    let result = innerValue.replace(/"/g, '""');
                    if (result.search(/("|,|\n)/g) >= 0)
                        result = '"' + result + '"';
                    if (j > 0)
                        finalVal += ',';
                    finalVal += result;
                }
                return finalVal + '\n';
            },
            download() {// variables
                var filename = this.fileName || 'csv-data.csv';
                var csvFields = this.fields;
                var csvString = '';
                // prep headers
                var headerRow = [];
                csvFields.forEach(function (field) {
                    headerRow.push(field.label);
                });
                csvString += this.processRow(headerRow);
                // prep rows
                for (var i = 0; i < this.data.length; i++) {
                    var obj = this.data[i];
                    var row = [];
                    csvFields.forEach(function (field) {
                        row.push(obj[field.name]);
                    });
                    csvString += this.processRow(row);
                }

                let blob = new Blob([csvString], {type: 'text/csv;charset=utf-8;'});
                if (navigator.msSaveBlob) { // IE 10+
                    navigator.msSaveBlob(blob, filename);
                } else {
                    let link = document.createElement("a");
                    if (link.download !== undefined) { // feature detection
                        // Browsers that support HTML5 download attribute
                        let url = URL.createObjectURL(blob);
                        link.setAttribute("href", url);
                        link.setAttribute("download", filename);
                        link.style.visibility = 'hidden';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>
