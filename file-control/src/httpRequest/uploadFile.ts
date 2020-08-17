import axios from "axios";
import {fileListMockData} from '../mock/MockData'



export const getFileDirsMock = new Promise((resolve,reject) => {

    setTimeout(() => {
        resolve(fileListMockData)
    }, 10);

})

