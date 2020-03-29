import { Request } from 'express';
import { HttpRequestInterface } from './http-request.interface'; 


export default {
    /**
     * Parse Express HTTP Request
     * @param req {Request} Express HTTP Request
     */
    parse: function(req: Request): HttpRequestInterface {
        return {
            baseUrl: req.baseUrl,
            body: req.body,
            cookies: req.cookies,
            hostname: req.hostname,
            ip: req.ip,
            ips: req.ips,
            method: req.method,
            originalUrl: req.originalUrl,
            params: req.params,
            path: req.path,
            protocol: req.protocol,
            query: req.query,
            subdomains: req.subdomains
        }
    }
}