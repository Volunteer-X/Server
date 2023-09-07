export default () => ({
  userPort: parseInt(process.env.USER_PORT, 10) || 3510,
});
