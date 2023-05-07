import { APIGatewayProxyHandler } from "aws-lambda";
import responseObject from "../../utils/Response";
import ReportService from "../../services/report.service";
export const handler: APIGatewayProxyHandler = async (event, context) => {
    console.log(`HANDLER: Starting ${context.functionName}...`);
    if (typeof event.body === 'string') {
        const body: any = JSON.parse(event.body);
        console.log(`HANDLER: Ending ${context.functionName}...`);
        return ReportService.findAllRecords(body);
    }
    return responseObject(400, {message: "Body is required"});
};
