import neo4j, { Driver } from 'neo4j-driver';

import { Neo4jConfig } from './neo4j-config.interface';

export const createDriver = async (config: Neo4jConfig) => {
  try {
    const driver: Driver = neo4j.driver(
      `${config.scheme}://${config.host}:${config.port}`,
      neo4j.auth.basic(config.username, config.password),
    );

    const serverInfo = await driver.getServerInfo();
    console.log(
      `Connected to ${serverInfo.address} as ${serverInfo.protocolVersion}`,
    );

    return driver;
  } catch (e) {
    console.log(`Connection error\n${e}\nCause: ${e.cause}`);
  }

  //   try {
  //     await driver.verifyAuthentication();
  //   }catch (e) {
  //     console.error(e);
  //   }
};
