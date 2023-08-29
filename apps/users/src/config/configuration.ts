export default () => ({
  port: parseInt(process.env.USER_PORT, 10) || 3510,
});
