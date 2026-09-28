import http from 'http';

http
  .get(
    'http://localhost:5000/api/v1/health',
    res => {
      process.exit(
        res.statusCode === 200
          ? 0
          : 1
      );
    }
  )
  .on(
    'error',
    () => process.exit(1)
  );