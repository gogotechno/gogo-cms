import { Pagination } from 'src/app/sws-erp.type';
import { PackageInfo } from './shared.interface';
import { default as packageJson } from '../../../../package.json';

export class SharedComponent {
  constructor() {}

  protected get defaultPage(): Pagination {
    return {
      itemsPerPage: 10,
      currentPage: 1,
    };
  }

  protected getPackageInfo(): PackageInfo {
    return {
      version: packageJson.version,
    };
  }

  protected assertElement(id: string, duration: number = 100) {
    return new Promise<HTMLElement>((resolve, reject) => {
      let timeout = 0;
      let interval = setInterval(() => {
        if (timeout > 3000) {
          clearInterval(interval);
          reject(`Assert [${id}] error: Timeout due to no response`);
          return;
        }
        let el = document.getElementById(id);
        if (el) {
          clearInterval(interval);
          resolve(el);
        }
        timeout += duration;
      }, duration);
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

  protected getGreeting() {
    let today = new Date();
    if (today.getHours() < 12) {
      return '_GOOD_MORNING';
    }
    if (today.getHours() <= 2) {
      return '_GOOD_AFTERNOON';
    }
    return '_GOOD_EVENING';
  }
}
