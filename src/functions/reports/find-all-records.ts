import { APIGatewayProxyHandler } from "aws-lambda";
import responseObject from "../../utils/Response";
import ReportRecordsService from "../../services/report.records.service";
export const handler: APIGatewayProxyHandler = async (event, context) => {
    console.log(`HANDLER: Starting ${context.functionName}...`);
    if (event.queryStringParameters)
        return ReportRecordsService.findAllRecords(event.queryStringParameters);
    return responseObject(400, {message: "Query parameters are required"});
};
