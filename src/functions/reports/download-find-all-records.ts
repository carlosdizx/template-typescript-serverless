import { APIGatewayProxyHandler } from "aws-lambda";
import responseObject from "../../utils/Response";
import ReportRecordsService from "../../services/report.records.service";
export const handler: APIGatewayProxyHandler = async (event, context) => {
    console.log(`HANDLER: Starting ${context.functionName}...`);
    if (typeof event.body === 'string') {
        const body: any = JSON.parse(event.body);
        return await ReportRecordsService.downloadFindAllRecords(body);
    }
    return responseObject(400, {message: "Body is required"});
};
