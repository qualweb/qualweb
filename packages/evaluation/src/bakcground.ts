import { HTMLValidationReport } from "@qualweb/html-validator";
import fetch, { Response } from 'node-fetch';
import { workerData, parentPort } from 'worker_threads';


try {
    fetch(workerData.validationUrl).then((response) => {
        if (response && response.status === 200) {
            response.json().then((response) => {
                let validation = <HTMLValidationReport>JSON.parse(response);
                if (!!parentPort)
                    parentPort.postMessage(
                        validation
                    );

            })
        }
    }
    )
} catch (err) {
    console.error(err);
}

