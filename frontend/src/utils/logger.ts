type Level = 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';

const isDev = process.env.NODE_ENV !== 'production';

const log = (level: Level, context: string, message: string, meta?: object) => {
  if (!isDev && level === 'DEBUG') return;
  const timestamp = new Date().toISOString();
  const prefix = `[${timestamp}] [${level}] [${context}]`;
  if (level === 'ERROR') {
    console.error(prefix, message, meta ?? '');
  } else if (level === 'WARN') {
    console.warn(prefix, message, meta ?? '');
  } else {
    console.log(prefix, message, meta ?? '');
  }
};

export const logger = {
  info:  (ctx: string, msg: string, meta?: object) => log('INFO', ctx, msg, meta),
  warn:  (ctx: string, msg: string, meta?: object) => log('WARN', ctx, msg, meta),
  error: (ctx: string, msg: string, meta?: object) => log('ERROR', ctx, msg, meta),
  debug: (ctx: string, msg: string, meta?: object) => log('DEBUG', ctx, msg, meta),
};