export default () => ({
  userPort: parseInt(process.env.USER_PORT, 10) || 3510,
  pingPort: parseInt(process.env.PING_PORT, 10) || 3520,
});
