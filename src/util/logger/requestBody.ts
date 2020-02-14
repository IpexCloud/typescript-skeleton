import { format } from 'winston';

format((info, opts) => {
  console.log(opts)
  return info
})

export {format}
