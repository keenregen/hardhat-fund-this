// Price Converter Library
// Libraries cannot have any state vars nor cannot send ETH

// SPDX-License-Identifier: Blank

pragma solidity 0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

library PriceConverterLib {
     function getPrice(
          AggregatorV3Interface priceFeed
     ) internal view returns (uint256) {
          // abi
          // a contract address 0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e  (eth / usd goerli testnet)
          (, int256 price, , , ) = priceFeed.latestRoundData();
          // ETH in usd (8 decimal places, should be 18 dec places as ETH and should be uint256 as ETH)
          return uint256(price) * 1e10;
     }

     function getConverted(
          uint256 ethAmount,
          AggregatorV3Interface priceFeed
     ) internal view returns (uint256) {
          // ETH in USD
          uint256 ethAmountInUsd = (getPrice(priceFeed) * ethAmount) / 1e18;
          return ethAmountInUsd;
     }
}
