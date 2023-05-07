import responseObject from "../utils/Response";
import getConnect from "../utils/DatabaseConnection";
const xlsxPopulate = require('xlsx-populate');

export default class ReportRecordsService {
    public static findAllRecords = async (data: any) => {
        let {
            offset,
            page,
        } = data;
        page = page == '' ? 1 : Number(page);
        offset = offset == '' ? 10 : Number(offset);
        const {
            from,
            to,
            idCity,
            state,
            idRecord,
            idUser,
            idObservation,
            idClient,
            idOperator,
            search,
            highPriority
        } = data;

        const [field, value] = search ? search.split('|') : [null, null];

        const queryString = (offset: any, page: any, count: any) =>
        `SELECT ${count ? 'count(*) total' : '*'} FROM sp_findallrecords(
        ${offset},
        ${page},
        '${from && from}',
        '${to && to}',
        ${idCity ? idCity : null},
        ${state ? state : null},
        ${idRecord ? idRecord : null},
        ${idUser ? idUser : null},
        ${idObservation ? idObservation : null},
        ${idClient ? idClient : null},
        ${idOperator ? idOperator : null},
        ${null},
        ${null},
        '${field}',
        '${value}',
        ${highPriority ? highPriority : false}
        )`;

        const datasource = await getConnect();
        console.time();
        const resultItems = await datasource.manager.query(queryString(offset, page, false));
        const resultCount = await datasource.manager.query(queryString(null, null, true));
        console.timeEnd();

        const total = Number(resultCount[0].total);
        const totalPages = Math.ceil(total / offset);
        const next = page + 1 <= totalPages ? page + 1 : null;
        const prev = page - 1 >= 1 ? page - 1 : null;

        return responseObject(200, {
            items: resultItems,
            total,
            page,
            totalPages,
            next,
            prev,
        });
    }
    public static downloadFindAllRecords = async (data: any) => {
        console.time('Query');
        const [field, value] = data.search ? data.search.split('|') : [null, null];
        const query = `SELECT * FROM sp_findalldownloadrecords(
          ${null},
          ${null},
          '${data.from && data.from}',
          '${data.to && data.to}',
          ${data.idCity ? data.idCity : null},
          ${data.state ? data.state : null},
          ${data.idRecord ? data.idRecord : null},
          ${data.idUser ? data.idUser : null},
          ${data.idObservation ? data.idObservation : null},
          ${data.idClient ? data.idClient : null},
          ${data.idOperator ? data.idOperator : null},
          ${null},
          ${null},
          '${field}',
          '${value}',
          ${data.highPriority ? data.highPriority : false}
        ) LIMIT 250000`;
        const datasource = await getConnect();

        const result = await datasource.manager.query(query);
        console.timeEnd('Query');

        const workbook = await xlsxPopulate.fromBlankAsync();
        const sheet = workbook.sheet(0);

        const headers = Object.keys(result[0]);
        for (let i = 0; i < headers.length; i++) {
            sheet.cell(1, i + 1).value(headers[i]);
        }

        for (let i = 0; i < result.length; i++) {
            const row = Object.values(result[i]);
            for (let j = 0; j < row.length; j++) {
                sheet.cell(i + 2, j + 1).value(row[j]);
            }
        }

        const buffer = await workbook.outputAsync();
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Content-Disposition': `attachment; filename="archivo.xlsx"`,
            },
            body: buffer.toString('base64'),
            isBase64Encoded: true,
        };
    }
}
