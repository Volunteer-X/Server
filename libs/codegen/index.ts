import { execSync } from 'child_process';
const arg = process.argv[2];

const commands = {
  user: 'ts-node ./libs/codegen/user.ts',
  ping: 'ts-node ./libs/codegen/ping.ts',
  channel: 'ts-node ./libs/codegen/channel.ts',
};

const command = commands[arg];
if (command) {
  execSync(command, { stdio: 'inherit' });
} else {
  console.error(
    "Invalid argument. Please provide either 'user', 'ping' or 'channel'.",
  );
  process.exit(1);
}
