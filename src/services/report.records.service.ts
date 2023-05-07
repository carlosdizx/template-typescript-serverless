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
        console.timeLog('Query',`Count: ${result.length}` );
        console.timeEnd('Query');

        const workbook = await xlsxPopulate.fromBlankAsync();
        const sheet = workbook.sheet(0);
        sheet.cell('A1').value('Id direccion');
        sheet.cell('B1').value('Fecha de Creacion');
        sheet.cell('C1').value('Hora de Creacion');
        sheet.cell('D1').value('Ciudad');
        sheet.cell('E1').value('Cliente');
        sheet.cell('F1').value('Operador');
        sheet.cell('G1').value('Guia');
        sheet.cell('H1').value('Estado');
        sheet.cell('I1').value('Direccion de Destinatario');
        sheet.cell('J1').value('Telefono de Destinatario');
        sheet.cell('K1').value('Observaciones');
        sheet.cell('L1').value('Valor declarado');
        sheet.cell('M1').value('Guia Cliente');
        sheet.cell('N1').value('Zona');
        sheet.cell('O1').value('Nombre de Destinatario');
        sheet.cell('P1').value('Novedad de entrega');
        sheet.cell('Q1').value('Nota de entrega');
        sheet.cell('R1').value('Comentario de direccion');
        sheet.cell('S1').value('Comentario de novedad/nota');
        sheet.cell('T1').value('Intento de entrega');
        sheet.cell('U1').value('Dias de retraso');
        sheet.cell('V1').value('ID externo');
        sheet.cell('W1').value('Fecha de la orden');
        sheet.cell('X1').value('Fecha del estado');
        sheet.cell('Y1').value('Hora del estado');
        sheet.cell('Z1').value('Producto');
        sheet.cell('AA1').value('Cantidad');
        sheet.cell('AB1').value('Valor del recaudo');
        sheet.cell('AC1').value('Mensajero asignado');
        sheet.cell('AD1').value('Tipo de cierre');
        sheet.cell('AE1').value('Observacion de cierre');
        sheet.cell('AF1').value('Fecha de entrega');
        sheet.cell('AG1').value('Correo remitente');
        sheet.cell('AH1').value('Telefono remitente');

        for (let i = 0; i < result.length; i++) {
            const row = i + 2;
            const cellA = sheet.cell(`A${row}`);
            const cellB = sheet.cell(`B${row}`);
            const cellC = sheet.cell(`C${row}`);
            const cellD = sheet.cell(`D${row}`);
            const cellE = sheet.cell(`E${row}`);
            const cellF = sheet.cell(`F${row}`);
            const cellG = sheet.cell(`G${row}`);
            const cellH = sheet.cell(`H${row}`);
            const cellI = sheet.cell(`I${row}`);
            const cellJ = sheet.cell(`J${row}`);
            const cellK = sheet.cell(`K${row}`);
            const cellL = sheet.cell(`L${row}`);
            const cellM = sheet.cell(`M${row}`);
            const cellN = sheet.cell(`N${row}`);
            const cellO = sheet.cell(`O${row}`);
            const cellP = sheet.cell(`P${row}`);
            const cellQ = sheet.cell(`Q${row}`);
            const cellR = sheet.cell(`R${row}`);
            const cellS = sheet.cell(`S${row}`);
            const cellT = sheet.cell(`T${row}`);
            const cellU = sheet.cell(`U${row}`);
            const cellV = sheet.cell(`V${row}`);
            const cellW = sheet.cell(`W${row}`);
            const cellX = sheet.cell(`X${row}`);
            const cellY = sheet.cell(`Y${row}`);
            const cellZ = sheet.cell(`Z${row}`);
            const cellAA = sheet.cell(`AA${row}`);
            const cellAB = sheet.cell(`AB${row}`);
            const cellAC = sheet.cell(`AC${row}`);
            const cellAD = sheet.cell(`AD${row}`);
            const cellAE = sheet.cell(`AE${row}`);
            const cellAF = sheet.cell(`AF${row}`);
            const cellAG = sheet.cell(`AG${row}`);
            const cellAH = sheet.cell(`AH${row}`);

            cellA.value(result[i].idAddress);
            cellB.value(result[i].createdDate);
            cellC.value(result[i].createdHour);
            cellD.value(result[i].city);
            cellE.value(result[i].client);
            cellF.value(result[i].operator );
            cellG.value(result[i].trackingId);
            cellH.value(result[i].state );
            cellI.value(result[i].address);
            cellJ.value(result[i].reference1 );
            cellK.value(result[i].reference2 );
            cellL.value(result[i].declaredValue );
            cellM.value(result[i].clientTrackingId );
            cellN.value(result[i].zone );
            cellO.value(result[i].name );
            cellP.value(result[i].routeObservation );
            cellQ.value(result[i].record );
            cellR.value(result[i].comment );
            cellS.value(result[i].detailObservation );
            cellT.value(result[i].attempt );
            cellU.value(result[i].delay);
            cellV.value(result[i].externalId );
            cellW.value(result[i].orderDate );
            cellX.value(result[i].stateDate );
            cellY.value(result[i].stateHour );
            cellZ.value(result[i].product );
            cellAA.value(result[i].quantity );
            cellAB.value(result[i].ammount );
            cellAC.value(result[i].courier );
            cellAD.value(result[i].finishedType );
            cellAE.value(result[i].finishedDescription );
            cellAF.value(result[i].deliveryDate );
            cellAG.value(result[i].senderEmail );
            cellAH.value(result[i].senderPhone );
        }

        const buffer = await workbook.outputAsync({base64: true});
        console.timeEnd('Append file');
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Content-Disposition': `attachment; filename="archivo.xlsx"`,
            },
            body: buffer.toString('base64'),
            isBase64Encoded: true,
        };

        // console.time('Mapping data');
        // const resultMap = result.map((res: any) => ({
        //     'Id direccion': res.idAddress,
        //     'Fecha de Creacion': res.createdDate,
        //     'Hora de Creacion': res.createdHour,
        //     Ciudad: res.city,
        //     Cliente: res.client,
        //     Operador: res.operator,
        //     Guia: res.trackingId,
        //     Estado: res.state,
        //     'Direccion de Destinatario': res.address,
        //     'Telefono de Destinatario': res.reference1,
        //     Observaciones: res.reference2,
        //     'Valor declarado': res.declaredValue,
        //     'Guia Cliente': res.clientTrackingId,
        //     Zona: res.zone,
        //     'Nombre de Destinatario': res.name,
        //     'Novedad de entrega': res.routeObservation,
        //     'Nota de entrega': res.record,
        //     'Comentario de direccion': res.comment,
        //     'Comentario de novedad/nota': res.detailObservation,
        //     'Intento de entrega': res.attempt,
        //     'Dias de retraso': res.delay,
        //     'ID externo': res.externalId,
        //     'Fecha de la orden': res.orderDate,
        //     'Fecha del estado': res.stateDate,
        //     'Hora del estado': res.stateHour,
        //     Producto: res.product,
        //     Cantidad: res.quantity,
        //     'Valor del recaudo': res.ammount,
        //     'Mensajero asignado': res.courier,
        //     'Tipo de cierre': res.finishedType,
        //     'Observacion de cierre': res.finishedDescription,
        //     'Fecha de entrega': res.deliveryDate,
        //     'Correo remitente': res.senderEmail,
        //     'Telefono remitente': res.senderPhone,
        // }));
        // console.timeEnd('Mapping data');
        //
        // console.time('Append file');
        // const workbook = await xlsxPopulate.fromBlankAsync();
        // const sheet = workbook.sheet(0);
        //
        // const headers = Object.keys(resultMap[0]);
        // for (let i = 0; i < headers.length; i++) {
        //     sheet.cell(1, i + 1).value(headers[i]);
        // }
        //
        // for (let i = 0; i < resultMap.length; i++) {
        //     const row = Object.values(resultMap[i]);
        //     for (let j = 0; j < row.length; j++) {
        //         sheet.cell(i + 2, j + 1).value(row[j]);
        //     }
        // }
        //
        // const buffer = await workbook.outputAsync({base64: true});
        // console.timeEnd('Append file');
        // return {
        //     statusCode: 200,
        //     headers: {
        //         'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        //         'Content-Disposition': `attachment; filename="archivo.xlsx"`,
        //     },
        //     body: buffer.toString('base64'),
        //     isBase64Encoded: true,
        // };
    }
}
