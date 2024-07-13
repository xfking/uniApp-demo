import qs from "qs";
/**
 * Axios adapter in uniapp.
 * When uploading file, please set the Content-Type to multipart/form-data,
 * and fill in the name and filepath properties in the data.
 * @param config
 * @return {Promise<Object>}
 */
export default function (config) {
    let url = (config.baseURL ?? '') + (config.url ?? '');
    const header = config.headers || {};
    const timeout = config.timeout || 60000;
    if (config.params) {
        url += url.includes('?') ? '&' : '?';
        url += qs.stringify(config.params);
    }
    if ('multipart/form-data' === header['Content-Type']) {
        config.data = qs.parse(config.data);
    }
    // send a request to upload a file
    if ('multipart/form-data' === header['Content-Type']) {
        return new Promise((resolve, reject) => {
            const data = config.data || {};
            const name = 'file';
            const file = data['file'];
            const filePath = data['filePath'];
            delete data['name'];
            delete data['file'];
            delete data['filePath'];
            delete header['Content-Type'];
            return uni.uploadFile({
                url,
                header,
                timeout,
                name,
                file,
                filePath,
                formData: data,
                // @ts-ignore
                success: (res) => {
                    resolve({
                        data: JSON.parse(res.data),
                        status: res.statusCode,
                        // @ts-ignore
                        statusText: res.errMsg,
                        headers: {},
                        config: config,
                    });
                },
                fail: reject
            });
        });
    }
    // send a request
    return new Promise((resolve, reject) => {
        uni.request({
            url,
            header,
            timeout,
            data: config['data'] || undefined,
            // @ts-ignore
            method: config.method,
            dataType: 'json' === config['responseType'] ? 'json' : undefined,
            responseType: config['responseType'] || 'text',
            withCredentials: config['withCredentials'] || false,
            success: (res) => {
                resolve({
                    data: res.data,
                    status: res.statusCode,
                    // @ts-ignore
                    statusText: res?.errMsg || '',
                    headers: res.header,
                    config: config,
                });
            },
            fail: reject
        });
    });
}
;
//# sourceMappingURL=axios-adapter.js.map