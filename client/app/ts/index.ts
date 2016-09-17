import * as services from './services';
export { AppComponent } from './app.component';

const mapValuesToArray = (obj) => Object.keys(obj).map(key => obj[key]);

export const providers = [
    ...mapValuesToArray(services)
];