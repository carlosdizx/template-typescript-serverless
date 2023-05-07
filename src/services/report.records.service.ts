import responseObject from "../utils/Response";
import getConnect from "../utils/DatabaseConnection";

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
}
