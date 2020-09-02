import { HTMLValidationReport } from "@qualweb/html-validator";
import fetch, { Response } from 'node-fetch';
import { workerData, parentPort } from 'worker_threads';


try {
    let start = new Date().getTime();
    console.log(start+"thread");
    fetch(workerData.url).then((response) => {
        if (response && response.status === 200) {
            response.json().then((response) => {
                let validation = <HTMLValidationReport>JSON.parse(response);
                let end = new Date().getTime();
                let duration = end - start;
                console.log(duration+"thread");
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

