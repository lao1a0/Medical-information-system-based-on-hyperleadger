const xlsx = require('xlsx');

let workbook = xlsx.readFile('./template.xlsx');
let sheetNames = workbook.SheetNames;
let sheet1 = workbook.Sheets[sheetNames[0]];
let range = xlsx.utils.decode_range(sheet1['!ref']);
let data={}
for (let C = range.s.c; C <= range.e.c; ++C)
{
    let row_value = [];
    for (let R = range.s.r; R <= range.e.r; ++R)
    {
        if(R==0) continue;
        let cell_address = {c: C, r: R}; //获取单元格地址
        let cell = xlsx.utils.encode_cell(cell_address); //根据单元格地址获取单元格
        if (sheet1[cell]) {
            row_value.push(sheet1[cell].v)
        }
    }
    let titleName=xlsx.utils.encode_cell({c: C, r: 0});
    data[sheet1[titleName].v] = row_value
}
console.log(data)