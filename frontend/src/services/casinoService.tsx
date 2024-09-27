import * as request from "./request";

const baseURL = 'http://localhost:2000';

// GET

export const getBalance = async () => {
    const response = await request.get(`${baseURL}`, '/wallet/balance', {});
    return response;
}

export const getRTP = async () => {
    const response = await request.get(`${baseURL}`, '/rtp', {});
    return response;
}

// POST

export const postPlay = (bet: number) => request.post(baseURL, '/play',{ bet})
export const postSim = (count: number, bet: number) => request.post(baseURL, '/sim', {count, bet})
export const postDeposit = (amount: number, mode: string) => request.post(baseURL, '/wallet/deposit',{ amount, mode })
export const postWithdraw = (amount: number, mode: string) => request.post(baseURL, '/wallet/withdraw',{ amount, mode })