import {startServer} from './loaders';

startServer();

// const defaultCus = {
//     phoneNumber: "1",
//     email: "a@a.com",
//     password: "1",
//     firstName: "default",
//     lastName: "default",
// };
// const manager = {
//     phoneNumber: "0",
//     email: "a1@a1.com",
//     password: "0",
//     firstName: "admin",
//     lastName: "admin",
//     role: "0",
//     salary: "1000"
// };
// let existDefaultCus = await Customer.findOne({
//     phoneNumber: "1",
// });
// let existManager = await Staff.findOne({ phoneNumber: "0" });
// if (!existDefaultCus) {
//     existDefaultCus = await Customer.create(defaultCus);
// }
// if (!existManager) {
//     existManager = await Staff.create(manager);
// }
