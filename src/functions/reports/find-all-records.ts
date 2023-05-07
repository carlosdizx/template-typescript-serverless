import { APIGatewayProxyHandler } from "aws-lambda";
import responseObject from "../../utils/Response";
import ReportService from "../../services/report.service";
export const handler: APIGatewayProxyHandler = async (event, context) => {
    if (typeof event.body === 'string') {
        const body: any = JSON.parse(event.body);
        return ReportService.findAllRecords(body);
    }
    return responseObject(400, {message: "Body is required"});
};
