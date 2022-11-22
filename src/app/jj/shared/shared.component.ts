import { default as packageJson } from '../../../../package.json';
import { PackageInfo } from './shared.interface';

export class SharedComponent {
    constructor() { }

    protected getPackageInfo() {
        return {
            version: packageJson.version,
        } as PackageInfo;
    }

    protected assertElement(id: string) {
        return new Promise<HTMLElement>((resolve) => {
            let interval = setInterval(() => {
                let el = document.getElementById(id);
                if (el) {
                    clearInterval(interval);
                    resolve(el);
                }
            }, 100);
        });
    }

    protected getDateDiff(toDate: Date, fromDate?: Date) {
        let diff = { time: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
        fromDate = fromDate || new Date();
        if (toDate > fromDate) {
            diff.time = (toDate.getTime() - fromDate.getTime()) / 1000;
            diff.days = Math.floor(diff.time / (3600 * 24));
            diff.hours = Math.floor(diff.time / 3600) % 24;
            diff.minutes = Math.floor((diff.time / 60) % 60);
            diff.seconds = Math.floor(diff.time % 60);
        }
        return diff;
    }
}
