import { Snowflake, SnowflakeOpts } from 'nodejs-snowflake';

export class CustomSnawflake {
  snowflake: Snowflake;
  constructor(options?: SnowflakeOpts) {
    this.snowflake = new Snowflake(
      options ? options : { custom_epoch: Date.now() },
    );
  }

  getUniqueID() {
    return this.snowflake.getUniqueID();
  }

  getIDFromTimeStamp() {
    return this.snowflake.idFromTimestamp(Date.now());
  }

  public getTimeStamp(id: bigint, date?: boolean): Date {
    const ts = Snowflake.timestampFromID(id, Date.now());
    if (date) {
      return new Date(ts);
    }
    // return ts;
  }
}
