import range from 'lodash.range';
import web3 from './web3API';

export const toEther = wei => wei / 1000000000000000000;
export const toGwei = wei => wei / 1000000000;

export function shortenAddress(address, charsLength = 4) {
  const prefixLength = 2; // "0x"
  if (!address) {
    return '';
  }
  if (address.length < charsLength * 2 + prefixLength) {
    return address;
  }
  return `${address.slice(0, charsLength + prefixLength)}…${address.slice(
    -charsLength,
  )}`;
}

export function fetchBlocks(startBlock, endBlock) {
  return new Promise((resolve, reject) => {
    let blockArray = [];
    const blockBatch = new web3.eth.BatchRequest();
    const blockRange = range(startBlock, endBlock);
    blockRange.forEach(blockNumber =>
      blockBatch.add(
        web3.eth.getBlock.request(blockNumber, (err, newBlock) => {
          if (err) {
            reject(new Error('Could not fetch blocks'));
          }
          const newBlockArray = [...blockArray, newBlock];
          blockArray = newBlockArray;
          if (blockArray.length === endBlock - startBlock) {
            resolve(blockArray);
          }
        }),
      ),
    );
    blockBatch.execute();
  });
}

export default null;
